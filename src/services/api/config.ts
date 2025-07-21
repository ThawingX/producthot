import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { config, isDevelopment, isProduction, getCurrentEnvironment } from '../../config/environment';

// API配置 - 基于环境配置
export const API_CONFIG = {
  BASE_URL: (() => {
    const envUrl = import.meta.env.VITE_API_BASE_URL || config.api.baseUrl;
    // 在生产环境中确保使用HTTPS
    if (isProduction() && envUrl && envUrl.startsWith('http:')) {
      console.warn('⚠️ 生产环境检测到HTTP API URL，自动转换为HTTPS:', envUrl);
      return envUrl.replace('http:', 'https:');
    }
    return envUrl;
  })(),
  TIMEOUT: config.api.timeout,
  RETRY_ATTEMPTS: config.api.retryAttempts,
  RETRY_DELAY: config.api.retryDelay,
};

// 错误处理接口
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

// 重试选项
export interface RetryOptions {
  attempts: number;
  delay: number;
  backoff: boolean;
  retryCondition?: (error: any) => boolean;
}

// 重试函数
export const withRetry = async <T>(
  fn: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> => {
  const {
    attempts = API_CONFIG.RETRY_ATTEMPTS,
    delay = API_CONFIG.RETRY_DELAY,
    backoff = true,
    retryCondition = (error) => error.response?.status >= 500,
  } = options;

  let lastError: any;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === attempts || !retryCondition(error)) {
        throw error;
      }

      const waitTime = backoff ? delay * Math.pow(2, attempt - 1) : delay;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw lastError;
};

// 错误处理函数
export const handleApiError = (error: any): ApiError => {
  const apiError: ApiError = {
    message: '请求失败',
    status: error.response?.status,
  };

  if (error.response?.data) {
    const data = error.response.data as any;
    apiError.message = data.message || data.error || '服务器错误';
    apiError.code = data.code;
    apiError.details = data.details;
  } else if (error.request) {
    apiError.message = '网络连接失败，请检查网络设置';
  } else {
    apiError.message = error.message || '未知错误';
  }

  return apiError;
};

// 创建axios实例
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 添加认证token
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 添加请求时间戳
    if (config.headers) {
      config.headers['X-Request-Time'] = Date.now().toString();
    }
    
    // 添加用户代理
    // if (config.headers) {
    //   config.headers['User-Agent'] = 'ProductHot/1.0';
    // }
    
    // 添加环境标识
    if (config.headers) {
      config.headers['X-Environment'] = getCurrentEnvironment();
    }
    
    // 启用控制台日志记录
    console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    console.log('📋 Request Config:', {
      baseURL: config.baseURL,
      url: config.url,
      method: config.method,
      params: config.params,
      headers: config.headers
    });
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('✅ API Response:', response.status, response.config.url);
    console.log('📦 Response Data:', response.data);
    
    // 处理重定向状态码
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.location;
      console.warn(`🔄 收到重定向 ${response.status}:`, {
        originalUrl: response.config.url,
        redirectTo: location,
        status: response.status
      });
      
      // 如果是307重定向，尝试使用新的URL重新发送请求
      if (response.status === 307 && location) {
        console.log('🔄 处理307重定向，重新发送请求到:', location);
        
        // 创建新的请求配置
        const newConfig = {
          ...response.config,
          url: location,
          baseURL: '', // 清空baseURL，因为location通常是完整URL
        };
        
        // 重新发送请求
        return apiClient.request(newConfig);
      }
    }
    
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.status, error.config?.url);
    console.error('❌ Error Details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      headers: error.response?.headers
    });
    
    // 特别处理重定向错误
    if (error.response?.status >= 300 && error.response?.status < 400) {
      const location = error.response.headers.location;
      console.warn(`🔄 重定向错误 ${error.response.status}:`, {
        originalUrl: error.config?.url,
        redirectTo: location,
        message: '可能是HTTPS重定向或URL路径问题'
      });
      
      // 提供更详细的错误信息
      const redirectError = new Error(`重定向错误 ${error.response.status}: ${location || '未知位置'}`);
      (redirectError as any).isRedirectError = true;
      (redirectError as any).redirectLocation = location;
      (redirectError as any).originalStatus = error.response.status;
      
      return Promise.reject(redirectError);
    }
    
    // 处理认证错误
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      // 在生产环境中可能需要不同的处理方式
      if (isDevelopment()) {
        console.warn('🔐 Authentication expired - redirecting to login');
      }
      // 可以在这里触发登录页面跳转
      // window.location.href = '/login';
    }
    
    // 处理网络错误
    if (!error.response) {
      console.error('Network Error: Please check your connection');
    }
    
    return Promise.reject(handleApiError(error));
  }
);

export default apiClient;
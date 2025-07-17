# API 最佳实践指南

## 目录
- [请求层 (API Layer)](#请求层-api-layer)
- [中间件 (Middleware)](#中间件-middleware)
- [多语言 (Internationalization)](#多语言-internationalization)
- [错误处理](#错误处理)
- [性能优化](#性能优化)
- [安全性](#安全性)

## 请求层 (API Layer)

### 1. 基础配置

#### API 配置文件 (`src/services/api/config.ts`)
```typescript
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API 配置接口
export interface ApiConfig {
  baseURL: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

// 默认配置
export const defaultConfig: ApiConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
};

// 创建 Axios 实例
export const createApiInstance = (config: Partial<ApiConfig> = {}): AxiosInstance => {
  const finalConfig = { ...defaultConfig, ...config };
  
  const instance = axios.create({
    baseURL: finalConfig.baseURL,
    timeout: finalConfig.timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // 添加认证 token
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // 添加请求 ID 用于追踪
      config.headers['X-Request-ID'] = generateRequestId();
      
      // 记录请求日志
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
      
      return config;
    },
    (error) => {
      console.error('[API Request Error]', error);
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response) => {
      console.log(`[API Response] ${response.status} ${response.config.url}`);
      return response;
    },
    (error) => {
      console.error('[API Response Error]', error);
      
      // 处理认证错误
      if (error.response?.status === 401) {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};
```

### 2. API 服务定义

#### 通用接口定义 (`src/services/api/types.ts`)
```typescript
// 基础响应接口
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  code?: string;
}

// 分页响应接口
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 请求参数接口
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  category?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}
```

#### API 服务实现 (`src/services/api/index.ts`)
```typescript
import { createApiInstance } from './config';
import { ApiResponse, PaginatedResponse, PaginationParams, FilterParams } from './types';

const api = createApiInstance();

// 新闻相关 API
export const newsApi = {
  // 获取新闻列表
  getNews: async (params: PaginationParams & FilterParams): Promise<PaginatedResponse<NewsItem>> => {
    const response = await api.get('/news', { params });
    return response.data;
  },

  // 获取新闻详情
  getNewsById: async (id: string): Promise<ApiResponse<NewsItem>> => {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },

  // 创建新闻
  createNews: async (data: Partial<NewsItem>): Promise<ApiResponse<NewsItem>> => {
    const response = await api.post('/news', data);
    return response.data;
  },

  // 更新新闻
  updateNews: async (id: string, data: Partial<NewsItem>): Promise<ApiResponse<NewsItem>> => {
    const response = await api.put(`/news/${id}`, data);
    return response.data;
  },

  // 删除新闻
  deleteNews: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/news/${id}`);
    return response.data;
  },
};

// 频道相关 API
export const channelApi = {
  getChannels: async (): Promise<ApiResponse<Channel[]>> => {
    const response = await api.get('/channels');
    return response.data;
  },

  getChannelById: async (id: string): Promise<ApiResponse<Channel>> => {
    const response = await api.get(`/channels/${id}`);
    return response.data;
  },
};

// 用户相关 API
export const userApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },
};
```

### 3. React Query 集成

#### Hooks 定义 (`src/hooks/api/useNews.ts`)
```typescript
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { newsApi } from '@/services/api';
import { toast } from 'react-hot-toast';

// 查询键
export const newsKeys = {
  all: ['news'] as const,
  lists: () => [...newsKeys.all, 'list'] as const,
  list: (filters: any) => [...newsKeys.lists(), filters] as const,
  details: () => [...newsKeys.all, 'detail'] as const,
  detail: (id: string) => [...newsKeys.details(), id] as const,
};

// 获取新闻列表
export const useNews = (params: PaginationParams & FilterParams) => {
  return useQuery(
    newsKeys.list(params),
    () => newsApi.getNews(params),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5分钟
      cacheTime: 10 * 60 * 1000, // 10分钟
      onError: (error) => {
        toast.error('获取新闻列表失败');
        console.error('News fetch error:', error);
      },
    }
  );
};

// 获取新闻详情
export const useNewsDetail = (id: string) => {
  return useQuery(
    newsKeys.detail(id),
    () => newsApi.getNewsById(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
      onError: (error) => {
        toast.error('获取新闻详情失败');
        console.error('News detail fetch error:', error);
      },
    }
  );
};

// 创建新闻
export const useCreateNews = () => {
  const queryClient = useQueryClient();

  return useMutation(newsApi.createNews, {
    onSuccess: () => {
      queryClient.invalidateQueries(newsKeys.lists());
      toast.success('新闻创建成功');
    },
    onError: (error) => {
      toast.error('新闻创建失败');
      console.error('News creation error:', error);
    },
  });
};
```

## 中间件 (Middleware)

### 1. 错误处理中间件

```typescript
// 错误处理中间件 (`src/middleware/errorHandler.ts`)
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export const handleApiError = (error: AxiosError): ApiError => {
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
    apiError.message = '网络连接失败';
  } else {
    apiError.message = error.message || '未知错误';
  }

  return apiError;
};

// 客户端错误处理
export const handleClientError = (error: Error, context?: string) => {
  console.error(`[Client Error${context ? ` - ${context}` : ''}]:`, error);
  
  // 根据错误类型显示不同的提示
  if (error.name === 'ChunkLoadError') {
    toast.error('应用更新，请刷新页面');
  } else if (error.name === 'NetworkError') {
    toast.error('网络连接失败，请检查网络');
  } else {
    toast.error('操作失败，请稍后重试');
  }
};
```

### 2. 重试中间件

```typescript
// 重试中间件 (`src/middleware/retry.ts`)
export interface RetryOptions {
  attempts: number;
  delay: number;
  backoff: boolean;
  retryCondition?: (error: any) => boolean;
}

export const withRetry = async <T>(
  fn: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> => {
  const {
    attempts = 3,
    delay = 1000,
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
```

### 3. 缓存中间件

```typescript
// 缓存中间件 (`src/middleware/cache.ts`)
export class CacheMiddleware {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttl: number = 5 * 60 * 1000) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  clear() {
    this.cache.clear();
  }

  // 装饰器模式
  withCache<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    keyGenerator: (...args: Parameters<T>) => string,
    ttl?: number
  ): T {
    return (async (...args: Parameters<T>) => {
      const key = keyGenerator(...args);
      const cached = this.get(key);
      
      if (cached) {
        return cached;
      }
      
      const result = await fn(...args);
      this.set(key, result, ttl);
      
      return result;
    }) as T;
  }
}

export const cacheMiddleware = new CacheMiddleware();
```

### 4. 防抖和节流中间件

```typescript
// 防抖节流中间件 (`src/middleware/throttle.ts`)
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};
```

## 多语言 (Internationalization)

### 1. 基础配置

#### i18n 配置 (`src/i18n/index.ts`)
```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入翻译文件
import zhCN from './locales/zh-CN.json';
import enUS from './locales/en-US.json';

const resources = {
  'zh-CN': { translation: zhCN },
  'en-US': { translation: enUS },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh-CN',
    debug: process.env.NODE_ENV === 'development',
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    interpolation: {
      escapeValue: false,
    },
    
    // 命名空间配置
    defaultNS: 'translation',
    ns: ['translation'],
  });

export default i18n;
```

### 2. 翻译文件结构

#### 中文翻译 (`src/i18n/locales/zh-CN.json`)
```json
{
  "common": {
    "loading": "加载中...",
    "error": "错误",
    "success": "成功",
    "confirm": "确认",
    "cancel": "取消",
    "save": "保存",
    "delete": "删除",
    "edit": "编辑",
    "search": "搜索",
    "filter": "筛选",
    "sort": "排序",
    "more": "更多"
  },
  "navigation": {
    "home": "首页",
    "trending": "热门",
    "channels": "频道",
    "bookmarks": "收藏",
    "profile": "个人资料",
    "settings": "设置"
  },
  "news": {
    "title": "新闻",
    "readMore": "阅读更多",
    "share": "分享",
    "like": "点赞",
    "bookmark": "收藏",
    "views": "{{count}} 次浏览",
    "likes": "{{count}} 个赞",
    "publishedAt": "发布于 {{date}}",
    "category": {
      "all": "全部",
      "tech": "科技",
      "business": "商业",
      "startup": "创业"
    }
  },
  "errors": {
    "network": "网络连接失败",
    "server": "服务器错误",
    "notFound": "页面未找到",
    "unauthorized": "未授权访问",
    "forbidden": "访问被禁止",
    "validation": "输入验证失败"
  },
  "time": {
    "now": "刚刚",
    "minutesAgo": "{{count}} 分钟前",
    "hoursAgo": "{{count}} 小时前",
    "daysAgo": "{{count}} 天前",
    "weeksAgo": "{{count}} 周前",
    "monthsAgo": "{{count}} 个月前",
    "yearsAgo": "{{count}} 年前"
  }
}
```

### 3. 使用最佳实践

#### Hook 封装 (`src/hooks/useTranslation.ts`)
```typescript
import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = (namespace?: string) => {
  const { t, i18n } = useI18nTranslation(namespace);
  
  // 扩展功能
  const formatTime = (date: Date | string) => {
    const now = new Date();
    const target = new Date(date);
    const diff = now.getTime() - target.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return t('time.now');
    if (minutes < 60) return t('time.minutesAgo', { count: minutes });
    if (hours < 24) return t('time.hoursAgo', { count: hours });
    return t('time.daysAgo', { count: days });
  };
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(i18n.language).format(num);
  };
  
  return {
    t,
    i18n,
    formatTime,
    formatNumber,
    currentLanguage: i18n.language,
    changeLanguage: i18n.changeLanguage,
  };
};
```

#### 组件中的使用
```typescript
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export const NewsCard: React.FC<{ news: NewsItem }> = ({ news }) => {
  const { t, formatTime, formatNumber } = useTranslation();
  
  return (
    <div className="news-card">
      <h3>{news.title}</h3>
      <p>{news.summary}</p>
      <div className="news-meta">
        <span>{formatTime(news.publishedAt)}</span>
        <span>{t('news.views', { count: formatNumber(news.views) })}</span>
        <span>{t('news.likes', { count: formatNumber(news.likes) })}</span>
      </div>
    </div>
  );
};
```

## 错误处理

### 1. 全局错误边界

```typescript
// 错误边界组件 (`src/components/ErrorBoundary.tsx`)
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // 发送错误报告到监控服务
    this.reportError(error, errorInfo);
  }

  reportError = (error: Error, errorInfo: ErrorInfo) => {
    // 集成错误监控服务 (如 Sentry)
    if (process.env.NODE_ENV === 'production') {
      // Sentry.captureException(error, { extra: errorInfo });
    }
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

const ErrorFallback: React.FC<{ error?: Error }> = ({ error }) => {
  const { t } = useTranslation();
  
  return (
    <div className="error-fallback">
      <h2>{t('errors.general')}</h2>
      <p>{error?.message}</p>
      <button onClick={() => window.location.reload()}>
        {t('common.refresh')}
      </button>
    </div>
  );
};
```

### 2. API 错误处理策略

```typescript
// API 错误处理策略 (`src/utils/errorHandling.ts`)
export const getErrorMessage = (error: any, t: (key: string) => string): string => {
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;
    
    // 根据状态码返回对应的错误信息
    switch (status) {
      case 400:
        return data.message || t('errors.validation');
      case 401:
        return t('errors.unauthorized');
      case 403:
        return t('errors.forbidden');
      case 404:
        return t('errors.notFound');
      case 500:
        return t('errors.server');
      default:
        return data.message || t('errors.unknown');
    }
  } else if (error.request) {
    return t('errors.network');
  } else {
    return error.message || t('errors.unknown');
  }
};
```

## 性能优化

### 1. 请求优化

```typescript
// 请求去重 (`src/utils/requestDeduplication.ts`)
class RequestDeduplication {
  private pendingRequests = new Map<string, Promise<any>>();
  
  async dedupe<T>(key: string, requestFn: () => Promise<T>): Promise<T> {
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key);
    }
    
    const promise = requestFn().finally(() => {
      this.pendingRequests.delete(key);
    });
    
    this.pendingRequests.set(key, promise);
    return promise;
  }
}

export const requestDeduplication = new RequestDeduplication();
```

### 2. 缓存策略

```typescript
// 智能缓存策略 (`src/utils/cacheStrategy.ts`)
export const getCacheKey = (url: string, params?: any): string => {
  const paramString = params ? JSON.stringify(params) : '';
  return `${url}:${paramString}`;
};

export const getCacheTTL = (url: string): number => {
  // 根据 URL 类型设置不同的缓存时间
  if (url.includes('/news')) return 5 * 60 * 1000; // 5分钟
  if (url.includes('/channels')) return 30 * 60 * 1000; // 30分钟
  if (url.includes('/user')) return 10 * 60 * 1000; // 10分钟
  
  return 5 * 60 * 1000; // 默认5分钟
};
```

## 安全性

### 1. 请求安全

```typescript
// 请求安全配置 (`src/utils/security.ts`)
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // 移除潜在的 XSS 字符
    .trim()
    .slice(0, 1000); // 限制长度
};

export const validateApiResponse = (response: any): boolean => {
  // 验证响应结构
  return (
    typeof response === 'object' &&
    response !== null &&
    'success' in response &&
    'data' in response
  );
};
```

### 2. Token 管理

```typescript
// Token 管理 (`src/utils/tokenManager.ts`)
class TokenManager {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }
  
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
}

export const tokenManager = new TokenManager();
```

## 总结

这个最佳实践指南涵盖了：

1. **请求层**: 统一的 API 配置、类型定义、错误处理
2. **中间件**: 错误处理、重试机制、缓存、防抖节流
3. **多语言**: 完整的国际化解决方案
4. **错误处理**: 全局错误边界、API 错误处理
5. **性能优化**: 请求去重、智能缓存
6. **安全性**: 输入验证、Token 管理

使用这些模式可以构建一个健壮、可维护、高性能的前端应用。
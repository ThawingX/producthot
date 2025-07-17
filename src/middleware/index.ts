import { Request, Response, NextFunction } from 'express';
import { toast } from 'react-hot-toast';

// 错误处理中间件
export const errorHandler = (error: any, req?: Request, res?: Response, next?: NextFunction) => {
  console.error('Error caught by middleware:', error);

  // 客户端错误处理
  if (typeof window !== 'undefined') {
    if (error.response?.status === 401) {
      toast.error('认证失败，请重新登录');
      // 重定向到登录页
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      toast.error('权限不足');
    } else if (error.response?.status === 404) {
      toast.error('请求的资源不存在');
    } else if (error.response?.status >= 500) {
      toast.error('服务器错误，请稍后重试');
    } else if (error.code === 'NETWORK_ERROR') {
      toast.error('网络连接失败，请检查网络');
    } else {
      toast.error(error.message || '发生未知错误');
    }
  }

  // 服务端错误处理
  if (res) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: error.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

// 请求重试中间件
export const retryMiddleware = async (
  fn: () => Promise<any>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<any> => {
  let lastError: any;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // 如果是客户端错误（4xx），不重试
      if (error.response?.status >= 400 && error.response?.status < 500) {
        throw error;
      }
      
      // 最后一次重试失败
      if (i === maxRetries - 1) {
        throw error;
      }
      
      // 等待后重试
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
  
  throw lastError;
};

// 加载状态中间件
export const loadingMiddleware = (setLoading: (loading: boolean) => void) => {
  return async (fn: () => Promise<any>): Promise<any> => {
    try {
      setLoading(true);
      return await fn();
    } finally {
      setLoading(false);
    }
  };
};

// 缓存中间件
export class CacheMiddleware {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  set(key: string, data: any, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  // 缓存装饰器
  withCache(key: string, ttl?: number) {
    return (fn: () => Promise<any>) => {
      return async (): Promise<any> => {
        const cached = this.get(key);
        if (cached) {
          console.log('Cache hit:', key);
          return cached;
        }
        
        const result = await fn();
        this.set(key, result, ttl);
        console.log('Cache set:', key);
        return result;
      };
    };
  }
}

// 全局缓存实例
export const globalCache = new CacheMiddleware();

// 防抖中间件
export const debounceMiddleware = (fn: Function, delay: number = 300) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(null, args), delay);
  };
};

// 节流中间件
export const throttleMiddleware = (fn: Function, limit: number = 1000) => {
  let inThrottle: boolean;
  
  return (...args: any[]) => {
    if (!inThrottle) {
      fn.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// 权限检查中间件
export const authMiddleware = (requiredRole?: string) => {
  return (fn: () => Promise<any>) => {
    return async (): Promise<any> => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('未登录');
      }
      
      // 这里可以添加角色检查逻辑
      if (requiredRole) {
        const userRole = localStorage.getItem('user_role');
        if (userRole !== requiredRole) {
          throw new Error('权限不足');
        }
      }
      
      return await fn();
    };
  };
};

// 日志中间件
export const loggerMiddleware = (operation: string) => {
  return (fn: () => Promise<any>) => {
    return async (): Promise<any> => {
      const startTime = Date.now();
      console.log(`🚀 Starting ${operation}`);
      
      try {
        const result = await fn();
        const duration = Date.now() - startTime;
        console.log(`✅ ${operation} completed in ${duration}ms`);
        return result;
      } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`❌ ${operation} failed after ${duration}ms:`, error);
        throw error;
      }
    };
  };
};
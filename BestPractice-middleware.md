# 中间件最佳实践指南

## 目录
- [中间件设计原则](#中间件设计原则)
- [错误处理中间件](#错误处理中间件)
- [缓存中间件](#缓存中间件)
- [认证授权中间件](#认证授权中间件)
- [日志记录中间件](#日志记录中间件)
- [性能优化中间件](#性能优化中间件)
- [中间件组合](#中间件组合)

## 中间件设计原则

### 1. 单一职责原则
每个中间件应该只负责一个特定的功能。

```typescript
// ✅ 好的实践 - 单一职责
export const authMiddleware = (requiredRole?: string) => {
  return (fn: () => Promise<any>) => {
    return async (): Promise<any> => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('未登录');
      }
      
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

// ❌ 避免 - 职责过多
export const authAndLogMiddleware = () => {
  // 认证 + 日志 + 缓存 = 职责过多
};
```

### 2. 可组合性
中间件应该能够灵活组合使用。

```typescript
// 中间件组合示例
const enhancedApiCall = async () => {
  return await loggerMiddleware('API调用')(
    retryMiddleware(
      authMiddleware()(apiCall),
      3,
      1000
    )
  )();
};
```

### 3. 配置化
中间件应该支持配置参数。

```typescript
// 重试中间件配置
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
```

## 错误处理中间件

### 1. 通用错误处理
```typescript
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
```

### 2. 加载状态中间件
```typescript
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
```
          
          // 检查是否应该重试
          if (attempt === maxAttempts || !retryCondition(lastError)) {
            throw lastError;
          }
          
          // 计算延迟时间
          const delay = Math.min(
            baseDelay * Math.pow(backoffFactor, attempt - 1),
            maxDelay
          );
          
          console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
      
      throw lastError!;
    };
  };
};
```

## 请求拦截中间件

### 1. 请求预处理
```typescript
interface RequestConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  transformRequest?: (data: any) => any;
  transformResponse?: (data: any) => any;
}

export const requestInterceptorMiddleware = (config: RequestConfig = {}) => {
  return (fn: Function) => {
    return async (requestData: any, ...args: any[]) => {
      // 添加默认配置
      const enhancedData = {
        ...requestData,
        baseURL: config.baseURL || requestData.baseURL,
        timeout: config.timeout || requestData.timeout || 10000,
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': generateRequestId(),
          'X-Timestamp': Date.now().toString(),
          ...config.headers,
          ...requestData.headers,
        },
      };
      
      // 添加认证信息
      const token = getAuthToken();
      if (token) {
        enhancedData.headers.Authorization = `Bearer ${token}`;
      }
      
      // 请求数据转换
      if (config.transformRequest) {
        enhancedData.data = config.transformRequest(enhancedData.data);
      }
      
      // 请求日志
      console.log(`🚀 Request: ${enhancedData.method?.toUpperCase()} ${enhancedData.url}`);
      
      const response = await fn(enhancedData, ...args);
      
      // 响应数据转换
      if (config.transformResponse) {
        response.data = config.transformResponse(response.data);
      }
      
      // 响应日志
      console.log(`✅ Response: ${response.status} ${enhancedData.url}`);
      
      return response;
    };
  };
};
```

### 2. 响应拦截处理
```typescript
export const responseInterceptorMiddleware = () => {
  return (fn: Function) => {
    return async (...args: any[]) => {
      const response = await fn(...args);
      
      // 统一响应格式处理
      if (response.data && typeof response.data === 'object') {
        // 处理分页数据
        if (response.data.items && response.data.pagination) {
          return {
            ...response,
            data: {
              items: response.data.items,
              pagination: {
                page: response.data.pagination.page || 1,
                limit: response.data.pagination.limit || 10,
                total: response.data.pagination.total || 0,
                totalPages: Math.ceil((response.data.pagination.total || 0) / (response.data.pagination.limit || 10)),
              },
            },
          };
        }
        
        // 处理错误响应
        if (!response.data.success && response.data.error) {
          throw new Error(response.data.error.message || '请求失败');
        }
      }
      
      // 处理特殊状态码
      if (response.status === 401) {
        // 清除认证信息
        clearAuthToken();
        // 重定向到登录页
        window.location.href = '/login';
        throw new Error('认证失败，请重新登录');
      }
      
      if (response.status === 403) {
        throw new Error('权限不足');
      }
      
      return response;
    };
  };
};
```

## 缓存中间件

### 1. 简单缓存实现
```typescript
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

```

## 认证授权中间件

### 1. 权限检查中间件
```typescript
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
```

### 2. 使用示例
```typescript
// 需要登录的API调用
const fetchUserData = authMiddleware()(async () => {
  return await api.get('/user/profile');
});

// 需要管理员权限的API调用
const deleteUser = authMiddleware('admin')(async () => {
  return await api.delete('/user/123');
});
```

## 日志记录中间件

### 1. 日志中间件
```typescript
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
```

### 2. 使用示例
```typescript
// 带日志的API调用
const fetchNews = loggerMiddleware('获取新闻列表')(async () => {
  return await newsApi.getNews();
});
```

## 性能优化中间件

### 1. 防抖中间件
```typescript
// 防抖中间件
export const debounceMiddleware = (fn: Function, delay: number = 300) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(null, args), delay);
  };
};
```

### 2. 节流中间件
```typescript
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
```

### 3. 使用示例
```typescript
// 防抖搜索
const debouncedSearch = debounceMiddleware((query: string) => {
  console.log('搜索:', query);
}, 300);

// 节流滚动
const throttledScroll = throttleMiddleware(() => {
  console.log('滚动事件');
}, 100);
```

## 中间件组合

### 1. 组合使用示例
```typescript
// 组合多个中间件
const enhancedApiCall = async () => {
  return await loggerMiddleware('API调用')(
    loadingMiddleware(setLoading)(
      retryMiddleware(
        authMiddleware()(apiCall),
        3,
        1000
      )
    )
  )();
};
```

### 2. 最佳实践
```typescript
// 创建通用的API调用包装器
export const createApiWrapper = (
  operation: string,
  requireAuth: boolean = true,
  enableCache: boolean = false,
  cacheKey?: string
) => {
  return (apiCall: () => Promise<any>) => {
    let wrappedCall = apiCall;
    
    // 添加认证
    if (requireAuth) {
      wrappedCall = authMiddleware()(wrappedCall);
    }
    
    // 添加缓存
    if (enableCache && cacheKey) {
      wrappedCall = globalCache.withCache(cacheKey)(wrappedCall);
    }
    
    // 添加重试
    wrappedCall = () => retryMiddleware(wrappedCall, 3, 1000);
    
    // 添加日志
    wrappedCall = loggerMiddleware(operation)(wrappedCall);
    
    return wrappedCall;
  };
};

// 使用示例
const getNewsWithMiddleware = createApiWrapper(
  '获取新闻',
  true,
  true,
  'news-list'
)(async () => {
  return await newsApi.getNews();
});
```

## 总结

本项目的中间件设计遵循以下原则：

1. **简单实用**：实现简单但功能完整的中间件
2. **易于组合**：中间件可以灵活组合使用
3. **类型安全**：使用TypeScript确保类型安全
4. **性能优化**：包含缓存、防抖、节流等性能优化功能
5. **错误处理**：统一的错误处理和用户提示
6. **开发友好**：提供详细的日志和调试信息
```

### 2. 分布式缓存
```typescript
interface DistributedCacheConfig {
  redis?: {
    host: string;
    port: number;
    password?: string;
  };
  prefix?: string;
  serializer?: {
    serialize: (data: any) => string;
    deserialize: (data: string) => any;
  };
}

export class DistributedCache {
  private config: DistributedCacheConfig;
  private client: any; // Redis client
  
  constructor(config: DistributedCacheConfig) {
    this.config = config;
    // 初始化 Redis 客户端
    // this.client = new Redis(config.redis);
  }
  
  private getKey(key: string): string {
    return `${this.config.prefix || 'cache'}:${key}`;
  }
  
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.client.get(this.getKey(key));
      if (!data) return null;
      
      return this.config.serializer?.deserialize(data) || JSON.parse(data);
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }
  
  async set<T>(key: string, data: T, ttlSeconds: number = 300): Promise<void> {
    try {
      const serialized = this.config.serializer?.serialize(data) || JSON.stringify(data);
      await this.client.setex(this.getKey(key), ttlSeconds, serialized);
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }
  
  async delete(key: string): Promise<void> {
    try {
      await this.client.del(this.getKey(key));
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }
}
```

## 认证授权中间件

### 1. JWT 认证中间件
```typescript
interface AuthConfig {
  tokenKey?: string;
  refreshTokenKey?: string;
  loginUrl?: string;
  publicPaths?: string[];
}

export const authMiddleware = (config: AuthConfig = {}) => {
  const {
    tokenKey = 'auth_token',
    refreshTokenKey = 'refresh_token',
    loginUrl = '/login',
    publicPaths = ['/login', '/register', '/forgot-password']
  } = config;
  
  return (fn: Function) => {
    return async (...args: any[]) => {
      const currentPath = window.location.pathname;
      
      // 检查是否为公开路径
      if (publicPaths.includes(currentPath)) {
        return await fn(...args);
      }
      
      // 获取 token
      const token = localStorage.getItem(tokenKey);
      if (!token) {
        window.location.href = loginUrl;
        throw new Error('未登录');
      }
      
      // 验证 token
      try {
        const isValid = await validateToken(token);
        if (!isValid) {
          // 尝试刷新 token
          const refreshToken = localStorage.getItem(refreshTokenKey);
          if (refreshToken) {
            const newToken = await refreshAuthToken(refreshToken);
            localStorage.setItem(tokenKey, newToken);
          } else {
            throw new Error('Token 已过期');
          }
        }
      } catch (error) {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(refreshTokenKey);
        window.location.href = loginUrl;
        throw error;
      }
      
      return await fn(...args);
    };
  };
};

// 角色权限中间件
export const roleMiddleware = (requiredRoles: string[]) => {
  return (fn: Function) => {
    return async (...args: any[]) => {
      const userRoles = getCurrentUserRoles();
      
      const hasPermission = requiredRoles.some(role => userRoles.includes(role));
      if (!hasPermission) {
        throw new Error('权限不足');
      }
      
      return await fn(...args);
    };
  };
};
```

### 2. 权限检查中间件
```typescript
interface Permission {
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

export class PermissionChecker {
  private permissions: Map<string, Permission[]> = new Map();
  
  setUserPermissions(userId: string, permissions: Permission[]): void {
    this.permissions.set(userId, permissions);
  }
  
  hasPermission(userId: string, resource: string, action: string, context?: any): boolean {
    const userPermissions = this.permissions.get(userId) || [];
    
    return userPermissions.some(permission => {
      if (permission.resource !== resource || permission.action !== action) {
        return false;
      }
      
      // 检查条件
      if (permission.conditions && context) {
        return this.checkConditions(permission.conditions, context);
      }
      
      return true;
    });
  }
  
  private checkConditions(conditions: Record<string, any>, context: any): boolean {
    for (const [key, value] of Object.entries(conditions)) {
      if (context[key] !== value) {
        return false;
      }
    }
    return true;
  }
}

export const permissionMiddleware = (resource: string, action: string) => {
  const checker = new PermissionChecker();
  
  return (fn: Function) => {
    return async (context: any, ...args: any[]) => {
      const userId = getCurrentUserId();
      
      if (!checker.hasPermission(userId, resource, action, context)) {
        throw new Error(`权限不足: 无法对 ${resource} 执行 ${action} 操作`);
      }
      
      return await fn(context, ...args);
    };
  };
};
```

## 日志记录中间件

### 1. 结构化日志
```typescript
interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: number;
  operation?: string;
  userId?: string;
  requestId?: string;
  duration?: number;
  metadata?: Record<string, any>;
}

export class Logger {
  private transports: LogTransport[] = [];
  
  addTransport(transport: LogTransport): void {
    this.transports.push(transport);
  }
  
  async log(entry: LogEntry): Promise<void> {
    for (const transport of this.transports) {
      try {
        await transport.write(entry);
      } catch (error) {
        console.error('Log transport error:', error);
      }
    }
  }
  
  debug(message: string, metadata?: Record<string, any>): void {
    this.log({ level: 'debug', message, timestamp: Date.now(), metadata });
  }
  
  info(message: string, metadata?: Record<string, any>): void {
    this.log({ level: 'info', message, timestamp: Date.now(), metadata });
  }
  
  warn(message: string, metadata?: Record<string, any>): void {
    this.log({ level: 'warn', message, timestamp: Date.now(), metadata });
  }
  
  error(message: string, metadata?: Record<string, any>): void {
    this.log({ level: 'error', message, timestamp: Date.now(), metadata });
  }
}

// 日志中间件
export const loggerMiddleware = (operation: string, logger: Logger = new Logger()) => {
  return (fn: Function) => {
    return async (...args: any[]) => {
      const startTime = Date.now();
      const requestId = generateRequestId();
      
      logger.info(`开始执行: ${operation}`, {
        operation,
        requestId,
        args: args.length,
      });
      
      try {
        const result = await fn(...args);
        const duration = Date.now() - startTime;
        
        logger.info(`执行成功: ${operation}`, {
          operation,
          requestId,
          duration,
          success: true,
        });
        
        return result;
      } catch (error) {
        const duration = Date.now() - startTime;
        
        logger.error(`执行失败: ${operation}`, {
          operation,
          requestId,
          duration,
          error: error.message,
          stack: error.stack,
        });
        
        throw error;
      }
    };
  };
};
```

### 2. 日志传输器
```typescript
interface LogTransport {
  write(entry: LogEntry): Promise<void>;
}

// 控制台传输器
export class ConsoleTransport implements LogTransport {
  async write(entry: LogEntry): Promise<void> {
    const timestamp = new Date(entry.timestamp).toISOString();
    const message = `[${timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`;
    
    switch (entry.level) {
      case 'debug':
        console.debug(message, entry.metadata);
        break;
      case 'info':
        console.info(message, entry.metadata);
        break;
      case 'warn':
        console.warn(message, entry.metadata);
        break;
      case 'error':
        console.error(message, entry.metadata);
        break;
    }
  }
}

// 文件传输器
export class FileTransport implements LogTransport {
  private buffer: LogEntry[] = [];
  private flushInterval: NodeJS.Timeout;
  
  constructor(private maxBufferSize: number = 100, private flushIntervalMs: number = 5000) {
    this.flushInterval = setInterval(() => {
      this.flush();
    }, flushIntervalMs);
  }
  
  async write(entry: LogEntry): Promise<void> {
    this.buffer.push(entry);
    
    if (this.buffer.length >= this.maxBufferSize) {
      await this.flush();
    }
  }
  
  private async flush(): Promise<void> {
    if (this.buffer.length === 0) return;
    
    const entries = [...this.buffer];
    this.buffer = [];
    
    try {
      // 发送到日志服务
      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entries }),
      });
    } catch (error) {
      console.error('Failed to flush logs:', error);
      // 重新加入缓冲区
      this.buffer.unshift(...entries);
    }
  }
  
  destroy(): void {
    clearInterval(this.flushInterval);
    this.flush();
  }
}
```

## 性能监控中间件

### 1. 性能指标收集
```typescript
interface PerformanceMetrics {
  operation: string;
  duration: number;
  memoryUsage?: number;
  timestamp: number;
  success: boolean;
  errorType?: string;
}

export class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private observers: ((metrics: PerformanceMetrics) => void)[] = [];
  
  addObserver(observer: (metrics: PerformanceMetrics) => void): void {
    this.observers.push(observer);
  }
  
  recordMetrics(metrics: PerformanceMetrics): void {
    this.metrics.push(metrics);
    
    // 通知观察者
    this.observers.forEach(observer => {
      try {
        observer(metrics);
      } catch (error) {
        console.error('Performance observer error:', error);
      }
    });
    
    // 保持最近 1000 条记录
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }
  }
  
  getAverageTime(operation: string, timeRange: number = 60000): number {
    const now = Date.now();
    const recentMetrics = this.metrics.filter(
      m => m.operation === operation && (now - m.timestamp) <= timeRange
    );
    
    if (recentMetrics.length === 0) return 0;
    
    const totalTime = recentMetrics.reduce((sum, m) => sum + m.duration, 0);
    return totalTime / recentMetrics.length;
  }
  
  getSuccessRate(operation: string, timeRange: number = 60000): number {
    const now = Date.now();
    const recentMetrics = this.metrics.filter(
      m => m.operation === operation && (now - m.timestamp) <= timeRange
    );
    
    if (recentMetrics.length === 0) return 1;
    
    const successCount = recentMetrics.filter(m => m.success).length;
    return successCount / recentMetrics.length;
  }
}

// 性能监控中间件
export const performanceMiddleware = (
  operation: string,
  monitor: PerformanceMonitor = new PerformanceMonitor()
) => {
  return (fn: Function) => {
    return async (...args: any[]) => {
      const startTime = performance.now();
      const startMemory = (performance as any).memory?.usedJSHeapSize;
      
      try {
        const result = await fn(...args);
        const duration = performance.now() - startTime;
        const endMemory = (performance as any).memory?.usedJSHeapSize;
        
        monitor.recordMetrics({
          operation,
          duration,
          memoryUsage: endMemory - startMemory,
          timestamp: Date.now(),
          success: true,
        });
        
        return result;
      } catch (error) {
        const duration = performance.now() - startTime;
        
        monitor.recordMetrics({
          operation,
          duration,
          timestamp: Date.now(),
          success: false,
          errorType: error.constructor.name,
        });
        
        throw error;
      }
    };
  };
};
```

### 2. 性能告警
```typescript
interface AlertRule {
  metric: string;
  threshold: number;
  operator: 'gt' | 'lt' | 'eq';
  timeWindow: number;
  cooldown: number;
}

export class PerformanceAlerter {
  private rules: AlertRule[] = [];
  private lastAlerts: Map<string, number> = new Map();
  
  addRule(rule: AlertRule): void {
    this.rules.push(rule);
  }
  
  checkAlerts(metrics: PerformanceMetrics): void {
    for (const rule of this.rules) {
      if (this.shouldAlert(rule, metrics)) {
        this.sendAlert(rule, metrics);
      }
    }
  }
  
  private shouldAlert(rule: AlertRule, metrics: PerformanceMetrics): boolean {
    const now = Date.now();
    const lastAlert = this.lastAlerts.get(rule.metric) || 0;
    
    // 检查冷却时间
    if (now - lastAlert < rule.cooldown) {
      return false;
    }
    
    // 检查阈值
    const value = this.getMetricValue(rule.metric, metrics);
    switch (rule.operator) {
      case 'gt':
        return value > rule.threshold;
      case 'lt':
        return value < rule.threshold;
      case 'eq':
        return value === rule.threshold;
      default:
        return false;
    }
  }
  
  private getMetricValue(metric: string, metrics: PerformanceMetrics): number {
    switch (metric) {
      case 'duration':
        return metrics.duration;
      case 'memory':
        return metrics.memoryUsage || 0;
      default:
        return 0;
    }
  }
  
  private sendAlert(rule: AlertRule, metrics: PerformanceMetrics): void {
    console.warn(`Performance Alert: ${rule.metric} ${rule.operator} ${rule.threshold}`, metrics);
    this.lastAlerts.set(rule.metric, Date.now());
    
    // 发送到监控系统
    // sendToMonitoringSystem({ rule, metrics });
  }
}
```

## 限流中间件

### 1. 令牌桶算法
```typescript
export class TokenBucket {
  private tokens: number;
  private lastRefill: number;
  
  constructor(
    private capacity: number,
    private refillRate: number // tokens per second
  ) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }
  
  consume(tokens: number = 1): boolean {
    this.refill();
    
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    
    return false;
  }
  
  private refill(): void {
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000;
    const tokensToAdd = timePassed * this.refillRate;
    
    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }
  
  getAvailableTokens(): number {
    this.refill();
    return this.tokens;
  }
}

// 限流中间件
export const rateLimitMiddleware = (
  capacity: number,
  refillRate: number,
  keyGenerator?: (...args: any[]) => string
) => {
  const buckets = new Map<string, TokenBucket>();
  
  return (fn: Function) => {
    return async (...args: any[]) => {
      const key = keyGenerator ? keyGenerator(...args) : 'default';
      
      if (!buckets.has(key)) {
        buckets.set(key, new TokenBucket(capacity, refillRate));
      }
      
      const bucket = buckets.get(key)!;
      
      if (!bucket.consume()) {
        throw new Error('请求过于频繁，请稍后重试');
      }
      
      return await fn(...args);
    };
  };
};
```

### 2. 滑动窗口限流
```typescript
export class SlidingWindowRateLimit {
  private windows = new Map<string, number[]>();
  
  constructor(
    private windowSize: number, // 窗口大小（毫秒）
    private maxRequests: number // 最大请求数
  ) {}
  
  isAllowed(key: string): boolean {
    const now = Date.now();
    const window = this.windows.get(key) || [];
    
    // 清理过期的请求
    const validRequests = window.filter(timestamp => now - timestamp < this.windowSize);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    // 添加当前请求
    validRequests.push(now);
    this.windows.set(key, validRequests);
    
    return true;
  }
  
  getRemainingRequests(key: string): number {
    const now = Date.now();
    const window = this.windows.get(key) || [];
    const validRequests = window.filter(timestamp => now - timestamp < this.windowSize);
    
    return Math.max(0, this.maxRequests - validRequests.length);
  }
}
```

## 中间件组合

### 1. 中间件管道
```typescript
export class MiddlewarePipeline {
  private middlewares: Middleware[] = [];
  
  use(middleware: Middleware): this {
    this.middlewares.push(middleware);
    return this;
  }
  
  execute(fn: Function): Function {
    return this.middlewares.reduceRight((acc, middleware) => {
      return middleware(acc);
    }, fn);
  }
  
  // 条件中间件
  useIf(condition: boolean | (() => boolean), middleware: Middleware): this {
    const conditionalMiddleware: Middleware = (fn) => {
      return (...args) => {
        const shouldUse = typeof condition === 'function' ? condition() : condition;
        return shouldUse ? middleware(fn)(...args) : fn(...args);
      };
    };
    
    return this.use(conditionalMiddleware);
  }
  
  // 异步中间件
  useAsync(middleware: AsyncMiddleware): this {
    const asyncWrapper: Middleware = (fn) => {
      return async (...args) => {
        return await middleware(fn)(...args);
      };
    };
    
    return this.use(asyncWrapper);
  }
}

// 使用示例
const pipeline = new MiddlewarePipeline()
  .use(loggerMiddleware('API调用'))
  .use(authMiddleware())
  .useIf(process.env.NODE_ENV === 'development', performanceMiddleware('API调用'))
  .use(retryMiddleware({ maxAttempts: 3, baseDelay: 1000 }))
  .use(cacheMiddleware((url) => `api:${url}`, 5 * 60 * 1000));

const enhancedApiCall = pipeline.execute(originalApiCall);
```

### 2. 中间件工厂
```typescript
interface MiddlewareConfig {
  auth?: {
    required: boolean;
    roles?: string[];
  };
  cache?: {
    ttl: number;
    keyGenerator: (...args: any[]) => string;
  };
  rateLimit?: {
    capacity: number;
    refillRate: number;
  };
  retry?: {
    maxAttempts: number;
    baseDelay: number;
  };
  logging?: {
    operation: string;
    level: 'debug' | 'info' | 'warn' | 'error';
  };
}

export const createMiddlewareStack = (config: MiddlewareConfig) => {
  const pipeline = new MiddlewarePipeline();
  
  // 日志中间件
  if (config.logging) {
    pipeline.use(loggerMiddleware(config.logging.operation));
  }
  
  // 认证中间件
  if (config.auth?.required) {
    pipeline.use(authMiddleware());
    
    if (config.auth.roles) {
      pipeline.use(roleMiddleware(config.auth.roles));
    }
  }
  
  // 限流中间件
  if (config.rateLimit) {
    pipeline.use(rateLimitMiddleware(
      config.rateLimit.capacity,
      config.rateLimit.refillRate
    ));
  }
  
  // 缓存中间件
  if (config.cache) {
    pipeline.use(cacheMiddleware(
      config.cache.keyGenerator,
      config.cache.ttl
    ));
  }
  
  // 重试中间件
  if (config.retry) {
    pipeline.use(retryMiddleware({
      maxAttempts: config.retry.maxAttempts,
      baseDelay: config.retry.baseDelay,
    }));
  }
  
  // 错误处理中间件（总是最后）
  pipeline.use(errorHandlerMiddleware(config.logging?.operation || 'Unknown'));
  
  return pipeline;
};

// 使用示例
const apiMiddleware = createMiddlewareStack({
  auth: { required: true, roles: ['user'] },
  cache: { ttl: 5 * 60 * 1000, keyGenerator: (url) => `api:${url}` },
  rateLimit: { capacity: 100, refillRate: 10 },
  retry: { maxAttempts: 3, baseDelay: 1000 },
  logging: { operation: 'API调用', level: 'info' },
});

const enhancedApiCall = apiMiddleware.execute(originalApiCall);
```

这个中间件最佳实践指南涵盖了：
1. 中间件设计原则和架构
2. 错误处理和重试机制
3. 请求响应拦截处理
4. 缓存策略和实现
5. 认证授权机制
6. 日志记录和监控
7. 性能监控和告警
8. 限流和防护机制
9. 中间件组合和管道

这些实践可以帮助构建健壮、可扩展的中间件系统。
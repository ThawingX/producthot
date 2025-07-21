// 环境类型定义
export type Environment = 'development' | 'production' | 'staging';

// 环境配置接口
export interface EnvironmentConfig {
  // API配置
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
    retryDelay: number;
  };
  
  // 功能开关
  features: {
    enableDebugMode: boolean;
    enableAnalytics: boolean;
    enableErrorReporting: boolean;
    enableMockData: boolean;
  };
  
  // 日志配置
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    enableConsole: boolean;
    enableRemote: boolean;
  };
  
  // 性能配置
  performance: {
    enableCaching: boolean;
    cacheTimeout: number;
    enableLazyLoading: boolean;
  };
  
  // 安全配置
  security: {
    enableCSP: boolean;
    enableHTTPS: boolean;
    tokenExpiry: number;
  };
}

// 开发环境配置
const developmentConfig: EnvironmentConfig = {
  api: {
    baseUrl: 'http://api.producthot.top:8030',
    timeout: 15000,
    retryAttempts: 2,
    retryDelay: 1000,
  },
  features: {
    enableDebugMode: true,
    enableAnalytics: false,
    enableErrorReporting: false,
    enableMockData: false, // 禁用模拟数据，使用真实 API
  },
  logging: {
    level: 'debug',
    enableConsole: true,
    enableRemote: false,
  },
  performance: {
    enableCaching: false,
    cacheTimeout: 5 * 60 * 1000, // 5分钟
    enableLazyLoading: false,
  },
  security: {
    enableCSP: false,
    enableHTTPS: false,
    tokenExpiry: 24 * 60 * 60 * 1000, // 24小时
  },
};

// 预发布环境配置
const stagingConfig: EnvironmentConfig = {
  api: {
    baseUrl: 'https://staging-api.producthot.top',
    timeout: 12000,
    retryAttempts: 3,
    retryDelay: 1500,
  },
  features: {
    enableDebugMode: true,
    enableAnalytics: true,
    enableErrorReporting: true,
    enableMockData: false,
  },
  logging: {
    level: 'info',
    enableConsole: true,
    enableRemote: true,
  },
  performance: {
    enableCaching: true,
    cacheTimeout: 10 * 60 * 1000, // 10分钟
    enableLazyLoading: true,
  },
  security: {
    enableCSP: true,
    enableHTTPS: true,
    tokenExpiry: 12 * 60 * 60 * 1000, // 12小时
  },
};

// 生产环境配置
const productionConfig: EnvironmentConfig = {
  api: {
    baseUrl: 'https://api.producthot.top',
    timeout: 10000,
    retryAttempts: 3,
    retryDelay: 2000,
  },
  features: {
    enableDebugMode: false,
    enableAnalytics: true,
    enableErrorReporting: true,
    enableMockData: false,
  },
  logging: {
    level: 'error',
    enableConsole: false,
    enableRemote: true,
  },
  performance: {
    enableCaching: true,
    cacheTimeout: 30 * 60 * 1000, // 30分钟
    enableLazyLoading: true,
  },
  security: {
    enableCSP: true,
    enableHTTPS: true,
    tokenExpiry: 8 * 60 * 60 * 1000, // 8小时
  },
};

// 获取当前环境
export const getCurrentEnvironment = (): Environment => {
  const env = import.meta.env.MODE as Environment;
  
  // 验证环境值
  if (['development', 'production', 'staging'].includes(env)) {
    return env;
  }
  
  // 默认返回开发环境
  return 'development';
};

// 获取环境配置
export const getEnvironmentConfig = (): EnvironmentConfig => {
  const env = getCurrentEnvironment();
  
  switch (env) {
    case 'production':
      return productionConfig;
    case 'staging':
      return stagingConfig;
    case 'development':
    default:
      return developmentConfig;
  }
};

// 检查是否为开发环境
export const isDevelopment = (): boolean => {
  return getCurrentEnvironment() === 'development';
};

// 检查是否为生产环境
export const isProduction = (): boolean => {
  return getCurrentEnvironment() === 'production';
};

// 检查是否为预发布环境
export const isStaging = (): boolean => {
  return getCurrentEnvironment() === 'staging';
};

// 导出当前环境配置
export const config = getEnvironmentConfig();

// 环境信息
export const environmentInfo = {
  current: getCurrentEnvironment(),
  isDev: isDevelopment(),
  isProd: isProduction(),
  isStaging: isStaging(),
  config: config,
};

// 调试信息（仅在开发环境显示）
if (isDevelopment()) {
  console.log('🌍 Environment Info:', environmentInfo);
}
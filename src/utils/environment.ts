import { config, getCurrentEnvironment, isDevelopment, isProduction, isStaging } from '../config/environment';

/**
 * 环境工具类
 * 提供便捷的环境检查和配置获取方法
 */
export class EnvironmentUtils {
  /**
   * 获取当前环境名称
   */
  static getCurrentEnv() {
    return getCurrentEnvironment();
  }

  /**
   * 检查是否为开发环境
   */
  static isDev() {
    return isDevelopment();
  }

  /**
   * 检查是否为生产环境
   */
  static isProd() {
    return isProduction();
  }

  /**
   * 检查是否为预发布环境
   */
  static isStaging() {
    return isStaging();
  }

  /**
   * 获取API基础URL
   */
  static getApiBaseUrl() {
    return config.api.baseUrl;
  }

  /**
   * 检查是否启用调试模式
   */
  static isDebugEnabled() {
    return config.features.enableDebugMode;
  }

  /**
   * 检查是否启用分析
   */
  static isAnalyticsEnabled() {
    return config.features.enableAnalytics;
  }

  /**
   * 检查是否启用错误报告
   */
  static isErrorReportingEnabled() {
    return config.features.enableErrorReporting;
  }

  /**
   * 检查是否启用模拟数据
   */
  static isMockDataEnabled() {
    return config.features.enableMockData;
  }

  /**
   * 获取日志级别
   */
  static getLogLevel() {
    return config.logging.level;
  }

  /**
   * 检查是否启用控制台日志
   */
  static isConsoleLogEnabled() {
    return config.logging.enableConsole;
  }

  /**
   * 检查是否启用远程日志
   */
  static isRemoteLogEnabled() {
    return config.logging.enableRemote;
  }

  /**
   * 检查是否启用缓存
   */
  static isCachingEnabled() {
    return config.performance.enableCaching;
  }

  /**
   * 获取缓存超时时间
   */
  static getCacheTimeout() {
    return config.performance.cacheTimeout;
  }

  /**
   * 检查是否启用懒加载
   */
  static isLazyLoadingEnabled() {
    return config.performance.enableLazyLoading;
  }

  /**
   * 获取Token过期时间
   */
  static getTokenExpiry() {
    return config.security.tokenExpiry;
  }

  /**
   * 检查是否启用HTTPS
   */
  static isHttpsEnabled() {
    return config.security.enableHTTPS;
  }

  /**
   * 检查是否启用CSP
   */
  static isCSPEnabled() {
    return config.security.enableCSP;
  }

  /**
   * 获取完整的环境配置
   */
  static getConfig() {
    return config;
  }

  /**
   * 根据环境执行不同的逻辑
   */
  static runByEnvironment<T>(handlers: {
    development?: () => T;
    production?: () => T;
    staging?: () => T;
    default?: () => T;
  }): T | undefined {
    const env = getCurrentEnvironment();
    
    if (handlers[env]) {
      return handlers[env]!();
    }
    
    if (handlers.default) {
      return handlers.default();
    }
    
    return undefined;
  }

  /**
   * 条件日志记录（仅在启用控制台日志时记录）
   */
  static log(level: 'debug' | 'info' | 'warn' | 'error', message: string, ...args: any[]) {
    if (!this.isConsoleLogEnabled()) {
      return;
    }

    const currentLevel = this.getLogLevel();
    const levels = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(currentLevel);
    const messageLevelIndex = levels.indexOf(level);

    if (messageLevelIndex >= currentLevelIndex) {
      console[level](`[${this.getCurrentEnv().toUpperCase()}] ${message}`, ...args);
    }
  }

  /**
   * 调试日志
   */
  static debug(message: string, ...args: any[]) {
    this.log('debug', message, ...args);
  }

  /**
   * 信息日志
   */
  static info(message: string, ...args: any[]) {
    this.log('info', message, ...args);
  }

  /**
   * 警告日志
   */
  static warn(message: string, ...args: any[]) {
    this.log('warn', message, ...args);
  }

  /**
   * 错误日志
   */
  static error(message: string, ...args: any[]) {
    this.log('error', message, ...args);
  }

  /**
   * 获取环境变量值
   */
  static getEnvVar(key: string, defaultValue?: string): string | undefined {
    return import.meta.env[key] || defaultValue;
  }

  /**
   * 获取应用信息
   */
  static getAppInfo() {
    return {
      name: this.getEnvVar('VITE_APP_NAME', 'ProductHot'),
      version: this.getEnvVar('VITE_APP_VERSION', '1.0.0'),
      description: this.getEnvVar('VITE_APP_DESCRIPTION', 'AI-powered product insights platform'),
      environment: this.getCurrentEnv(),
    };
  }
}

// 导出便捷的别名
export const env = EnvironmentUtils;
export default EnvironmentUtils;
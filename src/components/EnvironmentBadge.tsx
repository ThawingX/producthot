import React from 'react';
import { EnvironmentUtils } from '../utils/environment';

interface EnvironmentBadgeProps {
  className?: string;
  showDetails?: boolean;
}

/**
 * 环境状态显示组件
 * 在非生产环境下显示当前环境信息
 */
export const EnvironmentBadge: React.FC<EnvironmentBadgeProps> = ({
  className = '',
  showDetails = false
}) => {
  // 生产环境下不显示
  if (EnvironmentUtils.isProd()) {
    return null;
  }

  const env = EnvironmentUtils.getCurrentEnv();
  const appInfo = EnvironmentUtils.getAppInfo();

  const getBadgeColor = () => {
    switch (env) {
      case 'development':
        return 'bg-green-500 text-white';
      case 'staging':
        return 'bg-yellow-500 text-black';
      case 'production':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getEnvironmentIcon = () => {
    switch (env) {
      case 'development':
        return '🔧';
      case 'staging':
        return '🚧';
      case 'production':
        return '🚀';
      default:
        return '❓';
    }
  };

  if (showDetails) {
    return (
      <div className={`fixed top-4 right-4 z-50 ${className}`}>
        <div className={`px-3 py-2 rounded-lg text-sm font-medium ${getBadgeColor()} shadow-lg`}>
          <div className="flex items-center gap-2 mb-1">
            <span>{getEnvironmentIcon()}</span>
            <span className="font-bold">{env.toUpperCase()}</span>
          </div>
          <div className="text-xs opacity-90">
            <div>API: {EnvironmentUtils.getApiBaseUrl()}</div>
            <div>Version: {appInfo.version}</div>
            <div>Debug: {EnvironmentUtils.isDebugEnabled() ? 'ON' : 'OFF'}</div>
            <div>Mock: {EnvironmentUtils.isMockDataEnabled() ? 'ON' : 'OFF'}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed top-4 right-4 z-50 ${className}`}>
      <div className={`px-2 py-1 rounded text-xs font-medium ${getBadgeColor()} shadow-lg flex items-center gap-1`}>
        <span>{getEnvironmentIcon()}</span>
        <span>{env.toUpperCase()}</span>
      </div>
    </div>
  );
};

/**
 * 环境信息面板组件
 * 显示详细的环境配置信息
 */
export const EnvironmentPanel: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // 生产环境下不显示
  if (EnvironmentUtils.isProd()) {
    return null;
  }

  const config = EnvironmentUtils.getConfig();
  const appInfo = EnvironmentUtils.getAppInfo();

  return (
    <>
      {/* 触发按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 z-50 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors ${className}`}
        title="环境信息"
      >
        ⚙️
      </button>

      {/* 信息面板 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-auto shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">环境配置信息</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* 应用信息 */}
              <div>
                <h3 className="font-semibold text-lg mb-2">应用信息</h3>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><strong>名称:</strong> {appInfo.name}</div>
                    <div><strong>版本:</strong> {appInfo.version}</div>
                    <div><strong>环境:</strong> {appInfo.environment}</div>
                    <div><strong>描述:</strong> {appInfo.description}</div>
                  </div>
                </div>
              </div>

              {/* API 配置 */}
              <div>
                <h3 className="font-semibold text-lg mb-2">API 配置</h3>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-sm">
                    <div><strong>基础URL:</strong> {config.api.baseUrl}</div>
                    <div><strong>超时时间:</strong> {config.api.timeout}ms</div>
                    <div><strong>重试次数:</strong> {config.api.retryAttempts}</div>
                    <div><strong>重试延迟:</strong> {config.api.retryDelay}ms</div>
                  </div>
                </div>
              </div>

              {/* 功能开关 */}
              <div>
                <h3 className="font-semibold text-lg mb-2">功能开关</h3>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><strong>调试模式:</strong> {config.features.enableDebugMode ? '✅' : '❌'}</div>
                    <div><strong>分析统计:</strong> {config.features.enableAnalytics ? '✅' : '❌'}</div>
                    <div><strong>错误报告:</strong> {config.features.enableErrorReporting ? '✅' : '❌'}</div>
                    <div><strong>模拟数据:</strong> {config.features.enableMockData ? '✅' : '❌'}</div>
                  </div>
                </div>
              </div>

              {/* 日志配置 */}
              <div>
                <h3 className="font-semibold text-lg mb-2">日志配置</h3>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><strong>日志级别:</strong> {config.logging.level}</div>
                    <div><strong>控制台日志:</strong> {config.logging.enableConsole ? '✅' : '❌'}</div>
                    <div><strong>远程日志:</strong> {config.logging.enableRemote ? '✅' : '❌'}</div>
                  </div>
                </div>
              </div>

              {/* 性能配置 */}
              <div>
                <h3 className="font-semibold text-lg mb-2">性能配置</h3>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><strong>缓存:</strong> {config.performance.enableCaching ? '✅' : '❌'}</div>
                    <div><strong>缓存超时:</strong> {config.performance.cacheTimeout}ms</div>
                    <div><strong>懒加载:</strong> {config.performance.enableLazyLoading ? '✅' : '❌'}</div>
                  </div>
                </div>
              </div>

              {/* 安全配置 */}
              <div>
                <h3 className="font-semibold text-lg mb-2">安全配置</h3>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><strong>HTTPS:</strong> {config.security.enableHTTPS ? '✅' : '❌'}</div>
                    <div><strong>CSP:</strong> {config.security.enableCSP ? '✅' : '❌'}</div>
                    <div><strong>Token过期:</strong> {config.security.tokenExpiry}ms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnvironmentBadge;
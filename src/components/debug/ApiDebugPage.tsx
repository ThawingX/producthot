import React, { useState } from 'react';
import { debugProjectApis, ApiDebugger, ApiDebugResult } from '../utils/apiDebugger';

export const ApiDebugPage: React.FC = () => {
  const [isDebugging, setIsDebugging] = useState(false);
  const [debugResults, setDebugResults] = useState<Record<string, ApiDebugResult> | null>(null);
  const [customUrl, setCustomUrl] = useState('');
  const [customResult, setCustomResult] = useState<ApiDebugResult | null>(null);

  const handleDebugProject = async () => {
    setIsDebugging(true);
    try {
      const { results } = await debugProjectApis();
      setDebugResults(results);
    } catch (error) {
      console.error('调试失败:', error);
    } finally {
      setIsDebugging(false);
    }
  };

  const handleDebugCustomUrl = async () => {
    if (!customUrl) return;
    
    setIsDebugging(true);
    try {
      const result = await ApiDebugger.debugEndpoint(customUrl);
      setCustomResult(result);
    } catch (error) {
      console.error('自定义URL调试失败:', error);
    } finally {
      setIsDebugging(false);
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600';
    if (status >= 300 && status < 400) return 'text-yellow-600';
    if (status >= 400) return 'text-red-600';
    return 'text-gray-600';
  };

  const renderResult = (name: string, result: ApiDebugResult) => (
    <div key={name} className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <h3 className="font-semibold text-lg mb-2">{name}</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">URL:</span> {result.url}
        </div>
        <div>
          <span className="font-medium">方法:</span> {result.method}
        </div>
        <div>
          <span className="font-medium">状态码:</span> 
          <span className={`ml-1 font-bold ${getStatusColor(result.status)}`}>
            {result.status} {result.statusText}
          </span>
        </div>
        <div>
          <span className="font-medium">响应时间:</span> {result.responseTime}ms
        </div>
      </div>
      
      {result.redirects.length > 0 && (
        <div className="mt-3">
          <span className="font-medium text-yellow-600">重定向链:</span>
          <ul className="list-disc list-inside ml-4 mt-1">
            {result.redirects.map((redirect, index) => (
              <li key={index} className="text-sm">
                <span className="font-mono text-yellow-600">{redirect.status}</span>: 
                <span className="ml-1">{redirect.from}</span> → 
                <span className="ml-1 font-medium">{redirect.to}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {result.error && (
        <div className="mt-3">
          <span className="font-medium text-red-600">错误:</span>
          <div className="text-sm text-red-500 mt-1">{result.error}</div>
        </div>
      )}
      
      <div className="mt-3">
        <span className="font-medium">最终URL:</span>
        <div className="text-sm font-mono bg-gray-100 p-2 rounded mt-1">{result.finalUrl}</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">API 调试工具</h1>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">项目API端点调试</h2>
          <button
            onClick={handleDebugProject}
            disabled={isDebugging}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg"
          >
            {isDebugging ? '调试中...' : '开始调试项目API'}
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">自定义URL调试</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="输入要调试的URL..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
            />
            <button
              onClick={handleDebugCustomUrl}
              disabled={isDebugging || !customUrl}
              className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-lg"
            >
              调试
            </button>
          </div>
        </div>

        {/* 项目API调试结果 */}
        {debugResults && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">项目API调试结果</h2>
            {Object.entries(debugResults).map(([name, result]) => 
              renderResult(name, result)
            )}
          </div>
        )}

        {/* 自定义URL调试结果 */}
        {customResult && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">自定义URL调试结果</h2>
            {renderResult('自定义URL', customResult)}
          </div>
        )}

        {/* 调试说明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">调试说明</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>2xx状态码</strong>: 请求成功</li>
            <li>• <strong>3xx状态码</strong>: 重定向（307是临时重定向）</li>
            <li>• <strong>4xx状态码</strong>: 客户端错误</li>
            <li>• <strong>5xx状态码</strong>: 服务器错误</li>
            <li>• 如果看到307重定向，检查重定向链中的目标URL</li>
            <li>• 常见的307原因：HTTP→HTTPS重定向、URL路径不匹配</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApiDebugPage;
import axios from 'axios';
import { EnvironmentUtils } from './environment';

export interface ApiDebugResult {
  url: string;
  method: string;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  redirects: Array<{
    from: string;
    to: string;
    status: number;
  }>;
  finalUrl: string;
  responseTime: number;
  error?: string;
}

/**
 * API调试工具 - 用于诊断307重定向问题
 */
export class ApiDebugger {
  /**
   * 测试API端点并跟踪重定向
   */
  static async debugEndpoint(url: string, options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    data?: any;
    followRedirects?: boolean;
  } = {}): Promise<ApiDebugResult> {
    const {
      method = 'GET',
      headers = {},
      data,
      followRedirects = false
    } = options;

    const startTime = Date.now();
    const redirects: Array<{ from: string; to: string; status: number }> = [];
    let finalUrl = url;
    let currentUrl = url;

    try {
      // 创建专门用于调试的axios实例
      const debugClient = axios.create({
        maxRedirects: followRedirects ? 5 : 0,
        validateStatus: () => true, // 接受所有状态码
        timeout: 10000,
      });

      // 添加请求拦截器来跟踪重定向
      debugClient.interceptors.request.use((config) => {
        console.log(`🔍 [API Debug] 发送请求: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      });

      // 添加响应拦截器来跟踪重定向
      debugClient.interceptors.response.use((response) => {
        const isRedirect = response.status >= 300 && response.status < 400;
        
        if (isRedirect) {
          const location = response.headers.location;
          if (location) {
            redirects.push({
              from: currentUrl,
              to: location,
              status: response.status
            });
            currentUrl = location;
            console.log(`🔄 [API Debug] 重定向 ${response.status}: ${currentUrl} -> ${location}`);
          }
        }

        return response;
      });

      const response = await debugClient.request({
        url: currentUrl,
        method,
        headers: {
          'User-Agent': 'ProductHot-Debugger/1.0',
          'Accept': 'application/json, text/plain, */*',
          ...headers
        },
        data
      });

      finalUrl = response.config.url || currentUrl;
      const responseTime = Date.now() - startTime;

      const result: ApiDebugResult = {
        url,
        method,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers as Record<string, string>,
        redirects,
        finalUrl,
        responseTime
      };

      console.log('🔍 [API Debug] 调试结果:', result);
      return result;

    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      const result: ApiDebugResult = {
        url,
        method,
        status: error.response?.status || 0,
        statusText: error.response?.statusText || 'Network Error',
        headers: error.response?.headers || {},
        redirects,
        finalUrl,
        responseTime,
        error: error.message
      };

      console.error('❌ [API Debug] 调试错误:', result);
      return result;
    }
  }

  /**
   * 批量测试多个端点
   */
  static async debugMultipleEndpoints(endpoints: Array<{
    name: string;
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
  }>): Promise<Record<string, ApiDebugResult>> {
    const results: Record<string, ApiDebugResult> = {};

    console.log('🔍 [API Debug] 开始批量测试...');

    for (const endpoint of endpoints) {
      console.log(`🔍 [API Debug] 测试端点: ${endpoint.name}`);
      try {
        results[endpoint.name] = await this.debugEndpoint(endpoint.url, {
          method: endpoint.method,
          headers: endpoint.headers
        });
      } catch (error) {
        console.error(`❌ [API Debug] 测试失败: ${endpoint.name}`, error);
      }
    }

    return results;
  }

  /**
   * 生成调试报告
   */
  static generateReport(results: Record<string, ApiDebugResult>): string {
    let report = '# API 调试报告\n\n';
    
    for (const [name, result] of Object.entries(results)) {
      report += `## ${name}\n`;
      report += `- **URL**: ${result.url}\n`;
      report += `- **方法**: ${result.method}\n`;
      report += `- **状态码**: ${result.status} ${result.statusText}\n`;
      report += `- **响应时间**: ${result.responseTime}ms\n`;
      
      if (result.redirects.length > 0) {
        report += `- **重定向链**:\n`;
        result.redirects.forEach((redirect, index) => {
          report += `  ${index + 1}. ${redirect.status}: ${redirect.from} → ${redirect.to}\n`;
        });
      }
      
      if (result.error) {
        report += `- **错误**: ${result.error}\n`;
      }
      
      report += `- **最终URL**: ${result.finalUrl}\n\n`;
    }
    
    return report;
  }
}

/**
 * 快速调试当前项目的API端点
 */
export async function debugProjectApis() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || EnvironmentUtils.getApiBaseUrl();
  
  const endpoints = [
    {
      name: 'News API (直接访问)',
      url: `${baseUrl}/api/news/`,
      method: 'GET' as const
    },
    {
      name: 'News API (无api前缀)',
      url: `${baseUrl}/news`,
      method: 'GET' as const
    },
    {
      name: 'Root API',
      url: baseUrl,
      method: 'GET' as const
    },
    {
      name: 'Health Check',
      url: `${baseUrl}/health`,
      method: 'GET' as const
    }
  ];

  console.log('🔍 开始调试项目API端点...');
  const results = await ApiDebugger.debugMultipleEndpoints(endpoints);
  
  const report = ApiDebugger.generateReport(results);
  console.log(report);
  
  return { results, report };
}
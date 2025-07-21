import { apiClient } from './config';
import { mockApiResponse } from '../../data/mockNews';

// 新闻相关接口
export interface NewsPost {
  title: string;
  url: string;
  description: string;
  upvotes: number;
}

export interface NewsSource {
  title: string;
  logo: string;
  update_time: string;
  posts: NewsPost[];
}

export interface NewsResponse {
  new_products: NewsSource[];
  reddits: NewsSource[];
  trendings: NewsSource[];
}

// 新闻项目接口 - HomePage中使用
export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  link: string;
  date: string;
  views: number;
  likes: number;
  category?: string;
  tags?: string[];
}

// 频道接口 - HomePage中使用
export interface Channel {
  id: string;
  name: string;
  icon: string;
  updateTime: string;
  articles: NewsItem[];
  color: string;
  bgGradient: string;
  description?: string;
  isActive?: boolean;
}

// 通用API响应接口
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  code?: number;
}

// 新闻相关API - 只保留实际使用的接口
export const newsApi = {
  // 获取新闻数据 - 唯一实际使用的接口
  getNews: async (params?: {
    lang?: 'zh' | 'en';
  }): Promise<ApiResponse<NewsResponse>> => {
    try {
      console.log('🔄 调用 getNews API，参数:', params);
      
      const response = await apiClient.get('/api/news', { 
        params: {
          lang: params?.lang || 'zh' // 默认使用中文
        }
      });
      
      console.log('✅ getNews API 响应:', response.data);
      
      // 根据 Apifox 接口定义，API 直接返回 NewsResponse 格式
      // 需要包装成 ApiResponse 格式
      const newsData: NewsResponse = response.data;
      
      return {
        success: true,
        data: newsData,
        message: 'success'
      };
    } catch (error: any) {
      console.error('❌ getNews API 错误:', error);
      
      // 如果是开发环境且API调用失败，返回模拟数据
      if (import.meta.env.DEV) {
        console.log('🔄 开发环境API调用失败，使用模拟数据');
        return mockApiResponse;
      }
      
      throw error;
    }
  },

  // 点赞新闻 - 在HomePage中使用，但实际可能不需要真实API调用
  likeNews: async (id: number): Promise<ApiResponse<{ liked: boolean }>> => {
    // 由于只是前端交互，可以直接返回成功状态
    console.log('点赞新闻:', id);
    return {
      success: true,
      data: { liked: true },
      message: 'success'
    };
  }
};

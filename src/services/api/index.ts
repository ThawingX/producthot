import { apiClient, withRetry } from './config';
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

// 基础接口定义
export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  category: string;
  views: number;
  likes: number;
  imageUrl?: string;
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  url: string;
  upvotes: number;
  comments: number;
  publishedAt: string;
  category: string;
  tags: string[];
  maker?: string;
  website?: string;
  logo?: string;
}

export interface RedditDiscussion {
  id: string;
  title: string;
  content: string;
  url: string;
  upvotes: number;
  comments: number;
  subreddit: string;
  author: string;
  publishedAt: string;
  tags: string[];
}

export interface TrendingItem {
  id: string;
  title: string;
  description: string;
  url: string;
  score: number;
  category: string;
  publishedAt: string;
  tags: string[];
  source: string;
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
      
      // 确保URL使用HTTPS
      const url = '/api/news/';
      
      const response = await withRetry(() => apiClient.get(url, { 
        params: {
          lang: params?.lang || 'zh' // 默认使用中文
        }
      }));
      
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

  // 预留功能
  likeNews: async (id: number): Promise<ApiResponse<{ liked: boolean }>> => {
    console.log('点赞新闻:', id);
    return {
      success: true,
      data: { liked: true },
      message: 'success'
    };
  }
};

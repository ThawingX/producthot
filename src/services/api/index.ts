import { apiClient, withRetry } from './config';
import { mockApiResponse } from '../../data/mockNews';

// 根据 Apifox 接口规范定义的数据结构
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

// 保留原有的 NewsItem 接口用于向后兼容
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

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 产品资讯相关接口
export interface ProductItem {
  id: string;
  title: string;
  description: string;
  link: string;
  publishedAt: string;
  views: number;
  likes: number;
  tags: string[];
  category: string;
  source: string;
  imageUrl?: string;
}

export interface RedditDiscussion {
  id: string;
  title: string;
  content: string;
  link: string;
  subreddit: string;
  author: string;
  publishedAt: string;
  upvotes: number;
  comments: number;
  tags: string[];
}

export interface TrendingItem {
  id: string;
  keyword: string;
  description: string;
  trendScore: number;
  changePercent: number;
  category: string;
  relatedProducts: string[];
  publishedAt: string;
  source: string;
}

export interface ProductInsightsData {
  new_products: ProductItem[];
  reddits: RedditDiscussion[];
  trendings: TrendingItem[];
}

// 新闻相关API
export const newsApi = {
  // 获取所有新闻 - 对应 Apifox 中的 GET /api/news 接口
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
        data: newsData,
        message: '成功获取新闻数据',
        success: true,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('❌ getNews API 调用失败:', error);
      
      // 重新抛出错误，让调用方处理
      throw error;
    }
  },

  // 获取热门新闻 (保留原有接口用于向后兼容)
  getHotNews: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
  }): Promise<ApiResponse<PaginatedResponse<NewsItem>>> => {
    const response = await apiClient.get('/news/hot', { params });
    return response.data;
  },

  // 获取新闻详情
  getNewsDetail: async (id: number): Promise<ApiResponse<NewsItem>> => {
    const response = await apiClient.get(`/news/${id}`);
    return response.data;
  },

  // 搜索新闻
  searchNews: async (query: string, filters?: {
    category?: string;
    dateRange?: string;
    sortBy?: 'date' | 'views' | 'likes';
  }): Promise<ApiResponse<PaginatedResponse<NewsItem>>> => {
    const response = await apiClient.get('/news/search', {
      params: { q: query, ...filters }
    });
    return response.data;
  },

  // 点赞新闻
  likeNews: async (id: number): Promise<ApiResponse<{ likes: number }>> => {
    const response = await apiClient.post(`/news/${id}/like`);
    return response.data;
  },

  // 分享新闻
  shareNews: async (id: number, platform: string): Promise<ApiResponse<{ shareUrl: string }>> => {
    const response = await apiClient.post(`/news/${id}/share`, { platform });
    return response.data;
  },
};

// 频道相关API
export const channelApi = {
  // 获取所有频道
  getChannels: async (): Promise<ApiResponse<Channel[]>> => {
    const response = await apiClient.get('/channels');
    return response.data;
  },

  // 获取频道详情
  getChannelDetail: async (id: string): Promise<ApiResponse<Channel>> => {
    const response = await apiClient.get(`/channels/${id}`);
    return response.data;
  },

  // 订阅频道
  subscribeChannel: async (id: string): Promise<ApiResponse<{ subscribed: boolean }>> => {
    const response = await apiClient.post(`/channels/${id}/subscribe`);
    return response.data;
  },

  // 取消订阅频道
  unsubscribeChannel: async (id: string): Promise<ApiResponse<{ subscribed: boolean }>> => {
    const response = await apiClient.delete(`/channels/${id}/subscribe`);
    return response.data;
  },
};

// 用户相关API
export const userApi = {
  // 用户登录
  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<ApiResponse<{ token: string; user: any }>> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // 用户注册
  register: async (userData: {
    email: string;
    password: string;
    name: string;
  }): Promise<ApiResponse<{ token: string; user: any }>> => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // 获取用户信息
  getProfile: async (): Promise<ApiResponse<any>> => {
    const response = await apiClient.get('/user/profile');
    return response.data;
  },

  // 更新用户信息
  updateProfile: async (userData: any): Promise<ApiResponse<any>> => {
    const response = await apiClient.put('/user/profile', userData);
    return response.data;
  },

  // 邮箱订阅
  subscribe: async (email: string): Promise<ApiResponse<{ subscribed: boolean }>> => {
    const response = await apiClient.post('/user/subscribe', { email });
    return response.data;
  },
};

// 统计相关API
export const analyticsApi = {
  // 获取热门趋势
  getTrends: async (timeRange: '24h' | '7d' | '30d' = '24h'): Promise<ApiResponse<any[]>> => {
    const response = await apiClient.get('/analytics/trends', {
      params: { timeRange }
    });
    return response.data;
  },

  // 记录页面访问
  trackPageView: async (page: string): Promise<void> => {
    await apiClient.post('/analytics/pageview', { page });
  },

  // 记录事件
  trackEvent: async (event: string, properties?: any): Promise<void> => {
    await apiClient.post('/analytics/event', { event, properties });
  },
};

// 产品资讯相关API
export const productInsightsApi = {
  // 获取产品资讯数据
  getProductInsights: async (): Promise<ProductInsightsData> => {
    // 在开发环境中使用模拟数据
    if (import.meta.env.DEV) {
      console.log('🔄 开发环境：使用模拟数据');
      
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 转换模拟数据格式以匹配 ProductInsightsData 接口
      const mockData = mockApiResponse.data;
      
      return {
        new_products: mockData.new_products.flatMap(source => 
          source.posts.map(post => ({
            id: `product-${Date.now()}-${Math.random()}`,
            title: post.title,
            description: post.description,
            link: post.url,
            publishedAt: source.update_time,
            views: post.upvotes * 10,
            likes: post.upvotes,
            tags: ['新产品', '热门'],
            category: '产品发布',
            source: source.title,
            imageUrl: source.logo
          }))
        ),
        reddits: mockData.reddits.flatMap(source => 
          source.posts.map(post => ({
            id: `reddit-${Date.now()}-${Math.random()}`,
            title: post.title,
            content: post.description,
            link: post.url,
            subreddit: source.title,
            author: 'reddit_user',
            publishedAt: source.update_time,
            upvotes: post.upvotes,
            comments: Math.floor(post.upvotes * 0.3),
            tags: ['讨论', 'Reddit']
          }))
        ),
        trendings: mockData.trendings.flatMap(source => 
          source.posts.map(post => ({
            id: `trending-${Date.now()}-${Math.random()}`,
            keyword: post.title,
            description: post.description,
            trendScore: post.upvotes / 10,
            changePercent: Math.floor(Math.random() * 50) + 10,
            category: '趋势',
            relatedProducts: ['AI工具', '开发工具'],
            publishedAt: source.update_time,
            source: source.title
          }))
        )
      };
    }
    
    // 生产环境中的原有逻辑
    try {
      const response = await withRetry(
        () => apiClient.get<ApiResponse<ProductInsightsData>>('/api/news'),
        {
          attempts: 3,
          delay: 1000,
          backoff: true,
          retryCondition: (error) => error.response?.status >= 500 || !error.response
        }
      );
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || '获取产品资讯数据失败');
      }
    } catch (error: any) {
      console.error('Failed to fetch product insights:', error);
      
      // 返回空数据结构，避免页面崩溃
      return {
        new_products: [],
        reddits: [],
        trendings: []
      };
    }
  },

  // 获取新产品发布数据
  getNewProducts: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
  }): Promise<ProductItem[]> => {
    try {
      const response = await withRetry(
        () => apiClient.get<ApiResponse<ProductItem[]>>('/api/new-products', { params }),
        { attempts: 2 }
      );
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || '获取新产品数据失败');
      }
    } catch (error: any) {
      console.error('Failed to fetch new products:', error);
      return [];
    }
  },

  // 获取Reddit讨论数据
  getRedditDiscussions: async (params?: {
    page?: number;
    limit?: number;
    subreddit?: string;
  }): Promise<RedditDiscussion[]> => {
    try {
      const response = await withRetry(
        () => apiClient.get<ApiResponse<RedditDiscussion[]>>('/api/reddit-discussions', { params }),
        { attempts: 2 }
      );
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || '获取Reddit讨论数据失败');
      }
    } catch (error: any) {
      console.error('Failed to fetch reddit discussions:', error);
      return [];
    }
  },

  // 获取趋势数据
  getTrendingData: async (params?: {
    page?: number;
    limit?: number;
    timeRange?: '24h' | '7d' | '30d';
  }): Promise<TrendingItem[]> => {
    try {
      const response = await withRetry(
        () => apiClient.get<ApiResponse<TrendingItem[]>>('/api/trending-data', { params }),
        { attempts: 2 }
      );
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || '获取趋势数据失败');
      }
    } catch (error: any) {
      console.error('Failed to fetch trending data:', error);
      return [];
    }
  },
};
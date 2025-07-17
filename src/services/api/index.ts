import { apiClient } from './config';

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

// 新闻相关API
export const newsApi = {
  // 获取热门新闻
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
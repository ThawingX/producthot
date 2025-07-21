import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { NewsItem, ProductItem, RedditDiscussion, TrendingItem } from '../services/api';

// 新闻状态接口
interface NewsState {
  // 新闻数据
  news: NewsItem[];
  filteredNews: NewsItem[];
  selectedCategory: string;
  sortBy: 'date' | 'views' | 'likes';
  searchQuery: string;
  
  // 用户交互数据
  favorites: number[];
  readHistory: number[];
  bookmarks: number[];
  
  // 加载状态
  isLoading: boolean;
  error: string | null;
  
  // 操作方法
  setNews: (news: NewsItem[]) => void;
  setFilteredNews: (news: NewsItem[]) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sortBy: 'date' | 'views' | 'likes') => void;
  setSearchQuery: (query: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // 用户交互方法
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
  addToHistory: (id: number) => void;
  addToBookmarks: (id: number) => void;
  removeFromBookmarks: (id: number) => void;
  clearHistory: () => void;
  
  // 筛选和搜索
  filterNews: () => void;
  searchNews: (query: string) => void;
  resetFilters: () => void;
}

// 产品洞察状态接口
interface ProductInsightsState {
  // 产品数据
  products: ProductItem[];
  redditDiscussions: RedditDiscussion[];
  trendingItems: TrendingItem[];
  
  // 加载状态
  isLoading: boolean;
  error: string | null;
  
  // 操作方法
  setProducts: (products: ProductItem[]) => void;
  setRedditDiscussions: (discussions: RedditDiscussion[]) => void;
  setTrendingItems: (items: TrendingItem[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// 新闻状态管理
export const useNewsStore = create<NewsState>()(
  persist(
    devtools(
      (set, get) => ({
        // 初始状态
        news: [],
        filteredNews: [],
        selectedCategory: '',
        sortBy: 'date',
        searchQuery: '',
        favorites: [],
        readHistory: [],
        bookmarks: [],
        isLoading: false,
        error: null,
        
        // 设置方法
        setNews: (news) => set({ news }),
        setFilteredNews: (filteredNews) => set({ filteredNews }),
        setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
        setSortBy: (sortBy) => set({ sortBy }),
        setSearchQuery: (searchQuery) => set({ searchQuery }),
        setIsLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        
        // 用户交互方法
        addToFavorites: (id) => set((state) => ({
          favorites: state.favorites.includes(id) 
            ? state.favorites 
            : [...state.favorites, id]
        })),
        
        removeFromFavorites: (id) => set((state) => ({
          favorites: state.favorites.filter(fId => fId !== id)
        })),
        
        addToHistory: (id) => set((state) => {
          const newHistory = [id, ...state.readHistory.filter(hId => hId !== id)];
          return { readHistory: newHistory.slice(0, 100) }; // 限制历史记录数量
        }),
        
        addToBookmarks: (id) => set((state) => ({
          bookmarks: state.bookmarks.includes(id)
            ? state.bookmarks
            : [...state.bookmarks, id]
        })),
        
        removeFromBookmarks: (id) => set((state) => ({
          bookmarks: state.bookmarks.filter(bId => bId !== id)
        })),
        
        clearHistory: () => set({ readHistory: [] }),
        
        // 筛选新闻
        filterNews: () => {
          const { news, selectedCategory, sortBy, searchQuery } = get();
          let filtered = [...news];
          
          // 分类筛选
          if (selectedCategory) {
            filtered = filtered.filter(item => item.category === selectedCategory);
          }
          
          // 搜索筛选
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(item => 
              item.title.toLowerCase().includes(query) ||
              item.summary.toLowerCase().includes(query)
            );
          }
          
          // 排序
          filtered.sort((a, b) => {
            switch (sortBy) {
              case 'views':
                return b.views - a.views;
              case 'likes':
                return b.likes - a.likes;
              case 'date':
              default:
                return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
            }
          });
          
          set({ filteredNews: filtered });
        },
        
        // 搜索新闻
        searchNews: (query) => {
          set({ searchQuery: query });
          get().filterNews();
        },
        
        // 重置筛选
        resetFilters: () => {
          set({ 
            selectedCategory: '', 
            sortBy: 'date', 
            searchQuery: '',
            filteredNews: get().news 
          });
        },
      }),
      { name: 'news-store' }
    ),
    {
      name: 'news-storage',
    }
  )
);

// 产品洞察状态管理
export const useProductInsightsStore = create<ProductInsightsState>()(
  devtools(
    (set) => ({
      // 初始状态
      products: [],
      redditDiscussions: [],
      trendingItems: [],
      isLoading: false,
      error: null,
      
      // 设置方法
      setProducts: (products) => set({ products }),
      setRedditDiscussions: (redditDiscussions) => set({ redditDiscussions }),
      setTrendingItems: (trendingItems) => set({ trendingItems }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    { name: 'product-insights-store' }
  )
);

// 设置状态接口
interface SettingsState {
  theme: 'light' | 'dark' | 'system';
  language: 'zh' | 'en';
  notifications: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: 'zh' | 'en') => void;
  setNotifications: (enabled: boolean) => void;
  setAutoRefresh: (enabled: boolean) => void;
  setRefreshInterval: (interval: number) => void;
}

// 设置状态管理
export const useSettingsStore = create<SettingsState>()(
  persist(
    devtools(
      (set) => ({
        // 初始状态
        theme: 'system',
        language: 'zh',
        notifications: true,
        autoRefresh: false,
        refreshInterval: 300000, // 5分钟
        
        // 设置方法
        setTheme: (theme) => set({ theme }),
        setLanguage: (language) => set({ language }),
        setNotifications: (notifications) => set({ notifications }),
        setAutoRefresh: (autoRefresh) => set({ autoRefresh }),
        setRefreshInterval: (refreshInterval) => set({ refreshInterval }),
      }),
      { name: 'settings-store' }
    ),
    {
      name: 'settings-storage',
    }
  )
);
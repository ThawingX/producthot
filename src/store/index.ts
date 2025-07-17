import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewsItem, Channel } from '../services/api';

// 应用状态接口
interface AppState {
  // UI状态
  theme: 'light' | 'dark' | 'system';
  language: string;
  sidebarOpen: boolean;
  loading: boolean;
  
  // 用户状态
  user: any | null;
  isAuthenticated: boolean;
  
  // 数据状态
  news: NewsItem[];
  channels: Channel[];
  activeChannel: string | null;
  searchQuery: string;
  
  // 操作方法
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: string) => void;
  setSidebarOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  setUser: (user: any) => void;
  setNews: (news: NewsItem[]) => void;
  setChannels: (channels: Channel[]) => void;
  setActiveChannel: (channelId: string | null) => void;
  setSearchQuery: (query: string) => void;
  logout: () => void;
  reset: () => void;
}

// 创建状态存储
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 初始状态
      theme: 'system',
      language: 'zh-CN',
      sidebarOpen: true,
      loading: false,
      user: null,
      isAuthenticated: false,
      news: [],
      channels: [],
      activeChannel: null,
      searchQuery: '',

      // 操作方法
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setLoading: (loading) => set({ loading }),
      
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),
      
      setNews: (news) => set({ news }),
      setChannels: (channels) => set({ channels }),
      setActiveChannel: (activeChannel) => set({ activeChannel }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false 
      }),
      
      reset: () => set({
        news: [],
        channels: [],
        activeChannel: null,
        searchQuery: '',
        loading: false,
      }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        sidebarOpen: state.sidebarOpen,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// 新闻相关状态
interface NewsState {
  favorites: number[];
  readHistory: number[];
  bookmarks: number[];
  
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
  addToHistory: (id: number) => void;
  addToBookmarks: (id: number) => void;
  removeFromBookmarks: (id: number) => void;
  clearHistory: () => void;
}

export const useNewsStore = create<NewsState>()(
  persist(
    (set, get) => ({
      favorites: [],
      readHistory: [],
      bookmarks: [],
      
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
    }),
    {
      name: 'news-storage',
    }
  )
);

// 设置相关状态
interface SettingsState {
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  preferences: {
    autoRefresh: boolean;
    refreshInterval: number;
    compactView: boolean;
    showImages: boolean;
  };
  
  updateNotifications: (notifications: Partial<SettingsState['notifications']>) => void;
  updatePreferences: (preferences: Partial<SettingsState['preferences']>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notifications: {
        email: true,
        push: true,
        desktop: false,
      },
      preferences: {
        autoRefresh: true,
        refreshInterval: 300000, // 5分钟
        compactView: false,
        showImages: true,
      },
      
      updateNotifications: (notifications) => set((state) => ({
        notifications: { ...state.notifications, ...notifications }
      })),
      
      updatePreferences: (preferences) => set((state) => ({
        preferences: { ...state.preferences, ...preferences }
      })),
    }),
    {
      name: 'settings-storage',
    }
  )
);
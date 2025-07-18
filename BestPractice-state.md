# 状态管理最佳实践指南

## 目录
1. [设计原则](#设计原则)
2. [项目结构](#项目结构)
3. [Store 设计](#store-设计)
4. [状态分离](#状态分离)
5. [数据持久化](#数据持久化)
6. [异步状态管理](#异步状态管理)
7. [性能优化](#性能优化)
8. [测试策略](#测试策略)
9. [调试工具](#调试工具)
10. [最佳实践](#最佳实践)

## 设计原则

### 1. 单一职责
- 每个 store 负责特定的业务领域
- 避免在单个 store 中混合不相关的状态
- 保持状态结构扁平化

### 2. 不可变性
- 使用不可变更新模式
- 避免直接修改状态对象
- 利用 Zustand 的 set 函数进行状态更新

### 3. 可预测性
- 状态变化应该是可预测的
- 提供清晰的 action 命名
- 避免副作用在 reducer 中

## 项目结构

```
src/
├── store/
│   ├── index.ts              # 主 store 导出和组合
│   ├── appStore.ts           # 应用全局状态 (tab管理、UI状态)
│   ├── newsStore.ts          # 新闻数据状态
│   ├── channelStore.ts       # 频道数据状态
│   ├── userStore.ts          # 用户状态
│   ├── types.ts              # 状态相关类型定义
│   └── middleware/           # 中间件
│       ├── persist.ts        # 持久化中间件
│       └── devtools.ts       # 开发工具中间件
```

### 实际项目架构说明

当前项目采用多个独立的 Zustand store，每个 store 负责特定的业务领域：

- **appStore**: 管理应用级状态（当前tab、移动端菜单状态等）
- **newsStore**: 管理新闻数据和相关操作
- **channelStore**: 管理频道数据和筛选
- **userStore**: 管理用户相关状态

这种架构的优势：
- 职责分离清晰
- 便于维护和测试
- 支持按需加载
- 减少不必要的重渲染

## Store 设计

### 1. 主应用 Store 结构

```typescript
// store/index.ts - 主应用状态
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
```

### 2. 新闻状态管理

```typescript
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
```

### 3. 设置状态管理

```typescript
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
```
  error: null,
  currentPage: 1,
  totalPages: 1,
  hasMore: false,
};

export const useNewsStore = create<NewsState>()(
  subscribeWithSelector(
    devtools(
      (set, get) => ({
        ...initialState,
        
        // 数据操作
        setItems: (items) => set({ items }, false, 'setItems'),
        
        addItems: (newItems) => set(
          (state) => ({
            items: [...state.items, ...newItems],
          }),
          false,
          'addItems'
        ),
        
        updateItem: (id, updates) => set(
          (state) => ({
            items: state.items.map(item =>
              item.id === id ? { ...item, ...updates } : item
            ),
          }),
          false,
          'updateItem'
        ),
        
        removeItem: (id) => set(
          (state) => ({
            items: state.items.filter(item => item.id !== id),
            favorites: state.favorites.filter(fId => fId !== id),
            bookmarks: state.bookmarks.filter(bId => bId !== id),
          }),
          false,
          'removeItem'
        ),
        
        // 收藏操作
        addToFavorites: (id) => set(
          (state) => ({
            favorites: state.favorites.includes(id)
              ? state.favorites
              : [...state.favorites, id],
          }),
          false,
          'addToFavorites'
        ),
        
        removeFromFavorites: (id) => set(
          (state) => ({
            favorites: state.favorites.filter(fId => fId !== id),
          }),
          false,
          'removeFromFavorites'
        ),
        
        toggleFavorite: (id) => {
          const { favorites } = get();
          if (favorites.includes(id)) {
            get().removeFromFavorites(id);
          } else {
            get().addToFavorites(id);
          }
        },
        
        // 历史记录
        addToHistory: (id) => set(
          (state) => {
            const newHistory = [id, ...state.readHistory.filter(hId => hId !== id)];
            return { readHistory: newHistory.slice(0, 100) }; // 限制数量
          },
          false,
          'addToHistory'
        ),
        
        clearHistory: () => set({ readHistory: [] }, false, 'clearHistory'),
        
        // 书签操作
        addToBookmarks: (id) => set(
          (state) => ({
            bookmarks: state.bookmarks.includes(id)
              ? state.bookmarks
              : [...state.bookmarks, id],
          }),
          false,
          'addToBookmarks'
        ),
        
        removeFromBookmarks: (id) => set(
          (state) => ({
            bookmarks: state.bookmarks.filter(bId => bId !== id),
          }),
          false,
          'removeFromBookmarks'
        ),
        
        toggleBookmark: (id) => {
          const { bookmarks } = get();
          if (bookmarks.includes(id)) {
            get().removeFromBookmarks(id);
          } else {
            get().addToBookmarks(id);
          }
        },
        
        // 筛选和搜索
        setFilter: (filter) => set(
          (state) => ({ filter: { ...state.filter, ...filter } }),
          false,
          'setFilter'
        ),
        
        setSortBy: (sortBy) => set({ sortBy }, false, 'setSortBy'),
        setSearchQuery: (searchQuery) => set({ searchQuery }, false, 'setSearchQuery'),
        setSelectedCategory: (selectedCategory) => set({ selectedCategory }, false, 'setSelectedCategory'),
        
        // 状态管理
        setLoading: (loading) => set({ loading }, false, 'setLoading'),
        setError: (error) => set({ error }, false, 'setError'),
        
        // 分页
        setCurrentPage: (currentPage) => set({ currentPage }, false, 'setCurrentPage'),
        
        nextPage: () => set(
          (state) => ({
            currentPage: Math.min(state.currentPage + 1, state.totalPages),
          }),
          false,
          'nextPage'
        ),
        
        prevPage: () => set(
          (state) => ({
            currentPage: Math.max(state.currentPage - 1, 1),
          }),
          false,
          'prevPage'
        ),
        
        // 计算属性
        getFilteredItems: () => {
          const { items, filter, sortBy, searchQuery, selectedCategory } = get();
          
          let filtered = items;
          
          // 搜索过滤
          if (searchQuery) {
            filtered = filtered.filter(item =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.summary.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
          
          // 分类过滤
          if (selectedCategory) {
            filtered = filtered.filter(item => item.category === selectedCategory);
          }
          
          // 标签过滤
          if (filter.tags.length > 0) {
            filtered = filtered.filter(item =>
              filter.tags.some(tag => item.tags.includes(tag))
            );
          }
          
          // 排序
          filtered.sort((a, b) => {
            switch (sortBy) {
              case 'date':
                return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
              case 'views':
                return b.views - a.views;
              case 'likes':
                return b.likes - a.likes;
              default:
                return 0;
            }
          });
          
          return filtered;
        },
        
        getFavoriteItems: () => {
          const { items, favorites } = get();
          return items.filter(item => favorites.includes(item.id));
        },
        
        getBookmarkedItems: () => {
          const { items, bookmarks } = get();
          return items.filter(item => bookmarks.includes(item.id));
        },
        
        // 重置
        reset: () => set(initialState, false, 'reset'),
      }),
      {
        name: 'news-store',
      }
    )
  )
);
```

## 状态分离

### 1. 按业务领域分离

```typescript
// store/slices/auth.ts
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

// store/slices/ui.ts
interface UIState {
  modals: {
    login: boolean;
    settings: boolean;
    share: boolean;
  };
  notifications: Notification[];
  toast: ToastMessage | null;
  
  openModal: (modal: keyof UIState['modals']) => void;
  closeModal: (modal: keyof UIState['modals']) => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  showToast: (message: ToastMessage) => void;
  hideToast: () => void;
}
```

### 2. 组合多个 Store

```typescript
// store/index.ts
import { useAppStore } from './slices/app';
import { useAuthStore } from './slices/auth';
import { useNewsStore } from './slices/news';
import { useUIStore } from './slices/ui';
import { useSettingsStore } from './slices/settings';

// 组合 Hook
export const useStore = () => ({
  app: useAppStore(),
  auth: useAuthStore(),
  news: useNewsStore(),
  ui: useUIStore(),
  settings: useSettingsStore(),
});

// 选择性导出
export {
  useAppStore,
  useAuthStore,
  useNewsStore,
  useUIStore,
  useSettingsStore,
};

// 类型导出
export type {
  AppState,
  AuthState,
  NewsState,
  UIState,
  SettingsState,
} from './types';
```

## 数据持久化

### 1. 持久化配置

```typescript
// store/middleware/persist.ts
import { persist, PersistOptions } from 'zustand/middleware';

// 通用持久化配置
export const createPersistConfig = <T>(
  name: string,
  partialize?: (state: T) => Partial<T>
): PersistOptions<T> => ({
  name,
  partialize,
  storage: {
    getItem: (name) => {
      try {
        const item = localStorage.getItem(name);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error(`Failed to get item ${name} from localStorage:`, error);
        return null;
      }
    },
    setItem: (name, value) => {
      try {
        localStorage.setItem(name, JSON.stringify(value));
      } catch (error) {
        console.error(`Failed to set item ${name} to localStorage:`, error);
      }
    },
    removeItem: (name) => {
      try {
        localStorage.removeItem(name);
      } catch (error) {
        console.error(`Failed to remove item ${name} from localStorage:`, error);
      }
    },
  },
});

// 应用状态持久化
export const appPersistConfig = createPersistConfig<AppState>(
  'app-storage',
  (state) => ({
    theme: state.theme,
    language: state.language,
    sidebarOpen: state.sidebarOpen,
  })
);

// 用户数据持久化
export const userPersistConfig = createPersistConfig<NewsState>(
  'user-data',
  (state) => ({
    favorites: state.favorites,
    readHistory: state.readHistory,
    bookmarks: state.bookmarks,
  })
);
```

### 2. 敏感数据处理

```typescript
// store/middleware/secure-persist.ts
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_STORAGE_KEY || 'default-key';

export const secureStorage = {
  getItem: (name: string) => {
    try {
      const encrypted = localStorage.getItem(name);
      if (!encrypted) return null;
      
      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Failed to decrypt storage item:', error);
      return null;
    }
  },
  
  setItem: (name: string, value: any) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(value),
        SECRET_KEY
      ).toString();
      localStorage.setItem(name, encrypted);
    } catch (error) {
      console.error('Failed to encrypt storage item:', error);
    }
  },
  
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

// 安全持久化配置
export const securePersistConfig = <T>(name: string) => ({
  name,
  storage: secureStorage,
});
```

## 异步状态管理

### 1. 异步操作模式

```typescript
// store/slices/async-news.ts
interface AsyncNewsState extends NewsState {
  // 异步操作
  fetchNews: (params?: FetchNewsParams) => Promise<void>;
  fetchNewsById: (id: number) => Promise<NewsItem | null>;
  createNews: (news: CreateNewsRequest) => Promise<void>;
  updateNews: (id: number, updates: UpdateNewsRequest) => Promise<void>;
  deleteNews: (id: number) => Promise<void>;
  
  // 批量操作
  fetchNewsByIds: (ids: number[]) => Promise<void>;
  bulkUpdateNews: (updates: BulkUpdateRequest[]) => Promise<void>;
  
  // 缓存管理
  invalidateCache: () => void;
  refreshData: () => Promise<void>;
}

export const useAsyncNewsStore = create<AsyncNewsState>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      fetchNews: async (params = {}) => {
        const { setLoading, setError, setItems } = get();
        
        try {
          setLoading(true);
          setError(null);
          
          const response = await newsApi.fetchNews(params);
          setItems(response.data);
          
          set({
            totalPages: response.totalPages,
            hasMore: response.hasMore,
          });
        } catch (error) {
          setError(error instanceof Error ? error.message : '获取新闻失败');
        } finally {
          setLoading(false);
        }
      },
      
      fetchNewsById: async (id) => {
        const { setLoading, setError, updateItem } = get();
        
        try {
          setLoading(true);
          setError(null);
          
          const news = await newsApi.fetchNewsById(id);
          updateItem(id, news);
          
          return news;
        } catch (error) {
          setError(error instanceof Error ? error.message : '获取新闻详情失败');
          return null;
        } finally {
          setLoading(false);
        }
      },
      
      createNews: async (newsData) => {
        const { setLoading, setError, addItems } = get();
        
        try {
          setLoading(true);
          setError(null);
          
          const newNews = await newsApi.createNews(newsData);
          addItems([newNews]);
        } catch (error) {
          setError(error instanceof Error ? error.message : '创建新闻失败');
          throw error;
        } finally {
          setLoading(false);
        }
      },
      
      updateNews: async (id, updates) => {
        const { setLoading, setError, updateItem } = get();
        
        try {
          setLoading(true);
          setError(null);
          
          const updatedNews = await newsApi.updateNews(id, updates);
          updateItem(id, updatedNews);
        } catch (error) {
          setError(error instanceof Error ? error.message : '更新新闻失败');
          throw error;
        } finally {
          setLoading(false);
        }
      },
      
      deleteNews: async (id) => {
        const { setLoading, setError, removeItem } = get();
        
        try {
          setLoading(true);
          setError(null);
          
          await newsApi.deleteNews(id);
          removeItem(id);
        } catch (error) {
          setError(error instanceof Error ? error.message : '删除新闻失败');
          throw error;
        } finally {
          setLoading(false);
        }
      },
      
      // 批量操作
      fetchNewsByIds: async (ids) => {
        const { setLoading, setError, addItems } = get();
        
        try {
          setLoading(true);
          setError(null);
          
          const newsItems = await Promise.all(
            ids.map(id => newsApi.fetchNewsById(id))
          );
          
          addItems(newsItems.filter(Boolean));
        } catch (error) {
          setError(error instanceof Error ? error.message : '批量获取新闻失败');
        } finally {
          setLoading(false);
        }
      },
      
      // 缓存管理
      invalidateCache: () => {
        set({ items: [] });
      },
      
      refreshData: async () => {
        const { fetchNews } = get();
        await fetchNews();
      },
    }),
    {
      name: 'async-news-store',
    }
  )
);
```

### 2. 乐观更新

```typescript
// store/utils/optimistic.ts
export const createOptimisticUpdate = <T, P>(
  updateFn: (params: P) => Promise<T>,
  optimisticUpdateFn: (params: P) => void,
  revertFn: () => void
) => {
  return async (params: P): Promise<T> => {
    // 乐观更新
    optimisticUpdateFn(params);
    
    try {
      // 执行实际更新
      const result = await updateFn(params);
      return result;
    } catch (error) {
      // 失败时回滚
      revertFn();
      throw error;
    }
  };
};

// 使用示例
const optimisticLikeNews = createOptimisticUpdate(
  (id: number) => newsApi.likeNews(id),
  (id: number) => {
    const { updateItem } = get();
    updateItem(id, { likes: (item) => item.likes + 1 });
  },
  () => {
    const { refreshData } = get();
    refreshData();
  }
);
```

## 性能优化

### 1. 选择器优化

```typescript
// hooks/useNewsSelectors.ts
import { shallow } from 'zustand/shallow';
import { useNewsStore } from '../store';

// 基础选择器
export const useNewsItems = () => useNewsStore(state => state.items);
export const useNewsLoading = () => useNewsStore(state => state.loading);
export const useNewsError = () => useNewsStore(state => state.error);

// 复合选择器
export const useNewsState = () => useNewsStore(
  state => ({
    items: state.items,
    loading: state.loading,
    error: state.error,
  }),
  shallow
);

// 计算选择器
export const useFilteredNews = () => useNewsStore(
  state => state.getFilteredItems(),
  shallow
);

// 条件选择器
export const useNewsByCategory = (category: string) => useNewsStore(
  state => state.items.filter(item => item.category === category),
  shallow
);

// 分页选择器
export const usePaginatedNews = (pageSize: number = 10) => useNewsStore(
  state => {
    const { items, currentPage } = state;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return {
      items: items.slice(startIndex, endIndex),
      currentPage,
      totalPages: Math.ceil(items.length / pageSize),
      hasMore: endIndex < items.length,
    };
  },
  shallow
);
```

### 2. 订阅优化

```typescript
// hooks/useStoreSubscription.ts
import { useEffect } from 'react';
import { useNewsStore } from '../store';

// 条件订阅
export const useConditionalSubscription = (
  condition: boolean,
  callback: () => void
) => {
  useEffect(() => {
    if (!condition) return;
    
    const unsubscribe = useNewsStore.subscribe(callback);
    return unsubscribe;
  }, [condition, callback]);
};

// 特定状态订阅
export const useNewsItemSubscription = (
  itemId: number,
  callback: (item: NewsItem | undefined) => void
) => {
  useEffect(() => {
    const unsubscribe = useNewsStore.subscribe(
      state => state.items.find(item => item.id === itemId),
      callback
    );
    
    return unsubscribe;
  }, [itemId, callback]);
};
```

## 测试策略

### 1. Store 单元测试

```typescript
// tests/store/news.test.ts
import { act, renderHook } from '@testing-library/react';
import { useNewsStore } from '../../src/store/slices/news';

describe('News Store', () => {
  beforeEach(() => {
    useNewsStore.getState().reset();
  });

  test('should add news items', () => {
    const { result } = renderHook(() => useNewsStore());
    
    const mockNews = [
      { id: 1, title: 'Test News 1', summary: 'Summary 1' },
      { id: 2, title: 'Test News 2', summary: 'Summary 2' },
    ];

    act(() => {
      result.current.setItems(mockNews);
    });

    expect(result.current.items).toEqual(mockNews);
  });

  test('should toggle favorite', () => {
    const { result } = renderHook(() => useNewsStore());
    
    act(() => {
      result.current.toggleFavorite(1);
    });

    expect(result.current.favorites).toContain(1);

    act(() => {
      result.current.toggleFavorite(1);
    });

    expect(result.current.favorites).not.toContain(1);
  });

  test('should filter news by search query', () => {
    const { result } = renderHook(() => useNewsStore());
    
    const mockNews = [
      { id: 1, title: 'React News', summary: 'About React' },
      { id: 2, title: 'Vue News', summary: 'About Vue' },
    ];

    act(() => {
      result.current.setItems(mockNews);
      result.current.setSearchQuery('React');
    });

    const filtered = result.current.getFilteredItems();
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe('React News');
  });
});
```

### 2. 集成测试

```typescript
// tests/integration/news-flow.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NewsPage } from '../../src/pages/NewsPage';
import { useNewsStore } from '../../src/store';

// Mock API
jest.mock('../../src/services/api', () => ({
  newsApi: {
    fetchNews: jest.fn(() => Promise.resolve({
      data: [
        { id: 1, title: 'Test News', summary: 'Test Summary' }
      ],
      totalPages: 1,
      hasMore: false,
    })),
  },
}));

describe('News Flow Integration', () => {
  test('should load and display news', async () => {
    render(<NewsPage />);
    
    // 等待数据加载
    await waitFor(() => {
      expect(screen.getByText('Test News')).toBeInTheDocument();
    });
    
    // 测试收藏功能
    const favoriteButton = screen.getByLabelText('收藏');
    fireEvent.click(favoriteButton);
    
    // 验证状态更新
    const store = useNewsStore.getState();
    expect(store.favorites).toContain(1);
  });
});
```

## 调试工具

### 1. Redux DevTools 集成

```typescript
// store/middleware/devtools.ts
import { devtools } from 'zustand/middleware';

export const createDevtoolsConfig = (name: string) => ({
  name,
  serialize: {
    options: {
      undefined: true,
      function: true,
      symbol: true,
    },
  },
});

// 使用示例
export const useNewsStore = create<NewsState>()(
  devtools(
    (set, get) => ({
      // store implementation
    }),
    createDevtoolsConfig('news-store')
  )
);
```

### 2. 日志中间件

```typescript
// store/middleware/logger.ts
export const logger = <T>(
  config: StateCreator<T, [], [], T>
): StateCreator<T, [], [], T> => (set, get, api) =>
  config(
    (...args) => {
      console.group('🔄 Store Update');
      console.log('Previous State:', get());
      set(...args);
      console.log('Next State:', get());
      console.groupEnd();
    },
    get,
    api
  );
```

## 最佳实践

### 1. 命名约定

```typescript
// ✅ 好的命名
interface NewsState {
  // 状态使用名词
  items: NewsItem[];
  loading: boolean;
  error: string | null;
  
  // 操作使用动词
  setItems: (items: NewsItem[]) => void;
  addItem: (item: NewsItem) => void;
  removeItem: (id: number) => void;
  
  // 切换操作使用 toggle
  toggleFavorite: (id: number) => void;
  
  // 清理操作使用 clear/reset
  clearError: () => void;
  reset: () => void;
}

// ❌ 避免的命名
interface BadNewsState {
  newsData: NewsItem[]; // 冗余的 Data 后缀
  isLoading: boolean;   // 冗余的 is 前缀
  errorMsg: string;     // 缩写
  
  updateItems: (items: NewsItem[]) => void; // 不明确的操作
  handleFavorite: (id: number) => void;     // 冗余的 handle 前缀
}
```

### 2. 状态结构设计

```typescript
// ✅ 扁平化结构
interface AppState {
  theme: 'light' | 'dark';
  language: string;
  sidebarOpen: boolean;
  
  user: User | null;
  isAuthenticated: boolean;
  
  newsItems: NewsItem[];
  newsLoading: boolean;
  newsError: string | null;
}

// ❌ 过度嵌套
interface BadAppState {
  ui: {
    theme: {
      current: 'light' | 'dark';
      available: string[];
    };
    sidebar: {
      isOpen: boolean;
      width: number;
    };
  };
  data: {
    news: {
      items: NewsItem[];
      meta: {
        loading: boolean;
        error: string | null;
      };
    };
  };
}
```

### 3. 错误处理

```typescript
// store/utils/error-handling.ts
export const createAsyncAction = <T, P>(
  actionName: string,
  asyncFn: (params: P) => Promise<T>
) => {
  return async (params: P, { set, get }: { set: any; get: any }) => {
    try {
      set({ loading: true, error: null }, false, `${actionName}/pending`);
      
      const result = await asyncFn(params);
      
      set({ loading: false }, false, `${actionName}/fulfilled`);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      set({ 
        loading: false, 
        error: errorMessage 
      }, false, `${actionName}/rejected`);
      
      throw error;
    }
  };
};
```

## 总结

这个状态管理最佳实践指南提供了：

1. **清晰的设计原则** - 单一职责、不可变性、可预测性
2. **模块化架构** - 按业务领域分离状态
3. **类型安全** - 完整的 TypeScript 支持
4. **性能优化** - 选择器、订阅优化
5. **数据持久化** - 安全的本地存储方案
6. **异步处理** - 完整的异步状态管理
7. **测试策略** - 单元测试和集成测试
8. **调试工具** - DevTools 和日志支持

通过遵循这些最佳实践，可以构建一个可维护、可扩展、高性能的状态管理系统。
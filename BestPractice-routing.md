# 导航最佳实践指南

## 目录

- [导航架构设计](#导航架构设计)
- [Tab导航配置](#tab导航配置)
- [页面组件](#页面组件)
- [状态管理](#状态管理)
- [移动端适配](#移动端适配)
- [用户体验优化](#用户体验优化)
- [性能优化](#性能优化)
- [最佳实践](#最佳实践)

## 导航架构设计

### 1. Tab导航结构

当前项目采用基于Tab的导航模式，而非传统的路由模式。这种设计更适合单页应用的快速切换需求。

```
主应用 (App.tsx)
├── 产品新闻 (news)          # 产品热点新闻页面
└── 线索分析 (analysis)      # 数据分析页面
```

### 2. 导航类型定义

```typescript
// src/types/index.ts
export type TabType = 'news' | 'analysis';

export interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}
```

## Tab导航配置

### 1. 主应用结构

```typescript
// src/App.tsx
import React, { useState } from 'react';
import { NavigationHeader } from './components/layout/NavigationHeader';
import { ProductNewsPage } from './pages/ProductNewsPage';
import { ClueAnalysisPage } from './pages/ClueAnalysisPage';
import { TabType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('news');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      {activeTab === 'news' ? <ProductNewsPage /> : <ClueAnalysisPage />}
    </div>
  );
}

export default App;
```

### 2. 导航头组件

```typescript
// src/components/layout/NavigationHeader.tsx
import React from 'react';
import { TabType } from '../../types';

interface NavigationHeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  activeTab,
  setActiveTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const tabs = [
    { id: 'news' as TabType, label: '产品新闻', icon: '📰' },
    { id: 'analysis' as TabType, label: '线索分析', icon: '📊' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">ProductHot</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
```
## 页面组件

### 1. 页面组件结构

```typescript
// src/pages/ProductNewsPage.tsx
import React from 'react';
import { ChannelCard } from '../components/news/ChannelCard';
import { useNewsStore } from '../store';

export const ProductNewsPage: React.FC = () => {
  const { channels, loading } = useNewsStore();

  if (loading) {
    return <div className="flex justify-center items-center h-64">加载中...</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>
    </main>
  );
};
```

```typescript
// src/pages/ClueAnalysisPage.tsx
import React from 'react';

export const ClueAnalysisPage: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">线索分析</h2>
        <p className="text-gray-600">数据分析功能正在开发中...</p>
      </div>
    </main>
  );
};
```

### 2. 页面组件最佳实践

- **单一职责**: 每个页面组件只负责一个主要功能
- **数据获取**: 在页面组件中处理数据获取和状态管理
- **布局一致**: 使用统一的容器和间距规范
- **加载状态**: 提供清晰的加载和错误状态反馈

## 状态管理

### 1. Tab状态管理

```typescript
// 在App.tsx中管理Tab状态
const [activeTab, setActiveTab] = useState<TabType>('news');

// 可以扩展为使用Zustand进行全局状态管理
interface NavigationStore {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  activeTab: 'news',
  setActiveTab: (tab) => set({ activeTab: tab }),
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
}));
```

### 2. 页面状态持久化

```typescript
// 使用localStorage保存用户的Tab偏好
const [activeTab, setActiveTab] = useState<TabType>(() => {
  const saved = localStorage.getItem('activeTab');
  return (saved as TabType) || 'news';
});

useEffect(() => {
  localStorage.setItem('activeTab', activeTab);
}, [activeTab]);
```

## 移动端适配

### 1. 响应式导航

- **桌面端**: 水平Tab导航
- **移动端**: 汉堡菜单 + 垂直导航

### 2. 移动端优化

```typescript
// 移动端菜单自动关闭
const handleTabChange = (tab: TabType) => {
  setActiveTab(tab);
  if (window.innerWidth < 768) {
    setIsMobileMenuOpen(false);
  }
};

// 监听屏幕尺寸变化
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsMobileMenuOpen(false);
    }
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

## 用户体验优化

### 1. 视觉反馈

- **活跃状态**: 清晰的视觉指示当前选中的Tab
- **悬停效果**: 提供交互反馈
- **过渡动画**: 平滑的状态切换

### 2. 键盘导航

```typescript
// 支持键盘导航
const handleKeyDown = (event: KeyboardEvent, tab: TabType) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    setActiveTab(tab);
  }
};

// 在按钮上添加键盘事件
<button
  onKeyDown={(e) => handleKeyDown(e, tab.id)}
  tabIndex={0}
  role="tab"
  aria-selected={activeTab === tab.id}
>
  {tab.label}
</button>
```

### 3. 无障碍访问

```typescript
// ARIA属性支持
<nav role="tablist" aria-label="主导航">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      role="tab"
      aria-selected={activeTab === tab.id}
      aria-controls={`panel-${tab.id}`}
      id={`tab-${tab.id}`}
      onClick={() => setActiveTab(tab.id)}
    >
      {tab.label}
    </button>
  ))}
</nav>

<div
  role="tabpanel"
  aria-labelledby={`tab-${activeTab}`}
  id={`panel-${activeTab}`}
>
  {/* 页面内容 */}
</div>
```

## 性能优化

### 1. 组件懒加载

```typescript
// 懒加载页面组件
const ProductNewsPage = React.lazy(() => import('../pages/ProductNewsPage'));
const ClueAnalysisPage = React.lazy(() => import('../pages/ClueAnalysisPage'));

// 在App.tsx中使用Suspense
<Suspense fallback={<div>加载中...</div>}>
  {activeTab === 'news' ? <ProductNewsPage /> : <ClueAnalysisPage />}
</Suspense>
```

### 2. 状态缓存

```typescript
// 缓存页面状态，避免重复渲染
const [pageCache, setPageCache] = useState<Record<TabType, React.ReactNode>>({});

const renderPage = (tab: TabType) => {
  if (!pageCache[tab]) {
    const page = tab === 'news' ? <ProductNewsPage /> : <ClueAnalysisPage />;
    setPageCache(prev => ({ ...prev, [tab]: page }));
    return page;
  }
  return pageCache[tab];
};
```

## 最佳实践

### 1. 导航设计原则

- **简洁明了**: Tab数量控制在2-5个之间
- **语义清晰**: 使用直观的标签和图标
- **一致性**: 保持导航样式和行为的一致性
- **可访问性**: 支持键盘导航和屏幕阅读器

### 2. 状态管理原则

- **最小状态**: 只管理必要的导航状态
- **单一数据源**: 避免状态重复和不一致
- **持久化**: 保存用户的导航偏好
- **响应式**: 根据屏幕尺寸调整导航行为

### 3. 性能优化原则

- **按需加载**: 使用懒加载减少初始包大小
- **状态缓存**: 避免不必要的组件重新渲染
- **事件优化**: 使用防抖和节流优化交互事件
- **内存管理**: 及时清理事件监听器和定时器

### 4. 扩展性考虑

```typescript
// 可配置的Tab系统
interface TabConfig {
  id: TabType;
  label: string;
  icon: string;
  component: React.ComponentType;
  requireAuth?: boolean;
  badge?: number;
}

const tabConfigs: TabConfig[] = [
  {
    id: 'news',
    label: '产品新闻',
    icon: '📰',
    component: ProductNewsPage,
  },
  {
    id: 'analysis',
    label: '线索分析',
    icon: '📊',
    component: ClueAnalysisPage,
    requireAuth: true,
  },
];

// 动态渲染Tab
const renderTabs = () => {
  return tabConfigs
    .filter(tab => !tab.requireAuth || isAuthenticated)
    .map(tab => (
      <TabButton key={tab.id} config={tab} />
    ));
};
```

### 5. 测试策略

```typescript
// 导航组件测试
describe('NavigationHeader', () => {
  it('should render all tabs', () => {
    render(<NavigationHeader {...defaultProps} />);
    expect(screen.getByText('产品新闻')).toBeInTheDocument();
    expect(screen.getByText('线索分析')).toBeInTheDocument();
  });

  it('should switch tabs on click', () => {
    const setActiveTab = jest.fn();
    render(<NavigationHeader {...defaultProps} setActiveTab={setActiveTab} />);
    
    fireEvent.click(screen.getByText('线索分析'));
    expect(setActiveTab).toHaveBeenCalledWith('analysis');
  });

  it('should close mobile menu after tab selection', () => {
    const setIsMobileMenuOpen = jest.fn();
    render(
      <NavigationHeader 
        {...defaultProps} 
        isMobileMenuOpen={true}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    );
    
    fireEvent.click(screen.getByText('线索分析'));
    expect(setIsMobileMenuOpen).toHaveBeenCalledWith(false);
  });
});
```

## 页面组件

### 1. 页面组件结构

```typescript
// src/pages/NewsPage/index.tsx
import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { NewsFilters } from '../../components/news/NewsFilters';
import { NewsList } from '../../components/news/NewsList';
import { Pagination } from '../../components/ui/Pagination';
import { useNewsStore } from '../../store';
import { usePageTracking } from '../../hooks/usePageTracking';

export const NewsPage: React.FC = () => {
  const { t } = useTranslation();
  const { category } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { news, loading, fetchNews, filters, setFilters } = useNewsStore();

  // 页面访问统计
  usePageTracking('news', { category });

  // 获取查询参数
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';

  useEffect(() => {
    fetchNews({
      category,
      page,
      search,
      ...filters
    });
  }, [category, page, search, filters, fetchNews]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setSearchParams({ ...Object.fromEntries(searchParams), page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page: newPage.toString() });
  };

  return (
    <>
      <Helmet>
        <title>{category ? t('news.categoryTitle', { category }) : t('news.title')}</title>
        <meta name="description" content={t('news.description')} />
        <meta property="og:title" content={t('news.title')} />
        <meta property="og:description" content={t('news.description')} />
      </Helmet>

      <div className="news-page">
        <div className="news-page__header">
          <h1 className="news-page__title">
            {category ? t('news.categoryTitle', { category }) : t('news.title')}
          </h1>
          <NewsFilters
            filters={filters}
            onFiltersChange={handleFilterChange}
          />
        </div>

        <div className="news-page__content">
          <NewsList
            news={news}
            loading={loading}
            emptyMessage={t('news.empty')}
          />
          
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(news.length / 10)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default NewsPage;
```

### 2. 页面 Hook

```typescript
// src/hooks/usePageTracking.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsApi } from '../services/api';

export const usePageTracking = (pageName: string, metadata?: Record<string, any>) => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        await analyticsApi.trackPageView(pageName, {
          path: location.pathname,
          search: location.search,
          ...metadata
        });
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    trackPageView();
  }, [pageName, location.pathname, location.search, metadata]);
};
```

## 路由守卫

### 1. 认证守卫

```typescript
// src/router/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppStore } from '../store';
import { LoadingSpinner } from '../components/ui';

interface ProtectedRouteProps {
  requiredRole?: string;
  fallbackPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole,
  fallbackPath = '/auth/login'
}) => {
  const location = useLocation();
  const { user, isAuthenticated, loading } = useAppStore();

  // 正在加载用户信息
  if (loading) {
    return <LoadingSpinner />;
  }

  // 未认证，重定向到登录页
  if (!isAuthenticated) {
    return (
      <Navigate
        to={fallbackPath}
        state={{ from: location }}
        replace
      />
    );
  }

  // 需要特定角色但用户角色不匹配
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
```

### 2. 路由守卫 Hook

```typescript
// src/hooks/useRouteGuard.ts
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { toast } from 'react-hot-toast';

interface RouteGuardConfig {
  requiresAuth?: boolean;
  requiredRole?: string;
  onUnauthorized?: () => void;
}

export const useRouteGuard = (config: RouteGuardConfig) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppStore();

  useEffect(() => {
    const checkAccess = () => {
      // 检查认证状态
      if (config.requiresAuth && !isAuthenticated) {
        toast.error('请先登录');
        navigate('/auth/login', { 
          state: { from: location },
          replace: true 
        });
        return false;
      }

      // 检查角色权限
      if (config.requiredRole && user?.role !== config.requiredRole) {
        toast.error('权限不足');
        if (config.onUnauthorized) {
          config.onUnauthorized();
        } else {
          navigate('/unauthorized', { replace: true });
        }
        return false;
      }

      return true;
    };

    checkAccess();
  }, [location, isAuthenticated, user, config, navigate]);
};
```

## 懒加载

### 1. 页面懒加载

```typescript
// src/router/LazyRoute.tsx
import React, { Suspense } from 'react';
import { LoadingSpinner } from '../components/ui';
import { ErrorBoundary } from '../components/ErrorBoundary';

interface LazyRouteProps {
  component: React.LazyExoticComponent<React.ComponentType>;
  fallback?: React.ComponentType;
}

export const LazyRoute: React.FC<LazyRouteProps> = ({
  component: Component,
  fallback: Fallback = LoadingSpinner
}) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Fallback />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
};
```

### 2. 路由预加载

```typescript
// src/router/preloader.ts
import { RouteConfig } from './types';

class RoutePreloader {
  private preloadedRoutes = new Set<string>();

  // 预加载路由组件
  preloadRoute(path: string, component: React.LazyExoticComponent<any>) {
    if (this.preloadedRoutes.has(path)) {
      return;
    }

    // 在空闲时间预加载
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        component().catch(console.error);
        this.preloadedRoutes.add(path);
      });
    } else {
      setTimeout(() => {
        component().catch(console.error);
        this.preloadedRoutes.add(path);
      }, 100);
    }
  }

  // 预加载相关路由
  preloadRelatedRoutes(currentPath: string, routes: RouteConfig[]) {
    const relatedPaths = this.getRelatedPaths(currentPath, routes);
    
    relatedPaths.forEach(path => {
      const route = routes.find(r => r.path === path);
      if (route && 'component' in route) {
        this.preloadRoute(path, route.component as any);
      }
    });
  }

  private getRelatedPaths(currentPath: string, routes: RouteConfig[]): string[] {
    // 根据当前路径推断可能访问的路由
    if (currentPath === '/') {
      return ['/news', '/channels'];
    }
    
    if (currentPath.startsWith('/news')) {
      return ['/news', '/channels', '/settings'];
    }
    
    return [];
  }
}

export const routePreloader = new RoutePreloader();
```

## 路由状态管理

### 1. 路由状态 Store

```typescript
// src/store/routerStore.ts
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface RouterState {
  currentPath: string;
  previousPath: string;
  params: Record<string, string>;
  query: Record<string, string>;
  breadcrumbs: Array<{ label: string; path: string }>;
  
  // Actions
  setCurrentPath: (path: string) => void;
  setParams: (params: Record<string, string>) => void;
  setQuery: (query: Record<string, string>) => void;
  setBreadcrumbs: (breadcrumbs: Array<{ label: string; path: string }>) => void;
  goBack: () => void;
}

export const useRouterStore = create<RouterState>()(
  subscribeWithSelector((set, get) => ({
    currentPath: '/',
    previousPath: '/',
    params: {},
    query: {},
    breadcrumbs: [],

    setCurrentPath: (path) => set((state) => ({
      previousPath: state.currentPath,
      currentPath: path
    })),

    setParams: (params) => set({ params }),
    setQuery: (query) => set({ query }),
    setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),

    goBack: () => {
      const { previousPath } = get();
      if (previousPath && previousPath !== get().currentPath) {
        window.history.back();
      }
    }
  }))
);
```

### 2. 路由同步 Hook

```typescript
// src/hooks/useRouterSync.ts
import { useEffect } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useRouterStore } from '../store/routerStore';

export const useRouterSync = () => {
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { setCurrentPath, setParams, setQuery } = useRouterStore();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname, setCurrentPath]);

  useEffect(() => {
    setParams(params);
  }, [params, setParams]);

  useEffect(() => {
    const query = Object.fromEntries(searchParams.entries());
    setQuery(query);
  }, [searchParams, setQuery]);
};
```

## SEO优化

### 1. 动态 Meta 标签

```typescript
// src/components/SEOHead.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime
}) => {
  const { t } = useTranslation();
  
  const defaultTitle = t('common.appName');
  const defaultDescription = t('common.appDescription');
  const fullTitle = title ? `${title} - ${defaultTitle}` : defaultTitle;
  const currentUrl = url || window.location.href;

  return (
    <Helmet>
      {/* 基础 Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {image && <meta name="twitter:image" content={image} />}

      {/* 文章特定 Meta */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* 规范链接 */}
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};
```

### 2. 结构化数据

```typescript
// src/components/StructuredData.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface NewsArticleData {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo: string;
  };
}

interface StructuredDataProps {
  type: 'NewsArticle' | 'WebSite' | 'Organization';
  data: any;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const generateStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type
    };

    switch (type) {
      case 'NewsArticle':
        return {
          ...baseData,
          headline: data.headline,
          description: data.description,
          image: data.image,
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished,
          author: {
            '@type': 'Person',
            name: data.author.name,
            url: data.author.url
          },
          publisher: {
            '@type': 'Organization',
            name: data.publisher.name,
            logo: {
              '@type': 'ImageObject',
              url: data.publisher.logo
            }
          }
        };

      case 'WebSite':
        return {
          ...baseData,
          name: data.name,
          url: data.url,
          description: data.description,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${data.url}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        };

      default:
        return { ...baseData, ...data };
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>
    </Helmet>
  );
};
```

## 错误处理

### 1. 路由错误边界

```typescript
// src/components/RouteErrorBoundary.tsx
import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';

export const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError();
  const { t } = useTranslation();

  const getErrorMessage = () => {
    if (isRouteErrorResponse(error)) {
      switch (error.status) {
        case 404:
          return t('errors.notFound');
        case 401:
          return t('errors.unauthorized');
        case 403:
          return t('errors.forbidden');
        case 500:
          return t('errors.serverError');
        default:
          return t('errors.unknown');
      }
    }

    if (error instanceof Error) {
      return error.message;
    }

    return t('errors.unknown');
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="route-error">
      <div className="route-error__content">
        <h1 className="route-error__title">
          {t('errors.title')}
        </h1>
        <p className="route-error__message">
          {getErrorMessage()}
        </p>
        <div className="route-error__actions">
          <Button onClick={handleRetry} variant="primary">
            {t('errors.retry')}
          </Button>
          <Button onClick={handleGoHome} variant="secondary">
            {t('errors.goHome')}
          </Button>
        </div>
      </div>
    </div>
  );
};
```

### 2. 404 页面

```typescript
// src/pages/NotFoundPage.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <>
      <SEOHead
        title={t('errors.notFound')}
        description={t('errors.notFoundDescription')}
      />
      
      <div className="not-found-page">
        <div className="not-found-page__content">
          <h1 className="not-found-page__title">404</h1>
          <h2 className="not-found-page__subtitle">
            {t('errors.pageNotFound')}
          </h2>
          <p className="not-found-page__message">
            {t('errors.pageNotFoundMessage', { path: location.pathname })}
          </p>
          
          <div className="not-found-page__actions">
            <Button as={Link} to="/" variant="primary">
              {t('errors.goHome')}
            </Button>
            <Button onClick={() => window.history.back()} variant="secondary">
              {t('errors.goBack')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
```

## 性能优化

### 1. 路由预加载策略

```typescript
// src/hooks/useRoutePreload.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routePreloader } from '../router/preloader';

export const useRoutePreload = () => {
  const location = useLocation();

  useEffect(() => {
    // 预加载相关路由
    const preloadTimer = setTimeout(() => {
      routePreloader.preloadRelatedRoutes(location.pathname, []);
    }, 2000); // 2秒后开始预加载

    return () => clearTimeout(preloadTimer);
  }, [location.pathname]);

  // 鼠标悬停时预加载
  const handleLinkHover = (path: string) => {
    const component = getRouteComponent(path);
    if (component) {
      routePreloader.preloadRoute(path, component);
    }
  };

  return { handleLinkHover };
};

const getRouteComponent = (path: string) => {
  // 根据路径返回对应的懒加载组件
  const routeMap: Record<string, any> = {
    '/news': () => import('../pages/NewsPage'),
    '/channels': () => import('../pages/ChannelsPage'),
    '/settings': () => import('../pages/SettingsPage')
  };

  return routeMap[path];
};
```

### 2. 路由缓存

```typescript
// src/components/KeepAlive.tsx
import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface KeepAliveProps {
  children: React.ReactNode;
  cacheKey: string;
  maxCache?: number;
}

const cache = new Map<string, React.ReactNode>();

export const KeepAlive: React.FC<KeepAliveProps> = ({
  children,
  cacheKey,
  maxCache = 10
}) => {
  const location = useLocation();
  const currentCacheKey = `${cacheKey}-${location.pathname}`;

  useEffect(() => {
    // 缓存当前组件
    cache.set(currentCacheKey, children);

    // 清理超出限制的缓存
    if (cache.size > maxCache) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
  }, [currentCacheKey, children, maxCache]);

  return <>{cache.get(currentCacheKey) || children}</>;
};
```

## 最佳实践

### 1. 路由命名约定

```typescript
// ✅ 好的路由命名
const routes = {
  home: '/',
  news: '/news',
  newsDetail: '/news/:id',
  newsCategory: '/news/category/:category',
  userProfile: '/user/:id/profile',
  adminDashboard: '/admin/dashboard'
};

// ❌ 不好的路由命名
const routes = {
  page1: '/p1',
  detail: '/d/:id',
  list: '/l/:type'
};
```

### 2. 参数验证

```typescript
// src/hooks/useRouteParams.ts
import { useParams } from 'react-router-dom';
import { z } from 'zod';

export const useValidatedParams = <T>(schema: z.ZodSchema<T>) => {
  const params = useParams();
  
  try {
    return schema.parse(params);
  } catch (error) {
    throw new Error(`Invalid route parameters: ${error}`);
  }
};

// 使用示例
const NewsDetailPage = () => {
  const paramsSchema = z.object({
    id: z.string().regex(/^\d+$/, 'ID must be numeric')
  });

  const { id } = useValidatedParams(paramsSchema);
  
  // id 现在是经过验证的字符串
};
```

### 3. 路由类型安全

```typescript
// src/router/routes.ts
export const ROUTES = {
  HOME: '/',
  NEWS: '/news',
  NEWS_DETAIL: '/news/:id',
  NEWS_CATEGORY: '/news/category/:category',
  CHANNELS: '/channels',
  SETTINGS: '/settings'
} as const;

// 类型安全的路由生成器
export const generatePath = {
  newsDetail: (id: string | number) => `/news/${id}`,
  newsCategory: (category: string) => `/news/category/${encodeURIComponent(category)}`,
  userProfile: (userId: string) => `/user/${userId}/profile`
};

// 使用示例
<Link to={generatePath.newsDetail(123)}>
  查看新闻详情
</Link>
```

### 4. 路由状态持久化

```typescript
// src/hooks/useRouteState.ts
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useRouteState = <T>(key: string, defaultValue: T) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [state, setState] = useState<T>(() => {
    const searchParams = new URLSearchParams(location.search);
    const value = searchParams.get(key);
    
    if (value) {
      try {
        return JSON.parse(value);
      } catch {
        return value as unknown as T;
      }
    }
    
    return defaultValue;
  });

  const updateState = (newState: T) => {
    setState(newState);
    
    const searchParams = new URLSearchParams(location.search);
    
    if (newState === defaultValue) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, JSON.stringify(newState));
    }
    
    navigate({
      pathname: location.pathname,
      search: searchParams.toString()
    }, { replace: true });
  };

  return [state, updateState] as const;
};
```

这个路由最佳实践指南提供了完整的路由管理方案，包括配置、守卫、懒加载、SEO优化和性能优化等方面的最佳实践。
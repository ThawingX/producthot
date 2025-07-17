# 路由最佳实践指南

## 目录

- [路由架构设计](#路由架构设计)
- [路由配置](#路由配置)
- [页面组件](#页面组件)
- [路由守卫](#路由守卫)
- [懒加载](#懒加载)
- [路由状态管理](#路由状态管理)
- [SEO优化](#seo优化)
- [错误处理](#错误处理)
- [性能优化](#性能优化)
- [最佳实践](#最佳实践)

## 路由架构设计

### 1. 路由层次结构

```
/                           # 首页
├── /news                   # 新闻列表
│   ├── /news/:id          # 新闻详情
│   └── /news/category/:category # 分类新闻
├── /channels               # 频道管理
│   ├── /channels/:id      # 频道详情
│   └── /channels/create   # 创建频道
├── /settings               # 设置页面
│   ├── /settings/profile  # 个人资料
│   ├── /settings/preferences # 偏好设置
│   └── /settings/notifications # 通知设置
├── /auth                   # 认证相关
│   ├── /auth/login        # 登录
│   ├── /auth/register     # 注册
│   └── /auth/forgot-password # 忘记密码
└── /admin                  # 管理后台
    ├── /admin/dashboard   # 仪表板
    ├── /admin/users       # 用户管理
    └── /admin/analytics   # 数据分析
```

### 2. 路由配置结构

```typescript
// src/router/types.ts
export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  meta?: {
    title?: string;
    requiresAuth?: boolean;
    roles?: string[];
    layout?: string;
    keepAlive?: boolean;
  };
  children?: RouteConfig[];
}

export interface RouteGuard {
  beforeEnter?: (to: RouteConfig, from: RouteConfig) => boolean | Promise<boolean>;
  beforeLeave?: (to: RouteConfig, from: RouteConfig) => boolean | Promise<boolean>;
}
```

## 路由配置

### 1. React Router 配置

```typescript
// src/router/index.tsx
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout';
import { LoadingSpinner } from '../components/ui';
import { ProtectedRoute } from './ProtectedRoute';
import { RouteGuard } from './RouteGuard';

// 懒加载页面组件
const HomePage = React.lazy(() => import('../pages/HomePage'));
const NewsPage = React.lazy(() => import('../pages/NewsPage'));
const NewsDetailPage = React.lazy(() => import('../pages/NewsDetailPage'));
const ChannelsPage = React.lazy(() => import('../pages/ChannelsPage'));
const SettingsPage = React.lazy(() => import('../pages/SettingsPage'));
const LoginPage = React.lazy(() => import('../pages/auth/LoginPage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* 公开路由 */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            
            {/* 新闻相关路由 */}
            <Route path="news">
              <Route index element={<NewsPage />} />
              <Route path=":id" element={<NewsDetailPage />} />
              <Route path="category/:category" element={<NewsPage />} />
            </Route>

            {/* 需要认证的路由 */}
            <Route element={<ProtectedRoute />}>
              <Route path="channels">
                <Route index element={<ChannelsPage />} />
                <Route path=":id" element={<ChannelsPage />} />
                <Route path="create" element={<ChannelsPage />} />
              </Route>

              <Route path="settings">
                <Route index element={<SettingsPage />} />
                <Route path="profile" element={<SettingsPage />} />
                <Route path="preferences" element={<SettingsPage />} />
                <Route path="notifications" element={<SettingsPage />} />
              </Route>
            </Route>

            {/* 管理员路由 */}
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="admin/*" element={<AdminRoutes />} />
            </Route>
          </Route>

          {/* 认证路由 (无布局) */}
          <Route path="auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* 重定向和错误处理 */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
```

### 2. 路由配置文件

```typescript
// src/router/routes.ts
import { RouteConfig } from './types';

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    meta: {
      title: 'ProductHot - 热门产品追踪',
      layout: 'default'
    }
  },
  {
    path: '/news',
    component: NewsPage,
    meta: {
      title: '新闻列表',
      keepAlive: true
    },
    children: [
      {
        path: '/news/:id',
        component: NewsDetailPage,
        meta: {
          title: '新闻详情'
        }
      }
    ]
  },
  {
    path: '/channels',
    component: ChannelsPage,
    meta: {
      title: '频道管理',
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    component: SettingsPage,
    meta: {
      title: '设置',
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: {
      title: '管理后台',
      requiresAuth: true,
      roles: ['admin']
    }
  }
];
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
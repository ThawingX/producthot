# 多语言国际化最佳实践指南

## 目录
1. [设计原则](#设计原则)
2. [项目结构](#项目结构)
3. [配置初始化](#配置初始化)
4. [翻译资源管理](#翻译资源管理)
5. [组件中的使用](#组件中的使用)
6. [动态语言切换](#动态语言切换)
7. [格式化处理](#格式化处理)
8. [性能优化](#性能优化)
9. [测试策略](#测试策略)
10. [维护规范](#维护规范)

## 设计原则

### 1. 结构化组织
- 按功能模块组织翻译键
- 使用嵌套结构避免键名冲突
- 保持键名语义化和一致性

### 2. 可扩展性
- 支持动态添加新语言
- 支持懒加载翻译资源
- 支持命名空间隔离

### 3. 开发体验
- 提供类型安全的翻译键
- 支持开发时的调试模式
- 提供翻译缺失检测

## 项目结构

```
src/
├── i18n/
│   └── index.ts              # 主配置文件（包含所有翻译）
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # 使用语言切换
│   │   └── Sidebar.tsx       # 使用导航翻译
│   └── news/
│       ├── NewsCard.tsx      # 使用新闻翻译
│       └── NewsFilters.tsx   # 使用筛选翻译
└── pages/
    └── HomePage.tsx          # 使用通用翻译
```

## 配置初始化

### 1. 主配置文件 (src/i18n/index.ts)

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 支持的语言列表
export const supportedLanguages = [
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
] as const;

export type SupportedLanguage = typeof supportedLanguages[number]['code'];

// 中文翻译
const zhCN = {
  common: {
    loading: '加载中...',
    error: '错误',
    success: '成功',
    cancel: '取消',
    confirm: '确认',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    search: '搜索',
    filter: '筛选',
    sort: '排序',
    refresh: '刷新',
    more: '更多',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    submit: '提交',
    reset: '重置',
    close: '关闭',
    open: '打开',
    view: '查看',
    share: '分享',
    like: '点赞',
    bookmark: '收藏',
    subscribe: '订阅',
    unsubscribe: '取消订阅',
  },
  navigation: {
    home: '首页',
    trending: '热门',
    channels: '频道',
    bookmarks: '收藏',
    settings: '设置',
    profile: '个人资料',
    login: '登录',
    logout: '退出登录',
    register: '注册',
  },
  news: {
    title: '新闻标题',
    summary: '摘要',
    content: '内容',
    author: '作者',
    publishDate: '发布时间',
    readTime: '阅读时间',
    views: '浏览量',
    likes: '点赞数',
    comments: '评论',
    tags: '标签',
    category: '分类',
    relatedNews: '相关新闻',
    noNews: '暂无新闻',
    loadMore: '加载更多',
    searchPlaceholder: '搜索新闻...',
    filterByCategory: '按分类筛选',
    sortByDate: '按时间排序',
    sortByViews: '按浏览量排序',
    sortByLikes: '按点赞数排序',
  },
  channels: {
    allChannels: '所有频道',
    subscribed: '已订阅',
    recommended: '推荐',
    technology: '科技',
    business: '商业',
    startup: '创业',
    design: '设计',
    development: '开发',
    ai: '人工智能',
    mobile: '移动端',
    web: 'Web开发',
    noChannels: '暂无频道',
    subscribeSuccess: '订阅成功',
    unsubscribeSuccess: '取消订阅成功',
  },
  settings: {
    general: '通用设置',
    appearance: '外观',
    notifications: '通知',
    privacy: '隐私',
    account: '账户',
    language: '语言',
    theme: '主题',
    lightTheme: '浅色主题',
    darkTheme: '深色主题',
    systemTheme: '跟随系统',
    emailNotifications: '邮件通知',
    pushNotifications: '推送通知',
    desktopNotifications: '桌面通知',
    autoRefresh: '自动刷新',
    refreshInterval: '刷新间隔',
    compactView: '紧凑视图',
    showImages: '显示图片',
  },
  auth: {
    email: '邮箱',
    password: '密码',
    confirmPassword: '确认密码',
    name: '姓名',
    loginTitle: '登录',
    registerTitle: '注册',
    forgotPassword: '忘记密码？',
    rememberMe: '记住我',
    loginSuccess: '登录成功',
    registerSuccess: '注册成功',
    logoutSuccess: '退出成功',
    invalidCredentials: '用户名或密码错误',
    emailRequired: '请输入邮箱',
    passwordRequired: '请输入密码',
    nameRequired: '请输入姓名',
    emailInvalid: '邮箱格式不正确',
    passwordTooShort: '密码至少6位',
    passwordMismatch: '两次密码不一致',
  },
  errors: {
    networkError: '网络连接失败',
    serverError: '服务器错误',
    notFound: '页面未找到',
    unauthorized: '未授权访问',
    forbidden: '权限不足',
    validationError: '数据验证失败',
    unknownError: '未知错误',
    tryAgain: '请重试',
  },
  time: {
    justNow: '刚刚',
    minutesAgo: '{{count}}分钟前',
    hoursAgo: '{{count}}小时前',
    daysAgo: '{{count}}天前',
    weeksAgo: '{{count}}周前',
    monthsAgo: '{{count}}月前',
    yearsAgo: '{{count}}年前',
  },
};

// 英文翻译
const enUS = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    refresh: 'Refresh',
    more: 'More',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    reset: 'Reset',
    close: 'Close',
    open: 'Open',
    view: 'View',
    share: 'Share',
    like: 'Like',
    bookmark: 'Bookmark',
    subscribe: 'Subscribe',
    unsubscribe: 'Unsubscribe',
  },
  navigation: {
    home: 'Home',
    trending: 'Trending',
    channels: 'Channels',
    bookmarks: 'Bookmarks',
    settings: 'Settings',
    profile: 'Profile',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
  },
  news: {
    title: 'Title',
    summary: 'Summary',
    content: 'Content',
    author: 'Author',
    publishDate: 'Publish Date',
    readTime: 'Read Time',
    views: 'Views',
    likes: 'Likes',
    comments: 'Comments',
    tags: 'Tags',
    category: 'Category',
    relatedNews: 'Related News',
    noNews: 'No news available',
    loadMore: 'Load More',
    searchPlaceholder: 'Search news...',
    filterByCategory: 'Filter by Category',
    sortByDate: 'Sort by Date',
    sortByViews: 'Sort by Views',
    sortByLikes: 'Sort by Likes',
  },
  channels: {
    allChannels: 'All Channels',
    subscribed: 'Subscribed',
    recommended: 'Recommended',
    technology: 'Technology',
    business: 'Business',
    startup: 'Startup',
    design: 'Design',
    development: 'Development',
    ai: 'AI',
    mobile: 'Mobile',
    web: 'Web Development',
    noChannels: 'No channels available',
    subscribeSuccess: 'Subscribed successfully',
    unsubscribeSuccess: 'Unsubscribed successfully',
  },
  settings: {
    general: 'General',
    appearance: 'Appearance',
    notifications: 'Notifications',
    privacy: 'Privacy',
    account: 'Account',
    language: 'Language',
    theme: 'Theme',
    lightTheme: 'Light Theme',
    darkTheme: 'Dark Theme',
    systemTheme: 'System Theme',
    emailNotifications: 'Email Notifications',
    pushNotifications: 'Push Notifications',
    desktopNotifications: 'Desktop Notifications',
    autoRefresh: 'Auto Refresh',
    refreshInterval: 'Refresh Interval',
    compactView: 'Compact View',
    showImages: 'Show Images',
  },
  auth: {
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    name: 'Name',
    loginTitle: 'Login',
    registerTitle: 'Register',
    forgotPassword: 'Forgot Password?',
    rememberMe: 'Remember Me',
    loginSuccess: 'Login successful',
    registerSuccess: 'Registration successful',
    logoutSuccess: 'Logout successful',
    invalidCredentials: 'Invalid email or password',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    nameRequired: 'Name is required',
    emailInvalid: 'Invalid email format',
    passwordTooShort: 'Password must be at least 6 characters',
    passwordMismatch: 'Passwords do not match',
  },
  errors: {
    networkError: 'Network connection failed',
    serverError: 'Server error',
    notFound: 'Page not found',
    unauthorized: 'Unauthorized access',
    forbidden: 'Insufficient permissions',
    validationError: 'Data validation failed',
    unknownError: 'Unknown error',
    tryAgain: 'Please try again',
  },
  time: {
    justNow: 'Just now',
    minutesAgo: '{{count}} minutes ago',
    hoursAgo: '{{count}} hours ago',
    daysAgo: '{{count}} days ago',
    weeksAgo: '{{count}} weeks ago',
    monthsAgo: '{{count}} months ago',
    yearsAgo: '{{count}} years ago',
  },
};

// 初始化i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'zh-CN': { translation: zhCN },
      'en-US': { translation: enUS },
    },
    fallbackLng: 'zh-CN',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React 已经处理了 XSS
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
```

### 2. 类型定义

```typescript
// 翻译键类型
export interface TranslationKeys {
  common: typeof zhCN.common;
  navigation: typeof zhCN.navigation;
  news: typeof zhCN.news;
  channels: typeof zhCN.channels;
  settings: typeof zhCN.settings;
  auth: typeof zhCN.auth;
  errors: typeof zhCN.errors;
  time: typeof zhCN.time;
}

// 类型安全的翻译函数
export type TypedTFunction = (key: string, options?: any) => string;

// 语言切换事件
export interface LanguageChangeEvent {
  language: string;
  previousLanguage: string;
}
```

## 翻译资源管理

### 1. 集中式翻译管理

项目采用集中式翻译管理，所有翻译资源都定义在 `src/i18n/index.ts` 文件中：

```typescript
// 中文翻译资源
const zhCN = {
  common: {
    loading: '加载中...',
    error: '错误',
    success: '成功',
    // ... 更多通用翻译
  },
  navigation: {
    home: '首页',
    trending: '热门',
    channels: '频道',
    // ... 更多导航翻译
  },
  news: {
    title: '新闻标题',
    summary: '摘要',
    content: '内容',
    // ... 更多新闻翻译
  },
  // ... 其他模块
};

// 英文翻译资源
const enUS = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    // ... 更多通用翻译
  },
  navigation: {
    home: 'Home',
    trending: 'Trending',
    channels: 'Channels',
    // ... 更多导航翻译
  },
  news: {
    title: 'Title',
    summary: 'Summary',
    content: 'Content',
    // ... 更多新闻翻译
  },
  // ... 其他模块
};
```

### 2. 翻译键组织原则

- **模块化分组**：按功能模块（common、navigation、news等）组织翻译键
- **语义化命名**：使用清晰、语义化的键名
- **一致性**：保持中英文翻译键结构完全一致
- **扁平化**：避免过深的嵌套层级，保持结构简洁

### 3. 资源初始化配置

```typescript
// 初始化i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'zh-CN': { translation: zhCN },
      'en-US': { translation: enUS },
    },
    fallbackLng: 'zh-CN',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React 已经处理了 XSS
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });
```

## 组件中的使用

### 1. 基础翻译

```typescript
import { useTranslation } from 'react-i18next';

function NewsCard() {
  const { t } = useTranslation();

  return (
    <div className="news-card">
      <h3>{t('news.title')}</h3>
      <p>{t('news.summary')}</p>
      <div className="actions">
        <button>{t('common.like')}</button>
        <button>{t('common.share')}</button>
        <button>{t('common.bookmark')}</button>
      </div>
    </div>
  );
}
```

### 2. 带参数的翻译

```typescript
import { useTranslation } from 'react-i18next';

function TimeDisplay({ minutes }: { minutes: number }) {
  const { t } = useTranslation();

  return (
    <span className="time-display">
      {t('time.minutesAgo', { count: minutes })}
    </span>
  );
}

// 使用示例
<TimeDisplay minutes={5} /> // 输出: "5分钟前" 或 "5 minutes ago"
```

### 3. 复杂组件示例

```typescript
import { useTranslation } from 'react-i18next';

function NewsFilters() {
  const { t } = useTranslation();

  return (
    <div className="news-filters">
      <input 
        type="text" 
        placeholder={t('news.searchPlaceholder')}
        className="search-input"
      />
      <select className="category-filter">
        <option value="">{t('news.filterByCategory')}</option>
        <option value="tech">{t('channels.technology')}</option>
        <option value="business">{t('channels.business')}</option>
        <option value="startup">{t('channels.startup')}</option>
      </select>
      <select className="sort-filter">
        <option value="date">{t('news.sortByDate')}</option>
        <option value="views">{t('news.sortByViews')}</option>
        <option value="likes">{t('news.sortByLikes')}</option>
      </select>
    </div>
  );
}
```

### 4. 错误处理和加载状态

```typescript
import { useTranslation } from 'react-i18next';

function NewsPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loading) {
    return <div className="loading">{t('common.loading')}</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{t('errors.networkError')}</p>
        <button onClick={retry}>{t('errors.tryAgain')}</button>
      </div>
    );
  }

  return (
    <div className="news-page">
      {/* 新闻内容 */}
    </div>
  );
}
```

### 5. 基础使用

```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';

interface NewsCardProps {
  title: string;
  summary: string;
  publishDate: string;
  views: number;
  likes: number;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  title,
  summary,
  publishDate,
  views,
  likes,
}) => {
  const { t } = useTranslation();

  return (
    <div className="news-card">
      <h3>{title}</h3>
      <p>{summary}</p>
      <div className="news-meta">
        <span>{t('news.publishDate')}: {publishDate}</span>
        <span>{t('news.views')}: {views}</span>
        <span>{t('news.likes')}: {likes}</span>
      </div>
      <div className="news-actions">
        <button>{t('common.view')}</button>
        <button>{t('common.like')}</button>
        <button>{t('common.share')}</button>
      </div>
    </div>
  );
};
```

### 2. 带参数的翻译

```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';

interface TimeDisplayProps {
  timestamp: number;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ timestamp }) => {
  const { t } = useTranslation();
  
  const getRelativeTime = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return t('time.justNow');
    if (minutes < 60) return t('time.minutesAgo', { count: minutes });
    if (hours < 24) return t('time.hoursAgo', { count: hours });
    return t('time.daysAgo', { count: days });
  };

  return <span>{getRelativeTime(timestamp)}</span>;
};
```

### 3. 命名空间使用

```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';

export const AuthForm: React.FC = () => {
  const { t } = useTranslation('auth'); // 指定命名空间

  return (
    <form>
      <h2>{t('loginTitle')}</h2>
      <input placeholder={t('email')} />
      <input placeholder={t('password')} type="password" />
      <button type="submit">{t('loginTitle')}</button>
      <a href="/forgot-password">{t('forgotPassword')}</a>
    </form>
  );
};
```

## 动态语言切换

### 1. 语言切换组件

```typescript
import { useTranslation } from 'react-i18next';
import { supportedLanguages, type SupportedLanguage } from '@/i18n';

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (language: SupportedLanguage) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="language-switcher">
      <label>{t('settings.language')}</label>
      <select 
        value={i18n.language} 
        onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
        className="language-select"
      >
        {supportedLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
```

### 2. 语言切换按钮组

```typescript
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '@/i18n';

function LanguageToggle() {
  const { i18n } = useTranslation();

  return (
    <div className="language-toggle">
      {supportedLanguages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`language-btn ${
            i18n.language === lang.code ? 'active' : ''
          }`}
        >
          {lang.flag} {lang.name}
        </button>
      ))}
    </div>
  );
}
```

### 3. 语言切换Hook

```typescript
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { type SupportedLanguage } from '@/i18n';

export function useLanguage() {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback((language: SupportedLanguage) => {
    i18n.changeLanguage(language);
  }, [i18n]);

  const getCurrentLanguage = useCallback(() => {
    return i18n.language as SupportedLanguage;
  }, [i18n.language]);

  const isLanguage = useCallback((language: SupportedLanguage) => {
    return i18n.language === language;
  }, [i18n.language]);

  return {
    currentLanguage: getCurrentLanguage(),
    changeLanguage,
    isLanguage,
  };
}
```

### 4. 在设置页面中使用

```typescript
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { supportedLanguages } from '@/i18n';

function SettingsPage() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className="settings-page">
      <h1>{t('settings.general')}</h1>
      
      <div className="setting-group">
        <h3>{t('settings.language')}</h3>
        <div className="language-options">
          {supportedLanguages.map((lang) => (
            <label key={lang.code} className="language-option">
              <input
                type="radio"
                name="language"
                value={lang.code}
                checked={currentLanguage === lang.code}
                onChange={() => changeLanguage(lang.code)}
              />
              <span>{lang.flag} {lang.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## 格式化处理

### 1. 时间格式化

```typescript
import { useTranslation } from 'react-i18next';

function formatTimeAgo(date: Date): string {
  const { t } = useTranslation();
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return t('time.justNow');
  if (diffInMinutes < 60) return t('time.minutesAgo', { count: diffInMinutes });
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return t('time.hoursAgo', { count: diffInHours });
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return t('time.daysAgo', { count: diffInDays });
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return t('time.weeksAgo', { count: diffInWeeks });
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return t('time.monthsAgo', { count: diffInMonths });
  
  const diffInYears = Math.floor(diffInDays / 365);
  return t('time.yearsAgo', { count: diffInYears });
}

// 使用示例
function NewsItem({ publishDate }: { publishDate: Date }) {
  return (
    <div className="news-item">
      <span className="publish-time">
        {formatTimeAgo(publishDate)}
      </span>
    </div>
  );
}
```

### 2. 数字格式化增强

```typescript
import { useTranslation } from 'react-i18next';

function formatCompactNumber(num: number): string {
  const { i18n } = useTranslation();
  
  return new Intl.NumberFormat(i18n.language, {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(num);
}

function formatPercentage(value: number): string {
  const { i18n } = useTranslation();
  
  return new Intl.NumberFormat(i18n.language, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(value);
}

// 使用示例
function NewsStats({ views, likes, engagement }: { 
  views: number; 
  likes: number; 
  engagement: number; 
}) {
  const { t } = useTranslation();
  
  return (
    <div className="news-stats">
      <span>{t('news.views')}: {formatCompactNumber(views)}</span>
      <span>{t('news.likes')}: {formatCompactNumber(likes)}</span>
      <span>{t('news.engagement')}: {formatPercentage(engagement)}</span>
    </div>
  );
}
```

## 性能优化增强

### 1. 翻译缓存策略

```typescript
// i18n配置中已包含缓存设置
i18n.init({
  // ...其他配置
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'], // 缓存到localStorage
  },
});

// 自定义缓存管理
class I18nCache {
  private cache = new Map<string, string>();
  private maxSize = 500;

  get(key: string, lng: string): string | undefined {
    return this.cache.get(`${lng}:${key}`);
  }

  set(key: string, lng: string, value: string): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(`${lng}:${key}`, value);
  }

  clear(): void {
    this.cache.clear();
  }
}

export const i18nCache = new I18nCache();
```

### 2. 避免重复渲染

```typescript
import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';

// 使用memo避免不必要的重新渲染
const NewsCard = memo(function NewsCard({ news }: { news: News }) {
  const { t } = useTranslation();

  // 缓存翻译结果
  const translations = useMemo(() => ({
    title: t('news.title'),
    summary: t('news.summary'),
    views: t('news.views'),
    likes: t('news.likes')
  }), [t]);

  return (
    <div className="news-card">
      <h3>{translations.title}</h3>
      <p>{news.summary}</p>
      <div className="stats">
        <span>{translations.views}: {news.views}</span>
        <span>{translations.likes}: {news.likes}</span>
      </div>
    </div>
  );
});
```

### 3. 翻译键预加载

```typescript
// 在应用启动时预加载常用翻译
import i18n from '@/i18n';

export async function preloadTranslations() {
  // 确保i18n已初始化
  await i18n.loadLanguages(['zh-CN', 'en-US']);
  
  // 预加载关键翻译键
  const criticalKeys = [
    'common.loading',
    'common.error',
    'common.success',
    'navigation.home',
    'navigation.trending',
    'news.title',
    'news.summary'
  ];
  
  criticalKeys.forEach(key => {
    i18n.t(key); // 触发翻译加载
  });
}
```

## 测试策略完善

### 1. 翻译键测试

```typescript
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import NewsCard from '@/components/NewsCard';

// 测试翻译键是否正确显示
describe('NewsCard', () => {
  beforeEach(() => {
    // 重置语言设置
    i18n.changeLanguage('zh-CN');
  });

  it('should display translated text in Chinese', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <NewsCard />
      </I18nextProvider>
    );

    expect(screen.getByText('新闻标题')).toBeInTheDocument();
    expect(screen.getByText('摘要')).toBeInTheDocument();
  });

  it('should display English text when language is changed', async () => {
    await i18n.changeLanguage('en-US');
    
    render(
      <I18nextProvider i18n={i18n}>
        <NewsCard />
      </I18nextProvider>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Summary')).toBeInTheDocument();
  });
});
```

### 2. 语言切换测试

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

describe('LanguageSwitcher', () => {
  it('should change language when option is selected', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'en-US' } });

    await waitFor(() => {
      expect(i18n.language).toBe('en-US');
    });
  });

  it('should persist language selection', async () => {
    const { rerender } = render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );

    // 切换语言
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'en-US' } });

    // 重新渲染组件
    rerender(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );

    expect(select).toHaveValue('en-US');
  });
});
```

### 3. 翻译完整性测试

```typescript
import { zhCN, enUS } from '@/i18n';

describe('Translation completeness', () => {
  function checkTranslationKeys(obj1: any, obj2: any, path = '') {
    for (const key in obj1) {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof obj1[key] === 'object' && obj1[key] !== null) {
        expect(obj2).toHaveProperty(key);
        checkTranslationKeys(obj1[key], obj2[key], currentPath);
      } else {
        expect(obj2).toHaveProperty(key);
        expect(typeof obj2[key]).toBe('string');
        expect(obj2[key].length).toBeGreaterThan(0);
      }
    }
  }

  it('should have complete English translations', () => {
    checkTranslationKeys(zhCN, enUS);
  });

  it('should have complete Chinese translations', () => {
    checkTranslationKeys(enUS, zhCN);
  });

  it('should not have empty translation values', () => {
    const checkEmptyValues = (obj: any, path = '') => {
      for (const key in obj) {
        const currentPath = path ? `${path}.${key}` : key;
        
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          checkEmptyValues(obj[key], currentPath);
        } else {
          expect(obj[key]).toBeTruthy();
          expect(obj[key].trim()).not.toBe('');
        }
      }
    };

    checkEmptyValues(zhCN);
    checkEmptyValues(enUS);
  });
});
```

### 4. 格式化函数测试

```typescript
import { formatTimeAgo, formatCompactNumber } from '@/utils/formatters';
import i18n from '@/i18n';

describe('Formatters', () => {
  beforeEach(() => {
    // 设置测试语言
    i18n.changeLanguage('zh-CN');
  });

  describe('formatTimeAgo', () => {
    it('should format recent time correctly', () => {
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      
      expect(formatTimeAgo(fiveMinutesAgo)).toBe('5分钟前');
    });

    it('should format hours correctly', () => {
      const now = new Date();
      const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
      
      expect(formatTimeAgo(twoHoursAgo)).toBe('2小时前');
    });

    it('should format days correctly', () => {
      const now = new Date();
      const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
      
      expect(formatTimeAgo(threeDaysAgo)).toBe('3天前');
    });
  });

  describe('formatCompactNumber', () => {
    it('should format thousands correctly', () => {
      expect(formatCompactNumber(1000)).toBe('1K');
      expect(formatCompactNumber(1500)).toBe('1.5K');
    });

    it('should format millions correctly', () => {
      expect(formatCompactNumber(1000000)).toBe('1M');
      expect(formatCompactNumber(2500000)).toBe('2.5M');
    });

    it('should handle small numbers', () => {
      expect(formatCompactNumber(999)).toBe('999');
    });
  });
});
```

## 维护规范完善

### 1. 翻译键命名规范

- **模块前缀**：使用模块名作为前缀（如 `news.`, `common.`）
- **语义化**：键名应该清晰表达含义
- **一致性**：保持命名风格一致
- **避免缩写**：使用完整单词而非缩写
- **层级控制**：避免过深的嵌套，建议最多3层

```typescript
// ✅ 好的命名
'news.searchPlaceholder'
'common.loading'
'auth.loginSuccess'
'user.profile.editButton'

// ❌ 避免的命名
'news.searchPH'
'common.load'
'auth.loginOK'
'user.profile.settings.notification.email.enabled'
```

### 2. 翻译内容规范

- **准确性**：确保翻译准确传达原意
- **一致性**：相同概念使用相同翻译
- **简洁性**：避免冗长的翻译文本
- **本地化**：考虑目标语言的文化背景
- **上下文**：提供足够的上下文信息

### 3. 新增翻译流程

1. **添加中文翻译**：在 `zhCN` 对象中添加新的翻译键
2. **添加英文翻译**：在 `enUS` 对象中添加对应的英文翻译
3. **更新类型定义**：确保 `TranslationKeys` 接口包含新的键
4. **编写测试**：为新的翻译键编写测试用例
5. **代码审查**：确保翻译质量和一致性
6. **文档更新**：更新相关文档和注释

### 4. 翻译质量检查

```typescript
// 检查翻译键是否存在
function checkTranslationKey(key: string, language: string = 'zh-CN'): boolean {
  return i18n.exists(key, { lng: language });
}

// 检查所有支持语言的翻译
function validateTranslations() {
  const missingKeys: string[] = [];
  const supportedLanguages = ['zh-CN', 'en-US'];
  
  supportedLanguages.forEach(lang => {
    // 检查关键翻译键是否存在
    const criticalKeys = [
      'common.loading',
      'common.error',
      'common.success',
      'navigation.home',
      'news.title'
    ];
    
    criticalKeys.forEach(key => {
      if (!checkTranslationKey(key, lang)) {
        missingKeys.push(`${lang}: ${key}`);
      }
    });
  });
  
  if (missingKeys.length > 0) {
    console.warn('Missing translations:', missingKeys);
  }
  
  return missingKeys.length === 0;
}

// 检查翻译值是否为空
function checkEmptyTranslations() {
  const emptyKeys: string[] = [];
  const languages = ['zh-CN', 'en-US'];
  
  languages.forEach(lang => {
    const checkObject = (obj: any, prefix = '') => {
      for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          checkObject(obj[key], fullKey);
        } else if (!obj[key] || obj[key].trim() === '') {
          emptyKeys.push(`${lang}: ${fullKey}`);
        }
      }
    };
    
    const translations = lang === 'zh-CN' ? zhCN : enUS;
    checkObject(translations);
  });
  
  return emptyKeys;
}
```

### 5. 自动化工具

```typescript
// scripts/i18n-tools.ts

// 提取未使用的翻译键
function findUnusedTranslationKeys(): string[] {
  const allKeys = getAllTranslationKeys();
  const usedKeys = extractUsedKeysFromCode();
  
  return allKeys.filter(key => !usedKeys.includes(key));
}

// 从代码中提取使用的翻译键
function extractUsedKeysFromCode(): string[] {
  const fs = require('fs');
  const path = require('path');
  const glob = require('glob');
  
  const files = glob.sync('src/**/*.{ts,tsx}');
  const usedKeys: string[] = [];
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/t\(['"`]([^'"`]+)['"`]\)/g);
    
    if (matches) {
      matches.forEach(match => {
        const key = match.match(/t\(['"`]([^'"`]+)['"`]\)/)?.[1];
        if (key && !usedKeys.includes(key)) {
          usedKeys.push(key);
        }
      });
    }
  });
  
  return usedKeys;
}

// 生成翻译报告
function generateTranslationReport() {
  const report = {
    totalKeys: getAllTranslationKeys().length,
    missingTranslations: validateTranslations(),
    emptyTranslations: checkEmptyTranslations(),
    unusedKeys: findUnusedTranslationKeys(),
    coverage: calculateTranslationCoverage()
  };
  
  console.log('Translation Report:', JSON.stringify(report, null, 2));
  return report;
}
```

### 6. CI/CD 集成

```yaml
# .github/workflows/i18n-check.yml
name: I18n Check

on:
  pull_request:
    paths:
      - 'src/**/*.ts'
      - 'src/**/*.tsx'
      - 'src/i18n/**'

jobs:
  i18n-check:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Check translation completeness
        run: npm run i18n:check
        
      - name: Check for unused translations
        run: npm run i18n:unused
        
      - name: Generate translation report
        run: npm run i18n:report
```

### 7. 最佳实践总结

1. **集中管理**：所有翻译资源集中在一个文件中管理
2. **类型安全**：使用TypeScript确保翻译键的类型安全
3. **模块化组织**：按功能模块组织翻译键
4. **性能优化**：合理使用缓存和memo优化性能
5. **测试覆盖**：确保翻译功能有充分的测试覆盖
6. **持续维护**：建立翻译质量检查和更新流程
7. **自动化检查**：使用工具自动检查翻译完整性和一致性
8. **文档化**：维护清晰的翻译规范和使用文档
9. **版本控制**：对翻译变更进行版本控制和审查
10. **用户体验**：确保翻译质量和本地化体验
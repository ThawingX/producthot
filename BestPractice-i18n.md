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
│   ├── index.ts              # 主配置文件
│   ├── locales/              # 翻译资源目录
│   │   ├── zh-CN/
│   │   │   ├── common.ts     # 通用翻译
│   │   │   ├── navigation.ts # 导航翻译
│   │   │   ├── news.ts       # 新闻模块翻译
│   │   │   └── index.ts      # 导出文件
│   │   ├── en-US/
│   │   │   ├── common.ts
│   │   │   ├── navigation.ts
│   │   │   ├── news.ts
│   │   │   └── index.ts
│   │   └── index.ts          # 语言包导出
│   ├── types.ts              # 类型定义
│   └── utils.ts              # 工具函数
```

## 配置初始化

### 1. 主配置文件 (i18n/index.ts)

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { locales } from './locales';

// 支持的语言列表
export const supportedLanguages = [
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
] as const;

export type SupportedLanguage = typeof supportedLanguages[number]['code'];

// i18n 配置
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: locales,
    fallbackLng: 'zh-CN',
    debug: process.env.NODE_ENV === 'development',
    
    // 插值配置
    interpolation: {
      escapeValue: false, // React 已经处理了 XSS
      formatSeparator: ',',
    },
    
    // 语言检测配置
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      checkWhitelist: true,
    },
    
    // 后端配置（用于动态加载）
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    // 命名空间
    defaultNS: 'common',
    ns: ['common', 'navigation', 'news', 'channels', 'settings', 'auth', 'errors'],
    
    // 键分隔符
    keySeparator: '.',
    nsSeparator: ':',
  });

export default i18n;
```

### 2. 类型定义 (i18n/types.ts)

```typescript
import { TFunction } from 'i18next';

// 翻译键类型
export interface TranslationKeys {
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    delete: string;
    edit: string;
    search: string;
    filter: string;
    sort: string;
    refresh: string;
    more: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    reset: string;
    close: string;
    open: string;
    view: string;
    share: string;
    like: string;
    bookmark: string;
    subscribe: string;
    unsubscribe: string;
  };
  navigation: {
    home: string;
    trending: string;
    channels: string;
    bookmarks: string;
    settings: string;
    profile: string;
    login: string;
    logout: string;
    register: string;
  };
  news: {
    title: string;
    summary: string;
    content: string;
    author: string;
    publishDate: string;
    readTime: string;
    views: string;
    likes: string;
    comments: string;
    tags: string;
    category: string;
    relatedNews: string;
    noNews: string;
    loadMore: string;
    searchPlaceholder: string;
    filterByCategory: string;
    sortByDate: string;
    sortByViews: string;
    sortByLikes: string;
  };
  // ... 其他模块
}

// 类型安全的翻译函数
export type TypedTFunction = TFunction<keyof TranslationKeys>;

// 语言切换事件
export interface LanguageChangeEvent {
  language: string;
  previousLanguage: string;
}
```

## 翻译资源管理

### 1. 模块化翻译文件 (locales/zh-CN/common.ts)

```typescript
export const common = {
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
} as const;
```

### 2. 语言包导出 (locales/zh-CN/index.ts)

```typescript
import { common } from './common';
import { navigation } from './navigation';
import { news } from './news';
import { channels } from './channels';
import { settings } from './settings';
import { auth } from './auth';
import { errors } from './errors';
import { time } from './time';

export const zhCN = {
  common,
  navigation,
  news,
  channels,
  settings,
  auth,
  errors,
  time,
} as const;
```

### 3. 统一导出 (locales/index.ts)

```typescript
import { zhCN } from './zh-CN';
import { enUS } from './en-US';

export const locales = {
  'zh-CN': { translation: zhCN },
  'en-US': { translation: enUS },
} as const;

export type LocaleKey = keyof typeof locales;
```

## 组件中的使用

### 1. 基础使用

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
import React from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, SupportedLanguage } from '../i18n';

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = async (language: SupportedLanguage) => {
    try {
      await i18n.changeLanguage(language);
      // 可以在这里添加语言切换成功的提示
      console.log(`Language changed to ${language}`);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  return (
    <div className="language-switcher">
      <label>{t('settings.language')}</label>
      <select
        value={i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
      >
        {supportedLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};
```

### 2. 语言切换Hook

```typescript
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SupportedLanguage } from '../i18n';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(async (language: SupportedLanguage) => {
    try {
      await i18n.changeLanguage(language);
      // 触发自定义事件
      window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language, previousLanguage: i18n.language }
      }));
      return true;
    } catch (error) {
      console.error('Failed to change language:', error);
      return false;
    }
  }, [i18n]);

  const getCurrentLanguage = useCallback((): SupportedLanguage => {
    return i18n.language as SupportedLanguage;
  }, [i18n.language]);

  const isLanguageSupported = useCallback((language: string): boolean => {
    return supportedLanguages.some(lang => lang.code === language);
  }, []);

  return {
    currentLanguage: getCurrentLanguage(),
    changeLanguage,
    isLanguageSupported,
    supportedLanguages,
  };
};
```

## 格式化处理

### 1. 数字格式化

```typescript
import { useTranslation } from 'react-i18next';

export const useNumberFormat = () => {
  const { i18n } = useTranslation();

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat(i18n.language).format(value);
  };

  const formatCurrency = (value: number, currency = 'CNY'): string => {
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency,
    }).format(value);
  };

  const formatPercent = (value: number): string => {
    return new Intl.NumberFormat(i18n.language, {
      style: 'percent',
      minimumFractionDigits: 1,
    }).format(value);
  };

  return {
    formatNumber,
    formatCurrency,
    formatPercent,
  };
};
```

### 2. 日期格式化

```typescript
import { useTranslation } from 'react-i18next';

export const useDateFormat = () => {
  const { i18n } = useTranslation();

  const formatDate = (date: Date | string | number): string => {
    const dateObj = new Date(date);
    return new Intl.DateTimeFormat(i18n.language).format(dateObj);
  };

  const formatDateTime = (date: Date | string | number): string => {
    const dateObj = new Date(date);
    return new Intl.DateTimeFormat(i18n.language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj);
  };

  const formatRelativeTime = (date: Date | string | number): string => {
    const dateObj = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat(i18n.language, { numeric: 'auto' });

    if (diffInSeconds < 60) return rtf.format(-diffInSeconds, 'second');
    if (diffInSeconds < 3600) return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    if (diffInSeconds < 86400) return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  };

  return {
    formatDate,
    formatDateTime,
    formatRelativeTime,
  };
};
```

## 性能优化

### 1. 懒加载翻译资源

```typescript
// i18n/lazy-loader.ts
import i18n from 'i18next';

const loadedNamespaces = new Set<string>();

export const loadNamespace = async (namespace: string, language?: string) => {
  const lng = language || i18n.language;
  const key = `${lng}-${namespace}`;
  
  if (loadedNamespaces.has(key)) {
    return;
  }

  try {
    await i18n.loadNamespaces(namespace);
    loadedNamespaces.add(key);
  } catch (error) {
    console.error(`Failed to load namespace ${namespace} for ${lng}:`, error);
  }
};

// 预加载关键命名空间
export const preloadCriticalNamespaces = async () => {
  const criticalNamespaces = ['common', 'navigation', 'errors'];
  await Promise.all(
    criticalNamespaces.map(ns => loadNamespace(ns))
  );
};
```

### 2. 翻译缓存

```typescript
// i18n/cache.ts
class TranslationCache {
  private cache = new Map<string, string>();
  private maxSize = 1000;

  get(key: string, language: string): string | undefined {
    return this.cache.get(`${language}:${key}`);
  }

  set(key: string, language: string, value: string): void {
    const cacheKey = `${language}:${key}`;
    
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(cacheKey, value);
  }

  clear(): void {
    this.cache.clear();
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
    };
  }
}

export const translationCache = new TranslationCache();
```

## 测试策略

### 1. 翻译完整性测试

```typescript
// tests/i18n.test.ts
import { locales } from '../src/i18n/locales';

describe('Translation Completeness', () => {
  const languages = Object.keys(locales);
  const baseLanguage = 'zh-CN';
  
  const getNestedKeys = (obj: any, prefix = ''): string[] => {
    const keys: string[] = [];
    
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys.push(...getNestedKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    
    return keys;
  };

  test('All languages have the same translation keys', () => {
    const baseKeys = getNestedKeys(locales[baseLanguage].translation);
    
    languages.forEach(lang => {
      if (lang === baseLanguage) return;
      
      const langKeys = getNestedKeys(locales[lang].translation);
      
      expect(langKeys.sort()).toEqual(baseKeys.sort());
    });
  });

  test('No empty translations', () => {
    languages.forEach(lang => {
      const keys = getNestedKeys(locales[lang].translation);
      
      keys.forEach(key => {
        const value = key.split('.').reduce((obj, k) => obj[k], locales[lang].translation);
        expect(value).toBeTruthy();
        expect(typeof value).toBe('string');
      });
    });
  });
});
```

### 2. 组件翻译测试

```typescript
// tests/components/NewsCard.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';
import { NewsCard } from '../src/components/news/NewsCard';

const renderWithI18n = (component: React.ReactElement, language = 'zh-CN') => {
  i18n.changeLanguage(language);
  
  return render(
    <I18nextProvider i18n={i18n}>
      {component}
    </I18nextProvider>
  );
};

describe('NewsCard i18n', () => {
  const mockProps = {
    title: 'Test Title',
    summary: 'Test Summary',
    publishDate: '2024-01-01',
    views: 100,
    likes: 10,
  };

  test('renders in Chinese', () => {
    renderWithI18n(<NewsCard {...mockProps} />, 'zh-CN');
    
    expect(screen.getByText('查看')).toBeInTheDocument();
    expect(screen.getByText('点赞')).toBeInTheDocument();
    expect(screen.getByText('分享')).toBeInTheDocument();
  });

  test('renders in English', () => {
    renderWithI18n(<NewsCard {...mockProps} />, 'en-US');
    
    expect(screen.getByText('View')).toBeInTheDocument();
    expect(screen.getByText('Like')).toBeInTheDocument();
    expect(screen.getByText('Share')).toBeInTheDocument();
  });
});
```

## 维护规范

### 1. 翻译键命名规范

```typescript
// ✅ 好的命名
const translations = {
  user: {
    profile: {
      edit: '编辑资料',
      save: '保存',
      cancel: '取消',
    },
    settings: {
      notification: {
        email: '邮件通知',
        push: '推送通知',
      },
    },
  },
};

// ❌ 避免的命名
const badTranslations = {
  btn1: '按钮1',
  userEditProfileSaveButton: '保存',
  'user-profile-edit': '编辑',
};
```

### 2. 翻译更新工作流

```typescript
// scripts/check-translations.ts
import fs from 'fs';
import path from 'path';
import { locales } from '../src/i18n/locales';

interface TranslationReport {
  missing: string[];
  extra: string[];
  empty: string[];
}

const generateTranslationReport = (): Record<string, TranslationReport> => {
  const languages = Object.keys(locales);
  const baseLanguage = 'zh-CN';
  const baseKeys = getNestedKeys(locales[baseLanguage].translation);
  
  const report: Record<string, TranslationReport> = {};
  
  languages.forEach(lang => {
    if (lang === baseLanguage) return;
    
    const langKeys = getNestedKeys(locales[lang].translation);
    const missing = baseKeys.filter(key => !langKeys.includes(key));
    const extra = langKeys.filter(key => !baseKeys.includes(key));
    const empty = langKeys.filter(key => {
      const value = getValueByPath(locales[lang].translation, key);
      return !value || value.trim() === '';
    });
    
    report[lang] = { missing, extra, empty };
  });
  
  return report;
};

// 生成报告
const report = generateTranslationReport();
console.log('Translation Report:', JSON.stringify(report, null, 2));

// 如果有问题，退出并报错
const hasIssues = Object.values(report).some(
  r => r.missing.length > 0 || r.extra.length > 0 || r.empty.length > 0
);

if (hasIssues) {
  process.exit(1);
}
```

### 3. 自动化翻译检查

```json
// package.json
{
  "scripts": {
    "i18n:check": "ts-node scripts/check-translations.ts",
    "i18n:extract": "i18next-scanner --config i18next-scanner.config.js",
    "i18n:sync": "ts-node scripts/sync-translations.ts",
    "pre-commit": "npm run i18n:check && npm run lint && npm run test"
  }
}
```

## 总结

这个多语言最佳实践指南提供了：

1. **完整的配置方案** - 从初始化到高级配置
2. **模块化管理** - 翻译资源的组织和维护
3. **类型安全** - TypeScript 支持和类型检查
4. **性能优化** - 懒加载和缓存策略
5. **开发工具** - 自动化检查和测试
6. **维护规范** - 命名约定和工作流程

通过遵循这些最佳实践，可以构建一个可维护、可扩展、高性能的多语言应用系统。
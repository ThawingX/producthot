# SEO 最佳实践指南

## 目录
- [SEO 基础配置](#seo-基础配置)
- [关键词策略](#关键词策略)
- [页面优化](#页面优化)
- [内容优化](#内容优化)
- [技术SEO](#技术seo)
- [性能优化](#性能优化)
- [结构化数据](#结构化数据)
- [监控与分析](#监控与分析)

## SEO 基础配置

### 1. Meta 标签配置

#### 基础 Meta 组件 (`src/components/seo/MetaTags.tsx`)
```typescript
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SEO_CONFIG } from '../../config/seo';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  category
}) => {
  const { t, i18n } = useTranslation();
  
  const siteTitle = title 
    ? `${title} | ${SEO_CONFIG.SITE_NAME}` 
    : SEO_CONFIG.DEFAULT_TITLE;
  
  const siteDescription = description || SEO_CONFIG.DEFAULT_DESCRIPTION;
  const siteKeywords = [...keywords, ...SEO_CONFIG.DEFAULT_KEYWORDS].join(', ');
  const siteImage = image || SEO_CONFIG.DEFAULT_IMAGE;
  const siteUrl = url || window.location.href;
  
  return (
    <Helmet>
      {/* 基础 Meta 标签 */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="author" content={author || SEO_CONFIG.AUTHOR} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={i18n.language} />
      <link rel="canonical" href={siteUrl} />
      
      {/* Open Graph 标签 */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content={SEO_CONFIG.SITE_NAME} />
      <meta property="og:locale" content={i18n.language} />
      
      {/* Twitter Card 标签 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
      <meta name="twitter:site" content={SEO_CONFIG.TWITTER_HANDLE} />
      
      {/* 文章特定标签 */}
      {type === 'article' && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {author && (
            <meta property="article:author" content={author} />
          )}
          {category && (
            <meta property="article:section" content={category} />
          )}
        </>
      )}
      
      {/* 移动端优化 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* 搜索引擎验证 */}
      <meta name="google-site-verification" content={SEO_CONFIG.GOOGLE_VERIFICATION} />
      <meta name="baidu-site-verification" content={SEO_CONFIG.BAIDU_VERIFICATION} />
    </Helmet>
  );
};
```

### 2. 站点地图生成

#### 动态站点地图 (`src/utils/sitemap.ts`)
```typescript
interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export class SitemapGenerator {
  private urls: SitemapUrl[] = [];
  
  addUrl(url: SitemapUrl) {
    this.urls.push(url);
  }
  
  addNewsUrls(newsItems: NewsItem[]) {
    newsItems.forEach(item => {
      this.addUrl({
        loc: `${SEO_CONFIG.SITE_URL}/news/${item.id}`,
        lastmod: item.date,
        changefreq: 'weekly',
        priority: 0.8
      });
    });
  }
  
  addChannelUrls(channels: Channel[]) {
    channels.forEach(channel => {
      this.addUrl({
        loc: `${SEO_CONFIG.SITE_URL}/channel/${channel.id}`,
        lastmod: channel.updateTime,
        changefreq: 'daily',
        priority: 0.9
      });
    });
  }
  
  generateXML(): string {
    const urlsXML = this.urls.map(url => `
      <url>
        <loc>${url.loc}</loc>
        ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
        ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
        ${url.priority ? `<priority>${url.priority}</priority>` : ''}
      </url>
    `).join('');
    
    return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urlsXML}
      </urlset>`;
  }
}
```

## 关键词策略

### 1. 关键词研究与分类
```typescript
// 从配置文件导入关键词
import { SEO_KEYWORDS } from '../config/keywords';

export const keywordStrategy = {
  // 主要关键词 - 高搜索量，高竞争
  primary: SEO_KEYWORDS.PRIMARY,
  
  // 长尾关键词 - 低竞争，高转化
  longTail: SEO_KEYWORDS.LONG_TAIL,
  
  // 品牌关键词
  brand: SEO_KEYWORDS.BRAND,
  
  // 地域关键词
  location: SEO_KEYWORDS.LOCATION,
  
  // 产品相关关键词
  product: SEO_KEYWORDS.PRODUCT,
  
  // 内容相关关键词
  content: SEO_KEYWORDS.CONTENT
};
```

### 2. 关键词密度控制
```typescript
export const calculateKeywordDensity = (content: string, keyword: string): number => {
  const words = content.toLowerCase().split(/\s+/);
  const keywordCount = words.filter(word => 
    word.includes(keyword.toLowerCase())
  ).length;
  
  return (keywordCount / words.length) * 100;
};

export const optimizeKeywordDensity = (content: string, keywords: string[]): string => {
  // 目标密度: 1-3%
  const targetDensity = 2;
  let optimizedContent = content;
  
  keywords.forEach(keyword => {
    const density = calculateKeywordDensity(content, keyword);
    
    if (density < 1) {
      // 密度过低，需要增加关键词
      console.warn(`关键词 "${keyword}" 密度过低: ${density.toFixed(2)}%`);
    } else if (density > 3) {
      // 密度过高，可能被视为关键词堆砌
      console.warn(`关键词 "${keyword}" 密度过高: ${density.toFixed(2)}%`);
    }
  });
  
  return optimizedContent;
};
```

## 页面优化

### 1. 标题优化
```typescript
export const generateOptimizedTitle = (
  baseTitle: string,
  keywords: string[],
  maxLength: number = 60
): string => {
  const primaryKeyword = keywords[0];
  const brandName = SEO_CONFIG.SITE_NAME;
  
  // 标题结构: 主关键词 | 页面标题 | 品牌名
  let title = `${primaryKeyword} | ${baseTitle} | ${brandName}`;
  
  // 确保标题长度不超过限制
  if (title.length > maxLength) {
    title = `${primaryKeyword} | ${baseTitle}`;
    if (title.length > maxLength) {
      title = baseTitle.substring(0, maxLength - 3) + '...';
    }
  }
  
  return title;
};
```

### 2. 描述优化
```typescript
export const generateMetaDescription = (
  content: string,
  keywords: string[],
  maxLength: number = 160
): string => {
  const primaryKeyword = keywords[0];
  const secondaryKeywords = keywords.slice(1, 3);
  
  // 提取内容摘要
  const summary = content.substring(0, 100);
  
  // 构建描述
  let description = `${summary}。了解更多关于${primaryKeyword}`;
  
  if (secondaryKeywords.length > 0) {
    description += `、${secondaryKeywords.join('、')}`;
  }
  
  description += `的最新资讯和产品信息。`;
  
  // 确保描述长度合适
  if (description.length > maxLength) {
    description = description.substring(0, maxLength - 3) + '...';
  }
  
  return description;
};
```

### 3. URL 优化
```typescript
export const generateSEOFriendlyURL = (title: string, id?: string | number): string => {
  // 移除特殊字符，转换为小写
  let slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 空格转换为连字符
    .replace(/-+/g, '-') // 多个连字符合并为一个
    .trim();
  
  // 限制长度
  if (slug.length > 50) {
    slug = slug.substring(0, 50).replace(/-[^-]*$/, '');
  }
  
  // 添加ID确保唯一性
  if (id) {
    slug = `${slug}-${id}`;
  }
  
  return slug;
};
```

## 内容优化

### 1. 内容结构化
```typescript
export const structureContent = (content: string): {
  headings: string[];
  paragraphs: string[];
  keywords: string[];
} => {
  const headings = content.match(/#{1,6}\s+(.+)/g) || [];
  const paragraphs = content.split('\n\n').filter(p => p.trim());
  const keywords = extractKeywords(content);
  
  return {
    headings: headings.map(h => h.replace(/#{1,6}\s+/, '')),
    paragraphs,
    keywords
  };
};

const extractKeywords = (content: string): string[] => {
  // 简单的关键词提取逻辑
  const words = content.toLowerCase().match(/\b\w{3,}\b/g) || [];
  const frequency: Record<string, number> = {};
  
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  return Object.entries(frequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);
};
```

### 2. 内容质量评估
```typescript
export const assessContentQuality = (content: string): {
  score: number;
  suggestions: string[];
} => {
  const suggestions: string[] = [];
  let score = 100;
  
  // 检查内容长度
  if (content.length < 300) {
    score -= 20;
    suggestions.push('内容长度过短，建议至少300字');
  }
  
  // 检查标题结构
  const headings = content.match(/#{1,6}/g) || [];
  if (headings.length === 0) {
    score -= 15;
    suggestions.push('缺少标题结构，建议添加H1-H6标题');
  }
  
  // 检查关键词密度
  const keywords = SEO_KEYWORDS.PRIMARY;
  keywords.forEach(keyword => {
    const density = calculateKeywordDensity(content, keyword);
    if (density < 0.5) {
      score -= 10;
      suggestions.push(`关键词"${keyword}"出现频率过低`);
    } else if (density > 4) {
      score -= 15;
      suggestions.push(`关键词"${keyword}"出现频率过高，可能被视为堆砌`);
    }
  });
  
  // 检查内部链接
  const internalLinks = content.match(/\[.*?\]\(\/.*?\)/g) || [];
  if (internalLinks.length === 0) {
    score -= 10;
    suggestions.push('建议添加内部链接提高页面权重');
  }
  
  return { score: Math.max(0, score), suggestions };
};
```

## 技术SEO

### 1. 页面加载速度优化
```typescript
// 图片懒加载组件
export const LazyImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={imgRef} className={className}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}
    </div>
  );
};
```

### 2. 结构化数据
```typescript
export const generateStructuredData = (type: 'Article' | 'NewsArticle' | 'Product', data: any) => {
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': type,
    'url': data.url,
    'headline': data.title,
    'description': data.description,
    'image': data.image,
    'datePublished': data.publishedTime,
    'dateModified': data.modifiedTime,
    'author': {
      '@type': 'Organization',
      'name': SEO_CONFIG.SITE_NAME
    },
    'publisher': {
      '@type': 'Organization',
      'name': SEO_CONFIG.SITE_NAME,
      'logo': {
        '@type': 'ImageObject',
        'url': SEO_CONFIG.LOGO_URL
      }
    }
  };
  
  if (type === 'NewsArticle') {
    return {
      ...baseStructure,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': data.url
      }
    };
  }
  
  if (type === 'Product') {
    return {
      ...baseStructure,
      'brand': data.brand,
      'offers': {
        '@type': 'Offer',
        'price': data.price,
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock'
      }
    };
  }
  
  return baseStructure;
};

export const StructuredDataScript: React.FC<{ data: any }> = ({ data }) => (
  <Helmet>
    <script type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  </Helmet>
);
```

## 性能优化

### 1. 代码分割与懒加载
```typescript
// 路由级别的代码分割
const HomePage = lazy(() => import('../pages/HomePage'));
const ProductNewsPage = lazy(() => import('../pages/ProductNewsPage'));
const ClueAnalysisPage = lazy(() => import('../pages/ClueAnalysisPage'));

export const AppRoutes = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/news" element={<ProductNewsPage />} />
      <Route path="/analysis" element={<ClueAnalysisPage />} />
    </Routes>
  </Suspense>
);
```

### 2. 缓存策略
```typescript
// Service Worker 缓存策略
export const cacheStrategy = {
  // 静态资源缓存
  static: {
    cacheName: 'static-cache-v1',
    urls: ['/css/', '/js/', '/images/'],
    strategy: 'CacheFirst'
  },
  
  // API 缓存
  api: {
    cacheName: 'api-cache-v1',
    urls: ['/api/'],
    strategy: 'NetworkFirst',
    maxAge: 5 * 60 * 1000 // 5分钟
  },
  
  // 页面缓存
  pages: {
    cacheName: 'pages-cache-v1',
    strategy: 'StaleWhileRevalidate'
  }
};
```

## 监控与分析

### 1. SEO 指标监控
```typescript
export const seoMetrics = {
  // 页面性能指标
  trackPagePerformance: () => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime
      };
    }
  },
  
  // 用户行为追踪
  trackUserBehavior: (action: string, data?: any) => {
    // Google Analytics 4 事件追踪
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        custom_parameter: data,
        page_title: document.title,
        page_location: window.location.href
      });
    }
  },
  
  // 搜索关键词追踪
  trackSearchKeywords: (keyword: string, results: number) => {
    seoMetrics.trackUserBehavior('search', {
      search_term: keyword,
      search_results: results
    });
  }
};
```

### 2. 自动化SEO检查
```typescript
export const seoAudit = {
  checkPageSEO: async (url: string) => {
    const issues: string[] = [];
    
    try {
      const response = await fetch(url);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // 检查标题
      const title = doc.querySelector('title')?.textContent;
      if (!title) {
        issues.push('缺少页面标题');
      } else if (title.length > 60) {
        issues.push('页面标题过长');
      }
      
      // 检查描述
      const description = doc.querySelector('meta[name="description"]')?.getAttribute('content');
      if (!description) {
        issues.push('缺少页面描述');
      } else if (description.length > 160) {
        issues.push('页面描述过长');
      }
      
      // 检查H1标签
      const h1Tags = doc.querySelectorAll('h1');
      if (h1Tags.length === 0) {
        issues.push('缺少H1标签');
      } else if (h1Tags.length > 1) {
        issues.push('H1标签过多');
      }
      
      // 检查图片alt属性
      const images = doc.querySelectorAll('img');
      const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt'));
      if (imagesWithoutAlt.length > 0) {
        issues.push(`${imagesWithoutAlt.length}张图片缺少alt属性`);
      }
      
      return {
        url,
        issues,
        score: Math.max(0, 100 - issues.length * 10)
      };
      
    } catch (error) {
      return {
        url,
        issues: ['页面无法访问'],
        score: 0
      };
    }
  }
};
```

## 最佳实践总结

### 1. 内容策略
- 定期发布高质量、原创内容
- 关注用户搜索意图，提供有价值的信息
- 保持内容更新频率，提高网站活跃度
- 建立内容分类体系，便于用户和搜索引擎理解

### 2. 技术实现
- 确保网站在移动设备上的良好体验
- 优化页面加载速度，目标LCP < 2.5秒
- 实现合理的URL结构和导航层次
- 添加结构化数据提高搜索结果展示效果

### 3. 用户体验
- 提供清晰的网站导航和搜索功能
- 优化页面布局，提高可读性
- 减少页面跳出率，增加用户停留时间
- 建立用户反馈机制，持续改进体验

### 4. 监控优化
- 定期进行SEO审计，发现并修复问题
- 监控关键词排名变化
- 分析用户行为数据，优化内容策略
- 跟踪竞争对手SEO表现，调整策略
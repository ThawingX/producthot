# SEO 组件使用示例

## 基础使用

### 1. 在页面组件中使用SEO组件

```typescript
import React from 'react';
import { SEO } from '../components/seo';
import { PAGE_SEO_CONFIG } from '../config/seo';

export const ProductNewsPage: React.FC = () => {
  return (
    <>
      <SEO
        title={PAGE_SEO_CONFIG.PRODUCT_NEWS.title}
        description={PAGE_SEO_CONFIG.PRODUCT_NEWS.description}
        keywords={PAGE_SEO_CONFIG.PRODUCT_NEWS.keywords}
        type="website"
      />
      <div>
        {/* 页面内容 */}
      </div>
    </>
  );
};
```

### 2. 新闻文章页面SEO

```typescript
import React from 'react';
import { SEO, StructuredDataGenerator } from '../components/seo';

interface NewsDetailPageProps {
  newsItem: NewsItem;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ newsItem }) => {
  // 生成新闻文章结构化数据
  const articleStructuredData = StructuredDataGenerator.generateNewsArticle({
    id: newsItem.id,
    title: newsItem.title,
    description: newsItem.summary,
    content: newsItem.content || newsItem.summary,
    url: `${window.location.origin}/news/${newsItem.id}`,
    publishedTime: newsItem.date,
    category: newsItem.category,
    tags: newsItem.tags
  });

  return (
    <>
      <SEO
        title={newsItem.title}
        description={newsItem.summary}
        keywords={newsItem.tags}
        type="article"
        publishedTime={newsItem.date}
        category={newsItem.category}
        structuredData={articleStructuredData}
      />
      <article>
        <h1>{newsItem.title}</h1>
        <p>{newsItem.summary}</p>
        {/* 文章内容 */}
      </article>
    </>
  );
};
```

### 3. 产品页面SEO

```typescript
import React from 'react';
import { SEO, StructuredDataGenerator } from '../components/seo';

interface ProductPageProps {
  product: ProductData;
}

export const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  // 生成产品结构化数据
  const productStructuredData = StructuredDataGenerator.generateProduct({
    id: product.id,
    name: product.name,
    description: product.description,
    url: `${window.location.origin}/product/${product.id}`,
    category: product.category,
    brand: product.brand,
    price: product.price,
    currency: product.currency,
    rating: product.rating,
    reviewCount: product.reviewCount
  });

  return (
    <>
      <SEO
        title={`${product.name} - 产品详情`}
        description={product.description}
        keywords={[product.name, product.category, product.brand].filter(Boolean)}
        type="product"
        structuredData={productStructuredData}
      />
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        {/* 产品详情 */}
      </div>
    </>
  );
};
```

## 高级用法

### 1. 动态SEO内容

```typescript
import React, { useEffect, useState } from 'react';
import { SEO } from '../components/seo';
import { seoUtils } from '../config/seo';

export const DynamicPage: React.FC = () => {
  const [content, setContent] = useState<any>(null);
  const [seoData, setSeoData] = useState({
    title: '',
    description: '',
    keywords: []
  });

  useEffect(() => {
    // 根据内容动态生成SEO数据
    if (content) {
      setSeoData({
        title: seoUtils.generateTitle(content.title, content.primaryKeyword),
        description: seoUtils.generateDescription(content.body, content.keywords),
        keywords: content.keywords
      });
    }
  }, [content]);

  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />
      <div>
        {/* 动态内容 */}
      </div>
    </>
  );
};
```

### 2. 多语言SEO

```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/seo';

export const MultiLanguagePage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const getLocalizedSEO = () => {
    const baseUrl = window.location.href.replace(`/${i18n.language}`, '');
    
    return {
      title: t('seo.title'),
      description: t('seo.description'),
      keywords: t('seo.keywords', { returnObjects: true }) as string[],
      url: `${baseUrl}/${i18n.language}`
    };
  };

  const seoData = getLocalizedSEO();

  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        url={seoData.url}
      />
      <div>
        {/* 多语言内容 */}
      </div>
    </>
  );
};
```

### 3. 面包屑导航SEO

```typescript
import React from 'react';
import { SEO, StructuredDataGenerator } from '../components/seo';

interface BreadcrumbPageProps {
  breadcrumbs: Array<{ name: string; url: string }>;
}

export const BreadcrumbPage: React.FC<BreadcrumbPageProps> = ({ breadcrumbs }) => {
  // 生成面包屑结构化数据
  const breadcrumbStructuredData = StructuredDataGenerator.generateBreadcrumb(breadcrumbs);

  return (
    <>
      <SEO structuredData={breadcrumbStructuredData} />
      <nav>
        {breadcrumbs.map((item, index) => (
          <span key={index}>
            <a href={item.url}>{item.name}</a>
            {index < breadcrumbs.length - 1 && ' > '}
          </span>
        ))}
      </nav>
      <div>
        {/* 页面内容 */}
      </div>
    </>
  );
};
```

## 最佳实践

### 1. SEO组件放置位置
- 总是将SEO组件放在页面组件的最顶部
- 确保在任何内容渲染之前就设置好SEO信息

### 2. 标题优化
```typescript
// ✅ 好的标题
"Notion AI 2.0 正式发布 - 产品资讯 | ProductHot"

// ❌ 避免的标题
"页面标题页面标题页面标题页面标题页面标题页面标题"
```

### 3. 描述优化
```typescript
// ✅ 好的描述
"全新的AI助手功能，支持多语言内容生成和智能摘要，为用户提供更加智能的知识管理体验。了解更多Notion AI 2.0的创新功能。"

// ❌ 避免的描述
"这是一个很好的产品这是一个很好的产品这是一个很好的产品..."
```

### 4. 关键词策略
```typescript
// ✅ 合理的关键词使用
keywords={['Notion AI', '知识管理', '人工智能', '生产力工具']}

// ❌ 关键词堆砌
keywords={['AI', 'AI工具', 'AI助手', 'AI软件', 'AI应用', 'AI平台', 'AI系统']}
```

### 5. 结构化数据使用
```typescript
// 为不同类型的页面使用合适的结构化数据
const getStructuredData = (pageType: string, data: any) => {
  switch (pageType) {
    case 'article':
      return StructuredDataGenerator.generateNewsArticle(data);
    case 'product':
      return StructuredDataGenerator.generateProduct(data);
    case 'collection':
      return StructuredDataGenerator.generateCollectionPage(data);
    default:
      return null;
  }
};
```

## 性能优化

### 1. 避免重复渲染
```typescript
import React, { useMemo } from 'react';

export const OptimizedSEOPage: React.FC = () => {
  const seoData = useMemo(() => ({
    title: generateTitle(),
    description: generateDescription(),
    keywords: generateKeywords()
  }), [/* 依赖项 */]);

  return (
    <>
      <SEO {...seoData} />
      <div>{/* 内容 */}</div>
    </>
  );
};
```

### 2. 懒加载结构化数据
```typescript
import React, { useState, useEffect } from 'react';

export const LazyStructuredDataPage: React.FC = () => {
  const [structuredData, setStructuredData] = useState(null);

  useEffect(() => {
    // 异步生成复杂的结构化数据
    const generateData = async () => {
      const data = await complexDataGeneration();
      setStructuredData(data);
    };
    
    generateData();
  }, []);

  return (
    <>
      <SEO structuredData={structuredData} />
      <div>{/* 内容 */}</div>
    </>
  );
};
```
import { SEO_CONFIG } from '../../config/seo';

export interface NewsArticleData {
  id: string | number;
  title: string;
  description: string;
  content: string;
  url: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
  tags?: string[];
  source?: string;
}

export interface ProductData {
  id: string | number;
  name: string;
  description: string;
  url: string;
  image?: string;
  category: string;
  brand?: string;
  price?: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  rating?: number;
  reviewCount?: number;
}

export class StructuredDataGenerator {
  // 生成新闻文章结构化数据
  static generateNewsArticle(data: NewsArticleData) {
    return {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      'headline': data.title,
      'description': data.description,
      'url': data.url,
      'image': data.image || SEO_CONFIG.MEDIA.DEFAULT_IMAGE,
      'datePublished': data.publishedTime,
      'dateModified': data.modifiedTime || data.publishedTime,
      'author': {
        '@type': 'Organization',
        'name': data.author || SEO_CONFIG.SITE_NAME
      },
      'publisher': {
        '@type': 'Organization',
        'name': SEO_CONFIG.SITE_NAME,
        'logo': {
          '@type': 'ImageObject',
          'url': `${SEO_CONFIG.SITE_URL}${SEO_CONFIG.MEDIA.LOGO_URL}`
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': data.url
      },
      'articleSection': data.category,
      'keywords': data.tags?.join(', '),
      'inLanguage': 'zh-CN'
    };
  }

  // 生成产品结构化数据
  static generateProduct(data: ProductData) {
    const product: any = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': data.name,
      'description': data.description,
      'url': data.url,
      'image': data.image,
      'category': data.category,
      'brand': {
        '@type': 'Brand',
        'name': data.brand || 'Unknown'
      }
    };

    // 添加价格信息（如果有）
    if (data.price) {
      product.offers = {
        '@type': 'Offer',
        'price': data.price,
        'priceCurrency': data.currency || 'USD',
        'availability': `https://schema.org/${data.availability || 'InStock'}`
      };
    }

    // 添加评分信息（如果有）
    if (data.rating && data.reviewCount) {
      product.aggregateRating = {
        '@type': 'AggregateRating',
        'ratingValue': data.rating,
        'reviewCount': data.reviewCount
      };
    }

    return product;
  }

  // 生成面包屑导航结构化数据
  static generateBreadcrumb(items: Array<{ name: string; url: string }>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url
      }))
    };
  }

  // 生成搜索框结构化数据
  static generateSearchBox() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'url': SEO_CONFIG.SITE_URL,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': `${SEO_CONFIG.SITE_URL}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    };
  }

  // 生成FAQ结构化数据
  static generateFAQ(faqs: Array<{ question: string; answer: string }>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };
  }

  // 生成软件应用结构化数据
  static generateSoftwareApplication(data: {
    name: string;
    description: string;
    url: string;
    category: string;
    operatingSystem?: string;
    price?: number;
    currency?: string;
    rating?: number;
    reviewCount?: number;
  }) {
    const app: any = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': data.name,
      'description': data.description,
      'url': data.url,
      'applicationCategory': data.category,
      'operatingSystem': data.operatingSystem || 'Web Browser'
    };

    if (data.price !== undefined) {
      app.offers = {
        '@type': 'Offer',
        'price': data.price,
        'priceCurrency': data.currency || 'USD'
      };
    }

    if (data.rating && data.reviewCount) {
      app.aggregateRating = {
        '@type': 'AggregateRating',
        'ratingValue': data.rating,
        'reviewCount': data.reviewCount
      };
    }

    return app;
  }

  // 生成事件结构化数据（用于产品发布等）
  static generateEvent(data: {
    name: string;
    description: string;
    startDate: string;
    endDate?: string;
    url: string;
    location?: string;
    organizer?: string;
  }) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Event',
      'name': data.name,
      'description': data.description,
      'startDate': data.startDate,
      'endDate': data.endDate,
      'url': data.url,
      'location': data.location ? {
        '@type': 'Place',
        'name': data.location
      } : undefined,
      'organizer': data.organizer ? {
        '@type': 'Organization',
        'name': data.organizer
      } : undefined
    };
  }

  // 生成集合页面结构化数据
  static generateCollectionPage(data: {
    name: string;
    description: string;
    url: string;
    items: Array<{ name: string; url: string }>;
  }) {
    return {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': data.name,
      'description': data.description,
      'url': data.url,
      'mainEntity': {
        '@type': 'ItemList',
        'itemListElement': data.items.map((item, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': item.name,
          'url': item.url
        }))
      }
    };
  }
}

export default StructuredDataGenerator;
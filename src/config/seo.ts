// SEO基础配置文件
import { SEO_KEYWORDS } from './keywords';

export const SEO_CONFIG = {
  // 网站基本信息
  SITE_NAME: 'ProductHot',
  SITE_URL: process.env.VITE_SITE_URL || 'https://producthot.top',
  DEFAULT_TITLE: 'ProductHot - 发现最新科技产品与创新资讯',
  DEFAULT_DESCRIPTION: '聚合ProductHunt、HackerNews、GitHub、Reddit、TechCrunch等平台的最新科技产品发布和创新资讯，为产品经理、创业者和科技爱好者提供一站式产品发现平台。',
  DEFAULT_KEYWORDS: SEO_KEYWORDS.PRIMARY,
  
  // 社交媒体配置
  SOCIAL: {
    TWITTER_HANDLE: '@ProductHot',
    FACEBOOK_PAGE: 'ProductHot',
    LINKEDIN_PAGE: 'company/producthot',
    GITHUB_ORG: 'ProductHot'
  },
  
  // 图片和媒体资源
  MEDIA: {
    DEFAULT_IMAGE: '/images/og-image.jpg',
    LOGO_URL: '/images/logo.png',
    FAVICON: '/fav.ico',
    APPLE_TOUCH_ICON: '/images/apple-touch-icon.png'
  },
  
  // 作者和组织信息
  AUTHOR: 'ProductHot Team',
  COPYRIGHT: `© ${new Date().getFullYear()} ProductHot. All rights reserved.`,
  
  // 搜索引擎验证码（需要实际申请后填入）
  VERIFICATION: {
    GOOGLE: process.env.VITE_GOOGLE_VERIFICATION || '',
    BAIDU: process.env.VITE_BAIDU_VERIFICATION || '',
    BING: process.env.VITE_BING_VERIFICATION || '',
    YANDEX: process.env.VITE_YANDEX_VERIFICATION || ''
  },
  
  // 分析工具配置
  ANALYTICS: {
    GOOGLE_ANALYTICS_ID: process.env.VITE_GA_ID || '',
    GOOGLE_TAG_MANAGER_ID: process.env.VITE_GTM_ID || '',
    BAIDU_ANALYTICS_ID: process.env.VITE_BAIDU_ANALYTICS_ID || '',
    CLARITY_ID: process.env.VITE_CLARITY_ID || ''
  },
  
  // 结构化数据配置
  STRUCTURED_DATA: {
    ORGANIZATION: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'ProductHot',
      'url': 'https://producthot.top',
      'logo': 'https://producthot.top/images/logo.png',
      'description': '专业的科技产品发现与资讯聚合平台',
      'foundingDate': '2024',
      'sameAs': [
        'https://twitter.com/ProductHot',
        'https://github.com/ProductHot',
        'https://linkedin.com/company/producthot'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'customer service',
        'email': 'contact@producthot.top'
      }
    },
    
    WEBSITE: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'ProductHot',
      'url': 'https://producthot.top',
      'description': '发现最新科技产品与创新资讯的专业平台',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://producthot.top/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  },
  
  // 站点地图配置
  SITEMAP: {
    CHANGE_FREQUENCY: {
      HOME: 'daily',
      NEWS: 'hourly',
      STATIC: 'monthly'
    },
    PRIORITY: {
      HOME: 1.0,
      NEWS: 0.8,
      ANALYSIS: 0.7,
      STATIC: 0.5
    }
  },
  
  // Robots.txt 配置
  ROBOTS: {
    USER_AGENT: '*',
    ALLOW: [
      '/',
      '/news/',
      '/analysis/',
      '/search/'
    ],
    DISALLOW: [
      '/admin/',
      '/api/',
      '/private/',
      '/*.json$',
      '/temp/'
    ],
    SITEMAP: 'https://producthot.top/sitemap.xml'
  },
  
  // 页面性能配置
  PERFORMANCE: {
    LAZY_LOADING: true,
    IMAGE_OPTIMIZATION: true,
    PRELOAD_CRITICAL_RESOURCES: true,
    CACHE_STRATEGY: 'stale-while-revalidate'
  },
  
  // 国际化SEO配置
  I18N: {
    DEFAULT_LOCALE: 'zh-CN',
    SUPPORTED_LOCALES: ['zh-CN', 'en-US', 'ja-JP'],
    HREFLANG_MAPPING: {
      'zh-CN': 'zh-cn',
      'en-US': 'en-us',
      'ja-JP': 'ja-jp'
    }
  }
};

// 页面级别的SEO配置
export const PAGE_SEO_CONFIG = {
  HOME: {
    title: 'ProductHot - 发现最新科技产品与创新资讯',
    description: '聚合ProductHunt、HackerNews、GitHub、Reddit、TechCrunch等平台的最新科技产品发布和创新资讯，为产品经理、创业者和科技爱好者提供一站式产品发现平台。',
    keywords: [...SEO_KEYWORDS.PRIMARY, ...SEO_KEYWORDS.BRAND],
    type: 'website'
  },
  
  PRODUCT_NEWS: {
    title: '产品资讯 - 最新科技产品发布与创新动态',
    description: '实时聚合全球最新的科技产品发布资讯，包括人工智能、开发者工具、设计工具等各类创新产品的发布动态和详细信息。',
    keywords: [...SEO_KEYWORDS.PRODUCT_CATEGORIES, ...SEO_KEYWORDS.CONTENT_SOURCES],
    type: 'website'
  },
  
  CLUE_ANALYSIS: {
    title: '需求线索分析 - 产品机会发现与市场洞察',
    description: '通过AI驱动的需求分析，帮助产品经理和创业者发现市场机会，识别用户需求，预测产品趋势，提供专业的市场洞察。',
    keywords: ['需求分析', '市场洞察', '产品机会', '趋势预测', '用户需求挖掘'],
    type: 'website'
  }
};

// SEO工具函数
export const seoUtils = {
  // 生成页面标题
  generateTitle: (pageTitle?: string, includeKeyword?: string): string => {
    if (!pageTitle) return SEO_CONFIG.DEFAULT_TITLE;
    
    let title = pageTitle;
    if (includeKeyword) {
      title = `${includeKeyword} - ${title}`;
    }
    
    return `${title} | ${SEO_CONFIG.SITE_NAME}`;
  },
  
  // 生成页面描述
  generateDescription: (content?: string, keywords?: string[]): string => {
    if (!content) return SEO_CONFIG.DEFAULT_DESCRIPTION;
    
    let description = content.substring(0, 140);
    if (keywords && keywords.length > 0) {
      description += ` 关键词：${keywords.slice(0, 3).join('、')}`;
    }
    
    return description + '...';
  },
  
  // 生成关键词字符串
  generateKeywords: (pageKeywords?: string[]): string => {
    const allKeywords = [
      ...(pageKeywords || []),
      ...SEO_CONFIG.DEFAULT_KEYWORDS
    ];
    
    // 去重并限制数量
    const uniqueKeywords = [...new Set(allKeywords)].slice(0, 10);
    return uniqueKeywords.join(', ');
  },
  
  // 生成规范URL
  generateCanonicalUrl: (path: string): string => {
    return `${SEO_CONFIG.SITE_URL}${path.startsWith('/') ? path : '/' + path}`;
  },
  
  // 生成Open Graph图片URL
  generateOGImage: (title?: string): string => {
    if (!title) return `${SEO_CONFIG.SITE_URL}${SEO_CONFIG.MEDIA.DEFAULT_IMAGE}`;
    
    // 可以集成动态OG图片生成服务
    const encodedTitle = encodeURIComponent(title);
    return `${SEO_CONFIG.SITE_URL}/api/og?title=${encodedTitle}`;
  }
};

export default SEO_CONFIG;
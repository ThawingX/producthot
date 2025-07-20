// SEO关键词配置文件
// 这个文件包含了网站的核心关键词策略，可以根据SEO需求随时调整

export const SEO_KEYWORDS = {
  // 主要关键词 - 核心业务相关，高搜索量
  PRIMARY: [
    '产品资讯',
    '科技新闻',
    '产品发布',
    '创业产品',
    '科技趋势',
    '产品推荐',
    '新产品发现',
    '科技资讯'
  ],

  // 长尾关键词 - 更具体的搜索意图
  LONG_TAIL: [
    '最新科技产品发布资讯',
    'ProductHunt热门产品推荐',
    'GitHub开源项目推荐',
    'HackerNews科技新闻',
    'TechCrunch创业资讯',
    'Reddit科技讨论热点',
    '人工智能产品发布',
    '开源软件推荐',
    '创业公司产品发布',
    '科技产品评测',
    '新兴科技趋势分析',
    '产品需求分析工具'
  ],

  // 品牌相关关键词
  BRAND: [
    'SnapSeeker',
    '产品发现平台',
    '科技资讯聚合',
    '产品资讯平台'
  ],

  // 产品类别关键词
  PRODUCT_CATEGORIES: [
    '人工智能产品',
    '开发者工具',
    '设计工具',
    '营销工具',
    '生产力工具',
    '移动应用',
    'Web应用',
    '企业软件',
    '创业工具',
    '数据分析工具',
    '自动化工具',
    '协作工具'
  ],

  // 内容来源关键词
  CONTENT_SOURCES: [
    'ProductHunt',
    'HackerNews',
    'GitHub',
    'Reddit',
    'TechCrunch',
    'Y Combinator',
    'Indie Hackers',
    'Product Hunt',
    'Show HN',
    'GitHub Trending'
  ],

  // 功能特性关键词
  FEATURES: [
    '产品发现',
    '趋势分析',
    '需求识别',
    '市场洞察',
    '产品评估',
    '竞品分析',
    '用户反馈',
    '产品推荐算法',
    '实时更新',
    '多平台聚合',
    '智能筛选',
    '个性化推荐'
  ],

  // 用户群体关键词
  TARGET_AUDIENCE: [
    '产品经理',
    '创业者',
    '开发者',
    '设计师',
    '投资人',
    '科技爱好者',
    '早期采用者',
    '技术专家',
    '创新者',
    '产品猎人'
  ],

  // 行业相关关键词
  INDUSTRY: [
    'SaaS产品',
    '科技创业',
    '产品创新',
    '数字化转型',
    '技术趋势',
    '创新科技',
    '新兴技术',
    '科技生态',
    '产品生态',
    '技术社区'
  ],

  // 地域关键词（如果需要本地化SEO）
  LOCATION: [
    '中国科技资讯',
    '全球科技新闻',
    '硅谷创业产品',
    '亚洲科技趋势',
    '国际产品发布'
  ],

  // 时效性关键词
  TEMPORAL: [
    '今日科技新闻',
    '本周热门产品',
    '最新发布',
    '即将发布',
    '2024科技趋势',
    '每日产品推荐',
    '实时资讯',
    '最新更新'
  ],

  // 问题导向关键词（用户搜索意图）
  QUESTION_BASED: [
    '如何发现新产品',
    '最好的科技资讯平台',
    '哪里找最新产品发布',
    '如何跟上科技趋势',
    '产品发现工具推荐',
    '科技新闻聚合平台',
    '创业产品哪里找',
    '开源项目如何发现'
  ],

  // 竞争对手关键词
  COMPETITOR: [
    '产品发现平台对比',
    '科技资讯网站推荐',
    'ProductHunt替代品',
    '最好的科技新闻源',
    '产品资讯聚合器'
  ]
};

// SEO配置常量
export const SEO_CONFIG = {
  // 网站基本信息
  SITE_NAME: 'SnapSeeker',
  SITE_URL: 'https://snapseeker.com',
  DEFAULT_TITLE: 'SnapSeeker - 发现最新科技产品与创新资讯',
  DEFAULT_DESCRIPTION: '聚合ProductHunt、HackerNews、GitHub、Reddit、TechCrunch等平台的最新科技产品发布和创新资讯，为产品经理、创业者和科技爱好者提供一站式产品发现平台。',
  DEFAULT_KEYWORDS: SEO_KEYWORDS.PRIMARY,
  
  // 社交媒体
  TWITTER_HANDLE: '@SnapSeeker',
  FACEBOOK_PAGE: 'SnapSeeker',
  
  // 图片和媒体
  DEFAULT_IMAGE: 'https://snapseeker.com/images/og-image.jpg',
  LOGO_URL: 'https://snapseeker.com/images/logo.png',
  
  // 作者信息
  AUTHOR: 'SnapSeeker Team',
  
  // 搜索引擎验证码（需要实际申请后填入）
  GOOGLE_VERIFICATION: 'your-google-verification-code',
  BAIDU_VERIFICATION: 'your-baidu-verification-code',
  BING_VERIFICATION: 'your-bing-verification-code',
  
  // 分析工具
  GOOGLE_ANALYTICS_ID: 'GA_MEASUREMENT_ID',
  GOOGLE_TAG_MANAGER_ID: 'GTM-XXXXXXX',
  
  // 结构化数据
  ORGANIZATION: {
    '@type': 'Organization',
    'name': 'SnapSeeker',
    'url': 'https://snapseeker.com',
    'logo': 'https://snapseeker.com/images/logo.png',
    'description': '专业的科技产品发现与资讯聚合平台',
    'foundingDate': '2024',
    'sameAs': [
      'https://twitter.com/SnapSeeker',
      'https://github.com/SnapSeeker'
    ]
  }
};

// 页面特定关键词配置
export const PAGE_KEYWORDS = {
  // 首页关键词
  HOME: [
    ...SEO_KEYWORDS.PRIMARY,
    ...SEO_KEYWORDS.BRAND,
    '产品发现平台',
    '科技资讯聚合',
    '最新产品发布'
  ],
  
  // 产品新闻页面
  PRODUCT_NEWS: [
    ...SEO_KEYWORDS.PRODUCT_CATEGORIES,
    ...SEO_KEYWORDS.CONTENT_SOURCES,
    '产品发布新闻',
    '科技产品资讯',
    '创新产品推荐'
  ],
  
  // 线索分析页面
  CLUE_ANALYSIS: [
    '需求分析',
    '市场洞察',
    '产品机会',
    '趋势预测',
    '用户需求挖掘',
    '产品需求分析',
    '市场需求识别'
  ],
  
  // 频道页面
  CHANNELS: {
    PRODUCTHUNT: [
      'ProductHunt',
      'Product Hunt',
      '产品发现',
      '新产品推荐',
      '创业产品',
      '产品投票'
    ],
    HACKERNEWS: [
      'Hacker News',
      'HackerNews',
      '技术新闻',
      '开发者资讯',
      '科技讨论',
      'Show HN'
    ],
    GITHUB: [
      'GitHub',
      '开源项目',
      '代码仓库',
      '开发者工具',
      'GitHub Trending',
      '开源软件'
    ],
    REDDIT: [
      'Reddit',
      '科技讨论',
      '产品讨论',
      '技术社区',
      '用户反馈'
    ],
    TECHCRUNCH: [
      'TechCrunch',
      '科技新闻',
      '创业资讯',
      '投资新闻',
      '科技公司'
    ]
  }
};

// 内容优化建议
export const CONTENT_OPTIMIZATION = {
  // 标题优化模板
  TITLE_TEMPLATES: [
    '{keyword} - {description} | SnapSeeker',
    '最新{keyword}资讯 - {description}',
    '{keyword}推荐：{description}',
    '发现{keyword} - {description}平台'
  ],
  
  // 描述优化模板
  DESCRIPTION_TEMPLATES: [
    '发现最新的{keyword}，包括{features}。在SnapSeeker获取{source}等平台的{category}资讯。',
    '专业的{keyword}聚合平台，实时更新{source}的{category}信息，为{audience}提供最新资讯。',
    '一站式{keyword}发现平台，聚合{source}等优质内容源，助您把握{category}趋势。'
  ],
  
  // 内容结构建议
  CONTENT_STRUCTURE: {
    MIN_WORD_COUNT: 300,
    OPTIMAL_WORD_COUNT: 800,
    MAX_KEYWORD_DENSITY: 3,
    MIN_KEYWORD_DENSITY: 1,
    HEADING_STRUCTURE: ['H1', 'H2', 'H3'],
    INTERNAL_LINKS_MIN: 2,
    EXTERNAL_LINKS_MAX: 5
  }
};

export default {
  SEO_KEYWORDS,
  SEO_CONFIG,
  PAGE_KEYWORDS,
  CONTENT_OPTIMIZATION
};
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Zap, Users, Calendar } from 'lucide-react';
import { NewsCard, NewsFilters } from '../components/news';
import { Card, CardHeader, CardTitle, CardContent, Loading, Button } from '../components/ui';
import { SEO, StructuredDataGenerator } from '../components/seo';
import { useAppStore } from '../store';
import { newsApi, channelApi, NewsItem, Channel, NewsResponse, NewsSource } from '../services/api';
import { useProductInsights } from '../hooks/useProductInsights';
import { PAGE_SEO_CONFIG } from '../config/seo';
import { SEO_KEYWORDS } from '../config/keywords';
import { toast } from 'react-hot-toast';

// 数据转换函数：将 API 响应转换为 UI 组件使用的格式
const transformNewsResponse = (newsResponse: NewsResponse): NewsItem[] => {
  console.log('🔄 开始转换 API 响应数据:', newsResponse);
  
  const allNews: NewsItem[] = [];
  let idCounter = 1;

  // 转换新产品数据
  console.log('📦 处理新产品发布数据:', newsResponse.new_products);
  newsResponse.new_products.forEach((source: NewsSource) => {
    source.posts.forEach(post => {
      allNews.push({
        id: idCounter++,
        title: post.title,
        summary: post.description,
        link: post.url,
        date: new Date(source.update_time).toLocaleString('zh-CN'),
        views: Math.floor(Math.random() * 1000) + 100, // 模拟浏览量
        likes: post.upvotes,
        category: 'new_products',
        tags: [source.title]
      });
    });
  });

  // 转换 Reddit 数据
  console.log('💬 处理 Reddit 讨论数据:', newsResponse.reddits);
  newsResponse.reddits.forEach((source: NewsSource) => {
    source.posts.forEach(post => {
      allNews.push({
        id: idCounter++,
        title: post.title,
        summary: post.description,
        link: post.url,
        date: new Date(source.update_time).toLocaleString('zh-CN'),
        views: Math.floor(Math.random() * 1000) + 100,
        likes: post.upvotes,
        category: 'reddits',
        tags: [source.title]
      });
    });
  });

  // 转换趋势数据
  console.log('📈 处理趋势热点数据:', newsResponse.trendings);
  newsResponse.trendings.forEach((source: NewsSource) => {
    source.posts.forEach(post => {
      allNews.push({
        id: idCounter++,
        title: post.title,
        summary: post.description,
        link: post.url,
        date: new Date(source.update_time).toLocaleString('zh-CN'),
        views: Math.floor(Math.random() * 1000) + 100,
        likes: post.upvotes,
        category: 'trendings',
        tags: [source.title]
      });
    });
  });

  console.log('✅ 数据转换完成，总计:', allNews.length, '条新闻');
  console.log('📋 转换后的数据:', allNews);
  
  return allNews;
};

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { news, setNews, channels, setChannels, loading, setLoading } = useAppStore();
  
  // 添加产品资讯数据获取
  const { 
    data: productInsights, 
    isLoading: productInsightsLoading, 
    fetchProductInsights 
  } = useProductInsights();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'likes'>('date');
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  
  // 添加调试状态
  const [debugInfo, setDebugInfo] = useState<string>('初始化中...');
  
  // 模拟数据 - 实际项目中会从API获取
  const mockChannels: Channel[] = [
    {
      id: 'product-hunt',
      name: 'Product Hunt',
      icon: 'zap',
      updateTime: '2小时前',
      color: '#FF6154',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      articles: []
    },
    {
      id: 'tech-crunch',
      name: 'TechCrunch',
      icon: 'trending-up',
      updateTime: '1小时前',
      color: '#00D084',
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      articles: []
    },
    {
      id: 'hacker-news',
      name: 'Hacker News',
      icon: 'users',
      updateTime: '30分钟前',
      color: '#FF6600',
      bgGradient: 'from-orange-500/20 to-yellow-500/20',
      articles: []
    }
  ];
  
  const mockNews: NewsItem[] = [
    {
      id: 1,
      title: "Notion AI 2.0 正式发布：重新定义知识管理",
      summary: "全新的AI助手功能，支持多语言内容生成和智能摘要，为用户提供更加智能的知识管理体验。",
      link: "#",
      date: "2小时前",
      views: 1280,
      likes: 89,
      category: "product-hunt"
    },
    {
      id: 2,
      title: "OpenAI发布GPT-4 Turbo：更快更便宜的AI模型",
      summary: "新模型在保持性能的同时，大幅降低了使用成本，为开发者提供更好的AI集成体验。",
      link: "#",
      date: "1小时前",
      views: 3200,
      likes: 245,
      category: "tech-crunch"
    },
    {
      id: 3,
      title: "Figma Dev Mode：设计到开发的无缝衔接",
      summary: "为开发者量身定制的新功能，提供代码生成和组件检查，大大提升设计到开发的效率。",
      link: "#",
      date: "4小时前",
      views: 950,
      likes: 67,
      category: "product-hunt"
    },
    {
      id: 4,
      title: "苹果Vision Pro开发者预览版体验报告",
      summary: "首批开发者分享的真实使用感受和开发心得，揭示了空间计算的无限可能。",
      link: "#",
      date: "3小时前",
      views: 2800,
      likes: 198,
      category: "tech-crunch"
    },
    {
      id: 5,
      title: "Linear 新版本：项目管理的极简美学",
      summary: "重新设计的界面和工作流，让团队协作更加高效，体现了现代项目管理工具的发展趋势。",
      link: "#",
      date: "6小时前",
      views: 720,
      likes: 45,
      category: "product-hunt"
    }
  ];
  
  // 加载数据
  useEffect(() => {
    console.log('🚀 HomePage useEffect 被调用');
    setDebugInfo('useEffect 开始执行...');
    loadData();
  }, []);
  
  // 筛选和排序新闻
  useEffect(() => {
    let filtered = [...news];
    
    // 搜索筛选
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // 分类筛选
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return b.views - a.views;
        case 'likes':
          return b.likes - a.likes;
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
    
    setFilteredNews(filtered);
  }, [news, searchQuery, selectedCategory, sortBy]);
  
  const loadData = async () => {
    console.log('🔥🔥🔥 loadData 函数开始执行 🔥🔥🔥');
    try {
      setLoading(true);
      setDebugInfo('开始加载数据...');
      
      console.log('🔄 开始加载新闻数据...');
      console.log('📡 API 基础 URL:', import.meta.env.VITE_API_BASE_URL || 'http://35.209.49.134:8030');
      
      setDebugInfo('调用 API...');
      
      // 调用新的 API 获取所有新闻数据
      const newsResponse = await newsApi.getNews({ lang: 'zh' });
      
      setDebugInfo(`API 响应成功: ${JSON.stringify(newsResponse).substring(0, 100)}...`);
      
      console.log('✅ API 响应成功:', newsResponse);
      
      // 转换数据格式 - 注意：现在需要访问 newsResponse.data
      const transformedNews = transformNewsResponse(newsResponse.data);
      setNews(transformedNews);
      
      setDebugInfo(`转换完成，共 ${transformedNews.length} 条新闻`);
      
      // 设置频道数据（基于 API 响应动态生成）
      const dynamicChannels: Channel[] = [
        {
          id: 'new_products',
          name: '新产品发布',
          icon: 'zap',
          updateTime: newsResponse.data.new_products[0]?.update_time ? 
            new Date(newsResponse.data.new_products[0].update_time).toLocaleString('zh-CN') : '暂无更新',
          color: '#FF6154',
          bgGradient: 'from-orange-500/20 to-red-500/20',
          articles: transformedNews.filter(item => item.category === 'new_products')
        },
        {
          id: 'reddits',
          name: 'Reddit 讨论',
          icon: 'users',
          updateTime: newsResponse.data.reddits[0]?.update_time ? 
            new Date(newsResponse.data.reddits[0].update_time).toLocaleString('zh-CN') : '暂无更新',
          color: '#FF4500',
          bgGradient: 'from-red-500/20 to-orange-500/20',
          articles: transformedNews.filter(item => item.category === 'reddits')
        },
        {
          id: 'trendings',
          name: '趋势热点',
          icon: 'trending-up',
          updateTime: newsResponse.data.trendings[0]?.update_time ? 
            new Date(newsResponse.data.trendings[0].update_time).toLocaleString('zh-CN') : '暂无更新',
          color: '#00D084',
          bgGradient: 'from-green-500/20 to-emerald-500/20',
          articles: transformedNews.filter(item => item.category === 'trendings')
        }
      ];
      
      setChannels(dynamicChannels);
      
      console.log('✅ 成功加载新闻数据:', {
        totalNews: transformedNews.length,
        newProducts: newsResponse.data.new_products.length,
        reddits: newsResponse.data.reddits.length,
        trendings: newsResponse.data.trendings.length
      });
      
      setDebugInfo(`加载完成！新闻: ${transformedNews.length}, 新产品: ${newsResponse.data.new_products.length}, Reddit: ${newsResponse.data.reddits.length}, 趋势: ${newsResponse.data.trendings.length}`);
      
      toast.success(`成功加载 ${transformedNews.length} 条新闻`);
      
    } catch (error) {
      console.error('❌ API 调用失败:', error);
      console.error('❌ 错误详情:', {
        message: error.message,
        status: error.status,
        code: error.code,
        details: error.details
      });
      
      setDebugInfo(`❌ 错误: ${error.message || '未知错误'} - 使用默认模拟数据`);
      
      // 注意：新的 API 已经在内部处理了错误并返回模拟数据
      // 这里的 catch 块实际上不应该被执行，除非有其他错误
      console.log('🔄 使用默认模拟数据作为最终后备');
      setNews(mockNews);
      setChannels(mockChannels);
      
      const errorMessage = error.message || '网络错误，已加载模拟数据';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const handleNewsRead = (id: number) => {
    // 在实际项目中，这里会打开新闻详情或跳转到外部链接
    console.log('Read news:', id);
  };
  
  const handleNewsLike = async (id: number) => {
    try {
      // 调用真实的 API
      await newsApi.likeNews(id);
      
      // 更新本地状态
      const updatedNews = news.map(item =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      );
      setNews(updatedNews);
      
      toast.success(t('common.success'));
    } catch (error) {
      console.error('Failed to like news:', error);
      toast.error(t('errors.unknownError'));
    }
  };
  
  const handleNewsShare = (id: number) => {
    // 在实际项目中，这里会实现分享功能
    navigator.clipboard.writeText(`${window.location.origin}/news/${id}`);
    toast.success('链接已复制到剪贴板');
  };
  
  const categories = Array.from(new Set(news.map(item => item.category).filter(Boolean)));
  
  // 生成首页结构化数据
  const homeStructuredData = StructuredDataGenerator.generateCollectionPage({
    name: PAGE_SEO_CONFIG.HOME.title,
    description: PAGE_SEO_CONFIG.HOME.description,
    url: window.location.href,
    items: filteredNews.slice(0, 10).map(item => ({
      name: item.title,
      url: `${window.location.origin}/news/${item.id}`
    }))
  });
  
  if ((loading && news.length === 0) || productInsightsLoading) {
    return (
      <>
        <SEO
          title={PAGE_SEO_CONFIG.HOME.title}
          description={PAGE_SEO_CONFIG.HOME.description}
          keywords={PAGE_SEO_CONFIG.HOME.keywords}
          type={PAGE_SEO_CONFIG.HOME.type as any}
          structuredData={homeStructuredData}
        />
        <div className="flex items-center justify-center min-h-96">
          <Loading size="lg" text={t('common.loading')} />
        </div>
      </>
    );
  }
  
  return (
    <>
      <SEO
        title={PAGE_SEO_CONFIG.HOME.title}
        description={PAGE_SEO_CONFIG.HOME.description}
        keywords={PAGE_SEO_CONFIG.HOME.keywords}
        type={PAGE_SEO_CONFIG.HOME.type as any}
        structuredData={homeStructuredData}
      />
      <div className="space-y-6">
      {/* 调试信息 */}
      {debugInfo && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="py-3">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-600 font-medium">🔍 调试信息:</span>
              <span className="text-yellow-800">{debugInfo}</span>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('navigation.home')}</h1>
          <p className="text-gray-600 mt-1">发现最新的产品和技术趋势</p>
        </div>
        
        <Button
          onClick={loadData}
          loading={loading || productInsightsLoading}
          icon={<TrendingUp className="w-4 h-4" />}
        >
          {t('common.refresh')}
        </Button>
      </div>
      
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">今日热门</p>
              <p className="text-2xl font-bold text-gray-900">{filteredNews.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">活跃频道</p>
              <p className="text-2xl font-bold text-gray-900">{channels.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">最近更新</p>
              <p className="text-2xl font-bold text-gray-900">2小时前</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* 筛选器 */}
      <NewsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        categories={categories}
      />
      
      {/* 新闻列表 */}
      <div className="space-y-4">
        {filteredNews.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">{t('news.noNews')}</p>
            </CardContent>
          </Card>
        ) : (
          filteredNews.map((newsItem) => (
            <NewsCard
              key={newsItem.id}
              news={newsItem}
              onRead={handleNewsRead}
              onLike={handleNewsLike}
              onShare={handleNewsShare}
            />
          ))
        )}
      </div>
      
      {/* 加载更多 */}
      {filteredNews.length > 0 && (
        <div className="text-center">
          <Button variant="secondary">
            {t('news.loadMore')}
          </Button>
        </div>
      )}
    </div>
    </>
  );
};
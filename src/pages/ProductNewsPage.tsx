import React, { useEffect, useState } from 'react';
import { EmptyState, SmartSectionRenderer } from '../components/common';
import { useProductInsights } from '../hooks/useProductInsights';
import { NewsSource } from '../services/api';
import { ExternalLink, TrendingUp, Calendar, Users, Heart, Share, Check } from 'lucide-react';

// 创建一个产品卡片组件，用于显示 NewsSource 中的产品数据
const ProductSourceCard: React.FC<{ source: NewsSource }> = ({ source }) => {
  const [copiedPostId, setCopiedPostId] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
    }) + ' ' + date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const handleTitleClick = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = async (url: string, postIndex: number) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedPostId(postIndex);
      setTimeout(() => setCopiedPostId(null), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // 降级处理
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedPostId(postIndex);
        setTimeout(() => setCopiedPostId(null), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  // 显示5-8篇文章，如果超过7篇则显示滚动条
  const displayPosts = source.posts.slice(0, Math.min(source.posts.length, 8));
  const shouldShowScroll = source.posts.length > 7;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 h-[480px] flex flex-col">
      {/* 来源信息 */}
      <div className="flex flex-shrink-0 items-center mb-4">
        {source.logo && (
          <img 
            src={source.logo} 
            alt={source.title}
            className="flex-shrink-0 mr-3 w-8 h-8 rounded-full"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-800 truncate lg:text-lg">{source.title}</h3>
          <p className="flex items-center text-xs text-gray-500 lg:text-sm">
            <Calendar className="flex-shrink-0 mr-1 w-3 h-3 lg:w-4 lg:h-4" />
            {formatDate(source.update_time)}
          </p>
        </div>
      </div>

      {/* 产品列表 - 可滚动区域 */}
      <div className={`flex-1 ${shouldShowScroll ? 'overflow-y-auto' : 'overflow-hidden'} scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400`}>
        <div className="pr-2 space-y-3">
          {displayPosts.map((post, index) => (
            <div key={index} className="py-2 pl-4 border-l-4 border-blue-500">
              <h4 
                className="mb-1 text-sm font-medium text-gray-800 transition-colors cursor-pointer line-clamp-2 hover:text-blue-600"
                onClick={() => handleTitleClick(post.url)}
                title="点击查看详情"
              >
                {post.title}
              </h4>
              <p className="mb-2 text-xs text-gray-600 line-clamp-2">{post.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Heart className="mr-1 w-3 h-3" />
                    {formatNumber(post.upvotes)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleShare(post.url, index)}
                    className="inline-flex items-center text-xs font-medium text-gray-500 transition-colors hover:text-blue-600"
                    title={copiedPostId === index ? "已复制链接" : "分享链接"}
                  >
                    {copiedPostId === index ? (
                      <>
                        <Check className="mr-1 w-3 h-3 text-green-500" />
                        <span className="text-green-500">已复制</span>
                      </>
                    ) : (
                      <>
                        <Share className="mr-1 w-3 h-3" />
                        分享
                      </>
                    )}
                  </button>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-medium text-blue-600 transition-colors hover:text-blue-800"
                  >
                    查看
                    <ExternalLink className="ml-1 w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 统计信息 */}
      <div className="flex-shrink-0 pt-4 mt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-xs text-gray-500 lg:text-sm">
          <span className="flex items-center">
            <TrendingUp className="flex-shrink-0 mr-1 w-3 h-3 lg:w-4 lg:h-4" />
            {source.posts.length} 个产品
          </span>
          <span className="flex items-center">
            <Users className="flex-shrink-0 mr-1 w-3 h-3 lg:w-4 lg:h-4" />
            {source.posts.reduce((sum, post) => sum + post.upvotes, 0)} 总赞数
          </span>
        </div>
      </div>
    </div>
  );
};

// 创建一个Reddit卡片组件，用于显示 NewsSource 中的Reddit数据
const RedditSourceCard: React.FC<{ source: NewsSource }> = ({ source }) => {
  const [copiedPostId, setCopiedPostId] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
    }) + ' ' + date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const handleTitleClick = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = async (url: string, postIndex: number) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedPostId(postIndex);
      setTimeout(() => setCopiedPostId(null), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // 降级处理
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedPostId(postIndex);
        setTimeout(() => setCopiedPostId(null), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  // 显示5-8篇文章，如果超过7篇则显示滚动条
  const displayPosts = source.posts.slice(0, Math.min(source.posts.length, 8));
  const shouldShowScroll = source.posts.length > 7;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 h-[480px] flex flex-col">
      {/* 来源信息 */}
      <div className="flex flex-shrink-0 items-center mb-4">
        {source.logo && (
          <img 
            src={source.logo} 
            alt={source.title}
            className="flex-shrink-0 mr-3 w-8 h-8 rounded-full"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-800 truncate lg:text-lg">{source.title}</h3>
          <p className="flex items-center text-xs text-gray-500 lg:text-sm">
            <Calendar className="flex-shrink-0 mr-1 w-3 h-3 lg:w-4 lg:h-4" />
            {formatDate(source.update_time)}
          </p>
        </div>
      </div>

      {/* 讨论列表 - 可滚动区域 */}
      <div className={`flex-1 ${shouldShowScroll ? 'overflow-y-auto' : 'overflow-hidden'} scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400`}>
        <div className="pr-2 space-y-3">
          {displayPosts.map((post, index) => (
            <div key={index} className="py-2 pl-4 border-l-4 border-orange-500">
              <h4 
                className="mb-1 text-sm font-medium text-gray-800 transition-colors cursor-pointer line-clamp-2 hover:text-orange-600"
                onClick={() => handleTitleClick(post.url)}
                title="点击查看详情"
              >
                {post.title}
              </h4>
              <p className="mb-2 text-xs text-gray-600 line-clamp-2">{post.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span className="flex items-center">
                    <TrendingUp className="mr-1 w-3 h-3" />
                    {formatNumber(post.upvotes)} upvotes
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleShare(post.url, index)}
                    className="inline-flex items-center text-xs font-medium text-gray-500 transition-colors hover:text-orange-600"
                    title={copiedPostId === index ? "已复制链接" : "分享链接"}
                  >
                    {copiedPostId === index ? (
                      <>
                        <Check className="mr-1 w-3 h-3 text-green-500" />
                        <span className="text-green-500">已复制</span>
                      </>
                    ) : (
                      <>
                        <Share className="mr-1 w-3 h-3" />
                        分享
                      </>
                    )}
                  </button>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-medium text-orange-600 transition-colors hover:text-orange-800"
                  >
                    查看
                    <ExternalLink className="ml-1 w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 统计信息 */}
      <div className="flex-shrink-0 pt-4 mt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-xs text-gray-500 lg:text-sm">
          <span className="flex items-center">
            <Users className="flex-shrink-0 mr-1 w-3 h-3 lg:w-4 lg:h-4" />
            {source.posts.length} 个讨论
          </span>
          <span className="flex items-center">
            <TrendingUp className="flex-shrink-0 mr-1 w-3 h-3 lg:w-4 lg:h-4" />
            {source.posts.reduce((sum, post) => sum + post.upvotes, 0)} 总热度
          </span>
        </div>
      </div>
    </div>
  );
};

// 创建一个趋势卡片组件，用于显示 NewsSource 中的趋势数据
const TrendingSourceCard: React.FC<{ source: NewsSource }> = ({ source }) => {
  const [copiedPostId, setCopiedPostId] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
    }) + ' ' + date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const handleTitleClick = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = async (url: string, postIndex: number) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedPostId(postIndex);
      setTimeout(() => setCopiedPostId(null), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // 降级处理
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedPostId(postIndex);
        setTimeout(() => setCopiedPostId(null), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  // 显示5-8篇文章，如果超过7篇则显示滚动条
  const displayPosts = source.posts.slice(0, Math.min(source.posts.length, 8));
  const shouldShowScroll = source.posts.length > 7;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 h-[480px] flex flex-col">
      {/* 来源信息 */}
      <div className="flex flex-shrink-0 items-center mb-4">
        {source.logo && (
          <img 
            src={source.logo} 
            alt={source.title}
            className="flex-shrink-0 mr-3 w-8 h-8 rounded-full"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-800 truncate lg:text-lg">{source.title}</h3>
          <p className="flex items-center text-xs text-gray-500 lg:text-sm">
            <Calendar className="flex-shrink-0 mr-1 w-3 h-3 lg:w-4 lg:h-4" />
            {formatDate(source.update_time)}
          </p>
        </div>
      </div>

      {/* 趋势列表 - 可滚动区域 */}
      <div className={`flex-1 ${shouldShowScroll ? 'overflow-y-auto' : 'overflow-hidden'} scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400`}>
        <div className="pr-2 space-y-3">
          {displayPosts.map((post, index) => (
            <div key={index} className="py-2 pl-4 border-l-4 border-green-500">
              <h4 
                className="mb-1 text-sm font-medium text-gray-800 transition-colors cursor-pointer line-clamp-2 hover:text-green-600"
                onClick={() => handleTitleClick(post.url)}
                title="点击查看详情"
              >
                {post.title}
              </h4>
              <p className="mb-2 text-xs text-gray-600 line-clamp-2">{post.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span className="flex items-center">
                    <TrendingUp className="mr-1 w-3 h-3" />
                    {formatNumber(post.upvotes)} 热度
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleShare(post.url, index)}
                    className="inline-flex items-center text-xs font-medium text-gray-500 transition-colors hover:text-green-600"
                    title={copiedPostId === index ? "已复制链接" : "分享链接"}
                  >
                    {copiedPostId === index ? (
                      <>
                        <Check className="mr-1 w-3 h-3 text-green-500" />
                        <span className="text-green-500">已复制</span>
                      </>
                    ) : (
                      <>
                        <Share className="mr-1 w-3 h-3" />
                        分享
                      </>
                    )}
                  </button>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-medium text-green-600 transition-colors hover:text-green-800"
                  >
                    查看
                    <ExternalLink className="ml-1 w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 统计信息 */}
      <div className="flex-shrink-0 pt-4 mt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-xs text-gray-500 lg:text-sm">
          <span className="flex items-center">
            <TrendingUp className="flex-shrink-0 mr-1 w-3 h-3 lg:w-4 lg:h-4" />
            {source.posts.length} 个趋势
          </span>
          <span className="flex items-center">
            <Users className="flex-shrink-0 mr-1 w-3 h-3 lg:w-4 lg:h-4" />
            {source.posts.reduce((sum, post) => sum + post.upvotes, 0)} 总热度
          </span>
        </div>
      </div>
    </div>
  );
};

export const ProductNewsPage: React.FC = () => {
  const { data, isLoading, error, hasData, refreshData } = useProductInsights();

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 lg:p-6">
      <div className="mx-auto max-w-7xl">
        {error && (
          <div className="mb-4 p-3 rounded-lg border border-yellow-200 bg-yellow-50 text-yellow-800 text-sm flex items-center justify-between">
            <span>数据同步失败，请刷新尝试</span>
            <button
              onClick={refreshData}
              className="px-2 py-1 rounded-md text-yellow-900 bg-yellow-100 hover:bg-yellow-200 transition"
            >
              重试
            </button>
          </div>
        )}
        {/* 欢迎信息 */}
        {false && (
        <div className="p-6 mb-12 rounded-xl border shadow-lg backdrop-blur-sm bg-white/80 border-white/20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 lg:text-3xl">还在为寻找下一个爆款灵感而苦恼？</h2>
            <p className="mb-4 text-gray-600">我们懂产品经理、开发者和创业团队的痛点。</p>
            <p className="mb-4 text-gray-600">
              <span className="font-semibold">ProductHot</span> 严选全球前沿资讯，为您聚合Product Hunt、Reddit、Hacker News 和各类社区的最新产品发布、讨论热点与新兴趋势。
            </p>
            <div className="p-4 mb-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">AI驱动的<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">线索识别与拆解工作台</span></h3>
                <span 
                  className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                >
                  查看详情
                  <ExternalLink className="ml-1 w-3 h-3" />
                </span>
              </div>
              <p className="mb-3 text-gray-700">
                我们不仅是信息的聚合，更是您的需求提取助手。在信息过载的时代，我们打造了一个专业的线索识别分析工作台，将海量数据转化为可执行的产品洞察。
              </p>
              <div className="grid grid-cols-1 gap-3 mb-2 md:grid-cols-3">
                <div className="flex items-start p-2 space-x-2 bg-purple-50 rounded-lg transition-colors duration-300 hover:bg-purple-100">
                  <div className="p-1.5 bg-purple-100 rounded-md shadow-sm">
                    <Brain className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-purple-800 mb-0.5">真实可靠</h4>
                    <p className="text-xs text-gray-600">严格基于实际产品数据和用户讨论，杜绝AI幻觉，确保每一条线索都有据可循</p>
                  </div>
                </div>
                <div className="flex items-start p-2 space-x-2 bg-blue-50 rounded-lg transition-colors duration-300 hover:bg-blue-100">
                  <div className="p-1.5 bg-blue-100 rounded-md shadow-sm">
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-800 mb-0.5">专业赋能</h4>
                    <p className="text-xs text-gray-600">采用权威B2B线索识别方法论，提供专业的横向赋能，助您精准把握市场机会</p>
                  </div>
                </div>
                <div className="flex items-start p-2 space-x-2 bg-teal-50 rounded-lg transition-colors duration-300 hover:bg-teal-100">
                  <div className="p-1.5 bg-teal-100 rounded-md shadow-sm">
                    <Zap className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-teal-800 mb-0.5">高效一体</h4>
                    <p className="text-xs text-gray-600">数据来源与分析工作台无缝集成，一站式完成从信息获取到线索拆解的全流程</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="mb-6 font-semibold text-gray-800">
              <span className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">您的下一个成功</span>，从这里开始。
            </p>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="flex items-center text-blue-700">
                <span className="mr-2">💡</span>
                <span>立即向下滚动，探索最新的产品资讯，如果想要体验线索拆解工作台，点击上方按钮</span>
              </p>
            </div>
          </div>
        </div>
        )}
        
        {/* 页面标题 */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-800 lg:text-4xl">产品灵感发掘</h1>
          <p className="mb-4 text-sm text-gray-600 lg:text-base">提供Product Hunt，Hacker News，开发者自荐，社区讨论，技术趋势等内容</p>

          {/* BIP 标识：权威、真诚、利他，不含营销意味 */}
          <div className="mx-auto mb-6 max-w-3xl">
            <div className="flex flex-wrap justify-center gap-2">
              <span className="inline-flex items-center px-3 py-1 text-xs text-gray-700 bg-white/80 border border-gray-200 rounded-full shadow-sm"><Check className="mr-1 w-3 h-3 text-green-600" /> 独立运营</span>
              <span className="inline-flex items-center px-3 py-1 text-xs text-gray-700 bg-white/80 border border-gray-200 rounded-full shadow-sm"><Check className="mr-1 w-3 h-3 text-green-600" /> 开源透明</span>
              <span className="inline-flex items-center px-3 py-1 text-xs text-gray-700 bg-white/80 border border-gray-200 rounded-full shadow-sm"><Check className="mr-1 w-3 h-3 text-green-600" /> 引用来源清晰</span>
              <span className="inline-flex items-center px-3 py-1 text-xs text-gray-700 bg-white/80 border border-gray-200 rounded-full shadow-sm"><Check className="mr-1 w-3 h-3 text-green-600" /> 数据可证</span>
              <span className="inline-flex items-center px-3 py-1 text-xs text-gray-700 bg-white/80 border border-gray-200 rounded-full shadow-sm"><Check className="mr-1 w-3 h-3 text-green-600" /> 人工核验</span>
              <span className="inline-flex items-center px-3 py-1 text-xs text-gray-700 bg-white/80 border border-gray-200 rounded-full shadow-sm"><Check className="mr-1 w-3 h-3 text-green-600" /> 无跟踪广告</span>
              <span className="inline-flex items-center px-3 py-1 text-xs text-gray-700 bg-white/80 border border-gray-200 rounded-full shadow-sm"><Check className="mr-1 w-3 h-3 text-green-600" /> 社区反馈友好</span>
            </div>
          </div>

          {/* 划分说明：为何分为三类 */}
          <div className="mx-auto mb-8 max-w-4xl text-left">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="p-4 bg-white/80 rounded-lg border border-gray-200">
                <h3 className="mb-1 text-sm font-semibold text-gray-800">产品发布资讯</h3>
                <p className="text-xs text-gray-600">聚合官方发布与权威媒体来源（如 Product Hunt、TechCrunch），便于快速浏览新产品与核心信息。</p>
              </div>
              <div className="p-4 bg-white/80 rounded-lg border border-gray-200">
                <h3 className="mb-1 text-sm font-semibold text-gray-800">社区心声社区</h3>
                <p className="text-xs text-gray-600">呈现用户与开发者的真实讨论与反馈（如 Reddit、Hacker News），帮助理解需求与使用痛点。</p>
              </div>
              <div className="p-4 bg-white/80 rounded-lg border border-gray-200">
                <h3 className="mb-1 text-sm font-semibold text-gray-800">技术洞察需求</h3>
                <p className="text-xs text-gray-600">跟踪技术趋势与实践分享（如趋势榜、开发者自荐），从技术动向推导潜在产品机会。</p>
              </div>
            </div>
          </div>

          {/* 搜索提示 */}
          {/* <div className="p-4 mx-auto max-w-2xl bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-center items-center space-x-2 text-blue-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm font-medium">
                💡 搜索提示：使用 <kbd className="px-2 py-1 font-mono text-xs bg-white rounded border border-blue-300">Ctrl+F</kbd> (Windows) 或 <kbd className="px-2 py-1 font-mono text-xs bg-white rounded border border-blue-300">Cmd+F</kbd> (Mac) 在当前页面搜索内容
              </span>
            </div>
          </div> */}
        </div>

        {/* 产品发布部分 */}
        <SmartSectionRenderer
          title="🚀 最新产品发布"
          isLoading={isLoading}
          error={error}
          data={data?.new_products}
          onRetry={refreshData}
          renderCard={(product, index) => (
            <ProductSourceCard key={`${product.title}-${index}`} source={product} />
          )}
          emptyTitle="暂无产品发布"
          emptyDescription="当前没有新的产品发布信息"
          maxCardsPerRow={3}
          articleCount={6}
        />

        {/* Reddit/SaaS 讨论部分 */}
        <SmartSectionRenderer
          title="💬 听社区的心声"
          isLoading={isLoading}
          error={error}
          data={data?.reddits}
          onRetry={refreshData}
          renderCard={(reddit, index) => (
            <RedditSourceCard key={`${reddit.title}-${index}`} source={reddit} />
          )}
          emptyTitle="暂无讨论"
          emptyDescription="当前没有相关的讨论信息"
          maxCardsPerRow={3}
          articleCount={6}
        />

        {/* 需求趋势部分 */}
        <SmartSectionRenderer
          title="📈 从技术洞察需求趋势"
          isLoading={isLoading}
          error={error}
          data={data?.trendings}
          onRetry={refreshData}
          renderCard={(trending, index) => (
            <TrendingSourceCard key={`${trending.title}-${index}`} source={trending} />
          )}
          emptyTitle="暂无趋势数据"
          emptyDescription="当前没有需求趋势信息"
          maxCardsPerRow={3}
          articleCount={6}
        />
      </div>
    </div>
  );
};

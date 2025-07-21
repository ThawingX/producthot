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
        {/* 页面标题 */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-800 lg:text-4xl">产品资讯</h1>
          <p className="mb-4 text-sm text-gray-600 lg:text-base">获取最新的产品发布、讨论和趋势信息</p>
          
          {/* 搜索提示 */}
          <div className="p-4 mx-auto max-w-2xl bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-center items-center space-x-2 text-blue-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm font-medium">
                💡 搜索提示：使用 <kbd className="px-2 py-1 font-mono text-xs bg-white rounded border border-blue-300">Ctrl+F</kbd> (Windows) 或 <kbd className="px-2 py-1 font-mono text-xs bg-white rounded border border-blue-300">Cmd+F</kbd> (Mac) 在当前页面搜索内容
              </span>
            </div>
          </div>
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
          title="💬 社区需求讨论"
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
          title="📈 需求趋势"
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
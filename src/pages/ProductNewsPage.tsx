import React, { useEffect } from 'react';
import { EmptyState, SmartSectionRenderer } from '../components/common';
import { useProductInsights } from '../hooks/useProductInsights';
import { NewsSource } from '../services/api';
import { ExternalLink, TrendingUp, Calendar, Users, Heart } from 'lucide-react';

// 创建一个产品卡片组件，用于显示 NewsSource 中的产品数据
const ProductSourceCard: React.FC<{ source: NewsSource }> = ({ source }) => {
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

  // 限制显示的文章数量为5-8篇
  const displayPosts = source.posts.slice(0, 6);
  const remainingHeight = 6 - displayPosts.length;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 h-[400px] flex flex-col">
      {/* 来源信息 */}
      <div className="flex items-center mb-4 flex-shrink-0">
        {source.logo && (
          <img 
            src={source.logo} 
            alt={source.title}
            className="w-8 h-8 rounded-full mr-3 flex-shrink-0"
          />
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-base lg:text-lg font-semibold text-gray-800 truncate">{source.title}</h3>
          <p className="text-xs lg:text-sm text-gray-500 flex items-center">
            <Calendar className="w-3 h-3 lg:w-4 lg:h-4 mr-1 flex-shrink-0" />
            {formatDate(source.update_time)}
          </p>
        </div>
      </div>

      {/* 产品列表 - 固定高度区域 */}
      <div className="flex-1 overflow-hidden">
        <div className="space-y-3 h-full">
          {displayPosts.map((post, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
              <h4 className="font-medium text-gray-800 mb-1 text-sm line-clamp-2">{post.title}</h4>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{post.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Heart className="w-3 h-3 mr-1" />
                    {formatNumber(post.upvotes)}
                  </span>
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors"
                >
                  查看
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          ))}
          
          {/* 填充空白区域以保持统一高度 */}
          {Array.from({ length: remainingHeight }).map((_, index) => (
            <div key={`empty-${index}`} className="h-[60px]" />
          ))}
        </div>
      </div>

      {/* 统计信息 */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between text-xs lg:text-sm text-gray-500">
          <span className="flex items-center">
            <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 mr-1 flex-shrink-0" />
            {source.posts.length} 个产品
          </span>
          <span className="flex items-center">
            <Users className="w-3 h-3 lg:w-4 lg:h-4 mr-1 flex-shrink-0" />
            {source.posts.reduce((sum, post) => sum + post.upvotes, 0)} 总赞数
          </span>
        </div>
      </div>
    </div>
  );
};

// 创建一个Reddit卡片组件，用于显示 NewsSource 中的Reddit数据
const RedditSourceCard: React.FC<{ source: NewsSource }> = ({ source }) => {
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

  // 限制显示的文章数量为5-8篇
  const displayPosts = source.posts.slice(0, 6);
  const remainingHeight = 6 - displayPosts.length;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 h-[400px] flex flex-col">
      {/* 来源信息 */}
      <div className="flex items-center mb-4 flex-shrink-0">
        {source.logo && (
          <img 
            src={source.logo} 
            alt={source.title}
            className="w-8 h-8 rounded-full mr-3 flex-shrink-0"
          />
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-base lg:text-lg font-semibold text-gray-800 truncate">{source.title}</h3>
          <p className="text-xs lg:text-sm text-gray-500 flex items-center">
            <Calendar className="w-3 h-3 lg:w-4 lg:h-4 mr-1 flex-shrink-0" />
            {formatDate(source.update_time)}
          </p>
        </div>
      </div>

      {/* 讨论列表 - 固定高度区域 */}
      <div className="flex-1 overflow-hidden">
        <div className="space-y-3 h-full">
          {displayPosts.map((post, index) => (
            <div key={index} className="border-l-4 border-orange-500 pl-4 py-2">
              <h4 className="font-medium text-gray-800 mb-1 text-sm line-clamp-2">{post.title}</h4>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{post.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span className="flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {formatNumber(post.upvotes)} upvotes
                  </span>
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-orange-600 hover:text-orange-800 text-xs font-medium transition-colors"
                >
                  查看
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          ))}
          
          {/* 填充空白区域以保持统一高度 */}
          {Array.from({ length: remainingHeight }).map((_, index) => (
            <div key={`empty-${index}`} className="h-[60px]" />
          ))}
        </div>
      </div>

      {/* 统计信息 */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between text-xs lg:text-sm text-gray-500">
          <span className="flex items-center">
            <Users className="w-3 h-3 lg:w-4 lg:h-4 mr-1 flex-shrink-0" />
            {source.posts.length} 个讨论
          </span>
          <span className="flex items-center">
            <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 mr-1 flex-shrink-0" />
            {source.posts.reduce((sum, post) => sum + post.upvotes, 0)} 总热度
          </span>
        </div>
      </div>
    </div>
  );
};

// 创建一个趋势卡片组件，用于显示 NewsSource 中的趋势数据
const TrendingSourceCard: React.FC<{ source: NewsSource }> = ({ source }) => {
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

  // 限制显示的文章数量为5-8篇
  const displayPosts = source.posts.slice(0, 6);
  const remainingHeight = 6 - displayPosts.length;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 h-[400px] flex flex-col">
      {/* 来源信息 */}
      <div className="flex items-center mb-4 flex-shrink-0">
        {source.logo && (
          <img 
            src={source.logo} 
            alt={source.title}
            className="w-8 h-8 rounded-full mr-3 flex-shrink-0"
          />
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-base lg:text-lg font-semibold text-gray-800 truncate">{source.title}</h3>
          <p className="text-xs lg:text-sm text-gray-500 flex items-center">
            <Calendar className="w-3 h-3 lg:w-4 lg:h-4 mr-1 flex-shrink-0" />
            {formatDate(source.update_time)}
          </p>
        </div>
      </div>

      {/* 趋势列表 - 固定高度区域 */}
      <div className="flex-1 overflow-hidden">
        <div className="space-y-3 h-full">
          {displayPosts.map((post, index) => (
            <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
              <h4 className="font-medium text-gray-800 mb-1 text-sm line-clamp-2">{post.title}</h4>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{post.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span className="flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {formatNumber(post.upvotes)} 热度
                  </span>
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 hover:text-green-800 text-xs font-medium transition-colors"
                >
                  查看
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          ))}
          
          {/* 填充空白区域以保持统一高度 */}
          {Array.from({ length: remainingHeight }).map((_, index) => (
            <div key={`empty-${index}`} className="h-[60px]" />
          ))}
        </div>
      </div>

      {/* 统计信息 */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between text-xs lg:text-sm text-gray-500">
          <span className="flex items-center">
            <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 mr-1 flex-shrink-0" />
            {source.posts.length} 个趋势
          </span>
          <span className="flex items-center">
            <Users className="w-3 h-3 lg:w-4 lg:h-4 mr-1 flex-shrink-0" />
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">产品资讯</h1>
          <p className="text-gray-600 text-sm lg:text-base mb-4">获取最新的产品发布、讨论和趋势信息</p>
          
          {/* 搜索提示 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-blue-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm font-medium">
                💡 搜索提示：使用 <kbd className="px-2 py-1 bg-white border border-blue-300 rounded text-xs font-mono">Ctrl+F</kbd> (Windows) 或 <kbd className="px-2 py-1 bg-white border border-blue-300 rounded text-xs font-mono">Cmd+F</kbd> (Mac) 在当前页面搜索内容
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
          title="💬 Reddit/SaaS 讨论"
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
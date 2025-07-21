import React from 'react';
import { TrendingItem } from '../../services/api';
import { TrendingUp, TrendingDown, Calendar, Tag } from 'lucide-react';

interface TrendingCardProps {
  trending: TrendingItem;
}

export const TrendingCard: React.FC<TrendingCardProps> = ({ trending }) => {
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

  const isPositiveChange = trending.changePercent >= 0;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group">
      {/* 关键词标题 */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
          {trending.keyword}
        </h3>
        <div className={`flex items-center text-sm font-medium ${
          isPositiveChange ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositiveChange ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          {isPositiveChange ? '+' : ''}{trending.changePercent.toFixed(1)}%
        </div>
      </div>
      
      {/* 描述 */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {trending.description}
      </p>
      
      {/* 趋势分数 */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">趋势热度</span>
          <span className="font-medium text-gray-800">{trending.trendScore}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${trending.trendScore}%` }}
          />
        </div>
      </div>
      
      {/* 相关产品 */}
      {trending.relatedProducts.length > 0 && (
        <div className="mb-4">
          <span className="text-xs text-gray-500 mb-2 block">相关产品:</span>
          <div className="flex flex-wrap gap-1">
            {trending.relatedProducts.slice(0, 3).map((product, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700"
              >
                <Tag className="w-3 h-3 mr-1" />
                {product}
              </span>
            ))}
            {trending.relatedProducts.length > 3 && (
              <span className="text-xs text-gray-500">+{trending.relatedProducts.length - 3}</span>
            )}
          </div>
        </div>
      )}
      
      {/* 底部信息 */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
          {trending.category}
        </span>
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(trending.publishedAt)}
          </span>
          <span className="text-xs">
            {trending.source}
          </span>
        </div>
      </div>
    </div>
  );
};
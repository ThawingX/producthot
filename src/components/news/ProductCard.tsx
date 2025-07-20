import React from 'react';
import { ProductItem } from '../../services/api';
import { ExternalLink, Eye, Heart, Calendar, Tag } from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group">
      {/* 产品图片 */}
      {product.imageUrl && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.title}
            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      {/* 产品标题 */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {product.title}
      </h3>
      
      {/* 产品描述 */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {product.description}
      </p>
      
      {/* 标签 */}
      {product.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{product.tags.length - 3}</span>
          )}
        </div>
      )}
      
      {/* 统计信息 */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            {formatNumber(product.views)}
          </span>
          <span className="flex items-center">
            <Heart className="w-4 h-4 mr-1" />
            {formatNumber(product.likes)}
          </span>
        </div>
        <span className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {formatDate(product.publishedAt)}
        </span>
      </div>
      
      {/* 来源和链接 */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {product.source}
        </span>
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          查看详情
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
};
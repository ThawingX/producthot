import React from 'react';

interface LoadingSkeletonProps {
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  count = 3, 
  className = '' 
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index}
          className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 animate-pulse ${className}`}
        >
          {/* 图片占位符 */}
          <div className="w-full h-32 bg-gray-200 rounded-lg mb-4" />
          
          {/* 标题占位符 */}
          <div className="h-6 bg-gray-200 rounded mb-2" />
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
          
          {/* 描述占位符 */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
          
          {/* 标签占位符 */}
          <div className="flex gap-2 mb-4">
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
            <div className="h-6 w-14 bg-gray-200 rounded-full" />
          </div>
          
          {/* 底部信息占位符 */}
          <div className="flex justify-between items-center">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </>
  );
};
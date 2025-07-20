import React from 'react';

interface NewsCardSkeletonProps {
  count?: number;
  className?: string;
}

export const NewsCardSkeleton: React.FC<NewsCardSkeletonProps> = ({ 
  count = 5, 
  className = '' 
}) => {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 h-[400px] flex flex-col ${className}`}>
      {/* 来源信息骨架 */}
      <div className="flex items-center mb-4 flex-shrink-0">
        <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
      </div>

      {/* 文章列表骨架 - 固定高度区域 */}
      <div className="flex-1 overflow-hidden">
        <div className="space-y-3 h-full">
          {Array.from({ length: Math.min(count, 6) }).map((_, index) => (
            <div key={index} className="border-l-4 border-gray-200 pl-4 py-2">
              {/* 标题骨架 */}
              <div className="h-4 bg-gray-200 rounded mb-1" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              
              {/* 描述骨架 */}
              <div className="space-y-1 mb-2">
                <div className="h-3 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
              </div>
              
              {/* 底部信息骨架 */}
              <div className="flex items-center justify-between">
                <div className="h-3 w-16 bg-gray-200 rounded" />
                <div className="h-3 w-12 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 统计信息骨架 */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

interface SectionSkeletonProps {
  title: string;
  cardCount?: number;
  articleCount?: number;
}

export const SectionSkeleton: React.FC<SectionSkeletonProps> = ({ 
  title, 
  cardCount = 3,
  articleCount = 6
}) => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {Array.from({ length: cardCount }).map((_, index) => (
          <NewsCardSkeleton key={index} count={articleCount} />
        ))}
      </div>
    </section>
  );
};
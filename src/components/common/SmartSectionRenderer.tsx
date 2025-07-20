import React from 'react';
import { EmptyState } from './EmptyState';
import { SectionSkeleton } from './NewsCardSkeleton';
import { ErrorStateCard } from './ErrorStateCard';

interface SmartSectionRendererProps {
  title: string;
  isLoading: boolean;
  error: string | null;
  data: any[] | null | undefined;
  onRetry: () => void;
  renderCard: (item: any, index: number) => React.ReactNode;
  emptyTitle: string;
  emptyDescription: string;
  maxCardsPerRow?: number;
  articleCount?: number;
}

export const SmartSectionRenderer: React.FC<SmartSectionRendererProps> = ({
  title,
  isLoading,
  error,
  data,
  onRetry,
  renderCard,
  emptyTitle,
  emptyDescription,
  maxCardsPerRow = 3,
  articleCount = 6
}) => {
  // 加载状态
  if (isLoading) {
    return <SectionSkeleton title={title} cardCount={maxCardsPerRow} articleCount={articleCount} />;
  }

  // 完全错误状态（没有任何数据）
  if (error && (!data || data.length === 0)) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <span className="text-sm text-gray-500">加载失败</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="col-span-full">
            <ErrorStateCard 
              title="加载失败"
              message="暂时没有找到相关内容，请稍后重试"
              onRetry={onRetry}
            />
          </div>
        </div>
      </section>
    );
  }

  // 有数据的情况
  const hasData = data && data.length > 0;
  
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <span className="text-sm text-gray-500">
          {hasData ? `${data.length} 个来源` : '暂时没有找到'}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {hasData ? (
          <>
            {/* 渲染实际数据 */}
            {data.map((item, index) => renderCard(item, index))}
            
            {/* 如果有错误且数据不足一行，填充错误卡片 */}
            {error && data.length < maxCardsPerRow && 
              Array.from({ length: maxCardsPerRow - data.length }).map((_, index) => (
                <ErrorStateCard 
                  key={`error-${index}`}
                  title="部分内容加载失败"
                  message="暂时没有找到更多内容"
                  onRetry={onRetry}
                />
              ))
            }
          </>
        ) : (
          <div className="col-span-full">
            <EmptyState 
              title={emptyTitle}
              description={emptyDescription}
            />
          </div>
        )}
      </div>
    </section>
  );
};
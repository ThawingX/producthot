import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateCardProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorStateCard: React.FC<ErrorStateCardProps> = ({ 
  title = "加载失败",
  message = "暂时没有找到相关内容",
  onRetry,
  className = '' 
}) => {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 h-[400px] flex flex-col justify-center items-center ${className}`}>
      <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 text-center mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          重试
        </button>
      )}
    </div>
  );
};

interface SectionErrorStateProps {
  title: string;
  cardCount?: number;
  onRetry?: () => void;
}

export const SectionErrorState: React.FC<SectionErrorStateProps> = ({ 
  title, 
  cardCount = 3,
  onRetry
}) => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <span className="text-sm text-gray-500">加载失败</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: cardCount }).map((_, index) => (
          <ErrorStateCard key={index} onRetry={onRetry} />
        ))}
      </div>
    </section>
  );
};
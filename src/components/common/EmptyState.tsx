import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  onRetry?: () => void;
  isLoading?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  onRetry, 
  isLoading = false 
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20 text-center">
      <div className="flex justify-center mb-4">
        <AlertCircle className="w-12 h-12 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-6">
        {description}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? '重新加载中...' : '重新加载'}
        </button>
      )}
    </div>
  );
};
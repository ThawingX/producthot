import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, SortAsc, X } from 'lucide-react';
import { Input, Button } from '../ui';

interface NewsFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: 'date' | 'views' | 'likes';
  onSortChange: (sort: 'date' | 'views' | 'likes') => void;
  categories: string[];
}

export const NewsFilters: React.FC<NewsFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  categories,
}) => {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  
  const sortOptions = [
    { value: 'date', label: t('news.sortByDate') },
    { value: 'views', label: t('news.sortByViews') },
    { value: 'likes', label: t('news.sortByLikes') },
  ];
  
  const clearFilters = () => {
    onSearchChange('');
    onCategoryChange('');
    onSortChange('date');
  };
  
  const hasActiveFilters = searchQuery || selectedCategory || sortBy !== 'date';
  
  return (
    <div className="space-y-4">
      {/* 搜索栏 */}
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <Input
            placeholder={t('news.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            fullWidth
          />
        </div>
        
        <Button
          variant="secondary"
          onClick={() => setShowFilters(!showFilters)}
          icon={<Filter className="w-4 h-4" />}
          className={showFilters ? 'bg-blue-50 text-blue-600' : ''}
        >
          {t('common.filter')}
        </Button>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            icon={<X className="w-4 h-4" />}
            size="sm"
          >
            {t('common.reset')}
          </Button>
        )}
      </div>
      
      {/* 筛选器 */}
      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 分类筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('news.filterByCategory')}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t('channels.allChannels')}</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {t(`channels.${category}`, category)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* 排序 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('common.sort')}
              </label>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as 'date' | 'views' | 'likes')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* 活动筛选器标签 */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {t('common.search')}: {searchQuery}
                  <button
                    onClick={() => onSearchChange('')}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {selectedCategory && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {t(`channels.${selectedCategory}`, selectedCategory)}
                  <button
                    onClick={() => onCategoryChange('')}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {sortBy !== 'date' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {sortOptions.find(opt => opt.value === sortBy)?.label}
                  <button
                    onClick={() => onSortChange('date')}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
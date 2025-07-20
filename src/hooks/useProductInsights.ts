import { useCallback } from 'react';
import { useAppStore } from '../store';
import { newsApi } from '../services/api';

export const useProductInsights = () => {
  const {
    productInsights,
    productInsightsLoading,
    productInsightsError,
    setProductInsights,
    setProductInsightsLoading,
    setProductInsightsError,
  } = useAppStore();

  // 获取产品资讯数据
  const fetchProductInsights = useCallback(async () => {
    try {
      setProductInsightsLoading(true);
      setProductInsightsError(null);
      
      const response = await newsApi.getNews();
      if (response.success) {
        setProductInsights(response.data);
      } else {
        throw new Error(response.message || '获取新闻数据失败');
      }
    } catch (error: any) {
      console.error('Failed to fetch product insights:', error);
      setProductInsightsError(error.message || '获取产品资讯数据失败');
      
      // 设置空数据结构，避免页面崩溃
      setProductInsights({
        new_products: [],
        reddits: [],
        trendings: []
      });
    } finally {
      setProductInsightsLoading(false);
    }
  }, [setProductInsights, setProductInsightsLoading, setProductInsightsError]);

  // 刷新数据
  const refreshData = useCallback(async () => {
    await fetchProductInsights();
  }, [fetchProductInsights]);

  // 检查是否有数据
  const hasData = productInsights && (
    productInsights.new_products.length > 0 ||
    productInsights.reddits.length > 0 ||
    productInsights.trendings.length > 0
  );

  // 检查各模块是否有数据
  const hasNewProducts = productInsights?.new_products && productInsights.new_products.length > 0;
  const hasReddits = productInsights?.reddits && productInsights.reddits.length > 0;
  const hasTrendings = productInsights?.trendings && productInsights.trendings.length > 0;

  return {
    // 数据
    data: productInsights,
    
    // 状态
    isLoading: productInsightsLoading,
    error: productInsightsError,
    
    // 方法
    fetchProductInsights,
    refreshData,
    
    // 数据存在性检查
    hasData,
    hasNewProducts,
    hasReddits,
    hasTrendings,
  };
};
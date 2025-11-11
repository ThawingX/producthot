import { useCallback } from 'react';
import { useProductInsightsStore } from '../store';
import { newsApi } from '../services/api';
import { defaultNewsFallback } from '../data/defaultNews';

export const useProductInsights = () => {
  const {
    products,
    redditDiscussions,
    trendingItems,
    isLoading,
    error,
    setProducts,
    setRedditDiscussions,
    setTrendingItems,
    setIsLoading,
    setError,
  } = useProductInsightsStore();

  // 获取产品资讯数据
  const fetchProductInsights = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await newsApi.getNews();
      if (response.success) {
        // 假设API返回的数据结构包含这些字段
        const data = response.data;
        setProducts(data.new_products || []);
        setRedditDiscussions(data.reddits || []);
        setTrendingItems(data.trendings || []);
      } else {
        throw new Error(response.message || '获取新闻数据失败');
      }
    } catch (error: any) {
      console.error('Failed to fetch product insights:', error);
      // 使用默认数据回退，并提示用户
      setError('数据同步失败，请刷新尝试');
      setProducts(defaultNewsFallback.new_products);
      setRedditDiscussions(defaultNewsFallback.reddits);
      setTrendingItems(defaultNewsFallback.trendings);
    } finally {
      setIsLoading(false);
    }
  }, [setProducts, setRedditDiscussions, setTrendingItems, setIsLoading, setError]);

  // 刷新数据
  const refreshData = useCallback(async () => {
    await fetchProductInsights();
  }, [fetchProductInsights]);

  // 检查是否有数据
  const hasData = products.length > 0 || redditDiscussions.length > 0 || trendingItems.length > 0;

  // 检查各模块是否有数据
  const hasNewProducts = products.length > 0;
  const hasReddits = redditDiscussions.length > 0;
  const hasTrendings = trendingItems.length > 0;

  return {
    // 数据
    data: {
      new_products: products,
      reddits: redditDiscussions,
      trendings: trendingItems
    },
    
    // 状态
    isLoading,
    error,
    
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

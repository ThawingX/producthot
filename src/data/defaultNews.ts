import { NewsResponse } from '../services/api';

// 轻量级的默认占位数据，用于网络请求失败时回退显示
export const defaultNewsFallback: NewsResponse = {
  new_products: [
    {
      title: '默认产品资讯',
      logo: '',
      update_time: new Date().toISOString(),
      posts: [
        {
          title: '暂无数据',
          url: '#',
          description: '当前无法获取最新的产品发布信息',
          upvotes: 0,
        },
      ],
    },
  ],
  reddits: [
    {
      title: '默认社区讨论',
      logo: '',
      update_time: new Date().toISOString(),
      posts: [
        {
          title: '暂无数据',
          url: '#',
          description: '当前无法获取最新的社区讨论',
          upvotes: 0,
        },
      ],
    },
  ],
  trendings: [
    {
      title: '默认趋势数据',
      logo: '',
      update_time: new Date().toISOString(),
      posts: [
        {
          title: '暂无数据',
          url: '#',
          description: '当前无法获取最新的趋势信息',
          upvotes: 0,
        },
      ],
    },
  ],
};


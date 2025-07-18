import React from 'react';
import { ChannelCard } from '../components/news/ChannelCard';
import { productLaunchChannels, redditSaasChannels, trendChannels, marketInsights } from '../data/channels';

export const ProductNewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 产品发布 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🚀 产品发布
            </h2>
            <span className="text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full">
              实时更新
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {productLaunchChannels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </section>

        {/* Reddit/SaaS 讨论 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              💬 Reddit/SaaS 讨论
            </h2>
            <span className="text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full">
              热门话题
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {redditSaasChannels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </section>

        {/* 趋势分析 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              📈 趋势分析
            </h2>
            <span className="text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full">
              数据洞察
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {trendChannels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </section>

        {/* 市场洞察 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🎯 市场洞察
            </h2>
            <span className="text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full">
              深度分析
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {marketInsights.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
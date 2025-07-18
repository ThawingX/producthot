import React from 'react';
import { Calendar, Eye, Heart, Share, ExternalLink } from 'lucide-react';
import { Channel } from '../../types';

interface ChannelCardProps {
  channel: Channel;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({ channel }) => {
  return (
    <div className={`liquid-glass p-6 rounded-3xl bg-gradient-to-br ${channel.bgGradient} shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2`}>
      {/* 渠道头部 */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl backdrop-blur-sm floating-glass" style={{ backgroundColor: `${channel.color}15`, color: channel.color, boxShadow: `0 4px 16px ${channel.color}20` }}>
            {channel.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight text-gray-800">{channel.name}</h3>
            <p className="text-sm font-medium text-gray-600">更新于 {channel.updateTime}</p>
          </div>
        </div>
        <button className="p-2.5 rounded-xl floating-glass hover:bg-white/20 transition-all duration-300 hover:scale-110">
          <ExternalLink size={16} className="text-gray-600" />
        </button>
      </div>

      {/* 文章列表 */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
        {channel.articles.map((article) => (
          <article key={article.id} className="p-3 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:shadow-lg">
            <h4 className="text-sm font-semibold text-gray-800 mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
              <a href={article.link} className="hover:underline">
                {article.title}
              </a>
            </h4>
            <p className="text-xs text-gray-600 mb-2.5 line-clamp-2 leading-relaxed">
              {article.summary}
            </p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <div className="flex items-center space-x-2.5">
                <span className="flex items-center">
                  <Calendar size={11} className="mr-1" />
                  {article.date}
                </span>
                <span className="flex items-center">
                  <Eye size={11} className="mr-1" />
                  {article.views}
                </span>
                <span className="flex items-center">
                  <Heart size={11} className="mr-1" />
                  {article.likes}
                </span>
              </div>
              <button className="opacity-0 transition-opacity group-hover:opacity-100">
                <Share size={11} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
import React from 'react';
import { RedditDiscussion } from '../../services/api';
import { ExternalLink, ArrowUp, MessageCircle, Calendar, User } from 'lucide-react';

interface RedditCardProps {
  discussion: RedditDiscussion;
}

export const RedditCard: React.FC<RedditCardProps> = ({ discussion }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group">
      {/* 标题 */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
        {discussion.title}
      </h3>
      
      {/* 内容摘要 */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-4">
        {discussion.content}
      </p>
      
      {/* 标签 */}
      {discussion.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {discussion.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-700"
            >
              #{tag}
            </span>
          ))}
          {discussion.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{discussion.tags.length - 3}</span>
          )}
        </div>
      )}
      
      {/* 统计信息 */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <ArrowUp className="w-4 h-4 mr-1" />
            {formatNumber(discussion.upvotes)}
          </span>
          <span className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-1" />
            {formatNumber(discussion.comments)}
          </span>
        </div>
        <span className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {formatDate(discussion.publishedAt)}
        </span>
      </div>
      
      {/* 作者和subreddit信息 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span className="flex items-center">
            <User className="w-3 h-3 mr-1" />
            u/{discussion.author}
          </span>
          <span>•</span>
          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">
            r/{discussion.subreddit}
          </span>
        </div>
      </div>
      
      {/* 链接 */}
      <div className="flex justify-end">
        <a
          href={discussion.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-orange-600 hover:text-orange-800 text-sm font-medium transition-colors"
        >
          查看讨论
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
};
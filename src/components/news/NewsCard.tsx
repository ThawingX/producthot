import React from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, Heart, Share, Calendar, ExternalLink, Copy, Check } from 'lucide-react';
import { Card, CardContent, Button } from '../ui';
import { NewsItem } from '../../services/api';
import { useNewsStore } from '../../store';

interface NewsCardProps {
  news: NewsItem;
  onRead?: (id: number) => void;
  onLike?: (id: number) => void;
  onShare?: (id: number) => void;
  compact?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  news,
  onRead,
  onLike,
  onShare,
  compact = false,
}) => {
  const { t } = useTranslation();
  const { favorites, addToFavorites, removeFromFavorites, addToHistory } = useNewsStore();
  const [copied, setCopied] = React.useState(false);
  
  const isFavorited = favorites.includes(news.id);
  
  const handleRead = () => {
    addToHistory(news.id);
    onRead?.(news.id);
  };
  
  const handleTitleClick = () => {
    if (news.url) {
      window.open(news.url, '_blank', 'noopener,noreferrer');
      addToHistory(news.id);
    }
  };
  
  const handleLike = () => {
    if (isFavorited) {
      removeFromFavorites(news.id);
    } else {
      addToFavorites(news.id);
    }
    onLike?.(news.id);
  };
  
  const handleShare = async () => {
    try {
      const shareUrl = news.url || window.location.href;
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onShare?.(news.id);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // 降级处理：尝试使用传统方法
      const textArea = document.createElement('textarea');
      textArea.value = news.url || window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return t('time.justNow');
    if (diffInMinutes < 60) return t('time.minutesAgo', { count: diffInMinutes });
    if (diffInMinutes < 1440) return t('time.hoursAgo', { count: Math.floor(diffInMinutes / 60) });
    return t('time.daysAgo', { count: Math.floor(diffInMinutes / 1440) });
  };
  
  if (compact) {
    return (
      <Card 
        variant="outlined" 
        padding="sm" 
        hoverable 
        className="hover:border-blue-300"
      >
        <div className="flex items-start space-x-3">
          <div className="flex-1 min-w-0">
            <h3 
              className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={handleTitleClick}
              title="点击查看详情"
            >
              {news.title}
            </h3>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {formatTime(news.date)}
              </span>
              <span className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                {news.views}
              </span>
              <span className="flex items-center">
                <Heart className={`w-3 h-3 mr-1 ${isFavorited ? 'text-red-500 fill-current' : ''}`} />
                {news.likes}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={handleShare}
              className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
              title={copied ? "已复制链接" : "分享链接"}
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share className="w-4 h-4" />}
            </button>
            <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card hoverable className="group">
      <CardContent>
        <div className="space-y-3">
          <div>
            <h3 
              className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer"
              onClick={handleTitleClick}
              title="点击查看详情"
            >
              {news.title}
            </h3>
            <p className="text-gray-600 mt-2 line-clamp-3">
              {news.summary}
            </p>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatTime(news.date)}
              </span>
              <span className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {news.views.toLocaleString()}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                icon={<Heart className={`w-4 h-4 ${isFavorited ? 'text-red-500 fill-current' : ''}`} />}
                className="text-gray-500 hover:text-red-500"
              >
                {news.likes}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                icon={copied ? <Check className="w-4 h-4 text-green-500" /> : <Share className="w-4 h-4" />}
                className={`text-gray-500 transition-colors ${copied ? 'text-green-500' : 'hover:text-blue-500'}`}
                title={copied ? "已复制链接" : "分享链接"}
              >
                {copied ? '已复制' : '分享'}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRead}
                icon={<ExternalLink className="w-4 h-4" />}
                className="text-gray-500 hover:text-blue-500"
              >
                {t('common.view')}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
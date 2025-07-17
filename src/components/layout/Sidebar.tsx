import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  TrendingUp, 
  Lightbulb, 
  Users, 
  Bell, 
  Settings, 
  Menu, 
  X,
  Home,
  Bookmark,
  User
} from 'lucide-react';
import { Button } from '../ui';
import { useAppStore } from '../../store';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { t } = useTranslation();
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  
  const navigationItems = [
    {
      id: 'home',
      label: t('navigation.home'),
      icon: <Home className="w-5 h-5" />,
      href: '/',
    },
    {
      id: 'trending',
      label: t('navigation.trending'),
      icon: <TrendingUp className="w-5 h-5" />,
      href: '/trending',
    },
    {
      id: 'channels',
      label: t('navigation.channels'),
      icon: <Users className="w-5 h-5" />,
      href: '/channels',
    },
    {
      id: 'bookmarks',
      label: t('navigation.bookmarks'),
      icon: <Bookmark className="w-5 h-5" />,
      href: '/bookmarks',
    },
  ];
  
  const bottomItems = [
    {
      id: 'profile',
      label: t('navigation.profile'),
      icon: <User className="w-5 h-5" />,
      href: '/profile',
    },
    {
      id: 'settings',
      label: t('navigation.settings'),
      icon: <Settings className="w-5 h-5" />,
      href: '/settings',
    },
  ];
  
  if (!sidebarOpen) {
    return null;
  }
  
  return (
    <>
      {/* 移动端遮罩 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={() => setSidebarOpen(false)}
      />
      
      {/* 侧边栏 */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        ${className}
      `}>
        <div className="flex flex-col h-full">
          {/* 头部 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ProductHot</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              icon={<X className="w-5 h-5" />}
              className="lg:hidden"
            />
          </div>
          
          {/* 导航菜单 */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
          
          {/* 底部菜单 */}
          <div className="px-4 py-4 border-t border-gray-200 space-y-2">
            {bottomItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
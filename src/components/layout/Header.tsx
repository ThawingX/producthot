import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Bell, 
  Menu, 
  Sun, 
  Moon, 
  Globe,
  User,
  LogOut
} from 'lucide-react';
import { Button, Input } from '../ui';
import { useAppStore } from '../../store';
import { themeUtils } from '../../theme';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const { 
    sidebarOpen, 
    setSidebarOpen, 
    theme, 
    setTheme, 
    language, 
    setLanguage,
    user,
    isAuthenticated,
    logout
  } = useAppStore();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleTheme = () => {
    const newTheme = themeUtils.toggleTheme();
    setTheme(newTheme);
  };
  
  const toggleLanguage = () => {
    const newLang = language === 'zh-CN' ? 'en-US' : 'zh-CN';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };
  
  const handleLogout = () => {
    logout();
    // 可以添加重定向逻辑
  };
  
  return (
    <header className={`
      bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between
      ${className}
    `}>
      {/* 左侧 */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          icon={<Menu className="w-5 h-5" />}
          className="lg:hidden"
        />
        
        {/* 搜索框 - 桌面端 */}
        <div className="hidden md:block w-96">
          <Input
            placeholder={t('news.searchPlaceholder')}
            leftIcon={<Search className="w-4 h-4" />}
            fullWidth
          />
        </div>
      </div>
      
      {/* 右侧 */}
      <div className="flex items-center space-x-2">
        {/* 搜索按钮 - 移动端 */}
        <Button
          variant="ghost"
          size="sm"
          icon={<Search className="w-5 h-5" />}
          className="md:hidden"
        />
        
        {/* 语言切换 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLanguage}
          icon={<Globe className="w-5 h-5" />}
          title={t('settings.language')}
        />
        
        {/* 主题切换 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          icon={theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          title={t('settings.theme')}
        />
        
        {/* 通知 */}
        <Button
          variant="ghost"
          size="sm"
          icon={<Bell className="w-5 h-5" />}
          title={t('settings.notifications')}
        />
        
        {/* 用户菜单 */}
        {isAuthenticated ? (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              icon={<User className="w-5 h-5" />}
              title={t('navigation.profile')}
            >
              <span className="hidden sm:inline ml-1">
                {user?.name || user?.email}
              </span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              icon={<LogOut className="w-5 h-5" />}
              title={t('navigation.logout')}
              className="text-red-600 hover:text-red-700"
            />
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              href="/login"
            >
              {t('navigation.login')}
            </Button>
            
            <Button
              variant="primary"
              size="sm"
              href="/register"
            >
              {t('navigation.register')}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
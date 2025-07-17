import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useAppStore } from '../../store';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarOpen } = useAppStore();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar />
      
      {/* 主内容区域 */}
      <div className={`
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}
      `}>
        {/* 头部 */}
        <Header />
        
        {/* 页面内容 */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { NavigationHeader } from './components/layout/NavigationHeader';
import { ProductNewsPage } from './pages/ProductNewsPage';
import { EnvironmentBadge, EnvironmentPanel } from './components/EnvironmentBadge';
import { TabType } from './types';

function App() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 只保留资讯标签
  const activeTab: TabType = 'news';

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader
        activeTab={activeTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <Routes>
        <Route path="/" element={<ProductNewsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* 环境信息显示 */}
      <EnvironmentBadge />
      <EnvironmentPanel />
    </div>
  );
}

export default App;

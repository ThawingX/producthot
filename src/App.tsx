import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { NavigationHeader } from './components/layout/NavigationHeader';
import { ProductNewsPage } from './pages/ProductNewsPage';
import { ClueAnalysisPage } from './pages/ClueAnalysisPage';
import { EnvironmentBadge, EnvironmentPanel } from './components/EnvironmentBadge';
import { TabType } from './types';

function App() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 根据当前路径确定活动标签
  const activeTab: TabType = location.pathname === '/clue-analysis' ? 'analysis' : 'news';

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader
        activeTab={activeTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <Routes>
        <Route path="/" element={<ProductNewsPage />} />
        <Route path="/clue-analysis" element={<ClueAnalysisPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* 环境信息显示 */}
      <EnvironmentBadge />
      <EnvironmentPanel />
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { NavigationHeader } from './components/layout/NavigationHeader';
import { ProductNewsPage } from './pages/ProductNewsPage';
import { ClueAnalysisPage } from './pages/ClueAnalysisPage';
import { TabType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('news');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      {activeTab === 'news' ? <ProductNewsPage /> : <ClueAnalysisPage />}
    </div>
  );
}

export default App;
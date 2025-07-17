import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/layout';
import { HomePage } from './pages/HomePage';
import { useAppStore } from './store';
import { themeUtils } from './theme';
import './i18n';

function App() {
  const { theme, setTheme } = useAppStore();
  
  // 初始化主题
  useEffect(() => {
    const currentTheme = themeUtils.getCurrentTheme();
    themeUtils.applyTheme(currentTheme);
    setTheme(currentTheme);
    
    // 监听系统主题变化
    const cleanup = themeUtils.watchSystemTheme((newTheme) => {
      setTheme(newTheme);
    });
    
    return cleanup;
  }, [setTheme]);
  
  return (
    <div className="App">
      <Layout>
        <HomePage />
      </Layout>
      
      {/* 全局通知 */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
          },
        }}
      />
    </div>
  );
}

export default App;
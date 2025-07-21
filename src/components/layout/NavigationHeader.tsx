import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Menu, X } from 'lucide-react';
import { TabType } from '../../types';
import logoSvg from '/logo.svg';

interface NavigationHeaderProps {
  activeTab: TabType;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  activeTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-xl liquid-glass bg-white/80 border-white/20">
      <div className="px-6 py-4 mx-auto max-w-7xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logoSvg} alt="ProductHot Logo" className="w-10 h-10" />
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              ProductHot
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-2 md:flex">
            <button
              onClick={() => navigate('/')}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                activeTab === 'news'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              产品资讯集合
            </button>
            <button
              onClick={() => navigate('/clue-analysis')}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                activeTab === 'analysis'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              线索拆解工作台
            </button>
          </nav>

          {/* Search and Actions */}
          <div className="hidden items-center space-x-4 md:flex">
            <button className="p-2.5 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-300">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl transition-all duration-300 md:hidden bg-white/50 hover:bg-white/70"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="pb-4 mt-4 border-t md:hidden border-white/20">
            <nav className="flex flex-col mt-4 space-y-2">
              <button
                onClick={() => {
                  navigate('/');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-2xl font-medium text-left transition-all duration-300 ${
                  activeTab === 'news'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                产品资讯集合
              </button>
              <button
                onClick={() => {
                  navigate('/clue-analysis');
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-3 rounded-2xl font-medium text-left transition-all duration-300 ${
                  activeTab === 'analysis'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                线索拆解工作台
              </button>
            </nav>
            <div className="pt-4 mt-4 border-t border-white/20">
              <button className="w-full p-2.5 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-300 flex items-center justify-center">
                <Bell className="mr-2 w-5 h-5 text-gray-600" />
                通知
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
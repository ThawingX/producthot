import React from 'react';
import { Bell, Menu, X } from 'lucide-react';
import { TabType } from '../../types';
import logoSvg from '/logo.svg';

interface NavigationHeaderProps {
  activeTab: TabType;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  activeTab: _activeTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-xl liquid-glass bg-white/80 border-white/20">
      <div className="px-6 py-2 mx-auto max-w-7xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logoSvg} alt="ProductHot Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              ProductHot
            </span>
          </div>

          {/* Desktop Navigation (removed per requirement) */}
          <nav className="hidden items-center space-x-2 md:flex" />

          {/* Search and Actions */}
          <div className="hidden items-center space-x-4 md:flex">
            <button className="p-2 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-300">
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
            {/* Mobile Navigation removed per requirement */}
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

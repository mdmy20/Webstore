import React, { useState } from 'react';
import { Search, ShoppingBag, User, X, Menu } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeaderProps {
  onOpenMobileNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileNav }) => {
  const {
    searchQuery,
    setSearchQuery,
    cartItemCount,
    setIsCartOpen,
    setIsAccountModalOpen,
    setSelectedCategory,
  } = useStore();

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left section: Mobile menu toggle & Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenMobileNav}
              className="md:hidden p-2 text-on-surface hover:text-primary transition-colors focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group"
            >
              <span className="font-hardbop text-2xl sm:text-3xl font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors block">
                mshopy
              </span>
              <span className="caption text-secondary font-semibold uppercase tracking-widest block -mt-1">
                MODERN FASHION & APPAREL
              </span>
            </button>
          </div>

          {/* Middle section: Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className={`relative w-full transition-all duration-200 ${isSearchFocused ? 'scale-[1.01]' : ''}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-500" />
              </div>
              <input
                type="text"
                placeholder="Cari baju, celana, sepatu, jaket, atau aksesoris..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="input-field w-full pl-9 pr-8 text-sm placeholder:text-neutral-400 bg-surface focus:border-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-on-surface"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right section: Account & Cart actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-on-surface hover:text-primary transition-colors rounded-sm"
              aria-label="Sign in or Account"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Account</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-primary relative flex items-center space-x-2 bg-primary hover:bg-blue-700 text-tertiary px-4 py-2 rounded-sm"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Cart</span>
              {cartItemCount > 0 && (
                <span className="ml-1 bg-secondary text-tertiary text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4 pt-1">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-neutral-500" />
            </div>
            <input
              type="text"
              placeholder="Search artworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full pl-9 pr-8 text-sm placeholder:text-neutral-400 bg-surface focus:border-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};

import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface NavigationProps {
  isMobileNavOpen: boolean;
  onCloseMobileNav: () => void;
  onSelectCategory: (catId: string | null) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isMobileNavOpen,
  onCloseMobileNav,
  onSelectCategory,
  activeSection,
  setActiveSection,
}) => {
  const { categories, selectedCategory } = useStore();

  const navLinks = [
    { id: 'shop', label: 'Shop All' },
    { id: 'new-arrivals', label: 'New Arrivals' },
    { id: 'best-sellers', label: 'Best Sellers' },
    { id: 'about', label: 'About & Contact' },
  ];

  const handleNavClick = (linkId: string) => {
    setActiveSection(linkId);
    if (linkId === 'shop') {
      onSelectCategory(null);
    }
    const elem = document.getElementById(linkId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    onCloseMobileNav();
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-surface border-b border-neutral hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">

            {/* Quick Links */}
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm font-semibold uppercase tracking-wider transition-colors py-3 border-b-2 ${
                    activeSection === link.id && selectedCategory === null
                      ? 'border-primary text-primary'
                      : 'border-transparent text-on-surface/80 hover:text-primary'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Category Quick Chips */}
            <div className="flex items-center space-x-2">
              <span className="caption text-secondary uppercase tracking-widest font-semibold mr-2">
                Categories:
              </span>
              <button
                onClick={() => onSelectCategory(null)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-secondary text-tertiary'
                    : 'bg-neutral/50 text-on-surface hover:bg-neutral'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setActiveSection('shop');
                    const elem = document.getElementById('shop');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-secondary text-tertiary'
                      : 'bg-neutral/50 text-on-surface hover:bg-neutral'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            onClick={onCloseMobileNav}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Menu Panel */}
          <div className="relative ml-0 flex w-full max-w-xs flex-col bg-surface p-6 shadow-2xl z-10">
            <div className="flex items-center justify-between pb-6 border-b border-neutral">
              <span className="font-hardbop text-xl font-bold tracking-tight text-on-surface">
                FOLLOW ART
              </span>
              <button
                onClick={onCloseMobileNav}
                className="p-2 text-on-surface hover:text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-6 flex-1 overflow-y-auto space-y-6">
              <div>
                <span className="caption uppercase tracking-widest text-secondary font-bold block mb-3">
                  Store Navigation
                </span>
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className="w-full text-left py-2 text-base font-semibold text-on-surface hover:text-primary flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-4 h-4 text-neutral-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral">
                <span className="caption uppercase tracking-widest text-secondary font-bold block mb-3">
                  Explore Categories
                </span>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onSelectCategory(null);
                      onCloseMobileNav();
                    }}
                    className={`w-full text-left py-2 text-sm font-medium ${
                      selectedCategory === null ? 'text-primary font-bold' : 'text-on-surface/80'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        onCloseMobileNav();
                      }}
                      className={`w-full text-left py-2 text-sm font-medium flex items-center justify-between ${
                        selectedCategory === cat.id ? 'text-primary font-bold' : 'text-on-surface/80'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-neutral-400">({cat.itemCount})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral text-xs text-neutral-500">
              <p>© 2025 Follow Art Gallery.</p>
              <p>Confident Blue & Warm Chocolate Identity.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

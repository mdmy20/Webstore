import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AccountModal } from './components/AccountModal';
import { Footer } from './components/Footer';
import { Check } from 'lucide-react';

const MainContent: React.FC = () => {
  const { setSelectedCategory, toastMessage } = useStore();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('shop');

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-on-surface text-tertiary px-5 py-3 rounded-md shadow-2xl flex items-center space-x-3 border border-neutral-700 animate-bounce">
          <div className="p-1 bg-primary rounded-full text-tertiary">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header onOpenMobileNav={() => setIsMobileNavOpen(true)} />

      {/* Navigation Bar */}
      <Navigation
        isMobileNavOpen={isMobileNavOpen}
        onCloseMobileNav={() => setIsMobileNavOpen(false)}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-1">
        {/* Hero Banner Section */}
        <Hero />

        {/* Featured Categories & Trust Banner */}
        <TrustSection />

        {/* Product Catalog Grid */}
        <ProductGrid />
      </main>

      {/* Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <AccountModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}

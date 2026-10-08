import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { SearchModal } from './components/layout/SearchModal';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { RefundPolicyPage } from './pages/RefundPolicyPage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { Product } from './types/product';
import { PRODUCTS } from './data/products';

export function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [shopCategory, setShopCategory] = useState<string>('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Hash-based URL synchronizer for seamless back/forward navigation and direct links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (hash.startsWith('product/')) {
        const slug = hash.replace('product/', '');
        const found = PRODUCTS.find(p => p.slug === slug);
        if (found) {
          setSelectedProduct(found);
          setCurrentPage('product-detail');
          return;
        }
      }
      if (['home', 'shop', 'categories', 'about', 'contact', 'refund-policy', 'shipping-policy', 'privacy-policy', 'terms'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string, category?: string) => {
    if (category) {
      setShopCategory(category);
    }
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.location.hash = `product/${product.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateBySlug = (slug: string) => {
    const found = PRODUCTS.find(p => p.slug === slug);
    if (found) {
      handleSelectProduct(found);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#09090B]">
      <Header
        currentTab={currentPage}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="flex-1 pb-16 md:pb-0">
        {currentPage === 'home' && (
          <HomePage
            onSelectProduct={handleSelectProduct}
            onNavigateToShop={(cat?: string) => navigateTo('shop', cat)}
          />
        )}

        {currentPage === 'shop' && (
          <CatalogPage
            onSelectProduct={handleSelectProduct}
            initialCategory={shopCategory}
          />
        )}

        {currentPage === 'categories' && (
          <CategoriesPage
            onSelectCategory={(cat: string) => navigateTo('shop', cat)}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBackToCatalog={() => navigateTo('shop')}
            onSelectRelatedProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigateToShop={() => navigateTo('shop')} />
        )}

        {currentPage === 'contact' && <ContactPage />}

        {currentPage === 'refund-policy' && <RefundPolicyPage />}

        {currentPage === 'shipping-policy' && <ShippingPolicyPage />}

        {currentPage === 'privacy-policy' && <PrivacyPolicyPage />}

        {currentPage === 'terms' && <TermsPage />}
      </main>

      <Footer onNavigate={navigateTo} />

      {/* Persistent Mobile Bottom Navigation (Hidden on PDP to allow uninterrupted Buy CTA) */}
      {currentPage !== 'product-detail' && (
        <MobileBottomNav
          currentTab={currentPage}
          onNavigate={navigateTo}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      )}

      {/* Global Overlays & Modals */}
      <CartDrawer onNavigateToProduct={handleNavigateBySlug} />
      <CheckoutModal />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

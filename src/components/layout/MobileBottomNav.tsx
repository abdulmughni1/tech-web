import React from 'react';
import { useCart } from '../../context/CartContext';
import { Home, Grid, Search, ShoppingBag, MessageSquare } from 'lucide-react';
import { BRAND } from '../../data/policies';

interface MobileBottomNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
}) => {
  const { totalItems, setIsCartOpen } = useCart();

  const handleWhatsApp = () => {
    window.open(BRAND.contact.whatsappUrl, '_blank');
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0B1020]/95 backdrop-blur-md border-t border-[#E2E8F0] dark:border-[#1E293B] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)] pb-[env(safe-area-inset-bottom)] transition-colors duration-200">
      <div className="grid grid-cols-5 h-14 items-center">
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            currentTab === 'home'
              ? 'text-[#0866FF] dark:text-[#3D82FF]'
              : 'text-[#71717A] dark:text-[#A4AEC0] hover:text-[#09090B] dark:hover:text-[#F4F7FC]'
          }`}
          aria-label="Home"
        >
          <Home className="w-4 h-4" />
          <span className="font-tech text-[9px] uppercase tracking-wider mt-1 font-semibold">Home</span>
        </button>

        {/* Shop Catalog */}
        <button
          onClick={() => onNavigate('shop')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            currentTab === 'shop' || currentTab === 'categories'
              ? 'text-[#0866FF] dark:text-[#3D82FF]'
              : 'text-[#71717A] dark:text-[#A4AEC0] hover:text-[#09090B] dark:hover:text-[#F4F7FC]'
          }`}
          aria-label="Shop catalog"
        >
          <Grid className="w-4 h-4" />
          <span className="font-tech text-[9px] uppercase tracking-wider mt-1 font-semibold">Catalog</span>
        </button>

        {/* Search */}
        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center h-full text-[#71717A] dark:text-[#A4AEC0] hover:text-[#09090B] dark:hover:text-[#F4F7FC] transition-colors"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
          <span className="font-tech text-[9px] uppercase tracking-wider mt-1 font-semibold">Search</span>
        </button>

        {/* WhatsApp Direct Support */}
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center h-full text-[#16A34A] dark:text-[#22C55E] transition-colors"
          aria-label="WhatsApp support"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="font-tech text-[9px] uppercase tracking-wider mt-1 font-semibold">Chat</span>
        </button>

        {/* Cart Bag */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center h-full text-[#71717A] dark:text-[#A4AEC0] hover:text-[#09090B] dark:hover:text-[#F4F7FC] transition-colors"
          aria-label="Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-[#09090B] dark:text-[#F4F7FC]" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#0866FF] dark:bg-[#3D82FF] text-white text-[9px] font-bold font-mono px-1 rounded-full min-w-[14px] text-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="font-tech text-[9px] uppercase tracking-wider mt-1 font-bold text-[#09090B] dark:text-[#F4F7FC]">
            Bag
          </span>
        </button>
      </div>
    </div>
  );
};

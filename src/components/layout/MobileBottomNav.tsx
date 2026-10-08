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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E4E4E7] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 h-14 items-center">
        {/* Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            currentTab === 'home' ? 'text-[#0066FF]' : 'text-[#71717A] hover:text-[#09090B]'
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
            currentTab === 'shop' || currentTab === 'categories' ? 'text-[#0066FF]' : 'text-[#71717A] hover:text-[#09090B]'
          }`}
          aria-label="Shop catalog"
        >
          <Grid className="w-4 h-4" />
          <span className="font-tech text-[9px] uppercase tracking-wider mt-1 font-semibold">Catalog</span>
        </button>

        {/* Search */}
        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center h-full text-[#71717A] hover:text-[#09090B] transition-colors"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
          <span className="font-tech text-[9px] uppercase tracking-wider mt-1 font-semibold">Search</span>
        </button>

        {/* WhatsApp Direct Support */}
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center h-full text-[#16A34A] transition-colors"
          aria-label="WhatsApp support"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="font-tech text-[9px] uppercase tracking-wider mt-1 font-semibold">Chat</span>
        </button>

        {/* Cart Bag */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center h-full text-[#71717A] hover:text-[#09090B] transition-colors"
          aria-label="Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-[#09090B]" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#0066FF] text-white text-[9px] font-bold font-mono px-1 rounded-full min-w-[14px] text-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="font-tech text-[9px] uppercase tracking-wider mt-1 font-bold text-[#09090B]">
            Bag
          </span>
        </button>
      </div>
    </div>
  );
};

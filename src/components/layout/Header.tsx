import React, { useState } from 'react';
import { DexyfiedLogo } from '../brand/DexyfiedLogo';
import { useCart } from '../../context/CartContext';
import { Search, ShoppingBag, Menu, X, Phone } from 'lucide-react';
import { BRAND } from '../../data/policies';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, categoryFilter?: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'categories', label: 'Categories' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#E4E4E7] shadow-sm">
      {/* Top micro-announcement banner */}
      <div className="bg-[#F4F4F5] border-b border-[#E4E4E7] py-1.5 px-4 text-center">
        <div className="flex items-center justify-center gap-3 font-tech text-[11px] text-[#52525B] tracking-wider uppercase">
          <span className="font-medium text-[#09090B]">NATIONWIDE DELIVERY PKR {BRAND.shipping.fee}</span>
          <span className="text-[#A1A1AA]">•</span>
          <span>7-DAY RETURN POLICY</span>
          <span className="text-[#A1A1AA] hidden sm:inline">•</span>
          <span className="hidden sm:inline text-[#52525B]">SUPPORT: {BRAND.contact.phoneFormatted}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => handleLinkClick('home')}
            className="cursor-pointer flex items-center"
          >
            <DexyfiedLogo size="md" showSubtitle={false} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`font-display text-xs uppercase tracking-widest transition-colors py-1 ${
                  currentTab === link.id
                    ? 'text-[#0066FF] font-bold border-b-2 border-[#0066FF]'
                    : 'text-[#52525B] hover:text-[#09090B] font-medium'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Icons (Search + Cart) */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#52525B] hover:text-[#09090B] border border-transparent hover:border-[#E4E4E7] transition-colors"
              aria-label="Search products"
              title="Search catalog"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#09090B] border border-[#E4E4E7] bg-white hover:border-[#09090B] transition-colors flex items-center gap-2 shadow-xs"
              aria-label="View shopping cart"
              title="Cart bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#09090B]" />
              <span className="font-tech text-xs text-[#09090B] font-bold">
                [{totalItems}]
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#0066FF] border-2 border-white" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#52525B] hover:text-[#09090B] border border-[#E4E4E7]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E4E4E7] bg-white px-4 py-6 space-y-4 shadow-lg">
          <div className="space-y-2">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`block w-full text-left py-2.5 px-3 font-display text-sm uppercase tracking-wider ${
                  currentTab === link.id
                    ? 'bg-[#F4F4F5] text-[#0066FF] font-bold border-l-2 border-[#0066FF]'
                    : 'text-[#52525B] hover:text-[#09090B]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E4E4E7] space-y-2 text-xs font-tech text-[#71717A]">
            <div className="flex items-center gap-2 text-[#09090B]">
              <Phone className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>{BRAND.contact.phoneFormatted}</span>
            </div>
            <div>
              <span>EMAIL: </span>
              <a href={`mailto:${BRAND.contact.email}`} className="text-[#09090B] hover:underline font-mono">
                {BRAND.contact.email}
              </a>
            </div>
            <div className="pt-2 text-[10px] text-[#71717A]">
              FLAT PKR {BRAND.shipping.fee} SHIPPING NATIONWIDE
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

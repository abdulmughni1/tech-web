import React, { useState } from 'react';
import { DexyfiedLogo } from '../brand/DexyfiedLogo';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { Search, ShoppingBag, Menu, X, Phone, Sun, Moon } from 'lucide-react';
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
  const { theme, toggleTheme } = useTheme();
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
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#09090B]/95 backdrop-blur-md border-b border-[#E4E4E7] dark:border-[#27272A] shadow-xs transition-colors duration-200">
      {/* Top micro-announcement banner */}
      <div className="bg-[#F4F4F5] dark:bg-[#18181B] border-b border-[#E4E4E7] dark:border-[#27272A] py-1.5 px-4 text-center transition-colors">
        <div className="flex items-center justify-center gap-3 font-tech text-[11px] text-[#52525B] dark:text-[#A1A1AA] tracking-wider uppercase">
          <span className="font-medium text-[#09090B] dark:text-white">NATIONWIDE DELIVERY PKR {BRAND.shipping.fee}</span>
          <span className="text-[#A1A1AA] dark:text-[#52525B]">•</span>
          <span>7-DAY RETURN POLICY</span>
          <span className="text-[#A1A1AA] dark:text-[#52525B] hidden sm:inline">•</span>
          <span className="hidden sm:inline text-[#52525B] dark:text-[#A1A1AA]">SUPPORT: {BRAND.contact.phoneFormatted}</span>
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
                className={`font-display text-xs uppercase tracking-widest transition-colors py-1 cursor-pointer ${
                  currentTab === link.id
                    ? 'text-[#0066FF] dark:text-[#3B82F6] font-bold border-b-2 border-[#0066FF] dark:border-[#3B82F6]'
                    : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white font-medium'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Icons (Theme Toggle + Search + Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white border border-transparent hover:border-[#E4E4E7] dark:border-[#27272A] rounded-[2px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-300" />
              )}
            </button>

            <button
              onClick={onOpenSearch}
              className="p-2 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white border border-transparent hover:border-[#E4E4E7] dark:hover:border-[#27272A] rounded-[2px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
              aria-label="Search products"
              title="Search catalog"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#09090B] dark:text-white border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] hover:border-[#09090B] dark:hover:border-neutral-400 rounded-[2px] transition-colors flex items-center gap-2 shadow-2xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              aria-label="View shopping cart"
              title="Cart bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#09090B] dark:text-white" />
              <span className="font-tech text-xs text-[#09090B] dark:text-white font-bold">
                [{totalItems}]
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#0066FF] border-2 border-white dark:border-[#121214]" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white border border-[#E4E4E7] dark:border-[#27272A] rounded-[2px] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] px-4 py-6 space-y-4 shadow-lg transition-colors duration-200">
          <div className="space-y-2">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`block w-full text-left py-2.5 px-3 font-display text-sm uppercase tracking-wider rounded-[2px] cursor-pointer ${
                  currentTab === link.id
                    ? 'bg-[#F4F4F5] dark:bg-[#18181B] text-[#0066FF] dark:text-[#3B82F6] font-bold border-l-2 border-[#0066FF] dark:border-[#3B82F6]'
                    : 'text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#E4E4E7] dark:border-[#27272A] space-y-2 text-xs font-tech text-[#71717A] dark:text-[#A1A1AA]">
            <div className="flex items-center justify-between py-1">
              <span className="text-[#52525B] dark:text-[#A1A1AA] uppercase font-medium">INTERFACE THEME:</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-2.5 py-1 border border-[#E4E4E7] dark:border-[#27272A] bg-[#F8F9FA] dark:bg-[#18181B] text-[#09090B] dark:text-white uppercase font-bold text-[11px]"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-700" />
                    <span>DARK MODE</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-300" />
                    <span>LIGHT MODE</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center gap-2 text-[#09090B] dark:text-white pt-1">
              <Phone className="w-3.5 h-3.5 text-[#09090B] dark:text-white" />
              <span>{BRAND.contact.phoneFormatted}</span>
            </div>
            <div>
              <span>EMAIL: </span>
              <a href={`mailto:${BRAND.contact.email}`} className="text-[#09090B] dark:text-white hover:underline font-mono">
                {BRAND.contact.email}
              </a>
            </div>
            <div className="pt-2 text-[10px] text-[#71717A] dark:text-[#A1A1AA]">
              FLAT PKR {BRAND.shipping.fee} SHIPPING NATIONWIDE
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

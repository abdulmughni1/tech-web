import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../../types/product';
import { PRODUCTS } from '../../data/products';
import { Search, X, ArrowUpRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = PRODUCTS.filter(p => {
    const q = query.toLowerCase().trim();
    if (!q) return false;
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.shortStatement.toLowerCase().includes(q) ||
      p.specifications.some(s => s.value.toLowerCase().includes(q) || s.label.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex items-start justify-center pt-6 sm:pt-20 px-3 sm:px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-[#111A2D] border border-[#E2E8F0] dark:border-[#1E293B] shadow-2xl rounded-[2px] overflow-hidden transition-colors duration-200">
        {/* Search Input Bar */}
        <div className="p-3 sm:p-4 border-b border-[#E2E8F0] dark:border-[#1E293B] flex items-center gap-3">
          <Search className="w-4 h-4 text-[#71717A] dark:text-[#718096] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products by model, category or hardware spec..."
            className="w-full bg-transparent text-[#09090B] dark:text-[#F4F7FC] placeholder:text-[#A1A1AA] dark:placeholder:text-[#718096] text-base sm:text-sm font-sans outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-[#52525B] dark:text-[#A4AEC0] hover:text-[#09090B] dark:hover:text-[#F4F7FC] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#09090B] dark:hover:border-slate-300 rounded-[2px] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="p-4 max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            <div className="py-6 text-center">
              <span className="font-tech text-xs text-[#71717A] dark:text-[#718096] uppercase tracking-wider font-medium">
                TRY SEARCHING: STAND, WATCH, AIRPODS, T900, RING
              </span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-8 text-center">
              <p className="font-tech text-xs text-[#71717A] dark:text-[#718096] uppercase tracking-wider">
                NO HARDWARE MATCHES FOUND FOR &quot;{query}&quot;
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="py-3 px-2 flex items-center justify-between hover:bg-[#F4F4F5] dark:hover:bg-[#162238] cursor-pointer transition-colors rounded-[2px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#F8F9FA] dark:bg-[#0B1020] border border-[#E2E8F0] dark:border-[#1E293B] p-1 flex items-center justify-center flex-shrink-0 rounded-[2px]">
                      <img
                        src={product.images[0]?.url}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-tech text-[10px] text-[#71717A] dark:text-[#718096] uppercase">
                        {product.category} // REF DX-0{product.itemNumber}
                      </div>
                      <div className="font-display text-sm font-semibold text-[#09090B] dark:text-[#F4F7FC]">
                        {product.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="font-tech text-xs font-bold text-[#09090B] dark:text-[#F4F7FC]">
                        PKR {product.salePrice.toLocaleString()}
                      </div>
                      <div className="font-tech text-[10px] text-[#71717A] dark:text-[#718096] line-through">
                        PKR {product.originalPrice.toLocaleString()}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#0866FF] dark:text-[#3D82FF]" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 border-t border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8F9FA] dark:bg-[#0B1020] flex justify-between items-center text-[11px] font-tech text-[#71717A] dark:text-[#718096]">
          <span>PRESS ESC TO CLOSE</span>
          <span>DEXYFIED CATALOG INDEX</span>
        </div>
      </div>
    </div>
  );
};

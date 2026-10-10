import React, { useState, useMemo } from 'react';
import { Product } from '../types/product';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { SlidersHorizontal, ArrowDownUp } from 'lucide-react';

interface CatalogPageProps {
  onSelectProduct: (product: Product) => void;
  initialCategory?: string;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onSelectProduct,
  initialCategory = 'All',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortOption, setSortOption] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      if (p.salePrice > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.salePrice - b.salePrice;
      if (sortOption === 'price-desc') return b.salePrice - a.salePrice;
      return a.itemNumber - b.itemNumber;
    });
  }, [selectedCategory, sortOption, maxPrice]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090B] py-8 sm:py-12 pb-24 md:pb-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[#E4E4E7] dark:border-[#27272A] pb-5 sm:pb-6 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 font-tech text-[11px] sm:text-xs text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-widest mb-1 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
            <span>STOREFRONT HARDWARE DIRECTORY</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase text-[#09090B] dark:text-white tracking-tight">
                Product Catalog
              </h1>
              <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] mt-1 max-w-xl">
                Browse all physical consumer technology products available for immediate nationwide dispatch.
              </p>
            </div>

            <div className="font-tech text-xs text-[#71717A] dark:text-[#A1A1AA] uppercase font-medium">
              SHOWING {filteredProducts.length} OF {PRODUCTS.length} ITEMS
            </div>
          </div>
        </div>

        {/* Working Filter Controls */}
        <div className="p-3.5 sm:p-4 border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121214] mb-6 sm:mb-8 space-y-4 shadow-2xs rounded-[2px] transition-colors">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full lg:w-auto -mx-1 px-1">
              <span className="font-tech text-xs text-[#71717A] dark:text-[#A1A1AA] uppercase mr-1 flex items-center gap-1 font-medium flex-shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                FILTER:
              </span>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 font-tech text-xs uppercase tracking-wider transition-all border cursor-pointer whitespace-nowrap flex-shrink-0 rounded-[2px] ${
                    selectedCategory === cat
                      ? 'border-[#0066FF] dark:border-[#3B82F6] bg-[#0066FF] dark:bg-[#3B82F6] text-white font-bold shadow-2xs'
                      : 'border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:border-[#09090B] dark:hover:border-zinc-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort & Price Range */}
            <div className="flex items-center justify-between sm:justify-start gap-4 flex-wrap pt-2 lg:pt-0 border-t lg:border-t-0 border-[#E4E4E7] dark:border-[#27272A]">
              {/* Price Filter Slider */}
              <div className="flex items-center gap-2 font-tech text-xs text-[#52525B] dark:text-[#A1A1AA]">
                <span className="text-[#71717A] dark:text-[#A1A1AA] uppercase text-[10px] sm:text-xs">MAX:</span>
                <span className="text-[#09090B] dark:text-white font-bold">PKR {maxPrice.toLocaleString()}</span>
                <input
                  type="range"
                  min="550"
                  max="5000"
                  step="50"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-20 sm:w-24 accent-[#09090B] dark:accent-white cursor-pointer"
                />
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 font-tech text-xs text-[#52525B] dark:text-[#A1A1AA] border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] px-2.5 py-1.5 rounded-[2px]">
                <ArrowDownUp className="w-3.5 h-3.5 text-[#71717A] dark:text-[#A1A1AA]" />
                <span className="text-[#71717A] dark:text-[#A1A1AA] uppercase text-[10px] sm:text-xs">SORT:</span>
                <select
                  value={sortOption}
                  onChange={e => setSortOption(e.target.value as any)}
                  className="bg-transparent text-[#09090B] dark:text-white outline-none cursor-pointer font-medium text-xs"
                >
                  <option value="default" className="bg-white dark:bg-[#121214] text-[#09090B] dark:text-white">Item Number</option>
                  <option value="price-asc" className="bg-white dark:bg-[#121214] text-[#09090B] dark:text-white">Price: Low to High</option>
                  <option value="price-desc" className="bg-white dark:bg-[#121214] text-[#09090B] dark:text-white">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] shadow-2xs rounded-[2px]">
            <p className="font-tech text-xs text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider">
              NO HARDWARE MATCHES THE SELECTED FILTERS.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setMaxPrice(5000);
                setSortOption('default');
              }}
              className="mt-4 px-4 py-2 bg-[#FAFAFA] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#09090B] dark:hover:border-white text-xs font-tech text-[#09090B] dark:text-white uppercase font-bold cursor-pointer rounded-[2px]"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

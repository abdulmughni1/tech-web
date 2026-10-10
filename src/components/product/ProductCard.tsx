import React from 'react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { ArrowUpRight, Plus } from 'lucide-react';
import { isRingProduct } from '../../data/ringSizes';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
}) => {
  const { addToCart } = useCart();
  const savings = product.originalPrice - product.salePrice;
  const primaryImage = product.images[0]?.url || '/images/brand/dexyfied-logo-raw.jpg';
  const isRing = isRingProduct(product);
  const isLaptopStand = product.id === 'prod-01' || product.slug === 'adjustable-portable-laptop-stand';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRing || isLaptopStand) {
      // Direct customer to product view to pick their ring size or color variant
      onSelectProduct(product);
      return;
    }
    const defaultVariant = product.variants[0];
    if (defaultVariant) {
      addToCart(product, defaultVariant, 1);
    }
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group cursor-pointer flex flex-col justify-between border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] hover:border-[#09090B] dark:hover:border-neutral-400 transition-all duration-200 shadow-2xs rounded-[2px]"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full bg-[#F8F9FA] dark:bg-[#18181B] p-3 sm:p-6 flex items-center justify-center overflow-hidden border-b border-[#E4E4E7] dark:border-[#27272A]">
        {/* Technical Item Reference */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 font-tech text-[9px] sm:text-[10px] text-[#71717A] dark:text-[#A1A1AA] tracking-wider uppercase font-medium">
          REF DX-0{product.itemNumber}
        </div>

        {/* Small Restrained Technical Savings Indicator */}
        {savings > 0 && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 font-tech text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 border border-[#0066FF]/40 text-[#0066FF] dark:text-[#3B82F6] bg-[#0066FF]/10 dark:bg-[#0066FF]/20 font-bold rounded-[2px]">
            SAVE PKR {savings.toLocaleString()}
          </div>
        )}

        <img
          src={primaryImage}
          alt={product.images[0]?.alt || product.name}
          loading="lazy"
          className="max-h-[82%] max-w-[82%] object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />

        {/* Available Size / Color Indicator */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex items-center gap-1 sm:gap-1.5">
          {isLaptopStand ? (
            <div className="flex items-center gap-1.5 bg-white/95 dark:bg-[#121214]/95 backdrop-blur-xs px-2 py-0.5 rounded-[2px] border border-[#E4E4E7] dark:border-[#27272A] shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0066FF]"></span>
              <span className="font-tech text-[9px] sm:text-[10px] text-[#52525B] dark:text-[#A1A1AA] tracking-wider uppercase font-medium">
                2 FINISHES
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-white/90 dark:bg-[#121214]/90 px-1.5 py-0.5 rounded-[2px] border border-[#E4E4E7] dark:border-[#27272A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0066FF]"></span>
              <span className="font-tech text-[9px] sm:text-[10px] text-[#52525B] dark:text-[#A1A1AA] tracking-wider uppercase font-medium">
                {isRing ? 'SIZES: 6–12' : 'IN STOCK'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-3 sm:p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-tech text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider mb-1 font-medium">
            <span>{product.category}</span>
            <span className="group-hover:text-[#09090B] dark:group-hover:text-white transition-colors flex items-center gap-0.5 font-bold">
              VIEW <ArrowUpRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#0066FF] dark:text-[#3B82F6]" />
            </span>
          </div>

          <h3 className="font-display font-semibold text-xs sm:text-base text-[#09090B] dark:text-white group-hover:text-[#0066FF] dark:group-hover:text-[#3B82F6] transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[3rem]">
            {product.name}
          </h3>

          <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-[#52525B] dark:text-[#A1A1AA] font-sans line-clamp-2 leading-relaxed hidden sm:block">
            {product.shortStatement}
          </p>
        </div>

        {/* Pricing & CTA Section */}
        <div className="mt-3 sm:mt-5 pt-2 sm:pt-3 border-t border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-tech text-[9px] sm:text-[10px] text-[#71717A] dark:text-[#A1A1AA] line-through uppercase">
              PKR {product.originalPrice.toLocaleString()}
            </span>
            <span className="font-display font-bold text-sm sm:text-lg text-[#09090B] dark:text-white tracking-tight">
              PKR {product.salePrice.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className="font-tech text-[10px] sm:text-xs uppercase px-2 py-1 sm:px-3 sm:py-1.5 border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#0066FF] hover:text-white hover:bg-[#0066FF] dark:hover:bg-[#0066FF] bg-[#F4F4F5] dark:bg-[#18181B] text-[#09090B] dark:text-white transition-colors duration-150 font-semibold cursor-pointer rounded-[2px]"
            title={isLaptopStand ? 'Choose Silver or Black' : isRing ? 'Select ring size' : 'Add to cart'}
          >
            {isLaptopStand ? (
              <span>CHOOSE COLOR</span>
            ) : isRing ? (
              <span>SIZES</span>
            ) : (
              <>
                <span className="hidden sm:inline">+ CART</span>
                <span className="sm:hidden flex items-center"><Plus className="w-3 h-3" /></span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { ArrowUpRight, Plus } from 'lucide-react';

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

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultVariant = product.variants[0];
    if (defaultVariant) {
      addToCart(product, defaultVariant, 1);
    }
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group cursor-pointer flex flex-col justify-between border border-[#E4E4E7] bg-white hover:border-[#09090B] transition-all duration-200 shadow-2xs"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full bg-[#F8F9FA] p-3 sm:p-6 flex items-center justify-center overflow-hidden border-b border-[#E4E4E7]">
        {/* Subtle Technical Item Reference */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 font-tech text-[9px] sm:text-[10px] text-[#71717A] tracking-wider uppercase font-medium">
          REF DX-0{product.itemNumber}
        </div>

        {/* Small Restrained Technical Savings Indicator */}
        {savings > 0 && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 font-tech text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 border border-[#0066FF]/40 text-[#0066FF] bg-[#0066FF]/10 font-bold">
            SAVE PKR {savings.toLocaleString()}
          </div>
        )}

        <img
          src={primaryImage}
          alt={product.images[0]?.alt || product.name}
          loading="lazy"
          className="max-h-[82%] max-w-[82%] object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />

        {/* Available Variant Count or In Stock indicator */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex items-center gap-1 sm:gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0066FF]"></span>
          <span className="font-tech text-[9px] sm:text-[10px] text-[#52525B] tracking-wider uppercase font-medium">
            {product.variants.length > 1
              ? `${product.variants.length} FINISHES`
              : 'IN STOCK'}
          </span>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-3 sm:p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-tech text-[#71717A] uppercase tracking-wider mb-1 font-medium">
            <span>{product.category}</span>
            <span className="group-hover:text-[#09090B] transition-colors flex items-center gap-0.5">
              VIEW <ArrowUpRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#0066FF]" />
            </span>
          </div>

          <h3 className="font-display font-semibold text-xs sm:text-base text-[#09090B] group-hover:text-[#0066FF] transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[3rem]">
            {product.name}
          </h3>

          <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-[#52525B] font-sans line-clamp-2 leading-relaxed hidden sm:block">
            {product.shortStatement}
          </p>
        </div>

        {/* Pricing & CTA Section */}
        <div className="mt-3 sm:mt-5 pt-2 sm:pt-3 border-t border-[#E4E4E7] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-tech text-[9px] sm:text-[10px] text-[#71717A] line-through uppercase">
              PKR {product.originalPrice.toLocaleString()}
            </span>
            <span className="font-display font-bold text-sm sm:text-lg text-[#09090B] tracking-tight">
              PKR {product.salePrice.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className="font-tech text-[10px] sm:text-xs uppercase px-2 py-1 sm:px-3 sm:py-1.5 border border-[#E4E4E7] hover:border-[#0066FF] hover:text-white hover:bg-[#0066FF] bg-[#F4F4F5] text-[#09090B] transition-colors duration-150 font-semibold cursor-pointer"
            title="Add to cart"
          >
            <span className="hidden sm:inline">+ CART</span>
            <span className="sm:hidden flex items-center"><Plus className="w-3 h-3" /></span>
          </button>
        </div>
      </div>
    </div>
  );
};

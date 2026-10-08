import React, { useState, useEffect } from 'react';
import { Product, ProductVariant } from '../types/product';
import { PRODUCTS, SHIPPING_FEE } from '../data/products';
import { ProductGallery } from '../components/product/ProductGallery';
import { VariantSelector } from '../components/product/VariantSelector';
import { TechSpecsTable } from '../components/product/TechSpecsTable';
import { ProductCard } from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingBag, Zap, ShieldCheck, Truck, Package, RotateCcw } from 'lucide-react';
import { BRAND } from '../data/policies';

interface ProductDetailPageProps {
  product: Product;
  onBackToCatalog: () => void;
  onSelectRelatedProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBackToCatalog,
  onSelectRelatedProduct,
}) => {
  const { addToCart, quickBuy } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || { id: 'default', name: 'Standard', inStock: true }
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    setSelectedVariant(product.variants[0] || { id: 'default', name: 'Standard', inStock: true });
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const savings = product.originalPrice - product.salePrice;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleQuickBuy = () => {
    quickBuy(product, selectedVariant, quantity);
  };

  const relatedProducts = PRODUCTS.filter(
    p => p.id !== product.id && (p.category === product.category || p.itemNumber === 1)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 md:pb-28">
      {/* Top Breadcrumb & Return Action */}
      <div className="border-b border-[#E4E4E7] bg-white py-3 sm:py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBackToCatalog}
            className="flex items-center gap-2 font-tech text-xs uppercase tracking-wider text-[#52525B] hover:text-[#09090B] font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO CATALOG</span>
          </button>

          <div className="font-tech text-[10px] sm:text-xs text-[#71717A] uppercase font-medium">
            REF // DX-0{product.itemNumber} • {product.category}
          </div>
        </div>
      </div>

      {/* Main Product Layout (Phone stacked, Tablet 2-col, Desktop spacious) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 md:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-14">
          {/* Left Column: Product Imagery */}
          <div className="md:col-span-6 lg:col-span-7">
            <div className="md:sticky md:top-24">
              <ProductGallery product={product} selectedVariant={selectedVariant} />

              {/* Package Contents Box (Left under image) */}
              {product.packageContents && product.packageContents.length > 0 && (
                <div className="mt-6 md:mt-8 p-4 sm:p-5 border border-[#E4E4E7] bg-[#F4F4F5] shadow-2xs">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-4 h-4 text-[#0066FF]" />
                    <h4 className="font-tech text-xs uppercase tracking-wider text-[#09090B] font-bold">
                      PACKAGE CONTENTS
                    </h4>
                  </div>
                  <ul className="space-y-1.5 font-tech text-xs text-[#52525B]">
                    {product.packageContents.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-[#0066FF] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Purchasing & Technical Specifications */}
          <div className="md:col-span-6 lg:col-span-5 space-y-5 sm:space-y-6">
            <div>
              {/* Category & Item Number */}
              <div className="flex items-center gap-2 font-tech text-[11px] sm:text-xs text-[#71717A] uppercase tracking-wider mb-1.5 sm:mb-2 font-semibold">
                <span>{product.category}</span>
                <span>//</span>
                <span>ITEM 0{product.itemNumber}</span>
              </div>

              {/* Product Title */}
              <h1 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-[#09090B] uppercase tracking-tight">
                {product.name}
              </h1>

              {/* Short Product Statement */}
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#52525B] font-sans leading-relaxed">
                {product.shortStatement}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="p-3.5 sm:p-4 border border-[#E4E4E7] bg-white shadow-2xs space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-tech text-[10px] sm:text-xs text-[#71717A] line-through uppercase block">
                    ORIGINAL: PKR {product.originalPrice.toLocaleString()}
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-display font-bold text-2xl sm:text-3xl text-[#09090B]">
                      PKR {product.salePrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {savings > 0 && (
                  <div className="font-tech text-[10px] sm:text-xs uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 border border-[#0066FF]/50 text-[#0066FF] bg-[#0066FF]/10 tracking-wider font-bold">
                    SAVE PKR {savings.toLocaleString()}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-[#E4E4E7] flex items-center justify-between text-[10px] sm:text-[11px] font-tech text-[#71717A]">
                <span className="font-medium">SHIPPING: PKR {SHIPPING_FEE} NATIONWIDE</span>
                <span className="text-[#16A34A] font-bold">READY FOR DISPATCH</span>
              </div>
            </div>

            {/* Variant Selector */}
            {product.variants.length > 0 && (
              <div className="pt-1">
                <VariantSelector
                  variants={product.variants}
                  selectedVariant={selectedVariant}
                  onSelectVariant={setSelectedVariant}
                />
              </div>
            )}

            {/* Quantity Selector & Purchase CTAs */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#E4E4E7] bg-white shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-[#52525B] hover:text-[#09090B] text-base font-tech cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-9 h-10 flex items-center justify-center text-[#09090B] font-tech text-xs font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-[#52525B] hover:text-[#09090B] text-base font-tech cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-10 px-4 border border-[#E4E4E7] hover:border-[#09090B] bg-[#F4F4F5] hover:bg-white text-[#09090B] font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedToast ? 'ADDED TO BAG' : 'ADD TO CART'}</span>
                </button>
              </div>

              <button
                onClick={handleQuickBuy}
                className="w-full py-3.5 sm:py-4 px-4 bg-[#0066FF] hover:bg-[#0052CC] text-white font-display font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>BUY NOW WITH CASH ON DELIVERY</span>
              </button>
            </div>

            {/* Detailed Description */}
            <div className="pt-4 border-t border-[#E4E4E7] space-y-2">
              <h3 className="font-tech text-xs uppercase tracking-wider text-[#52525B] font-bold">
                PRODUCT OVERVIEW
              </h3>
              <p className="font-sans text-xs text-[#09090B] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Features List */}
            {product.features && product.features.length > 0 && (
              <div className="pt-4 border-t border-[#E4E4E7] space-y-2">
                <h3 className="font-tech text-xs uppercase tracking-wider text-[#52525B] font-bold">
                  KEY FEATURES
                </h3>
                <ul className="space-y-1.5 font-sans text-xs text-[#52525B]">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#0066FF] mt-0.5 font-bold">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Specifications Table */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="pt-6 border-t border-[#E4E4E7]">
                <TechSpecsTable
                  specifications={product.specifications}
                  disclaimer={product.disclaimer}
                />
              </div>
            )}

            {/* Shipping & Returns Quick Reassurance */}
            <div className="pt-6 border-t border-[#E4E4E7] grid grid-cols-2 gap-3 text-xs font-sans">
              <div className="p-3 border border-[#E4E4E7] bg-white shadow-2xs">
                <div className="flex items-center gap-1.5 font-tech text-[10px] sm:text-[11px] text-[#09090B] font-bold uppercase mb-1">
                  <Truck className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>PKR {SHIPPING_FEE} SHIPPING</span>
                </div>
                <p className="text-[#71717A] text-[10px] sm:text-[11px] leading-relaxed">
                  Nationwide delivery to any city or town across Pakistan.
                </p>
              </div>

              <div className="p-3 border border-[#E4E4E7] bg-white shadow-2xs">
                <div className="flex items-center gap-1.5 font-tech text-[10px] sm:text-[11px] text-[#09090B] font-bold uppercase mb-1">
                  <RotateCcw className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>7-DAY RETURN</span>
                </div>
                <p className="text-[#71717A] text-[10px] sm:text-[11px] leading-relaxed">
                  Unused in original box. Contact dexyfied@gmail.com.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Hardware Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-10 sm:pt-12 border-t border-[#E4E4E7]">
            <div className="flex items-center justify-between mb-6 sm:mb-8 pb-3 border-b border-[#E4E4E7]">
              <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-wider text-[#09090B]">
                Complementary Hardware
              </h3>
              <span className="font-tech text-[10px] sm:text-xs text-[#71717A] uppercase font-medium">
                DEXYFIED CATALOG
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
              {relatedProducts.map(rel => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onSelectProduct={onSelectRelatedProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile & Tablet Bottom Sticky Purchase Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E4E4E7] p-3 px-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="flex flex-col">
          <div className="font-tech text-[10px] text-[#71717A] uppercase font-medium truncate max-w-[120px]">
            {selectedVariant.name}
          </div>
          <div className="font-display font-bold text-base text-[#09090B]">
            PKR {product.salePrice.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="h-10 px-3 border border-[#E4E4E7] bg-[#F4F4F5] text-[#09090B] font-tech text-xs uppercase flex items-center justify-center cursor-pointer"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          <button
            onClick={handleQuickBuy}
            className="h-10 px-5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>BUY NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
};

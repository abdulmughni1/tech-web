import React, { useState, useEffect } from 'react';
import { Product, ProductVariant } from '../types/product';
import { PRODUCTS, SHIPPING_FEE } from '../data/products';
import { ProductGallery } from '../components/product/ProductGallery';
import { TechSpecsTable } from '../components/product/TechSpecsTable';
import { ProductCard } from '../components/product/ProductCard';
import { RingSizeSelector } from '../components/product/RingSizeSelector';
import { ProductReviewSection } from '../components/product/ProductReviewSection';
import { useCart } from '../context/CartContext';
import {
  ArrowLeft,
  ShoppingBag,
  Zap,
  Truck,
  Package,
  RotateCcw,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { BRAND } from '../data/policies';
import { isRingProduct } from '../data/ringSizes';
import { WHATSAPP_CONFIG } from '../data/paymentMethods';

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

  // Ring size selection state
  const isRing = isRingProduct(product);
  const isLaptopStand = product.id === 'prod-01' || product.slug === 'adjustable-portable-laptop-stand';
  const [selectedRingSize, setSelectedRingSize] = useState<string>('');
  const [ringSizeError, setRingSizeError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedVariant(product.variants[0] || { id: 'default', name: 'Standard', inStock: true });
    setQuantity(1);
    setSelectedRingSize('');
    setRingSizeError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const savings = product.originalPrice - product.salePrice;

  const handleAddToCart = () => {
    if (isRing && !selectedRingSize) {
      setRingSizeError('Please select a ring size before adding to cart.');
      return;
    }
    setRingSizeError(null);
    addToCart(product, selectedVariant, quantity, isRing ? selectedRingSize : undefined);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleQuickBuy = () => {
    if (isRing && !selectedRingSize) {
      setRingSizeError('Please choose your ring size to continue.');
      return;
    }
    setRingSizeError(null);
    quickBuy(product, selectedVariant, quantity, isRing ? selectedRingSize : undefined);
  };

  const relatedProducts = PRODUCTS.filter(
    p => p.id !== product.id && (p.category === product.category || p.itemNumber === 1)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090B] pb-24 md:pb-28 transition-colors duration-200">
      {/* Top Breadcrumb & Return Action */}
      <div className="border-b border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121214] py-3 sm:py-3.5 shadow-2xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBackToCatalog}
            className="flex items-center gap-2 font-tech text-xs uppercase tracking-wider text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO CATALOG</span>
          </button>

          <div className="font-tech text-[10px] sm:text-xs text-[#71717A] dark:text-[#A1A1AA] uppercase font-medium">
            REF // DX-0{product.itemNumber} • {product.category}
          </div>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 md:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-14">
          {/* Left Column: Product Imagery */}
          <div className="md:col-span-6 lg:col-span-7">
            <div className="md:sticky md:top-24">
              <ProductGallery product={product} selectedVariant={selectedVariant} />

              {/* Package Contents Box */}
              {product.packageContents && product.packageContents.length > 0 && (
                <div className="mt-6 md:mt-8 p-4 sm:p-5 border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121214] shadow-2xs rounded-[2px] transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-4 h-4 text-[#09090B] dark:text-white" />
                    <h4 className="font-tech text-xs uppercase tracking-wider text-[#09090B] dark:text-white font-bold">
                      PACKAGE CONTENTS
                    </h4>
                  </div>
                  <ul className="space-y-1.5 font-tech text-xs text-[#52525B] dark:text-[#A1A1AA]">
                    {product.packageContents.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-[#09090B] dark:text-white font-bold">•</span>
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
              <div className="flex items-center gap-2 font-tech text-[11px] sm:text-xs text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-wider mb-1.5 sm:mb-2 font-semibold">
                <span>{product.category}</span>
                <span>//</span>
                <span>ITEM 0{product.itemNumber}</span>
              </div>

              {/* Product Title */}
              <h1 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-[#09090B] dark:text-white uppercase tracking-tight">
                {product.name}
              </h1>

              {/* Short Product Statement */}
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] font-sans leading-relaxed">
                {product.shortStatement}
              </p>
            </div>

            {/* Pricing & Transparent Savings Section */}
            <div className="p-3.5 sm:p-4 border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] shadow-2xs space-y-2 rounded-[2px] transition-colors">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-tech text-[10px] sm:text-xs text-[#71717A] dark:text-[#A1A1AA] line-through uppercase block">
                    ORIGINAL: PKR {product.originalPrice.toLocaleString()}
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-display font-bold text-2xl sm:text-3xl text-[#09090B] dark:text-white">
                      PKR {product.salePrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {savings > 0 && (
                  <div className="font-tech text-[10px] sm:text-xs uppercase px-2.5 py-1 border border-[#0066FF]/40 text-[#0066FF] dark:text-[#3B82F6] bg-[#0066FF]/10 dark:bg-[#0066FF]/20 tracking-wider font-bold rounded-[2px]">
                    SAVE PKR {savings.toLocaleString()}
                  </div>
                )}
              </div>

              {/* Truthful Dispatch & Logistics Guarantee */}
              <div className="pt-2 border-t border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between text-[10px] sm:text-[11px] font-tech text-[#71717A] dark:text-[#A1A1AA]">
                <span className="font-medium">FLAT PKR {SHIPPING_FEE} NATIONWIDE DELIVERY</span>
                <span className="text-[#16A34A] dark:text-[#4ADE80] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] dark:bg-[#4ADE80]"></span>
                  <span>IN STOCK • READY FOR DISPATCH</span>
                </span>
              </div>
            </div>

            {/* Laptop Stand Color Selection (Silver & Black) */}
            {isLaptopStand && product.variants && product.variants.length > 1 && (
              <div className="p-3.5 sm:p-4 border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121214] rounded-[2px] shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="font-tech text-xs uppercase text-[#52525B] dark:text-[#A1A1AA] font-semibold tracking-wider">
                    SELECT FINISH:
                  </div>
                  <div className="font-tech text-xs uppercase text-[#09090B] dark:text-white font-bold">
                    {selectedVariant.name}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {product.variants.map(variant => {
                    const isSelected = selectedVariant.id === variant.id;
                    const isSilver = variant.name.toLowerCase() === 'silver';
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`p-3 border rounded-[2px] flex items-center gap-3 transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'border-[#0066FF] dark:border-[#3B82F6] bg-white dark:bg-[#18181B] ring-1 ring-[#0066FF] dark:ring-[#3B82F6] shadow-2xs font-bold'
                            : 'border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] hover:border-[#09090B] dark:hover:border-neutral-400'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border shadow-2xs flex-shrink-0 ${
                            isSilver
                              ? 'bg-[#D4D4D8] border-[#A1A1AA]'
                              : 'bg-[#18181B] border-neutral-700'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-display text-xs uppercase text-[#09090B] dark:text-white">
                            {variant.name}
                          </div>
                          <div className="font-tech text-[10px] text-[#52525B] dark:text-[#A1A1AA] uppercase font-medium">
                            IN STOCK
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Genuine Laptop Stand Ergonomic Benefits */}
            {isLaptopStand && (
              <div className="p-3.5 sm:p-4 border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] rounded-[2px] shadow-2xs space-y-2">
                <div className="font-tech text-xs uppercase text-[#52525B] dark:text-[#A1A1AA] font-bold tracking-wider">
                  KEY ERGONOMIC & FUNCTIONAL BENEFITS
                </div>
                <ul className="space-y-1.5 font-sans text-xs text-[#52525B] dark:text-[#A1A1AA]">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0066FF] flex-shrink-0 mt-0.5" />
                    <span><strong className="text-[#09090B] dark:text-white">Eye-Level Ergonomics:</strong> Multi-level angle adjustment raises screen to natural eye level to reduce neck and back fatigue.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0066FF] flex-shrink-0 mt-0.5" />
                    <span><strong className="text-[#09090B] dark:text-white">Passive Cooling Airflow:</strong> Hollow open-rail architecture prevents heat buildup under your laptop chassis.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0066FF] flex-shrink-0 mt-0.5" />
                    <span><strong className="text-[#09090B] dark:text-white">Anti-Slip Stability:</strong> High-friction silicone pads protect surfaces and keep devices firmly in place.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0066FF] flex-shrink-0 mt-0.5" />
                    <span><strong className="text-[#09090B] dark:text-white">Fold-Flat Portability:</strong> Collapses completely flat in seconds; protective travel sleeve included.</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Other Products Variant Selector */}
            {!isLaptopStand && !isRing && product.variants && product.variants.length > 1 && (
              <div className="pt-1">
                <div className="p-3.5 sm:p-4 border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] rounded-[2px] shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-tech text-xs uppercase text-[#52525B] dark:text-[#A1A1AA] font-semibold tracking-wider">
                      SELECT FINISH:
                    </span>
                    <span className="font-tech text-xs uppercase text-[#09090B] dark:text-white font-bold">
                      {selectedVariant.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map(variant => (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-3 py-1.5 text-xs font-tech uppercase rounded-[2px] transition-all cursor-pointer ${
                          selectedVariant.id === variant.id
                            ? 'border border-[#0066FF] text-[#0066FF] dark:text-[#3B82F6] font-bold bg-[#0066FF]/10'
                            : 'border border-[#E4E4E7] dark:border-[#27272A] text-[#52525B] dark:text-[#A1A1AA] bg-white dark:bg-[#18181B]'
                        }`}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Ring Size Selector (Appears strictly on ring products) */}
            {isRing && (
              <div className="p-3.5 sm:p-4 border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] rounded-[2px] shadow-2xs">
                <RingSizeSelector
                  selectedSize={selectedRingSize}
                  onSelectSize={size => {
                    setSelectedRingSize(size);
                    setRingSizeError(null);
                  }}
                  error={ringSizeError}
                />
              </div>
            )}

            {/* Quantity Selector & Purchase CTAs */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] shadow-2xs rounded-[2px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white text-base font-tech cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-9 h-10 flex items-center justify-center text-[#09090B] dark:text-white font-tech text-xs font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white text-base font-tech cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-10 px-4 border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#09090B] dark:hover:border-zinc-300 bg-[#FAFAFA] dark:bg-[#18181B] hover:bg-white dark:hover:bg-[#202024] text-[#09090B] dark:text-white font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer rounded-[2px]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedToast ? 'ADDED TO BAG' : 'ADD TO CART'}</span>
                </button>
              </div>

              {/* Primary Buy Now CTA */}
              <button
                onClick={handleQuickBuy}
                className="w-full py-3.5 sm:py-4 px-4 bg-[#0066FF] hover:bg-[#0052CC] text-white font-display font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer rounded-[2px]"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>BUY NOW WITH CASH ON DELIVERY</span>
              </button>

              {/* Contextual WhatsApp Help Action */}
              <a
                href={`${WHATSAPP_CONFIG.baseWaUrl}?text=${encodeURIComponent(
                  `Hello DEXYFIED, I would like to order or ask a question regarding the ${product.name} (PKR ${product.salePrice.toLocaleString()}). Could you please guide me?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#25D366] text-[#52525B] dark:text-[#A1A1AA] hover:text-[#25D366] font-tech text-xs uppercase flex items-center justify-center gap-2 bg-[#FAFAFA] dark:bg-[#121214] transition-colors rounded-[2px] font-semibold"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>QUESTIONS? CHAT WITH US ON WHATSAPP</span>
              </a>

              {/* Transparent Order, Payment & Delivery Reassurance */}
              <div className="p-3.5 sm:p-4 border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121214] rounded-[2px] space-y-2.5 font-sans text-xs">
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-tech font-bold text-[#09090B] dark:text-white uppercase text-[11px] block">
                      Nationwide Delivery — Flat PKR {SHIPPING_FEE}
                    </span>
                    <span className="text-[#52525B] dark:text-[#A1A1AA] text-[11px] leading-relaxed">
                      Dispatched across Pakistan via tracked registered courier.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MessageSquare className="w-4 h-4 text-[#25D366] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-tech font-bold text-[#09090B] dark:text-white uppercase text-[11px] block">
                      Cash on Delivery Confirmed via WhatsApp
                    </span>
                    <span className="text-[#52525B] dark:text-[#A1A1AA] text-[11px] leading-relaxed">
                      Place your order and confirm your details directly on WhatsApp prior to shipment.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-tech font-bold text-[#09090B] dark:text-white uppercase text-[11px] block">
                      Prepaid Options & {BRAND.returnPolicy.windowDays}-Day Return Policy
                    </span>
                    <span className="text-[#52525B] dark:text-[#A1A1AA] text-[11px] leading-relaxed">
                      Meezan Bank, JazzCash, and Easypaisa available at checkout. Backed by our {BRAND.returnPolicy.windowDays}-day return policy.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="pt-4 border-t border-[#E4E4E7] dark:border-[#27272A] space-y-2">
              <h3 className="font-tech text-xs uppercase tracking-wider text-[#52525B] dark:text-[#A1A1AA] font-bold">
                PRODUCT OVERVIEW
              </h3>
              <p className="font-sans text-xs text-[#09090B] dark:text-white leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Features List */}
            {product.features && product.features.length > 0 && (
              <div className="pt-4 border-t border-[#E4E4E7] dark:border-[#27272A] space-y-2">
                <h3 className="font-tech text-xs uppercase tracking-wider text-[#52525B] dark:text-[#A1A1AA] font-bold">
                  KEY FEATURES
                </h3>
                <ul className="space-y-1.5 font-sans text-xs text-[#52525B] dark:text-[#A1A1AA]">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#09090B] dark:text-white mt-0.5 font-bold">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Specifications Table */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="pt-6 border-t border-[#E4E4E7] dark:border-[#27272A]">
                <TechSpecsTable
                  specifications={product.specifications}
                  disclaimer={product.disclaimer}
                />
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews & Ratings Section */}
        <ProductReviewSection productId={product.id} productName={product.name} />

        {/* Related Hardware Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-10 sm:pt-12 border-t border-[#E4E4E7] dark:border-[#27272A]">
            <div className="flex items-center justify-between mb-6 sm:mb-8 pb-3 border-b border-[#E4E4E7] dark:border-[#27272A]">
              <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-wider text-[#09090B] dark:text-white">
                Complementary Hardware
              </h3>
              <span className="font-tech text-[10px] sm:text-xs text-[#71717A] dark:text-[#A1A1AA] uppercase font-medium">
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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#121214]/95 backdrop-blur-md border-t border-[#E4E4E7] dark:border-[#27272A] p-3 px-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.5)] flex items-center justify-between gap-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] transition-colors duration-200">
        <div className="flex flex-col">
          <div className="font-tech text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase font-medium truncate max-w-[140px]">
            {isRing
              ? selectedRingSize
                ? `SIZE: ${selectedRingSize}`
                : 'SELECT SIZE'
              : isLaptopStand
              ? `COLOR: ${selectedVariant.name.toUpperCase()}`
              : 'IN STOCK'}
          </div>
          <div className="font-display font-bold text-base text-[#09090B] dark:text-white">
            PKR {product.salePrice.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="h-10 px-3 border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#18181B] text-[#09090B] dark:text-white font-tech text-xs uppercase flex items-center justify-center cursor-pointer rounded-[2px]"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          <button
            onClick={handleQuickBuy}
            className="h-10 px-5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer rounded-[2px]"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>BUY NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
};

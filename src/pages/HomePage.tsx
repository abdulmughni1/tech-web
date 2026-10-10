import React, { useState } from 'react';
import { Product, ProductVariant } from '../types/product';
import { PRODUCTS, SHIPPING_FEE } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { TechSpecsTable } from '../components/product/TechSpecsTable';
import { TrustBar } from '../components/layout/TrustBar';
import { useCart } from '../context/CartContext';
import { ArrowRight, ArrowUpRight, Star, MessageSquare } from 'lucide-react';
import { BRAND } from '../data/policies';
import { getAllSubmittedReviews } from '../services/reviewService';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  onNavigateToShop: (category?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProduct,
  onNavigateToShop,
}) => {
  const { quickBuy } = useCart();
  const customerReviews = getAllSubmittedReviews();

  const standProduct = PRODUCTS.find(p => p.itemNumber === 1)!;
  const airpodsCaseProduct = PRODUCTS.find(p => p.itemNumber === 2)!;
  const headphonesProduct = PRODUCTS.find(p => p.itemNumber === 3)!;
  const ringProduct = PRODUCTS.find(p => p.itemNumber === 4)!;
  const watchI9Product = PRODUCTS.find(p => p.itemNumber === 6)!;

  // Interactive variant selection for the Hero Laptop Stand (Silver & Black)
  const [heroVariant, setHeroVariant] = useState<ProductVariant>(
    standProduct.variants[0] || { id: 'var-01-silver', name: 'Silver', inStock: true }
  );

  const heroImage =
    heroVariant.image ||
    (heroVariant.name.toLowerCase() === 'black'
      ? standProduct.images[1]?.url
      : standProduct.images[0]?.url);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#09090B] pb-20 md:pb-0 transition-colors duration-200">
      {/* 01. PRODUCT-FOCUSED EDITORIAL HERO — LAPTOP STAND CAMPAIGN */}
      <section className="relative border-b border-[#E4E4E7] dark:border-[#27272A] pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24 overflow-hidden bg-white dark:bg-[#09090B] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-center">
            {/* Left Editorial Copy */}
            <div className="md:col-span-7 lg:col-span-6 space-y-4 sm:space-y-6">
              {/* Campaign Eyebrow */}
              <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 bg-[#F4F4F5] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] font-tech text-[10px] sm:text-xs uppercase tracking-widest text-[#52525B] dark:text-[#A1A1AA] rounded-[2px]">
                <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                <span className="font-semibold text-[#09090B] dark:text-white">FEATURED HARDWARE</span>
              </div>

              {/* Confident Campaign Headline */}
              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-[#09090B] dark:text-white leading-[1.08] sm:leading-[1.05]">
                A Better Setup Starts Here.
              </h1>

              {/* Supporting Copy */}
              <p className="font-sans text-sm sm:text-base md:text-lg text-[#52525B] dark:text-[#A1A1AA] max-w-xl leading-relaxed">
                Give your workspace a cleaner, more comfortable setup with our adjustable portable laptop stand.
              </p>

              {/* Reassurance Metrics Row */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 py-3 border-y border-[#E4E4E7] dark:border-[#27272A] max-w-lg font-tech">
                <div>
                  <div className="text-[#09090B] dark:text-white font-bold text-sm sm:text-lg">PKR {BRAND.shipping.fee}</div>
                  <div className="text-[#71717A] dark:text-[#A1A1AA] text-[9px] sm:text-[11px] uppercase font-medium">NATIONWIDE SHIPPING</div>
                </div>
                <div>
                  <div className="text-[#09090B] dark:text-white font-bold text-sm sm:text-lg">{BRAND.returnPolicy.windowDays} DAYS</div>
                  <div className="text-[#71717A] dark:text-[#A1A1AA] text-[9px] sm:text-[11px] uppercase font-medium">RETURN POLICY</div>
                </div>
                <div>
                  <div className="text-[#09090B] dark:text-white font-bold text-sm sm:text-lg">COD</div>
                  <div className="text-[#71717A] dark:text-[#A1A1AA] text-[9px] sm:text-[11px] uppercase font-medium">CASH ON ARRIVAL</div>
                </div>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectProduct(standProduct)}
                  className="px-6 py-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-display font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer rounded-[2px]"
                >
                  <span>SHOP LAPTOP STAND</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigateToShop()}
                  className="px-6 py-3.5 bg-white dark:bg-[#121214] border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#09090B] dark:hover:border-white text-[#09090B] dark:text-white font-display font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs text-center cursor-pointer rounded-[2px]"
                >
                  EXPLORE THE COLLECTION
                </button>
              </div>
            </div>

            {/* Right: Featured Physical Product Showcase (Item 01: Dual Finish Laptop Stand) */}
            <div className="md:col-span-5 lg:col-span-6 relative">
              <div className="relative border border-[#E4E4E7] dark:border-[#27272A] bg-[#F8F9FA] dark:bg-[#121214] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-xs rounded-[2px] transition-colors">
                {/* Technical Badges */}
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#E4E4E7] dark:border-[#27272A]">
                  <span className="font-tech text-[10px] sm:text-xs text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider font-semibold">
                    ITEM DX-01 // WORKSPACE
                  </span>
                  <span className="font-tech text-[10px] sm:text-xs uppercase px-2 py-0.5 border border-[#0066FF]/40 text-[#0066FF] dark:text-[#3B82F6] bg-[#0066FF]/10 dark:bg-[#0066FF]/20 font-bold rounded-[2px]">
                    SAVE PKR 1,500 (50% OFF)
                  </span>
                </div>

                {/* Main Hero Product Image Frame */}
                <div
                  onClick={() => onSelectProduct(standProduct)}
                  className="cursor-pointer my-4 sm:my-6 aspect-[4/3] bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] p-4 sm:p-6 rounded-[2px] flex items-center justify-center group overflow-hidden shadow-2xs"
                >
                  <img
                    src={heroImage}
                    alt={`${standProduct.name} in ${heroVariant.name}`}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Interactive Silver & Black Finish Selector */}
                <div className="pt-3 pb-3 border-t border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between">
                  <span className="font-tech text-[11px] text-[#52525B] dark:text-[#A1A1AA] uppercase font-semibold">
                    FINISH: <strong className="text-[#09090B] dark:text-white">{heroVariant.name}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    {standProduct.variants.map(variant => {
                      const isSelected = variant.id === heroVariant.id;
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => setHeroVariant(variant)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-tech uppercase rounded-[2px] transition-all cursor-pointer ${
                            isSelected
                              ? 'border border-[#0066FF] text-[#0066FF] dark:text-[#3B82F6] font-bold bg-[#0066FF]/10 dark:bg-[#0066FF]/20'
                              : 'border border-[#E4E4E7] dark:border-[#27272A] text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white bg-white dark:bg-[#18181B]'
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-neutral-300 dark:border-neutral-600"
                            style={{ backgroundColor: variant.colorCode || (variant.name === 'Black' ? '#18181B' : '#E2E8F0') }}
                          />
                          <span>{variant.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Main Benefits from Product Data */}
                <div className="py-2.5 border-t border-[#E4E4E7] dark:border-[#27272A] grid grid-cols-2 gap-1.5 font-tech text-[10px] sm:text-[11px] text-[#52525B] dark:text-[#A1A1AA]">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                    Multi-Level Angle Riser
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                    Passive Airflow Cooling
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                    Silicone Non-Slip Grip
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                    Sleeve Included
                  </span>
                </div>

                {/* Product Summary & Buy Actions */}
                <div className="pt-3 border-t border-[#E4E4E7] dark:border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3
                      onClick={() => onSelectProduct(standProduct)}
                      className="cursor-pointer font-display font-bold text-base sm:text-lg text-[#09090B] dark:text-white hover:text-[#0066FF] dark:hover:text-[#3B82F6] transition-colors line-clamp-1"
                    >
                      {standProduct.name}
                    </h3>
                    <div className="flex items-center gap-2 font-tech text-xs mt-0.5">
                      <span className="text-[#71717A] dark:text-[#A1A1AA] line-through">
                        PKR {standProduct.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-[#09090B] dark:text-white font-bold text-sm">
                        PKR {standProduct.salePrice.toLocaleString()}
                      </span>
                      <span className="text-[#52525B] dark:text-[#A1A1AA] hidden sm:inline">• DUAL FINISH</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(standProduct)}
                      className="font-tech text-xs uppercase px-3.5 py-2.5 border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#09090B] dark:hover:border-white text-[#09090B] dark:text-white bg-white dark:bg-[#18181B] font-semibold transition-colors cursor-pointer rounded-[2px]"
                    >
                      DETAILS
                    </button>
                    <button
                      onClick={() => quickBuy(standProduct, heroVariant, 1)}
                      className="font-tech text-xs uppercase px-4 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold transition-colors shadow-sm cursor-pointer rounded-[2px]"
                    >
                      ORDER NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slim Trust Information Row */}
      <TrustBar />

      {/* 02. VARIED COMPOSITIONS SHOWCASE — ENGINEERED ESSENTIALS */}
      <section className="py-12 sm:py-16 md:py-20 border-b border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#09090B] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-4 border-b border-[#E4E4E7] dark:border-[#27272A]">
            <div>
              <span className="font-tech text-xs text-[#0066FF] dark:text-[#3B82F6] uppercase tracking-widest block mb-1 font-bold">
                CURATED LINEUP // 01
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-[#09090B] dark:text-white">
                Engineered Essentials
              </h2>
            </div>
            <p className="font-sans text-xs text-[#52525B] dark:text-[#A1A1AA] max-w-md mt-2 md:mt-0 leading-relaxed">
              Every item in our collection is physically verified for functional reliability before delivery.
            </p>
          </div>

          {/* Asymmetric Composition: Large Spotlight + Secondary Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* COMPOSITION 1: Large Featured Hardware - Touch Screen AirPods Case */}
            <div className="lg:col-span-7 border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] p-5 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xs rounded-[2px] transition-colors">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7] dark:border-[#27272A]">
                  <span className="font-tech text-[10px] sm:text-xs text-[#52525B] dark:text-[#A1A1AA] uppercase font-semibold">
                    ITEM 02 // AUDIO & INTERFACE
                  </span>
                  <span className="font-tech text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 border border-[#0066FF]/40 text-[#0066FF] dark:text-[#3B82F6] bg-[#0066FF]/10 dark:bg-[#0066FF]/20 font-bold rounded-[2px]">
                    SAVE PKR {(airpodsCaseProduct.originalPrice - airpodsCaseProduct.salePrice).toLocaleString()}
                  </span>
                </div>

                <div className="mt-3 sm:mt-4">
                  <h3
                    onClick={() => onSelectProduct(airpodsCaseProduct)}
                    className="cursor-pointer font-display font-bold text-xl sm:text-2xl text-[#09090B] dark:text-white hover:text-[#0066FF] dark:hover:text-[#3B82F6] transition-colors"
                  >
                    {airpodsCaseProduct.name}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] font-sans leading-relaxed">
                    {airpodsCaseProduct.description}
                  </p>
                </div>
              </div>

              {/* Dominant Image View */}
              <div
                onClick={() => onSelectProduct(airpodsCaseProduct)}
                className="cursor-pointer my-6 sm:my-8 aspect-[16/10] bg-[#F8F9FA] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-center p-4 sm:p-6 group shadow-2xs rounded-[2px]"
              >
                <img
                  src={airpodsCaseProduct.images[0].url}
                  alt={airpodsCaseProduct.name}
                  className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="pt-4 border-t border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between">
                <div>
                  <div className="font-tech text-xs text-[#71717A] dark:text-[#A1A1AA] line-through">
                    PKR {airpodsCaseProduct.originalPrice.toLocaleString()}
                  </div>
                  <div className="font-display font-bold text-lg sm:text-xl text-[#09090B] dark:text-white">
                    PKR {airpodsCaseProduct.salePrice.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => onSelectProduct(airpodsCaseProduct)}
                    className="font-tech text-xs uppercase px-3 sm:px-4 py-2 border border-[#E4E4E7] dark:border-[#27272A] text-[#09090B] dark:text-white hover:border-[#09090B] dark:hover:border-neutral-300 bg-[#F4F4F5] dark:bg-[#18181B] font-semibold cursor-pointer rounded-[2px] transition-colors"
                  >
                    SPECS
                  </button>
                  <button
                    onClick={() => quickBuy(airpodsCaseProduct, airpodsCaseProduct.variants[0], 1)}
                    className="font-tech text-xs uppercase px-4 sm:px-5 py-2 bg-[#0066FF] text-white hover:bg-[#0052CC] transition-colors font-bold shadow-2xs cursor-pointer rounded-[2px]"
                  >
                    ORDER NOW
                  </button>
                </div>
              </div>
            </div>

            {/* COMPOSITION 2: Two Smaller Complementary Products (Headphones + Ring) */}
            <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-8">
              {/* Headphones Product */}
              <div
                onClick={() => onSelectProduct(headphonesProduct)}
                className="cursor-pointer border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] p-4 sm:p-6 hover:border-[#09090B] dark:hover:border-neutral-400 transition-all flex flex-col justify-between flex-1 group shadow-2xs rounded-[2px]"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#E4E4E7] dark:border-[#27272A]">
                  <span className="font-tech text-[9px] sm:text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase font-semibold">
                    REF DX-0{headphonesProduct.itemNumber}
                  </span>
                  <span className="font-tech text-[9px] sm:text-[10px] text-[#0066FF] dark:text-[#3B82F6] font-bold">
                    SAVE PKR {(headphonesProduct.originalPrice - headphonesProduct.salePrice).toLocaleString()}
                  </span>
                </div>

                <div className="my-3 sm:my-4 aspect-[2/1] bg-[#F8F9FA] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-center p-2 sm:p-3 rounded-[2px]">
                  <img
                    src={headphonesProduct.images[0].url}
                    alt={headphonesProduct.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                <div>
                  <h4 className="font-display font-semibold text-xs sm:text-base text-[#09090B] dark:text-white group-hover:text-[#0066FF] dark:group-hover:text-[#3B82F6] line-clamp-1 transition-colors">
                    {headphonesProduct.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#52525B] dark:text-[#A1A1AA] mt-0.5 line-clamp-1 hidden sm:block">
                    {headphonesProduct.shortStatement}
                  </p>

                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#E4E4E7] dark:border-[#27272A] flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <span className="font-tech text-[9px] sm:text-[10px] text-[#71717A] dark:text-[#A1A1AA] line-through">
                        PKR {headphonesProduct.originalPrice.toLocaleString()}
                      </span>
                      <span className="font-display font-bold text-sm sm:text-base text-[#09090B] dark:text-white">
                        PKR {headphonesProduct.salePrice.toLocaleString()}
                      </span>
                    </div>
                    <span className="font-tech text-[10px] sm:text-[11px] text-[#0066FF] dark:text-[#3B82F6] flex items-center gap-0.5 font-bold">
                      <span className="hidden sm:inline">VIEW</span> <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Ring Product */}
              <div
                onClick={() => onSelectProduct(ringProduct)}
                className="cursor-pointer border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] p-4 sm:p-6 hover:border-[#09090B] dark:hover:border-neutral-400 transition-all flex flex-col justify-between flex-1 group shadow-2xs rounded-[2px]"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#E4E4E7] dark:border-[#27272A]">
                  <span className="font-tech text-[9px] sm:text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase font-semibold">
                    REF DX-0{ringProduct.itemNumber}
                  </span>
                  <span className="font-tech text-[9px] sm:text-[10px] text-[#0066FF] dark:text-[#3B82F6] font-bold">
                    SAVE PKR {(ringProduct.originalPrice - ringProduct.salePrice).toLocaleString()}
                  </span>
                </div>

                <div className="my-3 sm:my-4 aspect-[2/1] bg-[#F8F9FA] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-center p-2 sm:p-3 rounded-[2px]">
                  <img
                    src={ringProduct.images[0].url}
                    alt={ringProduct.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                <div>
                  <h4 className="font-display font-semibold text-xs sm:text-base text-[#09090B] dark:text-white group-hover:text-[#0066FF] dark:group-hover:text-[#3B82F6] line-clamp-1 transition-colors">
                    {ringProduct.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#52525B] dark:text-[#A1A1AA] mt-0.5 line-clamp-1 hidden sm:block">
                    {ringProduct.shortStatement}
                  </p>

                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#E4E4E7] dark:border-[#27272A] flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <span className="font-tech text-[9px] sm:text-[10px] text-[#71717A] dark:text-[#A1A1AA] line-through">
                        PKR {ringProduct.originalPrice.toLocaleString()}
                      </span>
                      <span className="font-display font-bold text-sm sm:text-base text-[#09090B] dark:text-white">
                        PKR {ringProduct.salePrice.toLocaleString()}
                      </span>
                    </div>
                    <span className="font-tech text-[10px] sm:text-[11px] text-[#0066FF] dark:text-[#3B82F6] flex items-center gap-0.5 font-bold">
                      <span className="hidden sm:inline">SIZES 6–12</span> <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. FULL-WIDTH EDITORIAL PRODUCT SPOTLIGHT (Product 06: I9 Ultra Max Smart Watch) */}
      <section className="py-12 sm:py-16 md:py-20 border-b border-[#E4E4E7] dark:border-[#27272A] bg-[#F4F4F5] dark:bg-[#09090B] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] p-5 sm:p-8 md:p-10 lg:p-12 shadow-sm rounded-[2px] transition-colors">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
              {/* Left: Real Studio Photo */}
              <div
                onClick={() => onSelectProduct(watchI9Product)}
                className="md:col-span-5 lg:col-span-6 cursor-pointer aspect-square bg-[#F8F9FA] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] p-6 sm:p-8 flex items-center justify-center group shadow-2xs rounded-[2px]"
              >
                <img
                  src={watchI9Product.images[0].url}
                  alt={watchI9Product.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Right: Technical Specifications & Features */}
              <div className="md:col-span-7 lg:col-span-6 space-y-4 sm:space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-2 font-tech text-[10px] sm:text-xs text-[#52525B] dark:text-[#A1A1AA] uppercase font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                    <span>HARDWARE SPOTLIGHT // ITEM 06</span>
                  </div>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase text-[#09090B] dark:text-white">
                    {watchI9Product.name}
                  </h2>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                    {watchI9Product.description}
                  </p>
                </div>

                {/* Key Technical Specifications Table */}
                <div className="border-t border-[#E4E4E7] dark:border-[#27272A] pt-3 sm:pt-4">
                  <TechSpecsTable
                    title="KEY HARDWARE SPECIFICATIONS"
                    specifications={watchI9Product.specifications.slice(0, 5)}
                    disclaimer={watchI9Product.disclaimer}
                  />
                </div>

                <div className="pt-3 sm:pt-4 border-t border-[#E4E4E7] dark:border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div>
                    <span className="font-tech text-xs text-[#71717A] dark:text-[#A1A1AA] line-through uppercase block">
                      PKR {watchI9Product.originalPrice.toLocaleString()}
                    </span>
                    <span className="font-display font-bold text-xl sm:text-2xl text-[#09090B] dark:text-white">
                      PKR {watchI9Product.salePrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => onSelectProduct(watchI9Product)}
                      className="font-tech text-xs uppercase px-4 sm:px-5 py-2.5 sm:py-3 border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#09090B] dark:hover:border-neutral-300 text-[#09090B] dark:text-white bg-[#F4F4F5] dark:bg-[#18181B] font-semibold transition-colors cursor-pointer rounded-[2px]"
                    >
                      FULL SPECS
                    </button>
                    <button
                      onClick={() => quickBuy(watchI9Product, watchI9Product.variants[0], 1)}
                      className="font-tech text-xs uppercase px-5 sm:px-6 py-2.5 sm:py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold transition-colors shadow-md cursor-pointer rounded-[2px]"
                    >
                      ORDER NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. CLEAN PRODUCT COLLECTION BROWSER (Laptop Stand Listed First) */}
      <section className="py-12 sm:py-16 md:py-20 border-b border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#09090B] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-[#E4E4E7] dark:border-[#27272A]">
            <div>
              <span className="font-tech text-[10px] sm:text-xs text-[#71717A] dark:text-[#A1A1AA] uppercase tracking-widest block mb-1 font-semibold">
                COMPLETE INVENTORY // ALL 8 HARDWARE PRODUCTS
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-[#09090B] dark:text-white">
                Current Catalog
              </h2>
            </div>

            <button
              onClick={() => onNavigateToShop()}
              className="mt-3 sm:mt-0 font-tech text-xs uppercase text-[#0066FF] hover:underline flex items-center gap-1 font-bold cursor-pointer"
            >
              <span>FILTER & SORT FULL CATALOG</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {PRODUCTS.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 04. AUTHENTIC CUSTOMER FEEDBACK SECTION */}
      <section className="py-12 sm:py-16 md:py-20 border-b border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#09090B] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-[#E4E4E7] dark:border-[#27272A]">
            <div>
              <span className="font-tech text-[10px] sm:text-xs text-[#0066FF] dark:text-[#3B82F6] uppercase tracking-widest block mb-1 font-bold">
                COMMUNITY TRANSPARENCY // REAL FEEDBACK
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-[#09090B] dark:text-white">
                Customer Reviews
              </h2>
            </div>

            <button
              onClick={() => onNavigateToShop()}
              className="mt-3 sm:mt-0 font-tech text-xs uppercase text-[#0066FF] dark:text-[#3B82F6] hover:underline flex items-center gap-1 font-bold cursor-pointer"
            >
              <span>EXPLORE HARDWARE & WRITE REVIEWS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {customerReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {customerReviews.slice(0, 3).map(rev => (
                <div
                  key={rev.id}
                  className="border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121214] p-5 rounded-[2px] shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-sm text-[#09090B] dark:text-white">
                      {rev.customerName}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating
                              ? 'text-[#F59E0B] fill-[#F59E0B]'
                              : 'text-[#CBD5E1] dark:text-[#334155]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="font-sans text-xs text-[#52525B] dark:text-[#A1A1AA] line-clamp-3 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-[#D4D4D8] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121214] p-6 sm:p-8 rounded-[2px] text-center max-w-2xl mx-auto space-y-3">
              <div className="w-10 h-10 border border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-center text-[#71717A] dark:text-[#A1A1AA] mx-auto font-tech bg-white dark:bg-[#18181B] rounded-[2px]">
                <MessageSquare className="w-4 h-4 text-[#0066FF] dark:text-[#3B82F6]" />
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg uppercase text-[#09090B] dark:text-white">
                Authentic Customer Feedback
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                We believe in genuine customer experiences. DEXYFIED does not manufacture fake ratings or buy artificial testimonials. Be the first to share your experience on any of our product pages.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigateToShop()}
                  className="font-tech text-xs uppercase px-4 py-2 border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#0066FF] text-[#0066FF] dark:text-[#3B82F6] bg-white dark:bg-[#18181B] font-bold rounded-[2px] cursor-pointer"
                >
                  BROWSE PRODUCTS TO SHARE FEEDBACK
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 05. HONEST COMMERCIAL FOUNDATION */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#F4F4F5] dark:bg-[#09090B] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="font-tech text-xs text-[#0066FF] dark:text-[#3B82F6] uppercase tracking-widest block mb-1.5 sm:mb-2 font-bold">
              WHY DEXYFIED // COMMERCIAL STANDARDS
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase text-[#09090B] dark:text-white leading-tight">
              Honest specifications. Practical technology. Direct nationwide access.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12">
            <div className="border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] p-5 sm:p-6 space-y-2.5 sm:space-y-3 shadow-2xs rounded-[2px] transition-colors">
              <div className="font-tech text-[11px] sm:text-xs text-[#71717A] dark:text-[#A1A1AA] uppercase font-semibold">
                01 // PRICING
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#09090B] dark:text-white uppercase">
                Accurate Original vs Sale
              </h3>
              <p className="font-sans text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                We state raw original pricing and real promotional sale figures clearly. No inflated baseline markups and no hidden charges added at checkout.
              </p>
            </div>

            <div className="border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] p-5 sm:p-6 space-y-2.5 sm:space-y-3 shadow-2xs rounded-[2px] transition-colors">
              <div className="font-tech text-[11px] sm:text-xs text-[#71717A] dark:text-[#A1A1AA] uppercase font-semibold">
                02 // DELIVERY
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#09090B] dark:text-white uppercase">
                Flat PKR {BRAND.shipping.fee} Nationwide
              </h3>
              <p className="font-sans text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                Whether you order to Karachi, Lahore, Islamabad, Peshawar, Quetta, or any other town across Pakistan, shipping is charged at a flat PKR {BRAND.shipping.fee} fee.
              </p>
            </div>

            <div className="border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] p-5 sm:p-6 space-y-2.5 sm:space-y-3 shadow-2xs rounded-[2px] transition-colors">
              <div className="font-tech text-[11px] sm:text-xs text-[#71717A] dark:text-[#A1A1AA] uppercase font-semibold">
                03 // ASSURANCE
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#09090B] dark:text-white uppercase">
                {BRAND.returnPolicy.windowDays}-Day Return Window
              </h3>
              <p className="font-sans text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                Inspect your hardware upon arrival. If the item is unused and kept in original packaging, you have {BRAND.returnPolicy.windowDays} calendar days to contact our team for assistance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

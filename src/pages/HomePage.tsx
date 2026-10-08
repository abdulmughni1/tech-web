import React from 'react';
import { Product } from '../types/product';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { TechSpecsTable } from '../components/product/TechSpecsTable';
import { TrustBar } from '../components/layout/TrustBar';
import { useCart } from '../context/CartContext';
import { ArrowRight, ArrowUpRight, Check, ShieldCheck, Truck } from 'lucide-react';
import { BRAND } from '../data/policies';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  onNavigateToShop: (category?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProduct,
  onNavigateToShop,
}) => {
  const { quickBuy } = useCart();

  const standProduct = PRODUCTS.find(p => p.itemNumber === 1)!;
  const airpodsCaseProduct = PRODUCTS.find(p => p.itemNumber === 2)!;
  const watchI9Product = PRODUCTS.find(p => p.itemNumber === 6)!;
  const ringProduct = PRODUCTS.find(p => p.itemNumber === 4)!;
  const headphonesProduct = PRODUCTS.find(p => p.itemNumber === 3)!;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20 md:pb-0">
      {/* 01. PRODUCT-FOCUSED HERO (No generic SaaS fluff) */}
      <section className="relative border-b border-[#E4E4E7] pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-8 items-center">
            {/* Left Editorial Copy */}
            <div className="md:col-span-7 lg:col-span-6 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 bg-[#F4F4F5] border border-[#E4E4E7] font-tech text-[10px] sm:text-xs uppercase tracking-widest text-[#52525B]">
                <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                <span className="font-semibold text-[#09090B]">CONSUMER TECH // 2026 CATALOG</span>
              </div>

              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-[#09090B] leading-[1.08] sm:leading-[1.05]">
                TECH THAT EARNS ITS PLACE.
              </h1>

              <p className="font-sans text-sm sm:text-base md:text-lg text-[#52525B] max-w-xl leading-relaxed">
                Affordable consumer tech, selected for everyday use. Transparent pricing, physical hardware inspection, and PKR 150 nationwide delivery across Pakistan.
              </p>

              {/* Direct Metrics / Reassurance */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 py-3 border-y border-[#E4E4E7] max-w-lg font-tech">
                <div>
                  <div className="text-[#09090B] font-bold text-sm sm:text-lg">PKR 150</div>
                  <div className="text-[#71717A] text-[9px] sm:text-[11px] uppercase font-medium">NATIONWIDE SHIPPING</div>
                </div>
                <div>
                  <div className="text-[#09090B] font-bold text-sm sm:text-lg">7 DAYS</div>
                  <div className="text-[#71717A] text-[9px] sm:text-[11px] uppercase font-medium">RETURN POLICY</div>
                </div>
                <div>
                  <div className="text-[#09090B] font-bold text-sm sm:text-lg">COD</div>
                  <div className="text-[#71717A] text-[9px] sm:text-[11px] uppercase font-medium">CASH ON ARRIVAL</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigateToShop()}
                  className="px-6 py-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-display font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>BROWSE CATALOG</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectProduct(standProduct)}
                  className="px-6 py-3.5 bg-white border border-[#E4E4E7] hover:border-[#09090B] text-[#09090B] font-display font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs text-center cursor-pointer"
                >
                  VIEW STAND (PKR 1,500)
                </button>
              </div>
            </div>

            {/* Right: Dominant Physical Product Spotlight (Product 01: Dual Finish Stand) */}
            <div className="md:col-span-5 lg:col-span-6 relative">
              <div className="relative border border-[#E4E4E7] bg-[#F8F9FA] p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between shadow-xs">
                {/* Tech Badges */}
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#E4E4E7]">
                  <span className="font-tech text-[10px] sm:text-xs text-[#52525B] uppercase tracking-wider font-semibold">
                    FEATURED HARDWARE // ITEM 01
                  </span>
                  <span className="font-tech text-[10px] sm:text-xs uppercase px-2 py-0.5 border border-[#0066FF]/40 text-[#0066FF] bg-[#0066FF]/10 font-bold">
                    SAVE PKR 1,500 (50% OFF)
                  </span>
                </div>

                {/* Main Hero Product Image */}
                <div
                  onClick={() => onSelectProduct(standProduct)}
                  className="cursor-pointer my-4 sm:my-6 aspect-[4/3] flex items-center justify-center group overflow-hidden"
                >
                  <img
                    src={standProduct.images[0].url}
                    alt={standProduct.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Product Summary & Buy */}
                <div className="pt-3 sm:pt-4 border-t border-[#E4E4E7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div>
                    <h3
                      onClick={() => onSelectProduct(standProduct)}
                      className="cursor-pointer font-display font-bold text-base sm:text-lg text-[#09090B] hover:text-[#0066FF]"
                    >
                      {standProduct.name}
                    </h3>
                    <div className="flex items-center gap-2 sm:gap-3 font-tech text-xs mt-1">
                      <span className="text-[#71717A] line-through">PKR {standProduct.originalPrice.toLocaleString()}</span>
                      <span className="text-[#09090B] font-bold text-sm">PKR {standProduct.salePrice.toLocaleString()}</span>
                      <span className="text-[#52525B] hidden sm:inline">• DUAL FINISH</span>
                    </div>
                  </div>

                  <button
                    onClick={() => quickBuy(standProduct, standProduct.variants[0], 1)}
                    className="font-tech text-xs uppercase px-4 sm:px-5 py-2.5 bg-[#0066FF] text-white hover:bg-[#0052CC] transition-colors whitespace-nowrap font-bold shadow-2xs cursor-pointer text-center"
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Bar */}
      <TrustBar />

      {/* 02. VARIED COMPOSITIONS SHOWCASE */}
      <section className="py-12 sm:py-16 md:py-20 border-b border-[#E4E4E7] bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-4 border-b border-[#E4E4E7]">
            <div>
              <span className="font-tech text-xs text-[#0066FF] uppercase tracking-widest block mb-1 font-bold">
                HARDWARE LINEUP // 01
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-[#09090B]">
                Engineered Essentials
              </h2>
            </div>
            <p className="font-sans text-xs text-[#52525B] max-w-md mt-2 md:mt-0 leading-relaxed">
              Every item in our collection is physically verified for functional reliability before delivery.
            </p>
          </div>

          {/* Asymmetric Composition: Large Spotlight + Secondary Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* COMPOSITION 1: Large Featured Hardware - Touch Screen AirPods Case */}
            <div className="lg:col-span-7 border border-[#E4E4E7] bg-white p-5 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7]">
                  <span className="font-tech text-[10px] sm:text-xs text-[#52525B] uppercase font-semibold">
                    ITEM 02 // AUDIO & INTERFACE
                  </span>
                  <span className="font-tech text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 border border-[#0066FF]/40 text-[#0066FF] bg-[#0066FF]/10 font-bold">
                    SAVE PKR 1,800
                  </span>
                </div>

                <div className="mt-3 sm:mt-4">
                  <h3
                    onClick={() => onSelectProduct(airpodsCaseProduct)}
                    className="cursor-pointer font-display font-bold text-xl sm:text-2xl text-[#09090B] hover:text-[#0066FF]"
                  >
                    {airpodsCaseProduct.name}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#52525B] font-sans leading-relaxed">
                    {airpodsCaseProduct.description}
                  </p>
                </div>
              </div>

              {/* Dominant Image View */}
              <div
                onClick={() => onSelectProduct(airpodsCaseProduct)}
                className="cursor-pointer my-6 sm:my-8 aspect-[16/10] bg-[#F8F9FA] border border-[#E4E4E7] flex items-center justify-center p-4 sm:p-6 group shadow-2xs"
              >
                <img
                  src={airpodsCaseProduct.images[0].url}
                  alt={airpodsCaseProduct.name}
                  className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="pt-4 border-t border-[#E4E4E7] flex items-center justify-between">
                <div>
                  <div className="font-tech text-xs text-[#71717A] line-through">
                    PKR {airpodsCaseProduct.originalPrice.toLocaleString()}
                  </div>
                  <div className="font-display font-bold text-lg sm:text-xl text-[#09090B]">
                    PKR {airpodsCaseProduct.salePrice.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => onSelectProduct(airpodsCaseProduct)}
                    className="font-tech text-xs uppercase px-3 sm:px-4 py-2 border border-[#E4E4E7] text-[#09090B] hover:border-[#09090B] bg-[#F4F4F5] font-semibold cursor-pointer"
                  >
                    SPECS
                  </button>
                  <button
                    onClick={() => quickBuy(airpodsCaseProduct, airpodsCaseProduct.variants[0], 1)}
                    className="font-tech text-xs uppercase px-4 sm:px-5 py-2 bg-[#0066FF] text-white hover:bg-[#0052CC] transition-colors font-bold shadow-2xs cursor-pointer"
                  >
                    ORDER NOW
                  </button>
                </div>
              </div>
            </div>

            {/* COMPOSITION 2: Two Smaller Complementary Products (Headphones + Ring) */}
            <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:gap-8">
              {[headphonesProduct, ringProduct].map(prod => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="cursor-pointer border border-[#E4E4E7] bg-white p-4 sm:p-6 hover:border-[#09090B] transition-all flex flex-col justify-between flex-1 group shadow-2xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#E4E4E7]">
                    <span className="font-tech text-[9px] sm:text-[10px] text-[#71717A] uppercase font-semibold">
                      REF DX-0{prod.itemNumber}
                    </span>
                    <span className="font-tech text-[9px] sm:text-[10px] text-[#0066FF] font-bold">
                      SAVE PKR {(prod.originalPrice - prod.salePrice).toLocaleString()}
                    </span>
                  </div>

                  <div className="my-3 sm:my-4 aspect-[2/1] bg-[#F8F9FA] border border-[#E4E4E7] flex items-center justify-center p-2 sm:p-3">
                    <img
                      src={prod.images[0].url}
                      alt={prod.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>

                  <div>
                    <h4 className="font-display font-semibold text-xs sm:text-base text-[#09090B] group-hover:text-[#0066FF] line-clamp-1">
                      {prod.name}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#52525B] mt-0.5 line-clamp-1 hidden sm:block">
                      {prod.shortStatement}
                    </p>

                    <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-[#E4E4E7] flex items-baseline justify-between">
                      <div className="flex items-baseline gap-1.5 sm:gap-2">
                        <span className="font-tech text-[9px] sm:text-[10px] text-[#71717A] line-through">
                          PKR {prod.originalPrice.toLocaleString()}
                        </span>
                        <span className="font-display font-bold text-sm sm:text-base text-[#09090B]">
                          PKR {prod.salePrice.toLocaleString()}
                        </span>
                      </div>
                      <span className="font-tech text-[10px] sm:text-[11px] text-[#0066FF] flex items-center gap-0.5 font-bold">
                        <span className="hidden sm:inline">VIEW</span> <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03. FULL-WIDTH EDITORIAL PRODUCT SPOTLIGHT (Product 06: I9 Ultra Max Smart Watch) */}
      <section className="py-12 sm:py-16 md:py-20 border-b border-[#E4E4E7] bg-[#F4F4F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#E4E4E7] bg-white p-5 sm:p-8 md:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
              {/* Left: Real Studio Photo */}
              <div
                onClick={() => onSelectProduct(watchI9Product)}
                className="md:col-span-5 lg:col-span-6 cursor-pointer aspect-square bg-[#F8F9FA] border border-[#E4E4E7] p-6 sm:p-8 flex items-center justify-center group shadow-2xs"
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
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-2 font-tech text-[10px] sm:text-xs text-[#52525B] uppercase font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                    <span>HARDWARE SPOTLIGHT // ITEM 06</span>
                  </div>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase text-[#09090B]">
                    {watchI9Product.name}
                  </h2>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#52525B] leading-relaxed">
                    {watchI9Product.description}
                  </p>
                </div>

                {/* Live Raw Specs Preview */}
                <div className="border-t border-[#E4E4E7] pt-3 sm:pt-4">
                  <TechSpecsTable
                    title="KEY HARDWARE SPECIFICATIONS"
                    specifications={watchI9Product.specifications.slice(0, 5)}
                    disclaimer={watchI9Product.disclaimer}
                  />
                </div>

                <div className="pt-3 sm:pt-4 border-t border-[#E4E4E7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div>
                    <span className="font-tech text-xs text-[#71717A] line-through uppercase block">
                      PKR {watchI9Product.originalPrice.toLocaleString()}
                    </span>
                    <span className="font-display font-bold text-xl sm:text-2xl text-[#09090B]">
                      PKR {watchI9Product.salePrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => onSelectProduct(watchI9Product)}
                      className="font-tech text-xs uppercase px-4 sm:px-5 py-2.5 sm:py-3 border border-[#E4E4E7] hover:border-[#09090B] text-[#09090B] bg-[#F4F4F5] font-semibold transition-colors cursor-pointer"
                    >
                      FULL SPECS
                    </button>
                    <button
                      onClick={() => quickBuy(watchI9Product, watchI9Product.variants[0], 1)}
                      className="font-tech text-xs uppercase px-5 sm:px-6 py-2.5 sm:py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold transition-colors shadow-md cursor-pointer"
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

      {/* 04. COMPLETE CATALOG BROWSER SECTION */}
      <section className="py-12 sm:py-16 md:py-20 border-b border-[#E4E4E7] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-[#E4E4E7]">
            <div>
              <span className="font-tech text-[10px] sm:text-xs text-[#71717A] uppercase tracking-widest block mb-1 font-semibold">
                COMPLETE INVENTORY // ALL 8 HARDWARE PRODUCTS
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-[#09090B]">
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

      {/* 05. HONEST COMMERCIAL FOUNDATION */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#F4F4F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="font-tech text-xs text-[#0066FF] uppercase tracking-widest block mb-1.5 sm:mb-2 font-bold">
              WHY DEXYFIED // COMMERCIAL STANDARDS
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase text-[#09090B] leading-tight">
              Honest specifications. Practical technology. Direct nationwide access.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12">
            <div className="border border-[#E4E4E7] bg-white p-5 sm:p-6 space-y-2.5 sm:space-y-3 shadow-2xs">
              <div className="font-tech text-[11px] sm:text-xs text-[#71717A] uppercase font-semibold">01 // PRICING</div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#09090B] uppercase">
                Accurate Original vs Sale
              </h3>
              <p className="font-sans text-xs text-[#52525B] leading-relaxed">
                We state raw original pricing and real promotional sale figures clearly. No inflated baseline markups and no hidden charges added at checkout.
              </p>
            </div>

            <div className="border border-[#E4E4E7] bg-white p-5 sm:p-6 space-y-2.5 sm:space-y-3 shadow-2xs">
              <div className="font-tech text-[11px] sm:text-xs text-[#71717A] uppercase font-semibold">02 // DELIVERY</div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#09090B] uppercase">
                Flat PKR 150 Nationwide
              </h3>
              <p className="font-sans text-xs text-[#52525B] leading-relaxed">
                Whether you order to Karachi, Lahore, Islamabad, Peshawar, Quetta, or any other town across Pakistan, shipping is charged at a flat PKR 150 fee.
              </p>
            </div>

            <div className="border border-[#E4E4E7] bg-white p-5 sm:p-6 space-y-2.5 sm:space-y-3 shadow-2xs">
              <div className="font-tech text-[11px] sm:text-xs text-[#71717A] uppercase font-semibold">03 // ASSURANCE</div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#09090B] uppercase">
                7-Day Return Window
              </h3>
              <p className="font-sans text-xs text-[#52525B] leading-relaxed">
                Inspect your hardware upon arrival. If the item is unused and kept in original packaging, you have 7 calendar days to contact our team for assistance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

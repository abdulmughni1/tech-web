import React from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { Product } from '../types/product';
import { ArrowUpRight, Watch, Headphones, Laptop, Sparkles } from 'lucide-react';

interface CategoriesPageProps {
  onSelectCategory: (category: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  onSelectCategory,
  onSelectProduct,
}) => {
  const categoryMeta: Record<string, { icon: React.ReactNode; desc: string; heroItemNo: number }> = {
    'Smart Watches': {
      icon: <Watch className="w-5 h-5 text-[#0066FF]" />,
      desc: 'IPS full-touch displays, Bluetooth calling, and health-tracking sensors.',
      heroItemNo: 6,
    },
    'Audio': {
      icon: <Headphones className="w-5 h-5 text-[#0066FF]" />,
      desc: 'Interactive touchscreen charging cases and over-ear stereo acoustics.',
      heroItemNo: 2,
    },
    'Workspace': {
      icon: <Laptop className="w-5 h-5 text-[#0066FF]" />,
      desc: 'Foldable aluminum-alloy risers and desktop ergonomic stands.',
      heroItemNo: 1,
    },
    'Wearables': {
      icon: <Sparkles className="w-5 h-5 text-[#0066FF]" />,
      desc: 'Engineered daily jewelry with passive luminescent features.',
      heroItemNo: 4,
    },
  };

  const domainCategories = CATEGORIES.filter(c => c !== 'All');

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E4E4E7] pb-6 mb-12">
          <div className="flex items-center gap-2 font-tech text-xs text-[#52525B] uppercase tracking-widest mb-1 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
            <span>SYSTEM DIRECTORY // CATEGORIES</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase text-[#09090B]">
            Hardware Categories
          </h1>
          <p className="text-xs text-[#52525B] font-sans mt-2 max-w-xl">
            Explore DEXYFIED physical electronics structured by functional discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {domainCategories.map(cat => {
            const meta = categoryMeta[cat] || {
              icon: null,
              desc: 'Physical electronics and everyday accessories.',
              heroItemNo: 1,
            };
            const catProducts = PRODUCTS.filter(p => p.category === cat);

            return (
              <div
                key={cat}
                className="border border-[#E4E4E7] bg-white p-6 sm:p-8 flex flex-col justify-between hover:border-[#09090B] transition-all shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#E4E4E7]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 border border-[#E4E4E7] bg-[#F4F4F5]">
                        {meta.icon}
                      </div>
                      <h2 className="font-display font-bold text-xl uppercase tracking-wider text-[#09090B]">
                        {cat}
                      </h2>
                    </div>
                    <span className="font-tech text-xs text-[#71717A] uppercase font-medium">
                      [{catProducts.length} {catProducts.length === 1 ? 'DEVICE' : 'DEVICES'}]
                    </span>
                  </div>

                  <p className="font-sans text-xs text-[#52525B] mt-4 leading-relaxed">
                    {meta.desc}
                  </p>

                  {/* Product Mini List */}
                  <div className="mt-6 space-y-2.5">
                    {catProducts.map(p => (
                      <div
                        key={p.id}
                        onClick={() => onSelectProduct(p)}
                        className="p-3 border border-[#E4E4E7] bg-[#F8F9FA] hover:border-[#0066FF] cursor-pointer flex items-center justify-between transition-colors group shadow-2xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white border border-[#E4E4E7] p-1 flex items-center justify-center flex-shrink-0">
                            <img
                              src={p.images[0]?.url}
                              alt={p.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div>
                            <div className="font-display text-xs font-semibold text-[#09090B] group-hover:text-[#0066FF] line-clamp-1">
                              {p.name}
                            </div>
                            <div className="font-tech text-[10px] text-[#71717A]">
                              REF DX-0{p.itemNumber}
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex items-center gap-2">
                          <div>
                            <div className="font-tech text-xs font-bold text-[#09090B]">
                              PKR {p.salePrice.toLocaleString()}
                            </div>
                            <div className="font-tech text-[10px] text-[#71717A] line-through">
                              PKR {p.originalPrice.toLocaleString()}
                            </div>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#0066FF]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E4E4E7]">
                  <button
                    onClick={() => onSelectCategory(cat)}
                    className="w-full py-2.5 px-4 font-tech text-xs uppercase tracking-wider border border-[#E4E4E7] bg-[#F4F4F5] hover:border-[#0066FF] hover:text-[#0066FF] text-[#09090B] transition-colors flex items-center justify-center gap-2 font-semibold cursor-pointer"
                  >
                    <span>VIEW ALL {cat.toUpperCase()} IN SHOP</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

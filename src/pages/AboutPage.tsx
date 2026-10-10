import React from 'react';
import { BRAND } from '../data/policies';
import { DexyfiedLogo } from '../components/brand/DexyfiedLogo';
import { ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigateToShop: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToShop }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#09090B] py-16 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Statement Banner */}
        <div className="border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121214] p-8 md:p-12 mb-12 shadow-2xs rounded-[2px] transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#E4E4E7] dark:border-[#27272A]">
            <DexyfiedLogo size="lg" showSubtitle={true} />
            <div className="font-tech text-xs text-[#71717A] dark:text-[#A1A1AA] uppercase text-left sm:text-right font-medium">
              EST. PAKISTAN // PHYSICAL TECH STORE
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase text-[#09090B] dark:text-white leading-tight">
              Tech That Earns Its Place.
            </h1>
            <p className="font-sans text-base text-[#52525B] dark:text-[#A1A1AA] max-w-2xl leading-relaxed">
              DEXYFIED was founded on a straightforward principle: consumer technology should be practical, accessible, clearly priced, and dependable in daily use.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="space-y-8 font-sans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] space-y-3 shadow-2xs rounded-[2px] transition-colors">
              <div className="font-tech text-xs text-[#09090B] dark:text-white uppercase font-bold">01 // VALUE</div>
              <h3 className="font-display font-bold text-lg text-[#09090B] dark:text-white uppercase">
                Accessible Pricing
              </h3>
              <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                We select hardware that delivers core functional performance at direct, realistic prices without unnecessary brand markups.
              </p>
            </div>

            <div className="p-6 border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] space-y-3 shadow-2xs rounded-[2px] transition-colors">
              <div className="font-tech text-xs text-[#09090B] dark:text-white uppercase font-bold">02 // UTILITY</div>
              <h3 className="font-display font-bold text-lg text-[#09090B] dark:text-white uppercase">
                Everyday Practicality
              </h3>
              <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                From ergonomic laptop stands to Bluetooth-calling smart watches and audio kits, our products are selected to serve real daily tasks.
              </p>
            </div>

            <div className="p-6 border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] space-y-3 shadow-2xs rounded-[2px] transition-colors">
              <div className="font-tech text-xs text-[#09090B] dark:text-white uppercase font-bold">03 // CLARITY</div>
              <h3 className="font-display font-bold text-lg text-[#09090B] dark:text-white uppercase">
                Clean Buying Experience
              </h3>
              <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                Clear technical data sheets, honest original-to-sale pricing, flat PKR {BRAND.shipping.fee} nationwide shipping, and Cash on Delivery.
              </p>
            </div>
          </div>

          {/* Transparent Operating Philosophy */}
          <div className="p-8 border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] space-y-4 shadow-2xs rounded-[2px] transition-colors">
            <h2 className="font-display font-bold text-xl uppercase tracking-wide text-[#09090B] dark:text-white">
              What We Stand For
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
              <p>
                We do not believe in exaggerating specifications or using misleading marketing jargon. If a smartwatch has an IPS display with a YC1133 processor, we state those exact technical specifications directly so customers know precisely what hardware they are purchasing.
              </p>
              <p>
                Every order placed with DEXYFIED is treated with care. We verify details before shipping and provide direct, responsive support through our active phone line, email, and social channels.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E4E4E7] dark:border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="font-tech text-xs text-[#71717A] dark:text-[#A1A1AA] uppercase font-medium">
                HEADQUARTERS & DISPATCH: PAKISTAN NATIONWIDE
              </div>
              <button
                onClick={onNavigateToShop}
                className="px-6 py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white font-display font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer rounded-[2px]"
              >
                <span>EXPLORE PRODUCTS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

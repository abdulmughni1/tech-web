import React from 'react';
import { Truck, RotateCcw, Headphones, DollarSign } from 'lucide-react';
import { BRAND } from '../../data/policies';

export const TrustBar: React.FC = () => {
  const pillars = [
    {
      icon: <Truck className="w-4 h-4 text-[#0066FF]" />,
      label: 'NATIONWIDE DELIVERY',
      detail: `Flat PKR ${BRAND.shipping.fee} across Pakistan via tracked courier`,
    },
    {
      icon: <DollarSign className="w-4 h-4 text-[#0066FF]" />,
      label: 'COD & PREPAID PAYMENT',
      detail: 'Pay cash on arrival or via Meezan Bank, JazzCash & Easypaisa',
    },
    {
      icon: <RotateCcw className="w-4 h-4 text-[#0066FF]" />,
      label: `${BRAND.returnPolicy.windowDays}-DAY RETURN POLICY`,
      detail: 'Straightforward returns on unused items in original packaging',
    },
    {
      icon: <Headphones className="w-4 h-4 text-[#0066FF]" />,
      label: 'WHATSAPP ASSISTANCE',
      detail: `${BRAND.contact.phoneFormatted} direct support & order confirmation`,
    },
  ];

  return (
    <div className="border-y border-[#E4E4E7] dark:border-[#27272A] bg-[#F4F4F5] dark:bg-[#121214] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="p-2.5 border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#18181B] shadow-2xs flex-shrink-0 rounded-[2px] transition-colors">
                {pillar.icon}
              </div>
              <div>
                <h4 className="font-tech text-xs font-bold uppercase tracking-wider text-[#09090B] dark:text-white">
                  {pillar.label}
                </h4>
                <p className="font-sans text-xs text-[#52525B] dark:text-[#A1A1AA] mt-0.5 leading-relaxed">
                  {pillar.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Truck, RotateCcw, Headphones, DollarSign } from 'lucide-react';
import { BRAND } from '../../data/policies';

export const TrustBar: React.FC = () => {
  const pillars = [
    {
      icon: <Truck className="w-4 h-4 text-[#0066FF]" />,
      label: 'NATIONWIDE DELIVERY',
      detail: `Flat PKR ${BRAND.shipping.fee} across all cities in Pakistan`,
    },
    {
      icon: <RotateCcw className="w-4 h-4 text-[#0066FF]" />,
      label: `${BRAND.returnPolicy.windowDays}-DAY RETURN POLICY`,
      detail: 'Straightforward returns on unused items in original packaging',
    },
    {
      icon: <DollarSign className="w-4 h-4 text-[#0066FF]" />,
      label: 'TRANSPARENT PRICING',
      detail: 'Accurate original-to-sale figures with no surprise checkout fees',
    },
    {
      icon: <Headphones className="w-4 h-4 text-[#0066FF]" />,
      label: 'DIRECT SUPPORT',
      detail: `${BRAND.contact.phoneFormatted} & WhatsApp direct order assistance`,
    },
  ];

  return (
    <div className="border-y border-[#E4E4E7] bg-[#F4F4F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="p-2.5 border border-[#E4E4E7] bg-white shadow-2xs flex-shrink-0">
                {pillar.icon}
              </div>
              <div>
                <h4 className="font-tech text-xs font-bold uppercase tracking-wider text-[#09090B]">
                  {pillar.label}
                </h4>
                <p className="font-sans text-xs text-[#52525B] mt-0.5 leading-relaxed">
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

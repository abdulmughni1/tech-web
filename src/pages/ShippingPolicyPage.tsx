import React from 'react';
import { BRAND } from '../data/policies';
import { Truck, AlertCircle } from 'lucide-react';

export const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[#E4E4E7] pb-6 mb-10">
          <div className="flex items-center gap-2 font-tech text-xs text-[#0066FF] uppercase tracking-widest mb-1 font-bold">
            <Truck className="w-3.5 h-3.5" />
            <span>LOGISTICS // NATIONWIDE SHIPPING</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase text-[#09090B]">
            Shipping Policy
          </h1>
          <p className="text-xs text-[#52525B] font-sans mt-2">
            Coverage, flat rates, and delivery handling across all provinces in Pakistan.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 font-sans text-sm text-[#09090B] leading-relaxed">
          {/* Shipping Fee */}
          <section className="p-6 border border-[#E4E4E7] bg-white space-y-3 shadow-2xs">
            <h2 className="font-display font-bold text-lg text-[#09090B] uppercase tracking-wide">
              Shipping Fee: Flat PKR {BRAND.shipping.fee}
            </h2>
            <p className="text-[#52525B] text-xs leading-relaxed">
              We charge a single flat shipping fee of <strong className="text-[#09090B] font-mono font-bold">PKR {BRAND.shipping.fee}</strong> for deliveries nationwide across Pakistan, regardless of whether your parcel is bound for a major metropolis or a remote regional district.
            </p>
          </section>

          {/* Nationwide Coverage */}
          <section className="p-6 border border-[#E4E4E7] bg-white space-y-3 shadow-2xs">
            <h2 className="font-display font-bold text-lg text-[#09090B] uppercase tracking-wide">
              Nationwide Delivery
            </h2>
            <p className="text-[#52525B] text-xs leading-relaxed">
              DEXYFIED fulfills orders to all destinations across Pakistan via reputable domestic courier networks. Service extends to Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, Islamabad Capital Territory, Gilgit-Baltistan, and Azad Jammu & Kashmir.
            </p>
          </section>

          {/* Order Processing */}
          <section className="p-6 border border-[#E4E4E7] bg-white space-y-3 shadow-2xs">
            <h2 className="font-display font-bold text-lg text-[#09090B] uppercase tracking-wide">
              Order Processing
            </h2>
            <p className="text-[#52525B] text-xs leading-relaxed">
              Upon receiving your order, our fulfillment staff conducts an initial inspection and phone verification of your shipping destination before packing. Once verified, the parcel is sealed in protective packaging and handed over to our courier partner.
            </p>
          </section>

          {/* Delivery Expectations */}
          <section className="p-6 border border-[#E4E4E7] bg-white space-y-3 shadow-2xs">
            <h2 className="font-display font-bold text-lg text-[#09090B] uppercase tracking-wide">
              Delivery Expectations
            </h2>
            <p className="text-[#52525B] text-xs leading-relaxed">
              Couriers operate standard business transit schedules across Pakistan. You will receive tracking notifications when your package is dispatched. Please keep your active contact phone number available for the delivery rider upon arrival.
            </p>
          </section>

          {/* Damaged or Incorrect Orders */}
          <section className="p-6 border border-[#E4E4E7] bg-white space-y-3 shadow-2xs">
            <h2 className="font-display font-bold text-lg text-[#09090B] uppercase tracking-wide flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#0066FF]" />
              <span>What To Do If An Order Arrives Damaged Or Incorrect</span>
            </h2>
            <p className="text-[#52525B] text-xs leading-relaxed">
              If your package or hardware arrives damaged, defective, or contains an incorrect item, please report it to us as soon as possible.
            </p>
            <div className="p-4 border border-[#E4E4E7] bg-[#F8F9FA] space-y-2 text-xs shadow-2xs">
              <div className="font-tech text-[#09090B] uppercase font-bold">
                IMMEDIATE ACTION STEPS:
              </div>
              <ul className="space-y-1.5 text-[#52525B]">
                <li>1. Take clear photos of the shipping flyer, box, and affected hardware.</li>
                <li>2. Email <a href={`mailto:${BRAND.contact.email}`} className="text-[#0066FF] font-mono font-bold">{BRAND.contact.email}</a> or message us on WhatsApp at <span className="text-[#09090B] font-mono font-bold">{BRAND.contact.phoneFormatted}</span>.</li>
                <li>3. Include your order reference number and description of the issue.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

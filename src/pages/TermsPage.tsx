import React from 'react';
import { BRAND } from '../data/policies';
import { FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1020] py-16 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E2E8F0] dark:border-[#1E293B] pb-6 mb-10">
          <div className="flex items-center gap-2 font-tech text-xs text-[#0866FF] dark:text-[#3D82FF] uppercase tracking-widest mb-1 font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>COMMERCIAL AGREEMENT // TERMS</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase text-[#09090B] dark:text-[#F4F7FC]">
            Terms of Service
          </h1>
          <p className="text-xs text-[#52525B] dark:text-[#A4AEC0] font-sans mt-2">
            Operational and commercial terms governing purchases from the official DEXYFIED storefront.
          </p>
        </div>

        <div className="space-y-6 font-sans text-xs text-[#52525B] dark:text-[#A4AEC0] leading-relaxed">
          <section className="p-6 border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#111A2D] space-y-2 shadow-2xs rounded-[2px] transition-colors">
            <h2 className="font-display font-bold text-base text-[#09090B] dark:text-[#F4F7FC] uppercase">
              1. Storefront Purchases & Acceptance
            </h2>
            <p>
              By placing an order through dexyfied storefront, you confirm that your recipient details, shipping address, and active phone number provided are accurate. All orders undergo inventory confirmation and phone verification prior to courier handover.
            </p>
          </section>

          <section className="p-6 border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#111A2D] space-y-2 shadow-2xs rounded-[2px] transition-colors">
            <h2 className="font-display font-bold text-base text-[#09090B] dark:text-[#F4F7FC] uppercase">
              2. Product Descriptions & Raw Specifications
            </h2>
            <p>
              We provide accurate technical specifications derived from physical hardware evaluation and manufacturer component lists. Health-related metrics on smart watches (such as heart rate or sleep tracking) are designed strictly for casual wellness and fitness monitoring, not medical diagnosis or clinical treatment.
            </p>
          </section>

          <section className="p-6 border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#111A2D] space-y-2 shadow-2xs rounded-[2px] transition-colors">
            <h2 className="font-display font-bold text-base text-[#09090B] dark:text-[#F4F7FC] uppercase">
              3. Pricing & Shipping Rate
            </h2>
            <p>
              All prices are listed in Pakistani Rupees (PKR). Nationwide shipping across Pakistan is charged at a fixed PKR {BRAND.shipping.fee} rate. DEXYFIED reserves the right to modify promotional pricing or correct typographic pricing errors prior to dispatch.
            </p>
          </section>

          <section className="p-6 border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#111A2D] space-y-2 shadow-2xs rounded-[2px] transition-colors">
            <h2 className="font-display font-bold text-base text-[#09090B] dark:text-[#F4F7FC] uppercase">
              4. 7-Day Return Governing Terms
            </h2>
            <p>
              Returns and exchanges are strictly governed by our official 7-Day Return Policy. Items must be unused, in identical condition as received, and in original packaging. Sale items and customer-damaged items are non-returnable.
            </p>
          </section>

          <section className="p-6 border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#111A2D] space-y-2 shadow-2xs rounded-[2px] transition-colors">
            <h2 className="font-display font-bold text-base text-[#09090B] dark:text-[#F4F7FC] uppercase">
              5. Contact & Jurisdiction
            </h2>
            <p>
              For legal or commercial inquiries, contact <a href={`mailto:${BRAND.contact.email}`} className="text-[#0866FF] dark:text-[#3D82FF] font-mono hover:underline font-bold">{BRAND.contact.email}</a> or phone <span className="text-[#09090B] dark:text-[#F4F7FC] font-mono font-bold">{BRAND.contact.phoneFormatted}</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

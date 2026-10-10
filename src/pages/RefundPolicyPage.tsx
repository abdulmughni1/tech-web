import React from 'react';
import { BRAND } from '../data/policies';
import { RotateCcw, CheckCircle2, AlertOctagon } from 'lucide-react';

export const RefundPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1020] py-16 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[#E2E8F0] dark:border-[#1E293B] pb-6 mb-10">
          <div className="flex items-center gap-2 font-tech text-xs text-[#0866FF] dark:text-[#3D82FF] uppercase tracking-widest mb-1 font-bold">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>CUSTOMER ASSURANCE // RETURN POLICY</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase text-[#09090B] dark:text-[#F4F7FC]">
            7-Day Return Policy
          </h1>
          <p className="text-xs text-[#52525B] dark:text-[#A4AEC0] font-sans mt-2">
            Clear guidelines on returns, exchanges, and refund processing for DEXYFIED customers.
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 font-sans text-sm text-[#09090B] dark:text-[#F4F7FC] leading-relaxed">
          {/* Overview */}
          <section className="p-6 border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#111A2D] space-y-3 shadow-2xs rounded-[2px] transition-colors">
            <h2 className="font-display font-bold text-lg text-[#09090B] dark:text-[#F4F7FC] uppercase tracking-wide">
              Overview
            </h2>
            <p className="text-[#52525B] dark:text-[#A4AEC0] text-xs leading-relaxed">
              DEXYFIED offers a 7-day return policy. Customers have 7 days after receiving their order to request a return.
            </p>
          </section>

          {/* Eligibility Requirements */}
          <section className="p-6 border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#111A2D] space-y-4 shadow-2xs rounded-[2px] transition-colors">
            <h2 className="font-display font-bold text-lg text-[#09090B] dark:text-[#F4F7FC] uppercase tracking-wide">
              Eligibility Requirements
            </h2>
            <ul className="space-y-2 text-xs text-[#52525B] dark:text-[#A4AEC0]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0866FF] dark:text-[#3D82FF] flex-shrink-0 mt-0.5" />
                <span>The item must be unused and in the same condition as received.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0866FF] dark:text-[#3D82FF] flex-shrink-0 mt-0.5" />
                <span>Original packaging and all included accessories must be included.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0866FF] dark:text-[#3D82FF] flex-shrink-0 mt-0.5" />
                <span>Proof of purchase (order confirmation or invoice number) is required.</span>
              </li>
            </ul>
          </section>

          {/* How to Initiate a Return */}
          <section className="p-6 border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#111A2D] space-y-3 shadow-2xs rounded-[2px] transition-colors">
            <h2 className="font-display font-bold text-lg text-[#09090B] dark:text-[#F4F7FC] uppercase tracking-wide">
              How to Initiate a Return
            </h2>
            <p className="text-xs text-[#52525B] dark:text-[#A4AEC0]">
              Customers must contact our support team at <a href={`mailto:${BRAND.contact.email}`} className="text-[#0866FF] dark:text-[#3D82FF] font-mono hover:underline font-bold">{BRAND.contact.email}</a> before sending anything back. Our team will guide you through the return verification procedure.
            </p>
            <p className="text-xs text-[#52525B] dark:text-[#A4AEC0]">
              Damaged, defective, or incorrect items should be reported to us as soon as possible after delivery.
            </p>
          </section>

          {/* Non-Returnable Items */}
          <section className="p-6 border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#111A2D] space-y-3 shadow-2xs rounded-[2px] transition-colors">
            <h2 className="font-display font-bold text-lg text-[#09090B] dark:text-[#F4F7FC] uppercase tracking-wide flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-[#71717A] dark:text-[#718096]" />
              <span>Non-Returnable Items</span>
            </h2>
            <ul className="space-y-1.5 text-xs text-[#52525B] dark:text-[#A4AEC0] list-disc list-inside">
              <li>Used or customer-damaged items</li>
              <li>Items without original packaging</li>
              <li>Sale items</li>
            </ul>
          </section>

          {/* Exchanges & Refund Processing */}
          <section className="p-6 border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#111A2D] space-y-3 shadow-2xs rounded-[2px] transition-colors">
            <h2 className="font-display font-bold text-lg text-[#09090B] dark:text-[#F4F7FC] uppercase tracking-wide">
              Exchanges & Refund Processing
            </h2>
            <p className="text-xs text-[#52525B] dark:text-[#A4AEC0]">
              Exchanges are subject to inventory availability.
            </p>
            <p className="text-xs text-[#52525B] dark:text-[#A4AEC0]">
              Approved refunds will be processed through the original payment method, with a stated processing window of up to 10 business days depending on the payment provider.
            </p>
          </section>

          {/* Direct Contact Box */}
          <div className="p-5 border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#111A2D] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-tech text-xs shadow-2xs rounded-[2px] transition-colors">
            <div>
              <span className="text-[#71717A] dark:text-[#718096] uppercase font-medium">QUESTIONS REGARDING A RETURN?</span>
              <div className="text-[#09090B] dark:text-[#F4F7FC] font-bold mt-0.5">{BRAND.contact.email}</div>
            </div>
            <a
              href={`mailto:${BRAND.contact.email}`}
              className="px-4 py-2 bg-white dark:bg-[#162238] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#0866FF] hover:text-[#0866FF] dark:hover:text-[#3D82FF] text-[#09090B] dark:text-[#F4F7FC] uppercase transition-colors text-center font-bold rounded-[2px]"
            >
              CONTACT SUPPORT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

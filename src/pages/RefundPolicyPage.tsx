import React from 'react';
import { BRAND } from '../data/policies';
import { RotateCcw, CheckCircle2, AlertOctagon } from 'lucide-react';

export const RefundPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[#E4E4E7] pb-6 mb-10">
          <div className="flex items-center gap-2 font-tech text-xs text-[#0066FF] uppercase tracking-widest mb-1 font-bold">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>CUSTOMER ASSURANCE // RETURN POLICY</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase text-[#09090B]">
            7-Day Return Policy
          </h1>
          <p className="text-xs text-[#52525B] font-sans mt-2">
            Clear guidelines on returns, exchanges, and refund processing for DEXYFIED customers.
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 font-sans text-sm text-[#09090B] leading-relaxed">
          {/* Overview */}
          <section className="p-6 border border-[#E4E4E7] bg-white space-y-3 shadow-2xs">
            <h2 className="font-display font-bold text-lg text-[#09090B] uppercase tracking-wide">
              Overview
            </h2>
            <p className="text-[#52525B] text-xs leading-relaxed">
              DEXYFIED offers a 7-day return policy. Customers have 7 days after receiving their order to request a return.
            </p>
          </section>

          {/* Eligibility Requirements */}
          <section className="p-6 border border-[#E4E4E7] bg-white space-y-4 shadow-2xs">
            <h2 className="font-display font-bold text-lg text-[#09090B] uppercase tracking-wide">
              Eligibility Requirements
            </h2>
            <ul className="space-y-2 text-xs text-[#52525B]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                <span>The item must be unused and in the same condition as received.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                <span>Original packaging and all included accessories must be included.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
                <span>Proof of purchase (order confirmation or invoice number) is required.</span>
              </li>
            </ul>
          </section>

          {/* How to Initiate a Return */}
          <section className="p-6 border border-[#E4E4E7] bg-white space-y-3 shadow-2xs">
            <h2 className="font-display font-bold text-lg text-[#09090B] uppercase tracking-wide">
              How to Initiate a Return
            </h2>
            <p className="text-xs text-[#52525B]">
              Customers must contact our support team at <a href={`mailto:${BRAND.contact.email}`} className="text-[#0066FF] font-mono hover:underline font-bold">{BRAND.contact.email}</a> before sending anything back. Our team will guide you through the return verification procedure.
            </p>
            <p className="text-xs text-[#52525B]">
              Damaged, defective, or incorrect items should be reported to us as soon as possible after delivery.
            </p>
          </section>

          {/* Non-Returnable Items */}
          <section className="p-6 border border-[#E4E4E7] bg-white space-y-3 shadow-2xs">
            <h2 className="font-display font-bold text-lg text-[#09090B] uppercase tracking-wide flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-[#71717A]" />
              <span>Non-Returnable Items</span>
            </h2>
            <ul className="space-y-1.5 text-xs text-[#52525B] list-disc list-inside">
              <li>Used or customer-damaged items</li>
              <li>Items without original packaging</li>
              <li>Sale items</li>
            </ul>
          </section>

          {/* Exchanges & Refund Processing */}
          <section className="p-6 border border-[#E4E4E7] bg-white space-y-3 shadow-2xs">
            <h2 className="font-display font-bold text-lg text-[#09090B] uppercase tracking-wide">
              Exchanges & Refund Processing
            </h2>
            <p className="text-xs text-[#52525B]">
              Exchanges are subject to inventory availability.
            </p>
            <p className="text-xs text-[#52525B]">
              Approved refunds will be processed through the original payment method, with a stated processing window of up to 10 business days depending on the payment provider.
            </p>
          </section>

          {/* Direct Contact Box */}
          <div className="p-5 border border-[#E4E4E7] bg-[#F4F4F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-tech text-xs shadow-2xs">
            <div>
              <span className="text-[#71717A] uppercase font-medium">QUESTIONS REGARDING A RETURN?</span>
              <div className="text-[#09090B] font-bold mt-0.5">{BRAND.contact.email}</div>
            </div>
            <a
              href={`mailto:${BRAND.contact.email}`}
              className="px-4 py-2 bg-white border border-[#E4E4E7] hover:border-[#0066FF] hover:text-[#0066FF] text-[#09090B] uppercase transition-colors text-center font-bold"
            >
              CONTACT SUPPORT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

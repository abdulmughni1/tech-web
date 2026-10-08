import React from 'react';
import { BRAND } from '../data/policies';
import { Lock } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E4E4E7] pb-6 mb-10">
          <div className="flex items-center gap-2 font-tech text-xs text-[#0066FF] uppercase tracking-widest mb-1 font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>DATA INTEGRITY // PRIVACY</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase text-[#09090B]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#52525B] font-sans mt-2">
            How DEXYFIED handles and safeguards customer order details and personal information.
          </p>
        </div>

        <div className="space-y-6 font-sans text-xs text-[#52525B] leading-relaxed">
          <section className="p-6 border border-[#E4E4E7] bg-white space-y-2 shadow-2xs">
            <h2 className="font-display font-bold text-base text-[#09090B] uppercase">
              1. Information We Collect
            </h2>
            <p>
              When you place an order or contact us, we collect information necessary to fulfill your hardware delivery: recipient name, shipping address, contact phone number, and email address. We do not store sensitive payment card information on our servers; Cash on Delivery payments are transacted directly in person upon parcel handoff.
            </p>
          </section>

          <section className="p-6 border border-[#E4E4E7] bg-white space-y-2 shadow-2xs">
            <h2 className="font-display font-bold text-base text-[#09090B] uppercase">
              2. How Your Information Is Used
            </h2>
            <p>
              Your contact data is used solely for order confirmation, delivery coordination with courier riders, status updates, and customer support inquiries. We never sell, rent, or trade customer contact details to third-party advertising brokers.
            </p>
          </section>

          <section className="p-6 border border-[#E4E4E7] bg-white space-y-2 shadow-2xs">
            <h2 className="font-display font-bold text-base text-[#09090B] uppercase">
              3. Courier Sharing
            </h2>
            <p>
              To deliver your parcel across Pakistan, we share necessary delivery coordinates (name, address, and recipient phone number) with verified domestic logistics partners strictly for shipping fulfillment.
            </p>
          </section>

          <section className="p-6 border border-[#E4E4E7] bg-white space-y-2 shadow-2xs">
            <h2 className="font-display font-bold text-base text-[#09090B] uppercase">
              4. Data Inquiries & Corrections
            </h2>
            <p>
              If you wish to update or review the contact records associated with your orders, email us at <a href={`mailto:${BRAND.contact.email}`} className="text-[#0066FF] font-mono hover:underline font-bold">{BRAND.contact.email}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { DexyfiedLogo } from '../brand/DexyfiedLogo';
import { BRAND } from '../../data/policies';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../brand/SocialIcons';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#F4F4F5] border-t border-[#E4E4E7] text-[#09090B] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <DexyfiedLogo size="lg" showSubtitle={true} />
            <p className="text-[#52525B] text-xs leading-relaxed max-w-sm mt-3 font-sans">
              Practical consumer technology selected for everyday durability and utility. Honest specifications, direct pricing, and PKR 150 nationwide shipping across Pakistan.
            </p>
            <div className="pt-2">
              <span className="font-tech text-[11px] text-[#71717A] tracking-wider uppercase block">
                NATIONAL LOGISTICS STATUS:
              </span>
              <span className="font-tech text-xs text-[#09090B] uppercase flex items-center gap-2 mt-1 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                COURIER DISPATCH ACTIVE // NATIONWIDE (PKR {BRAND.shipping.fee})
              </span>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-tech text-xs tracking-wider text-[#09090B] uppercase font-bold">
              CATALOG
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#52525B]">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Smart Watches
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Audio & Cases
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Workspace Gear
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Policies */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-tech text-xs tracking-wider text-[#09090B] uppercase font-bold">
              POLICIES
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#52525B]">
              <li>
                <button
                  onClick={() => onNavigate('refund-policy')}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  7-Day Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shipping-policy')}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy-policy')}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#0066FF] transition-colors"
                >
                  About DEXYFIED
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Social */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-tech text-xs tracking-wider text-[#09090B] uppercase font-bold">
              DIRECT CONTACT
            </h4>
            <div className="space-y-2 text-xs font-sans text-[#52525B]">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0066FF]" />
                <a
                  href={`mailto:${BRAND.contact.email}`}
                  className="hover:text-[#09090B] transition-colors font-mono"
                >
                  {BRAND.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#0066FF]" />
                <a
                  href={`tel:${BRAND.contact.phone}`}
                  className="hover:text-[#09090B] transition-colors font-mono"
                >
                  {BRAND.contact.phoneFormatted}
                </a>
              </div>
            </div>

            <div className="pt-3">
              <span className="font-tech text-[10px] text-[#71717A] uppercase tracking-wider block mb-2">
                OFFICIAL CHANNELS
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={BRAND.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-[#E4E4E7] bg-white hover:border-[#0066FF] hover:text-[#0066FF] text-[#52525B] transition-colors flex items-center gap-1.5 text-xs font-tech shadow-2xs"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>INSTAGRAM</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={BRAND.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-[#E4E4E7] bg-white hover:border-[#0066FF] hover:text-[#0066FF] text-[#52525B] transition-colors flex items-center gap-1.5 text-xs font-tech shadow-2xs"
                >
                  <FacebookIcon className="w-3.5 h-3.5" />
                  <span>FACEBOOK</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#E4E4E7] flex flex-col md:flex-row items-center justify-between gap-4 font-tech text-[11px] text-[#71717A]">
          <div>
            © {new Date().getFullYear()} DEXYFIED. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 uppercase tracking-wider">
            <span>CONSUMER TECH STORE // PAKISTAN</span>
            <span>•</span>
            <span>SHIPPING: PKR {BRAND.shipping.fee} NATIONWIDE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { BRAND } from '../data/policies';
import { Mail, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../components/brand/SocialIcons';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090B] py-16 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[#E4E4E7] dark:border-[#27272A] pb-6 mb-12">
          <div className="flex items-center gap-2 font-tech text-xs text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-widest mb-1 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
            <span>CUSTOMER SUPPORT & DISPATCH INQUIRIES</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase text-[#09090B] dark:text-white">
            Contact DEXYFIED
          </h1>
          <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] font-sans mt-2">
            Reach our customer service desk for order assistance, return requests, or technical inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone & WhatsApp */}
            <div className="p-6 border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121214] space-y-2 shadow-2xs rounded-[2px] transition-colors">
              <div className="flex items-center gap-2 font-tech text-xs text-[#09090B] dark:text-white uppercase font-bold">
                <Phone className="w-3.5 h-3.5" />
                <span>DIRECT PHONE & WHATSAPP</span>
              </div>
              <div className="font-mono text-lg text-[#09090B] dark:text-white font-bold">
                {BRAND.contact.phoneFormatted}
              </div>
              <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                Direct phone inquiries and instant WhatsApp ordering available nationwide.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/923194389617`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-tech text-xs text-[#16A34A] dark:text-[#4ADE80] hover:underline uppercase font-bold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>START WHATSAPP CHAT</span>
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="p-6 border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121214] space-y-2 shadow-2xs rounded-[2px] transition-colors">
              <div className="flex items-center gap-2 font-tech text-xs text-[#09090B] dark:text-white uppercase font-bold">
                <Mail className="w-3.5 h-3.5" />
                <span>OFFICIAL INBOX</span>
              </div>
              <div className="font-mono text-base text-[#09090B] dark:text-white font-bold">
                {BRAND.contact.email}
              </div>
              <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] leading-relaxed">
                Send return notifications, receipt verifications, or commercial inquiries.
              </p>
            </div>

            {/* Social Media */}
            <div className="p-6 border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121214] space-y-3 shadow-2xs rounded-[2px] transition-colors">
              <span className="font-tech text-xs text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider block font-bold">
                OFFICIAL SOCIAL PAGES
              </span>
              <div className="flex flex-col gap-2 font-tech text-xs">
                <a
                  href={BRAND.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#09090B] dark:hover:border-white bg-white dark:bg-[#18181B] text-[#09090B] dark:text-white transition-colors rounded-[2px]"
                >
                  <span className="flex items-center gap-2">
                    <InstagramIcon className="w-4 h-4" />
                    <span>INSTAGRAM / @dexyfied_store</span>
                  </span>
                  <span className="text-[#71717A] dark:text-[#A1A1AA]">→</span>
                </a>

                <a
                  href={BRAND.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#09090B] dark:hover:border-white bg-white dark:bg-[#18181B] text-[#09090B] dark:text-white transition-colors rounded-[2px]"
                >
                  <span className="flex items-center gap-2">
                    <FacebookIcon className="w-4 h-4" />
                    <span>FACEBOOK PAGE</span>
                  </span>
                  <span className="text-[#71717A] dark:text-[#A1A1AA]">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121214] shadow-2xs rounded-[2px] transition-colors">
              <h2 className="font-display font-bold text-lg text-[#09090B] dark:text-white uppercase tracking-wide mb-1">
                Send A Direct Message
              </h2>
              <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] mb-6">
                Fill in your details and our team will get in touch with you promptly.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#16A34A] dark:text-[#4ADE80] mx-auto" />
                  <h3 className="font-display font-bold text-lg text-[#09090B] dark:text-white uppercase">
                    Message Transmitted
                  </h3>
                  <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] max-w-sm mx-auto">
                    Thank you. We have received your inquiry and will contact you at your provided email or phone.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-tech text-[11px] text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider mb-1 font-medium">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Tariq Ahmed"
                        className="w-full bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] focus:border-[#09090B] dark:focus:border-white text-[#09090B] dark:text-white placeholder:text-[#A1A1AA] text-sm px-3.5 py-2.5 outline-none transition-colors rounded-[2px]"
                      />
                    </div>

                    <div>
                      <label className="block font-tech text-[11px] text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider mb-1 font-medium">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="0300 1234567"
                        className="w-full bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] focus:border-[#09090B] dark:focus:border-white text-[#09090B] dark:text-white placeholder:text-[#A1A1AA] text-sm px-3.5 py-2.5 outline-none transition-colors font-mono rounded-[2px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-tech text-[11px] text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider mb-1 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] focus:border-[#09090B] dark:focus:border-white text-[#09090B] dark:text-white placeholder:text-[#A1A1AA] text-sm px-3.5 py-2.5 outline-none transition-colors font-mono rounded-[2px]"
                    />
                  </div>

                  <div>
                    <label className="block font-tech text-[11px] text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider mb-1 font-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      placeholder="Order Inquiry / Product Question / Return Request"
                      className="w-full bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] focus:border-[#09090B] dark:focus:border-white text-[#09090B] dark:text-white placeholder:text-[#A1A1AA] text-sm px-3.5 py-2.5 outline-none transition-colors rounded-[2px]"
                    />
                  </div>

                  <div>
                    <label className="block font-tech text-[11px] text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider mb-1 font-medium">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your inquiry in detail..."
                      className="w-full bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] focus:border-[#09090B] dark:focus:border-white text-[#09090B] dark:text-white placeholder:text-[#A1A1AA] text-sm px-3.5 py-2.5 outline-none transition-colors rounded-[2px]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-display font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer rounded-[2px]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>TRANSMIT INQUIRY</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

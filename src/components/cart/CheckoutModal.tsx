import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import {
  X,
  Copy,
  Check,
  MessageSquare,
  Building2,
  Smartphone,
  Truck,
  CreditCard,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { BRAND, CITIES_PAKISTAN } from '../../data/policies';
import { PAYMENT_METHODS, WHATSAPP_CONFIG } from '../../data/paymentMethods';
import { OrderFormState } from '../../types/product';

export const CheckoutModal: React.FC = () => {
  const {
    items,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    shipping,
    total,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState<OrderFormState>({
    fullName: '',
    phone: '',
    email: '',
    city: 'Karachi',
    address: '',
    notes: '',
    paymentMethod: 'cod',
  });

  const [prepaidSubMethod, setPrepaidSubMethod] = useState<'meezan' | 'jazzcash' | 'easypaisa'>('meezan');
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; address?: string }>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [submittedPaymentMethod, setSubmittedPaymentMethod] = useState<string>('cod');
  const [completedOrderTotal, setCompletedOrderTotal] = useState<number>(0);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCopy = (text: string, key: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      }).catch(() => fallbackCopy(text, key));
    } else {
      fallbackCopy(text, key);
    }
  };

  const fallbackCopy = (text: string, key: string) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // Fallback ignore
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { fullName?: string; phone?: string; address?: string } = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required for courier delivery.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      newErrors.phone = 'Please provide an active mobile/WhatsApp contact number.';
    }
    if (!formData.address.trim() || formData.address.trim().length < 8) {
      newErrors.address = 'Please provide complete delivery street address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildItemsSummaryText = () => {
    return items
      .map(i => {
        const colorLabel = (i.productId === 'prod-01' || i.variantName === 'Silver' || i.variantName === 'Black')
          ? ` [Color: ${i.variantName}]`
          : '';
        const sizeLabel = i.ringSize ? ` [Ring Size: ${i.ringSize}]` : '';
        return `• ${i.productName}${colorLabel}${sizeLabel} x${i.quantity} — PKR ${(i.unitPrice * i.quantity).toLocaleString()}`;
      })
      .join('\n');
  };

  // 1. CASH ON DELIVERY VIA WHATSAPP (WhatsApp-only confirmation flow)
  const handleConfirmCODOnWhatsApp = () => {
    if (!validateForm()) return;

    const ref = `DX-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);
    setSubmittedPaymentMethod('cod');
    setCompletedOrderTotal(total);

    const itemsText = buildItemsSummaryText();

    const msg = `*DEXYFIED — CASH ON DELIVERY (COD) ORDER*
---------------------------------------
Order Reference: *${ref}*
Payment Method: *Cash on Delivery (Pay to Courier Rider upon Arrival)*

*Customer Delivery Details:*
• Name: ${formData.fullName.trim()}
• Phone / WhatsApp: ${formData.phone.trim()}
• Destination City: ${formData.city}
• Complete Delivery Address: ${formData.address.trim()}
${formData.notes ? `• Order Notes: ${formData.notes.trim()}\n` : ''}
*Ordered Hardware:*
${itemsText}

---------------------------------------
Subtotal: PKR ${subtotal.toLocaleString()}
Nationwide Delivery Fee: PKR ${shipping.toLocaleString()}
*TOTAL AMOUNT DUE ON ARRIVAL: PKR ${total.toLocaleString()}*
---------------------------------------

*Order Confirmation Note:*
This is a Cash on Delivery order. I am awaiting DEXYFIED seller verification on WhatsApp before shipment dispatch.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encoded}`, '_blank');

    setOrderComplete(true);
    clearCart();
  };

  // 2. PREPAID MANUAL TRANSFER (Meezan Bank / JazzCash / Easypaisa)
  const handlePrepaidPaymentConfirm = () => {
    if (!validateForm()) return;

    const ref = `DX-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);
    setSubmittedPaymentMethod(prepaidSubMethod);
    setCompletedOrderTotal(total);

    const methodName =
      prepaidSubMethod === 'meezan'
        ? 'Meezan Bank Ltd (1Link Transfer)'
        : prepaidSubMethod === 'jazzcash'
        ? 'JazzCash Mobile Account'
        : 'Easypaisa Mobile Account';

    const itemsText = buildItemsSummaryText();

    const msg = `*DEXYFIED — PREPAID MANUAL PAYMENT CLAIM*
---------------------------------------
Order Reference: *${ref}*
Payment Method: *${methodName}*

*Customer Details:*
• Name: ${formData.fullName.trim()}
• Phone: ${formData.phone.trim()}
• Destination City: ${formData.city}
• Complete Address: ${formData.address.trim()}
${formData.notes ? `• Order Notes: ${formData.notes.trim()}\n` : ''}
*Ordered Hardware:*
${itemsText}

---------------------------------------
Subtotal: PKR ${subtotal.toLocaleString()}
Shipping (Nationwide): PKR ${shipping.toLocaleString()}
*TOTAL AMOUNT TRANSFERRED: PKR ${total.toLocaleString()}*
---------------------------------------

*Payment Status:*
Awaiting seller confirmation. I will attach my payment transfer screenshot in this chat.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encoded}`, '_blank');

    setOrderComplete(true);
    clearCart();
  };

  const handleGeneralWhatsAppHelp = () => {
    const itemsPreview = items.length > 0
      ? ` regarding my cart (${items.map(i => i.productName).join(', ')})`
      : '';
    const msg = `Hello DEXYFIED, I need help placing an order${itemsPreview}. Could you please guide me?`;
    window.open(`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#121214] border border-[#E4E4E7] dark:border-[#27272A] p-4 sm:p-6 md:p-8 shadow-2xl max-h-[94vh] overflow-y-auto my-auto rounded-[2px] transition-colors duration-200">
        {/* Modal Close Button */}
        <button
          onClick={() => {
            setIsCheckoutOpen(false);
            setOrderComplete(false);
            setCompletedOrderTotal(0);
          }}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 p-1.5 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#09090B] dark:hover:border-zinc-300 rounded-[2px] cursor-pointer transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-4 h-4" />
        </button>

        {orderComplete ? (
          /* Order Status Presentation (Honest, accurate state) */
          <div className="py-6 sm:py-8 text-center max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-[#FAFAFA] dark:bg-[#18181B] border border-[#09090B] dark:border-white text-[#09090B] dark:text-white flex items-center justify-center mx-auto rounded-[2px]">
              <Clock className="w-8 h-8" />
            </div>

            <div className="font-tech text-xs text-[#09090B] dark:text-white tracking-widest uppercase font-bold">
              {submittedPaymentMethod === 'cod'
                ? 'COD ORDER INITIATED VIA WHATSAPP // AWAITING DISPATCH'
                : 'PREPAID ORDER INITIATED // AWAITING SELLER CONFIRMATION'}
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#09090B] dark:text-white uppercase tracking-wide">
              Thank You, {formData.fullName}
            </h3>

            {/* Accurate Order Details Summary */}
            <div className="border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#18181B] p-4 sm:p-5 text-left font-tech text-xs space-y-2.5 rounded-[2px]">
              <div className="flex justify-between text-[#52525B] dark:text-[#A1A1AA]">
                <span>ORDER REFERENCE:</span>
                <span className="text-[#09090B] dark:text-white font-bold">{orderRef}</span>
              </div>
              <div className="flex justify-between text-[#52525B] dark:text-[#A1A1AA]">
                <span>ORDER STATUS:</span>
                <span className="text-[#D97706] dark:text-[#FBBF24] font-bold uppercase">
                  {submittedPaymentMethod === 'cod'
                    ? 'Pending WhatsApp Order Review & Courier Dispatch'
                    : 'Awaiting Bank/Wallet Payment Verification via WhatsApp'}
                </span>
              </div>
              <div className="flex justify-between text-[#52525B] dark:text-[#A1A1AA]">
                <span>PAYMENT METHOD:</span>
                <span className="text-[#09090B] dark:text-white uppercase font-semibold">
                  {submittedPaymentMethod === 'cod'
                    ? 'Cash on Delivery (Pay Rider Upon Arrival)'
                    : submittedPaymentMethod === 'meezan'
                    ? 'Meezan Bank Manual Transfer'
                    : submittedPaymentMethod === 'jazzcash'
                    ? 'JazzCash Manual Transfer'
                    : 'Easypaisa Manual Transfer'}
                </span>
              </div>
              <div className="flex justify-between text-[#52525B] dark:text-[#A1A1AA]">
                <span>DESTINATION:</span>
                <span className="text-[#09090B] dark:text-white">
                  {formData.city}, Pakistan
                </span>
              </div>
              <div className="flex justify-between text-[#52525B] dark:text-[#A1A1AA] pt-2 border-t border-[#E4E4E7] dark:border-[#27272A]">
                <span>ORDER TOTAL PAYABLE:</span>
                <span className="text-[#09090B] dark:text-white font-bold text-sm">
                  PKR {completedOrderTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Truthful Status Explanation */}
            <div className="p-3.5 border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] text-left text-xs font-sans text-[#52525B] dark:text-[#A1A1AA] rounded-[2px] space-y-1.5">
              <p className="leading-relaxed">
                <strong className="text-[#09090B] dark:text-white">Verification Note:</strong>{' '}
                {submittedPaymentMethod === 'cod' ? (
                  <>Your Cash on Delivery order message was formatted for WhatsApp. Please make sure you tap <strong>Send</strong> in WhatsApp. Our operations team will confirm your contact at <span className="font-mono text-[#09090B] dark:text-white">{formData.phone}</span> before handing the package to our courier. You will pay the courier rider upon delivery.</>
                ) : (
                  <>A payment screenshot is a claim of payment. Your order will be officially confirmed and scheduled for courier dispatch once our accounts team verifies receipt of funds in our account.</>
                )}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setOrderComplete(false);
                  setCompletedOrderTotal(0);
                }}
                className="font-tech text-xs uppercase px-6 py-3 bg-[#09090B] hover:bg-[#27272A] dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-[#09090B] font-bold transition-colors cursor-pointer rounded-[2px]"
              >
                RETURN TO CATALOG
              </button>

              <button
                onClick={handleGeneralWhatsAppHelp}
                className="font-tech text-xs uppercase px-6 py-3 border border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] text-[#09090B] dark:text-white hover:border-[#25D366] hover:text-[#25D366] transition-colors cursor-pointer rounded-[2px] flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>NEED HELP? CHAT ON WHATSAPP</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF]"></span>
              <span className="font-tech text-xs text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-widest font-bold">
                DIRECT CHECKOUT // PAKISTAN STOREFRONT
              </span>
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-wider text-[#09090B] dark:text-white">
              Order Checkout & Confirmation
            </h2>

            {/* Clear Order Reassurance */}
            <div className="mt-3 p-2.5 bg-[#F4F4F5] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] rounded-[2px] flex items-center justify-between text-xs font-tech">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
                <span className="text-[#09090B] dark:text-white font-bold uppercase">
                  DIRECT NATIONWIDE COURIER DISPATCH
                </span>
              </div>
              <span className="text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase font-medium">
                FLAT PKR {BRAND.shipping.fee} DELIVERY
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-5">
              {/* Left Column: Form & Payment (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Step 1: Delivery Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#E4E4E7] dark:border-[#27272A]">
                    <span className="font-tech text-xs px-2 py-0.5 bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] rounded-[1px] font-bold">
                      01
                    </span>
                    <h3 className="font-tech text-xs uppercase tracking-wider text-[#09090B] dark:text-white font-bold">
                      DELIVERY & CONTACT DETAILS
                    </h3>
                  </div>

                  <div>
                    <label className="block font-tech text-[11px] text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Recipient Full Name"
                      className="w-full bg-[#FAFAFA] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] focus:border-[#09090B] dark:focus:border-white text-[#09090B] dark:text-white placeholder:text-[#A1A1AA] text-sm px-3.5 py-2.5 outline-none rounded-[2px] transition-colors"
                    />
                    {errors.fullName && (
                      <p className="font-tech text-xs text-[#DC2626] dark:text-[#F87171] mt-1">
                        • {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-tech text-[11px] text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider mb-1 font-medium">
                        Active Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="0300 1234567"
                        className="w-full bg-[#FAFAFA] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] focus:border-[#09090B] dark:focus:border-white text-[#09090B] dark:text-white placeholder:text-[#A1A1AA] text-sm px-3.5 py-2.5 outline-none rounded-[2px] transition-colors font-mono"
                      />
                      {errors.phone && (
                        <p className="font-tech text-xs text-[#DC2626] dark:text-[#F87171] mt-1">
                          • {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-tech text-[11px] text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider mb-1 font-medium">
                        Destination City *
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-[#FAFAFA] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] focus:border-[#09090B] dark:focus:border-white text-[#09090B] dark:text-white text-sm px-3.5 py-2.5 outline-none rounded-[2px] transition-colors"
                      >
                        {CITIES_PAKISTAN.map(c => (
                          <option key={c} value={c} className="bg-white dark:bg-[#121214] text-[#09090B] dark:text-white">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-tech text-[11px] text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider mb-1 font-medium">
                      Complete Street Address & House/Flat # *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House / Flat No, Street, Sector / Area"
                      className="w-full bg-[#FAFAFA] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] focus:border-[#09090B] dark:focus:border-white text-[#09090B] dark:text-white placeholder:text-[#A1A1AA] text-sm px-3.5 py-2.5 outline-none rounded-[2px] transition-colors"
                    />
                    {errors.address && (
                      <p className="font-tech text-xs text-[#DC2626] dark:text-[#F87171] mt-1">
                        • {errors.address}
                      </p>
                    )}
                  </div>
                </div>

                {/* Step 2: Payment Method Selection */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#E4E4E7] dark:border-[#27272A]">
                    <span className="font-tech text-xs px-2 py-0.5 bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] rounded-[1px] font-bold">
                      02
                    </span>
                    <h3 className="font-tech text-xs uppercase tracking-wider text-[#09090B] dark:text-white font-bold">
                      CHOOSE PAYMENT METHOD
                    </h3>
                  </div>

                  {/* Primary Payment Mode Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* COD Option */}
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                      className={`p-3.5 border text-left flex flex-col justify-between transition-all rounded-[2px] cursor-pointer ${
                        formData.paymentMethod === 'cod'
                          ? 'border-[#25D366] bg-[#F0FDF4] dark:bg-[#062414] ring-1 ring-[#25D366]'
                          : 'border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#18181B] hover:border-zinc-400'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <div className="flex items-center gap-2">
                          <Truck className="w-5 h-5 text-[#25D366]" />
                          <span className="font-display font-bold text-sm uppercase text-[#09090B] dark:text-white">
                            Cash on Delivery
                          </span>
                        </div>
                        <span className="font-tech text-[9px] px-1.5 py-0.5 bg-[#25D366]/20 text-[#16A34A] dark:text-[#4ADE80] font-bold rounded-[1px]">
                          WHATSAPP ONLY
                        </span>
                      </div>
                      <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] mt-1">
                        Confirm order on WhatsApp. Pay rider in cash upon arrival. No advance payment required.
                      </p>
                    </button>

                    {/* Prepaid Option */}
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'meezan' }))}
                      className={`p-3.5 border text-left flex flex-col justify-between transition-all rounded-[2px] cursor-pointer ${
                        formData.paymentMethod !== 'cod'
                          ? 'border-[#09090B] dark:border-white bg-[#F4F4F5] dark:bg-[#1C1C1F] ring-1 ring-[#09090B] dark:ring-white'
                          : 'border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#18181B] hover:border-zinc-400'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-[#09090B] dark:text-white" />
                          <span className="font-display font-bold text-sm uppercase text-[#09090B] dark:text-white">
                            Prepaid Transfer
                          </span>
                        </div>
                        <span className="font-tech text-[9px] px-1.5 py-0.5 bg-[#09090B]/10 dark:bg-white/10 text-[#09090B] dark:text-white font-bold rounded-[1px]">
                          BANK / WALLET
                        </span>
                      </div>
                      <p className="text-xs text-[#52525B] dark:text-[#A1A1AA] mt-1">
                        Transfer via Meezan Bank, JazzCash, or Easypaisa, then share proof on WhatsApp.
                      </p>
                    </button>
                  </div>

                  {/* COD SPECIFIC FLOW (WhatsApp-Only) */}
                  {formData.paymentMethod === 'cod' && (
                    <div className="p-4 border border-[#25D366]/40 bg-[#F0FDF4]/70 dark:bg-[#062414]/60 rounded-[2px] space-y-3">
                      <div className="flex items-center gap-2 text-xs font-tech text-[#16A34A] dark:text-[#4ADE80] font-bold uppercase">
                        <MessageSquare className="w-4 h-4 text-[#25D366]" />
                        <span>CASH ON DELIVERY ORDER PROCESS</span>
                      </div>

                      <div className="space-y-1.5 text-xs text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
                        <p>
                          • Cash on Delivery orders are verified and scheduled directly through our official WhatsApp support (<strong className="font-mono text-[#09090B] dark:text-[#F4F7FC]">{WHATSAPP_CONFIG.displayPhone}</strong>).
                        </p>
                        <p>
                          • <strong>No payment screenshot or advance transfer is required</strong> for COD orders.
                        </p>
                        <p>
                          • You will pay <strong className="text-[#09090B] dark:text-[#F4F7FC]">PKR {total.toLocaleString()}</strong> in cash directly to the courier rider upon parcel arrival at your doorstep.
                        </p>
                        <p className="text-[11px] text-[#71717A] dark:text-[#94A3B8] italic pt-1">
                          * The COD order is not finalized until our team confirms your address and contact on WhatsApp.
                        </p>
                      </div>

                      {/* Prominent WhatsApp COD Confirmation Button */}
                      <button
                        type="button"
                        onClick={handleConfirmCODOnWhatsApp}
                        disabled={items.length === 0}
                        className="w-full py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-[2px] shadow-md flex items-center justify-center gap-2 mt-2"
                      >
                        <MessageSquare className="w-4 h-4 fill-white" />
                        <span>CONFIRM COD ORDER ON WHATSAPP (PKR {total.toLocaleString()})</span>
                      </button>
                    </div>
                  )}

                  {/* PREPAID SPECIFIC FLOW (Meezan Bank, JazzCash, Easypaisa) */}
                  {formData.paymentMethod !== 'cod' && (
                    <div className="space-y-4">
                      {/* Sub-method tabs */}
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setPrepaidSubMethod('meezan')}
                          className={`py-2 px-3 border font-tech text-xs uppercase tracking-wider rounded-[2px] cursor-pointer ${
                            prepaidSubMethod === 'meezan'
                              ? 'border-[#09090B] dark:border-white bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] font-bold'
                              : 'border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] text-[#52525B] dark:text-[#A1A1AA]'
                          }`}
                        >
                          Meezan Bank
                        </button>
                        <button
                          type="button"
                          onClick={() => setPrepaidSubMethod('jazzcash')}
                          className={`py-2 px-3 border font-tech text-xs uppercase tracking-wider rounded-[2px] cursor-pointer ${
                            prepaidSubMethod === 'jazzcash'
                              ? 'border-[#09090B] dark:border-white bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] font-bold'
                              : 'border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] text-[#52525B] dark:text-[#A1A1AA]'
                          }`}
                        >
                          JazzCash
                        </button>
                        <button
                          type="button"
                          onClick={() => setPrepaidSubMethod('easypaisa')}
                          className={`py-2 px-3 border font-tech text-xs uppercase tracking-wider rounded-[2px] cursor-pointer ${
                            prepaidSubMethod === 'easypaisa'
                              ? 'border-[#09090B] dark:border-white bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] font-bold'
                              : 'border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#121214] text-[#52525B] dark:text-[#A1A1AA]'
                          }`}
                        >
                          Easypaisa
                        </button>
                      </div>

                      {/* Meezan Bank Details */}
                      {prepaidSubMethod === 'meezan' && (
                        <div className="p-4 border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#18181B] rounded-[2px] space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-[#E4E4E7] dark:border-[#27272A]">
                            <span className="font-tech text-xs text-[#09090B] dark:text-white font-bold uppercase">
                              MEEZAN BANK LTD INSTRUCTIONS
                            </span>
                            <span className="font-tech text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase">
                              1LINK / IBAN
                            </span>
                          </div>

                          <div className="space-y-2 text-xs font-sans">
                            <div className="p-2.5 bg-white dark:bg-[#121214] border border-[#E4E4E7] dark:border-[#27272A] rounded-[2px]">
                              <span className="block font-tech text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase font-bold">
                                RECIPIENT ACCOUNT TITLE:
                              </span>
                              <div className="text-sm font-bold text-[#09090B] dark:text-white">
                                {PAYMENT_METHODS.meezan.accountTitle}
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-2.5 bg-white dark:bg-[#121214] border border-[#E4E4E7] dark:border-[#27272A] rounded-[2px]">
                              <div>
                                <span className="block font-tech text-[10px] text-[#52525B] dark:text-[#A1A1AA] uppercase">
                                  Account Number:
                                </span>
                                <span className="font-mono text-sm font-bold text-[#09090B] dark:text-white">
                                  {PAYMENT_METHODS.meezan.accountNumber}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCopy(PAYMENT_METHODS.meezan.accountNumber, 'meezan-acc')}
                                className="flex items-center gap-1 px-2.5 py-1 text-xs font-tech uppercase border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#09090B] dark:hover:border-white text-[#09090B] dark:text-white bg-[#FAFAFA] dark:bg-[#18181B] rounded-[2px] cursor-pointer"
                              >
                                {copiedKey === 'meezan-acc' ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                                    <span>COPIED</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>COPY</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <div className="flex items-center justify-between p-2.5 bg-white dark:bg-[#121214] border border-[#E4E4E7] dark:border-[#27272A] rounded-[2px]">
                              <div>
                                <span className="block font-tech text-[10px] text-[#52525B] dark:text-[#A1A1AA] uppercase">
                                  IBAN (Inter-Bank):
                                </span>
                                <span className="font-mono text-xs sm:text-sm font-bold text-[#09090B] dark:text-white break-all">
                                  {PAYMENT_METHODS.meezan.iban}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCopy(PAYMENT_METHODS.meezan.iban, 'meezan-iban')}
                                className="flex items-center gap-1 px-2.5 py-1 text-xs font-tech uppercase border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#09090B] dark:hover:border-white text-[#09090B] dark:text-white bg-[#FAFAFA] dark:bg-[#18181B] rounded-[2px] cursor-pointer flex-shrink-0 ml-2"
                              >
                                {copiedKey === 'meezan-iban' ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                                    <span>COPIED</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>COPY</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* JazzCash Details */}
                      {prepaidSubMethod === 'jazzcash' && (
                        <div className="p-4 border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#18181B] rounded-[2px] space-y-3">
                          <div className="space-y-2 text-xs font-sans">
                            <div className="p-2.5 bg-white dark:bg-[#121214] border border-[#E4E4E7] dark:border-[#27272A] rounded-[2px]">
                              <span className="block font-tech text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase font-bold">
                                RECIPIENT ACCOUNT TITLE:
                              </span>
                              <div className="text-sm font-bold text-[#09090B] dark:text-white">
                                {PAYMENT_METHODS.jazzcash.accountTitle}
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-2.5 bg-white dark:bg-[#121214] border border-[#E4E4E7] dark:border-[#27272A] rounded-[2px]">
                              <div>
                                <span className="block font-tech text-[10px] text-[#52525B] dark:text-[#A1A1AA] uppercase">
                                  JazzCash Account Number:
                                </span>
                                <span className="font-mono text-sm font-bold text-[#09090B] dark:text-white">
                                  {PAYMENT_METHODS.jazzcash.accountNumber}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCopy(PAYMENT_METHODS.jazzcash.accountNumber, 'jazzcash-num')}
                                className="flex items-center gap-1 px-2.5 py-1 text-xs font-tech uppercase border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#09090B] dark:hover:border-white text-[#09090B] dark:text-white bg-[#FAFAFA] dark:bg-[#18181B] rounded-[2px] cursor-pointer"
                              >
                                {copiedKey === 'jazzcash-num' ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                                    <span>COPIED</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>COPY</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Easypaisa Details */}
                      {prepaidSubMethod === 'easypaisa' && (
                        <div className="p-4 border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#18181B] rounded-[2px] space-y-3">
                          <div className="space-y-2 text-xs font-sans">
                            <div className="p-2.5 bg-white dark:bg-[#121214] border border-[#E4E4E7] dark:border-[#27272A] rounded-[2px]">
                              <span className="block font-tech text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase font-bold">
                                RECIPIENT ACCOUNT TITLE:
                              </span>
                              <div className="text-sm font-bold text-[#09090B] dark:text-white">
                                {PAYMENT_METHODS.easypaisa.accountTitle}
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-2.5 bg-white dark:bg-[#121214] border border-[#E4E4E7] dark:border-[#27272A] rounded-[2px]">
                              <div>
                                <span className="block font-tech text-[10px] text-[#52525B] dark:text-[#A1A1AA] uppercase">
                                  Easypaisa Account Number:
                                </span>
                                <span className="font-mono text-sm font-bold text-[#09090B] dark:text-white">
                                  {PAYMENT_METHODS.easypaisa.accountNumber}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCopy(PAYMENT_METHODS.easypaisa.accountNumber, 'easypaisa-num')}
                                className="flex items-center gap-1 px-2.5 py-1 text-xs font-tech uppercase border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#09090B] dark:hover:border-white text-[#09090B] dark:text-white bg-[#FAFAFA] dark:bg-[#18181B] rounded-[2px] cursor-pointer"
                              >
                                {copiedKey === 'easypaisa-num' ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                                    <span>COPIED</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>COPY</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Prepaid WhatsApp Confirmation Action */}
                      <button
                        type="button"
                        onClick={handlePrepaidPaymentConfirm}
                        disabled={items.length === 0}
                        className="w-full py-4 bg-[#0066FF] hover:bg-[#0052CC] text-white font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-[2px] shadow-md flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4 fill-white" />
                        <span>I'VE TRANSFERRED FUNDS — CONFIRM ORDER (WHATSAPP)</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Order Review & Direct Assistance (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#E4E4E7] dark:border-[#27272A] lg:pl-6 pt-4 lg:pt-0 space-y-6">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E4E4E7] dark:border-[#27272A]">
                    <div className="font-tech text-xs text-[#52525B] dark:text-[#A1A1AA] uppercase tracking-wider font-bold">
                      ORDER ITEMS [{items.reduce((acc, i) => acc + i.quantity, 0)}]
                    </div>
                    <span className="font-tech text-[10px] text-[#71717A] dark:text-[#A1A1AA]">
                      STEP 1 REVIEW
                    </span>
                  </div>

                  {/* Items List with Laptop Stand Color and Ring Sizes Displayed */}
                  <div className="max-h-56 overflow-y-auto divide-y divide-[#E4E4E7] dark:divide-[#27272A] pr-1 mb-4">
                    {items.map(item => (
                      <div
                        key={`${item.productId}-${item.variantId}-${item.ringSize || ''}`}
                        className="py-2.5 flex justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-semibold text-[#09090B] dark:text-white line-clamp-1">
                            {item.productName}
                          </div>
                          {(item.productId === 'prod-01' || item.variantName === 'Silver' || item.variantName === 'Black') && (
                            <div className="font-tech text-[11px] text-[#09090B] dark:text-white font-bold uppercase mt-0.5">
                              COLOR: {item.variantName}
                            </div>
                          )}
                          {item.ringSize && (
                            <div className="font-tech text-[11px] text-[#09090B] dark:text-white font-bold uppercase mt-0.5">
                              RING SIZE: {item.ringSize}
                            </div>
                          )}
                          <div className="font-tech text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase mt-0.5">
                            QTY: {item.quantity} × PKR {item.unitPrice.toLocaleString()}
                          </div>
                        </div>
                        <div className="font-tech text-[#09090B] dark:text-white font-bold text-right flex-shrink-0">
                          PKR {(item.unitPrice * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-2 pt-3 border-t border-[#E4E4E7] dark:border-[#27272A] text-xs font-tech">
                    <div className="flex justify-between text-[#52525B] dark:text-[#A1A1AA]">
                      <span>SUBTOTAL</span>
                      <span className="text-[#09090B] dark:text-white font-bold">
                        PKR {subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#52525B] dark:text-[#A1A1AA]">
                      <span>NATIONWIDE SHIPPING (PAKISTAN)</span>
                      <span className="text-[#09090B] dark:text-white font-bold">
                        PKR {shipping.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#09090B] dark:text-white font-bold pt-2.5 border-t border-[#E4E4E7] dark:border-[#27272A] text-sm">
                      <span>FINAL DUE TOTAL</span>
                      <span className="text-base text-[#09090B] dark:text-white">
                        PKR {total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Assistance */}
                <div className="pt-4 border-t border-[#E4E4E7] dark:border-[#27272A] space-y-2">
                  <div className="font-tech text-[10px] text-[#71717A] dark:text-[#A1A1AA] uppercase font-bold">
                    ORDER ASSISTANCE & QUESTIONS:
                  </div>
                  <button
                    type="button"
                    onClick={handleGeneralWhatsAppHelp}
                    className="w-full py-2.5 px-3 border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#25D366] text-[#09090B] dark:text-white hover:text-[#25D366] font-tech text-xs uppercase flex items-center justify-center gap-2 bg-[#FAFAFA] dark:bg-[#18181B] transition-colors cursor-pointer font-semibold rounded-[2px]"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>NEED HELP? CHAT WITH US ON WHATSAPP</span>
                  </button>
                  <p className="font-tech text-[10px] text-[#71717A] dark:text-[#A1A1AA] text-center">
                    OFFICIAL SUPPORT: {WHATSAPP_CONFIG.displayPhone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

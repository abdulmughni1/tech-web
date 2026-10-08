import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, CheckCircle, Truck, Phone, MessageSquare, ArrowRight, ShieldAlert } from 'lucide-react';
import { BRAND, CITIES_PAKISTAN } from '../../data/policies';
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  if (!isCheckoutOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please fill in your name, contact phone number, and delivery address.');
      return;
    }

    setIsSubmitting(true);

    const generatedRef = `DX-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(generatedRef);

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      clearCart();
    }, 600);
  };

  const handleWhatsAppOrder = () => {
    const itemList = items
      .map(i => `• ${i.productName} (${i.variantName}) x${i.quantity} - PKR ${(i.unitPrice * i.quantity).toLocaleString()}`)
      .join('\n');

    const msg = `Hello DEXYFIED, I would like to place an order:

${itemList}

Subtotal: PKR ${subtotal.toLocaleString()}
Shipping: PKR ${shipping.toLocaleString()}
*Total Amount: PKR ${total.toLocaleString()}*

Name: ${formData.fullName || '[Enter Name]'}
City: ${formData.city}
Address: ${formData.address || '[Enter Address]'}
Phone: ${formData.phone || '[Enter Phone]'}`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/923194389617?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white border border-[#E4E4E7] p-4 sm:p-6 md:p-8 shadow-2xl max-h-[92vh] overflow-y-auto my-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            setIsCheckoutOpen(false);
            setOrderComplete(false);
          }}
          className="absolute top-5 right-5 p-1 text-[#52525B] hover:text-[#09090B] border border-[#E4E4E7] hover:border-[#09090B]"
        >
          <X className="w-4 h-4" />
        </button>

        {orderComplete ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#F4F4F5] border border-[#0066FF] text-[#0066FF] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="font-tech text-xs text-[#0066FF] tracking-widest uppercase mb-1 font-bold">
              ORDER CONFIRMED // LOGGED
            </div>

            <h3 className="font-display font-bold text-2xl text-[#09090B] uppercase tracking-wide">
              Thank You, {formData.fullName}
            </h3>

            <div className="mt-4 p-4 border border-[#E4E4E7] bg-[#F8F9FA] max-w-md mx-auto text-left shadow-2xs">
              <div className="flex justify-between font-tech text-xs text-[#52525B] mb-2">
                <span>ORDER REFERENCE:</span>
                <span className="text-[#09090B] font-bold">{orderRef}</span>
              </div>
              <div className="flex justify-between font-tech text-xs text-[#52525B] mb-2">
                <span>PAYMENT METHOD:</span>
                <span className="text-[#09090B]">Cash on Delivery (COD)</span>
              </div>
              <div className="flex justify-between font-tech text-xs text-[#52525B] mb-2">
                <span>DELIVERY DESTINATION:</span>
                <span className="text-[#09090B]">{formData.city}, Pakistan</span>
              </div>
              <div className="flex justify-between font-tech text-xs text-[#52525B] pt-2 border-t border-[#E4E4E7]">
                <span>TOTAL PAYABLE:</span>
                <span className="text-[#0066FF] font-bold">PKR {total.toLocaleString()}</span>
              </div>
            </div>

            <p className="mt-4 font-sans text-xs text-[#52525B] max-w-md mx-auto leading-relaxed">
              Our team will verify your contact at <span className="text-[#09090B] font-mono font-semibold">{formData.phone}</span> prior to dispatch. You will pay the courier rider upon package arrival.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setOrderComplete(false);
                }}
                className="font-tech text-xs uppercase px-6 py-3 bg-[#0066FF] text-white font-bold hover:bg-[#0052CC] transition-colors cursor-pointer"
              >
                RETURN TO CATALOG
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF]"></span>
              <span className="font-tech text-xs text-[#52525B] uppercase tracking-widest font-bold">
                DIRECT CHECKOUT // PAKISTAN
              </span>
            </div>
            <h2 className="font-display font-bold text-xl uppercase tracking-wider text-[#09090B]">
              Delivery Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
              {/* Order Form */}
              <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4">
                <div>
                  <label className="block font-tech text-[11px] text-[#52525B] uppercase tracking-wider mb-1 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Recipient Name"
                    className="w-full bg-[#F8F9FA] border border-[#E4E4E7] focus:border-[#0066FF] text-[#09090B] text-base sm:text-sm px-3.5 py-2.5 outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-tech text-[11px] text-[#52525B] uppercase tracking-wider mb-1 font-medium">
                      Phone Number (Active) *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0300 1234567"
                      className="w-full bg-[#F8F9FA] border border-[#E4E4E7] focus:border-[#0066FF] text-[#09090B] text-base sm:text-sm px-3.5 py-2.5 outline-none transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-tech text-[11px] text-[#52525B] uppercase tracking-wider mb-1 font-medium">
                      City *
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-[#F8F9FA] border border-[#E4E4E7] focus:border-[#0066FF] text-[#09090B] text-base sm:text-sm px-3.5 py-2.5 outline-none transition-colors"
                    >
                      {CITIES_PAKISTAN.map(c => (
                        <option key={c} value={c} className="bg-white">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-tech text-[11px] text-[#52525B] uppercase tracking-wider mb-1 font-medium">
                    Street Address & House / Flat # *
                  </label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House / Office, Street, Sector / Area"
                    className="w-full bg-[#F8F9FA] border border-[#E4E4E7] focus:border-[#0066FF] text-[#09090B] text-base sm:text-sm px-3.5 py-2.5 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-tech text-[11px] text-[#52525B] uppercase tracking-wider mb-1 font-medium">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@domain.com"
                    className="w-full bg-[#F8F9FA] border border-[#E4E4E7] focus:border-[#0066FF] text-[#09090B] text-base sm:text-sm px-3.5 py-2.5 outline-none transition-colors font-mono"
                  />
                </div>

                {/* Payment Option Selection */}
                <div className="pt-2">
                  <label className="block font-tech text-[11px] text-[#52525B] uppercase tracking-wider mb-1.5 font-medium">
                    Payment Method
                  </label>
                  <div className="border border-[#E4E4E7] bg-[#F8F9FA] p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="accent-[#0066FF]"
                      />
                      <label htmlFor="cod" className="font-display font-semibold text-sm text-[#09090B] uppercase cursor-pointer">
                        Cash on Delivery (COD)
                      </label>
                    </div>
                    <span className="font-tech text-[10px] text-[#71717A] uppercase font-medium">PAY ON ARRIVAL</span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full py-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-display font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 mt-4 cursor-pointer"
                >
                  {isSubmitting ? 'TRANSMITTING ORDER...' : `CONFIRM ORDER (PKR ${total.toLocaleString()})`}
                </button>
              </form>

              {/* Order Summary & WhatsApp Alternative */}
              <div className="md:col-span-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#E4E4E7] md:pl-6 pt-4 md:pt-0">
                <div>
                  <div className="font-tech text-xs text-[#52525B] uppercase tracking-wider mb-3 font-bold">
                    ORDER SUMMARY [{items.length} ITEMS]
                  </div>

                  <div className="max-h-48 overflow-y-auto divide-y divide-[#E4E4E7] pr-1 mb-4">
                    {items.map(item => (
                      <div key={`${item.productId}-${item.variantId}`} className="py-2 flex justify-between text-xs">
                        <div>
                          <div className="font-semibold text-[#09090B] line-clamp-1">{item.productName}</div>
                          <div className="font-tech text-[10px] text-[#71717A] uppercase">
                            {item.variantName} × {item.quantity}
                          </div>
                        </div>
                        <div className="font-tech text-[#09090B] font-bold">
                          PKR {(item.unitPrice * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-[#E4E4E7] text-xs font-tech">
                    <div className="flex justify-between text-[#52525B]">
                      <span>SUBTOTAL</span>
                      <span className="text-[#09090B] font-bold">PKR {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[#52525B]">
                      <span>SHIPPING (PK)</span>
                      <span className="text-[#09090B] font-bold">PKR {shipping.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[#09090B] font-bold pt-2 border-t border-[#E4E4E7] text-sm">
                      <span>TOTAL DUE</span>
                      <span className="text-[#0066FF]">PKR {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Ordering Alternative */}
                <div className="mt-6 pt-4 border-t border-[#E4E4E7]">
                  <div className="font-tech text-[10px] text-[#71717A] uppercase mb-2 font-medium">
                    ALTERNATIVE DIRECT CONTACT:
                  </div>
                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="w-full py-2.5 px-3 border border-[#E4E4E7] hover:border-[#25D366] text-[#09090B] hover:text-[#25D366] font-tech text-xs uppercase flex items-center justify-center gap-2 bg-[#F8F9FA] transition-colors cursor-pointer font-semibold"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>INSTANT ORDER VIA WHATSAPP</span>
                  </button>
                  <p className="font-tech text-[10px] text-[#71717A] text-center mt-2">
                    SUPPORT: {BRAND.contact.phoneFormatted}
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

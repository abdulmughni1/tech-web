import React from 'react';
import { useCart } from '../../context/CartContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { BRAND } from '../../data/policies';

interface CartDrawerProps {
  onNavigateToProduct?: (slug: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigateToProduct }) => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    shipping,
    total,
    totalSavings,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[#E4E4E7] flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-[#E4E4E7] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF]"></span>
              <h2 className="font-display font-bold text-base tracking-wider uppercase text-[#09090B]">
                CART BAG [{items.reduce((acc, item) => acc + item.quantity, 0)}]
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#52525B] hover:text-[#09090B] border border-[#E4E4E7] hover:border-[#09090B] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#E4E4E7]">
            {items.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 border border-[#E4E4E7] flex items-center justify-center text-[#71717A] mb-4 font-tech bg-[#F4F4F5]">
                  [ 0 ]
                </div>
                <p className="font-display font-bold text-[#09090B] text-sm uppercase tracking-wider">
                  Your cart is empty
                </p>
                <p className="font-sans text-xs text-[#52525B] mt-1 max-w-[200px]">
                  Browse our catalog to select physical hardware products.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 font-tech text-xs uppercase px-4 py-2 bg-white border border-[#E4E4E7] hover:border-[#0066FF] hover:text-[#0066FF] text-[#09090B] shadow-2xs font-semibold"
                >
                  DISCOVER HARDWARE
                </button>
              </div>
            ) : (
              items.map(item => (
                <div key={`${item.productId}-${item.variantId}`} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      if (onNavigateToProduct) {
                        setIsCartOpen(false);
                        onNavigateToProduct(item.productSlug);
                      }
                    }}
                    className="cursor-pointer w-20 h-20 bg-[#F8F9FA] border border-[#E4E4E7] flex-shrink-0 flex items-center justify-center p-2 shadow-2xs"
                  >
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4
                          onClick={() => {
                            if (onNavigateToProduct) {
                              setIsCartOpen(false);
                              onNavigateToProduct(item.productSlug);
                            }
                          }}
                          className="cursor-pointer font-display text-sm font-semibold text-[#09090B] hover:text-[#0066FF] line-clamp-1"
                        >
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.productId, item.variantId)}
                          className="text-[#71717A] hover:text-[#0066FF] transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="font-tech text-[11px] text-[#52525B] uppercase mt-0.5 font-medium">
                        FINISH: {item.variantName}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#E4E4E7] bg-[#F4F4F5]">
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          className="px-2 py-1 text-[#52525B] hover:text-[#09090B] hover:bg-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-tech text-xs px-2.5 text-[#09090B] font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          className="px-2 py-1 text-[#52525B] hover:text-[#09090B] hover:bg-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Pricing */}
                      <div className="text-right">
                        <span className="font-tech text-sm font-bold text-[#09090B]">
                          PKR {(item.unitPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E4E4E7] bg-[#F8F9FA] space-y-3">
              {/* Savings pill if applicable */}
              {totalSavings > 0 && (
                <div className="flex items-center justify-between py-1.5 px-2.5 border border-[#0066FF]/30 bg-[#0066FF]/10 font-tech text-[11px] text-[#0066FF] uppercase font-bold">
                  <span>DISCOUNT APPLIED</span>
                  <span>SAVE PKR {totalSavings.toLocaleString()}</span>
                </div>
              )}

              {/* Subtotal */}
              <div className="flex justify-between font-tech text-xs text-[#52525B]">
                <span>SUBTOTAL</span>
                <span className="text-[#09090B] font-bold">PKR {subtotal.toLocaleString()}</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between font-tech text-xs text-[#52525B]">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#71717A]" />
                  SHIPPING (PAKISTAN)
                </span>
                <span className="text-[#09090B] font-bold">PKR {shipping.toLocaleString()}</span>
              </div>

              {/* Total */}
              <div className="pt-2 border-t border-[#E4E4E7] flex justify-between items-baseline">
                <div>
                  <span className="font-display font-bold text-sm tracking-wider uppercase text-[#09090B]">
                    TOTAL DUE
                  </span>
                  <p className="font-tech text-[10px] text-[#71717A] uppercase">CASH ON DELIVERY AVAILABLE</p>
                </div>
                <span className="font-display font-bold text-xl text-[#09090B]">
                  PKR {total.toLocaleString()}
                </span>
              </div>

              {/* Primary Checkout CTA */}
              <button
                onClick={handleCheckoutClick}
                className="w-full mt-2 py-3.5 px-4 bg-[#0066FF] hover:bg-[#0052CC] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-150 shadow-md cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-tech text-[#71717A] uppercase pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#52525B]" />
                <span>{BRAND.returnPolicy.windowDays}-DAY RETURN POLICY • FLAT PKR {BRAND.shipping.fee} NATIONWIDE</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#121214] border-l border-[#E4E4E7] dark:border-[#27272A] flex flex-col justify-between shadow-2xl transition-colors duration-200">
          {/* Header */}
          <div className="p-5 border-b border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF]"></span>
              <h2 className="font-display font-bold text-base tracking-wider uppercase text-[#09090B] dark:text-white">
                CART BAG [{items.reduce((acc, item) => acc + item.quantity, 0)}]
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#09090B] dark:hover:border-zinc-300 rounded-[2px] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#E4E4E7] dark:divide-[#27272A]">
            {items.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 border border-[#E4E4E7] dark:border-[#27272A] flex items-center justify-center text-[#71717A] dark:text-[#A1A1AA] mb-4 font-tech bg-[#FAFAFA] dark:bg-[#18181B] rounded-[2px]">
                  [ 0 ]
                </div>
                <p className="font-display font-bold text-[#09090B] dark:text-white text-sm uppercase tracking-wider">
                  Your cart is empty
                </p>
                <p className="font-sans text-xs text-[#52525B] dark:text-[#A1A1AA] mt-1 max-w-[200px]">
                  Browse our catalog to select physical hardware products.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 font-tech text-xs uppercase px-4 py-2 bg-white dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] hover:border-[#09090B] dark:hover:border-white text-[#09090B] dark:text-white shadow-2xs font-semibold rounded-[2px] cursor-pointer"
                >
                  DISCOVER HARDWARE
                </button>
              </div>
            ) : (
              items.map(item => (
                <div key={`${item.productId}-${item.variantId}-${item.ringSize || ''}`} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      if (onNavigateToProduct) {
                        setIsCartOpen(false);
                        onNavigateToProduct(item.productSlug);
                      }
                    }}
                    className="cursor-pointer w-20 h-20 bg-[#FAFAFA] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#27272A] flex-shrink-0 flex items-center justify-center p-2 shadow-2xs rounded-[2px]"
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
                          className="cursor-pointer font-display text-sm font-semibold text-[#09090B] dark:text-white hover:text-neutral-600 dark:hover:text-zinc-300 line-clamp-1 transition-colors"
                        >
                          {item.productName}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.productId, item.variantId, item.ringSize)}
                          className="text-[#71717A] dark:text-[#A1A1AA] hover:text-[#DC2626] dark:hover:text-[#F87171] transition-colors p-0.5 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Display Color for Laptop Stand */}
                      {(item.productId === 'prod-01' || item.variantName === 'Silver' || item.variantName === 'Black') && (
                        <div className="font-tech text-[11px] text-[#09090B] dark:text-white font-bold uppercase mt-0.5">
                          COLOR: {item.variantName}
                        </div>
                      )}

                      {/* Display Ring Size if applicable */}
                      {item.ringSize ? (
                        <div className="font-tech text-[11px] text-[#09090B] dark:text-white font-bold uppercase mt-0.5">
                          RING SIZE: {item.ringSize}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#18181B] rounded-[2px]">
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1, item.ringSize)}
                          className="px-2 py-1 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:bg-white dark:hover:bg-[#202024] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-tech text-xs px-2.5 text-[#09090B] dark:text-white font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1, item.ringSize)}
                          className="px-2 py-1 text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white hover:bg-white dark:hover:bg-[#202024] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Pricing */}
                      <div className="text-right">
                        <span className="font-tech text-sm font-bold text-[#09090B] dark:text-white">
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
            <div className="p-5 border-t border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121214] space-y-3 transition-colors">
              {/* Savings pill if applicable */}
              {totalSavings > 0 && (
                <div className="flex items-center justify-between py-1.5 px-2.5 border border-[#0066FF]/30 dark:border-[#0066FF]/40 bg-[#0066FF]/10 dark:bg-[#0066FF]/20 font-tech text-[11px] text-[#0066FF] dark:text-[#3B82F6] uppercase font-bold rounded-[2px]">
                  <span>TOTAL SAVINGS</span>
                  <span>SAVE PKR {totalSavings.toLocaleString()}</span>
                </div>
              )}

              {/* Subtotal */}
              <div className="flex justify-between font-tech text-xs text-[#52525B] dark:text-[#A1A1AA]">
                <span>SUBTOTAL</span>
                <span className="text-[#09090B] dark:text-white font-bold">PKR {subtotal.toLocaleString()}</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between font-tech text-xs text-[#52525B] dark:text-[#A1A1AA]">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#3B82F6]" />
                  SHIPPING (PAKISTAN)
                </span>
                <span className="text-[#09090B] dark:text-white font-bold">PKR {shipping.toLocaleString()}</span>
              </div>

              {/* Total */}
              <div className="pt-2 border-t border-[#E4E4E7] dark:border-[#27272A] flex justify-between items-baseline">
                <div>
                  <span className="font-display font-bold text-sm tracking-wider uppercase text-[#09090B] dark:text-white">
                    TOTAL DUE
                  </span>
                  <p className="font-tech text-[10px] text-[#16A34A] dark:text-[#4ADE80] uppercase font-bold">
                    ✓ CASH ON DELIVERY AVAILABLE
                  </p>
                </div>
                <span className="font-display font-bold text-xl text-[#09090B] dark:text-white">
                  PKR {total.toLocaleString()}
                </span>
              </div>

              {/* Primary Checkout CTA */}
              <button
                onClick={handleCheckoutClick}
                className="w-full mt-2 py-4 px-4 bg-[#0066FF] hover:bg-[#0052CC] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-150 shadow-md cursor-pointer rounded-[2px]"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-tech text-[#71717A] dark:text-[#A1A1AA] uppercase pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#52525B] dark:text-[#A1A1AA]" />
                <span>{BRAND.returnPolicy.windowDays}-DAY RETURN POLICY • FLAT PKR {BRAND.shipping.fee} NATIONWIDE</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

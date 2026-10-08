import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductVariant } from '../types/product';
import { SHIPPING_FEE } from '../data/products';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  totalSavings: number;
  shipping: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  quickBuy: (product: Product, variant: ProductVariant, quantity?: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'dexyfied_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage error fallback
    }
  }, [items]);

  const addToCart = (product: Product, variant: ProductVariant, quantity = 1) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.productId === product.id && i.variantId === variant.id
      );

      // Select fallback image
      const selectedImage = variant.image || 
        product.images.find(img => img.variantColor?.toLowerCase() === variant.name.toLowerCase())?.url ||
        product.images[0]?.url || 
        '/images/brand/dexyfied-logo-raw.jpg';

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          productSlug: product.slug,
          variantId: variant.id,
          variantName: variant.name,
          unitPrice: product.salePrice,
          originalPrice: product.originalPrice,
          quantity,
          image: selectedImage,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const quickBuy = (product: Product, variant: ProductVariant, quantity = 1) => {
    addToCart(product, variant, quantity);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setItems(prev => prev.filter(i => !(i.productId === productId && i.variantId === variantId)));
  };

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setItems(prev =>
      prev.map(i =>
        i.productId === productId && i.variantId === variantId
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalOriginal = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const totalSavings = Math.max(0, totalOriginal - subtotal);
  const shipping = items.length > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        totalSavings,
        shipping,
        total,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickBuy,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

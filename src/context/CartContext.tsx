import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductColor, CartItem, BundleTier } from '../types';
import { BUNDLE_TIERS } from '../data/products';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, color: ProductColor, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  totalQuantity: number;
  subtotalPKR: number;
  bundleDiscountPKR: number;
  activeBundleTier: BundleTier | null;
  shippingPKR: number;
  totalPKR: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  applyBundleOffer: (tier: BundleTier, selectedProducts: Array<{ product: Product; color: ProductColor }>) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rg_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('rg_cart_items', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart = (product: Product, color: ProductColor, quantity = 1) => {
    setItems((prevItems) => {
      const itemId = `${product.id}-${color.name}`;
      const existing = prevItems.find((i) => i.id === itemId);
      if (existing) {
        return prevItems.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prevItems, { id: itemId, product, selectedColor: color, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity: newQuantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Apply bundle offer with specific chosen products
  const applyBundleOffer = (tier: BundleTier, selectedProducts: Array<{ product: Product; color: ProductColor }>) => {
    setItems((prev) => {
      const updated = [...prev];
      selectedProducts.forEach(({ product, color }) => {
        const itemId = `${product.id}-${color.name}`;
        const existingIndex = updated.findIndex((i) => i.id === itemId);
        if (existingIndex > -1) {
          updated[existingIndex].quantity += 1;
        } else {
          updated.push({
            id: itemId,
            product,
            selectedColor: color,
            quantity: 1
          });
        }
      });
      return updated;
    });
    setIsCartOpen(true);
  };

  // Calculations
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalPKR = items.reduce((sum, item) => sum + item.product.pricePKR * item.quantity, 0);

  // Compute eligible bundle discount dynamically based on total quantity
  let activeBundleTier: BundleTier | null = null;
  let bundleDiscountPKR = 0;

  if (totalQuantity >= 3) {
    activeBundleTier = BUNDLE_TIERS.find((t) => t.quantity === 3) || null;
    bundleDiscountPKR = Math.round(subtotalPKR * 0.15);
  } else if (totalQuantity === 2) {
    activeBundleTier = BUNDLE_TIERS.find((t) => t.quantity === 2) || null;
    bundleDiscountPKR = Math.round(subtotalPKR * 0.10);
  } else if (totalQuantity === 1) {
    activeBundleTier = BUNDLE_TIERS.find((t) => t.quantity === 1) || null;
    bundleDiscountPKR = 0;
  }

  // Complimentary luxury shipping on all orders over Rs. 30,000 (standard luxury threshold)
  const shippingPKR = subtotalPKR > 0 ? (subtotalPKR >= 30000 ? 0 : 2500) : 0;
  const totalPKR = Math.max(0, subtotalPKR - bundleDiscountPKR + shippingPKR);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalQuantity,
        subtotalPKR,
        bundleDiscountPKR,
        activeBundleTier,
        shippingPKR,
        totalPKR,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        applyBundleOffer
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalQuantity,
    subtotalPKR,
    bundleDiscountPKR,
    activeBundleTier,
    shippingPKR,
    totalPKR
  } = useCart();

  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleViewCartPage = () => {
    closeCart();
    navigate('/cart');
  };

  // Next bundle tier goal calculation
  let nextBundleMessage = '';
  if (totalQuantity === 0) {
    nextBundleMessage = 'Add 2 bags to unlock 10% OFF your entire bundle.';
  } else if (totalQuantity === 1) {
    nextBundleMessage = 'Add 1 more bag to unlock 10% OFF your combined total!';
  } else if (totalQuantity === 2) {
    nextBundleMessage = 'Add 1 more bag to upgrade to 15% OFF your entire order!';
  } else {
    nextBundleMessage = '✨ 15% Haute Trio Bundle discount applied!';
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#0c0c0c] border-l border-[#302719] shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#302719] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D4AF66]" />
            <span className="font-serif text-lg tracking-wider text-[#F8F4EC]">
              Shopping Bag ({totalQuantity})
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-[#A6A6A6] hover:text-[#F8F4EC] transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bundle incentive ticker */}
        <div className="bg-[#141414] px-4 py-2.5 border-b border-[#302719] text-xs flex items-center gap-2 text-[#E6C98E]">
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#D4AF66]" />
          <span className="font-medium tracking-wide">{nextBundleMessage}</span>
        </div>

        {/* Drawer Body / Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-12 h-12 text-[#302719] mb-4" />
              <p className="font-serif text-lg text-[#F8F4EC] mb-2">Your Shopping Bag is Empty</p>
              <p className="text-xs text-[#A6A6A6] max-w-xs mb-6">
                Discover our curated collection of luxury women&apos;s handbags and exclusive bundle offers.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  navigate('/shop');
                }}
                className="py-3 px-6 bg-[#D4AF66] text-[#080808] text-xs uppercase tracking-widest font-semibold hover:bg-[#E6C98E] transition-colors"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-[#111111] border border-[#302719] rounded-sm relative group"
              >
                {/* Item Thumbnail */}
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 object-cover rounded bg-[#161616] shrink-0"
                />

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm text-[#F8F4EC] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#A6A6A6] hover:text-red-400 p-0.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#A6A6A6] mt-0.5 flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block border border-black/40"
                        style={{ backgroundColor: item.selectedColor.hex }}
                      />
                      <span>{item.selectedColor.name}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#302719]/40">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#302719] bg-[#0c0c0c] rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-[#A6A6A6] hover:text-[#F8F4EC]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs text-[#F8F4EC] tabular-nums font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-[#A6A6A6] hover:text-[#F8F4EC]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Unit & Subtotal Price */}
                    <span className="text-xs font-semibold text-[#D4AF66] tabular-nums">
                      {formatPrice(item.product.pricePKR * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Calculations */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#302719] bg-[#0f0f0f] space-y-3">
            <div className="space-y-1.5 text-xs text-[#A6A6A6]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#F8F4EC] tabular-nums">{formatPrice(subtotalPKR)}</span>
              </div>

              {bundleDiscountPKR > 0 && (
                <div className="flex justify-between text-[#E6C98E]">
                  <span>Bundle Savings ({activeBundleTier?.discountPercent}% Off)</span>
                  <span className="tabular-nums">- {formatPrice(bundleDiscountPKR)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Insured Shipping</span>
                <span className="text-[#F8F4EC] tabular-nums">
                  {shippingPKR === 0 ? 'Complimentary' : formatPrice(shippingPKR)}
                </span>
              </div>

              <div className="pt-2 border-t border-[#302719] flex justify-between text-sm font-semibold text-[#F8F4EC]">
                <span className="font-serif">Estimated Total</span>
                <span className="text-[#D4AF66] tabular-nums text-base">{formatPrice(totalPKR)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 bg-[#D4AF66] hover:bg-[#E6C98E] text-[#080808] text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleViewCartPage}
                className="w-full py-2.5 px-4 bg-[#141414] hover:bg-[#1c1c1c] text-[#F8F4EC] border border-[#302719] text-xs uppercase tracking-wider font-medium transition-colors"
              >
                View Bag & Bundle Builder
              </button>
            </div>

            <p className="text-[10px] text-center text-[#A6A6A6]/80 pt-1">
              Cash on Delivery (COD) · Free Returns within 14 Days
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { BundleOffers } from '../components/BundleOffers';

export const Cart: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalQuantity,
    subtotalPKR,
    bundleDiscountPKR,
    activeBundleTier,
    shippingPKR,
    totalPKR
  } = useCart();

  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const [orderNotes, setOrderNotes] = useState('');

  if (items.length === 0) {
    return (
      <div className="bg-[#080808] min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 rounded-full bg-[#111111] border border-[#302719] flex items-center justify-center text-[#D4AF66] mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl text-[#F8F4EC] mb-2">Your Shopping Bag Is Empty</h1>
        <p className="text-xs sm:text-sm text-[#A6A6A6] max-w-sm mb-8 leading-relaxed">
          Explore our collection of luxury women&apos;s handbags and take advantage of our curated 2-bag and 3-bag bundle offers.
        </p>
        <Link
          to="/shop"
          className="py-3.5 px-8 bg-[#D4AF66] hover:bg-[#E6C98E] text-[#080808] text-xs uppercase tracking-widest font-bold shadow-xl transition-all"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#080808] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="border-b border-[#302719] pb-6 mb-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF66] font-semibold block mb-1">
              Your Selection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F8F4EC]">
              Shopping Bag ({totalQuantity} {totalQuantity === 1 ? 'Silhouette' : 'Silhouettes'})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-[#A6A6A6] hover:text-red-400 transition-colors"
          >
            Clear Entire Bag
          </button>
        </div>

        {/* Bundle Banner */}
        <div className="bg-[#111111] border border-[#302719] p-4 rounded-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#D4AF66] shrink-0" />
            <div>
              <p className="text-xs font-medium text-[#F8F4EC]">
                {activeBundleTier
                  ? `Active Savings: ${activeBundleTier.title} (${activeBundleTier.discountPercent}% Off Combined Total)`
                  : 'Add a 2nd handbag to instantly unlock 10% OFF your entire order.'}
              </p>
              <p className="text-[11px] text-[#A6A6A6]">
                Applicable automatically to all mixed or matched designs.
              </p>
            </div>
          </div>
          <Link
            to="/shop"
            className="text-xs text-[#D4AF66] hover:text-[#E6C98E] uppercase tracking-wider font-semibold whitespace-nowrap"
          >
            + Add Another Design
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Items Table / List (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="hidden sm:grid grid-cols-12 text-xs uppercase tracking-wider text-[#A6A6A6] pb-3 border-b border-[#302719]">
              <span className="col-span-6">Silhouette Details</span>
              <span className="col-span-2 text-center">Unit Price</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-right">Subtotal</span>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-4 bg-[#111111] border border-[#302719] rounded-sm"
              >
                {/* Product Info */}
                <div className="sm:col-span-6 flex items-center gap-4">
                  <Link to={`/product/${item.product.id}`} className="shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 object-cover rounded bg-[#161616]"
                    />
                  </Link>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A6A6A6]">
                      {item.product.category}
                    </span>
                    <Link to={`/product/${item.product.id}`}>
                      <h3 className="font-serif text-base text-[#F8F4EC] hover:text-[#E6C98E] transition-colors leading-snug">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#A6A6A6] mt-0.5 flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block border border-black/40"
                        style={{ backgroundColor: item.selectedColor.hex }}
                      />
                      <span>{item.selectedColor.name}</span>
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[11px] text-[#A6A6A6] hover:text-red-400 flex items-center gap-1 mt-2 sm:hidden"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Unit Price */}
                <div className="hidden sm:block sm:col-span-2 text-center text-xs text-[#A6A6A6] tabular-nums">
                  {formatPrice(item.product.pricePKR)}
                </div>

                {/* Quantity Controls */}
                <div className="flex sm:justify-center sm:col-span-2">
                  <div className="flex items-center border border-[#302719] bg-[#0c0c0c] rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 text-[#A6A6A6] hover:text-[#F8F4EC]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-semibold text-[#F8F4EC] tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 text-[#A6A6A6] hover:text-[#F8F4EC]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Total & Desktop Remove */}
                <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-3">
                  <span className="text-sm font-semibold text-[#D4AF66] tabular-nums">
                    {formatPrice(item.product.pricePKR * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="hidden sm:inline-block text-[#A6A6A6] hover:text-red-400 p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Special Instructions or Order Notes */}
            <div className="pt-4">
              <label className="block text-xs uppercase tracking-wider text-[#F8F4EC] mb-2 font-medium">
                Atelier Notes or Gift Inscription (Optional):
              </label>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                rows={2}
                placeholder="Include a bespoke gift ribbon message or delivery notes..."
                className="w-full bg-[#111111] border border-[#302719] text-xs text-[#F8F4EC] p-3 rounded focus:outline-none focus:border-[#D4AF66]"
              />
            </div>
          </div>

          {/* Order Summary Box (lg:col-span-4) */}
          <div className="lg:col-span-4">
            <div className="bg-[#111111] border border-[#302719] p-6 rounded-sm space-y-4 sticky top-28">
              <h2 className="font-serif text-xl text-[#F8F4EC] pb-3 border-b border-[#302719]">
                Order Summary
              </h2>

              <div className="space-y-2 text-xs text-[#A6A6A6]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-[#F8F4EC] tabular-nums">{formatPrice(subtotalPKR)}</span>
                </div>

                {bundleDiscountPKR > 0 && (
                  <div className="flex justify-between text-[#E6C98E]">
                    <span>Bundle Discount ({activeBundleTier?.discountPercent}% Off)</span>
                    <span className="tabular-nums">- {formatPrice(bundleDiscountPKR)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span className="text-[#F8F4EC] tabular-nums">
                    {shippingPKR === 0 ? 'Complimentary' : formatPrice(shippingPKR)}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#302719] flex justify-between text-base font-semibold text-[#F8F4EC]">
                  <span className="font-serif">Estimated Total</span>
                  <span className="text-[#D4AF66] tabular-nums text-lg">{formatPrice(totalPKR)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 px-6 bg-[#D4AF66] hover:bg-[#E6C98E] text-[#080808] text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-xl"
              >
                <span>PROCEED TO COD CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-[11px] text-[#A6A6A6] space-y-1.5 text-center">
                <p className="flex items-center justify-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> Cash on Delivery available at checkout
                </p>
                <p>14-day return privilege · 100% authentic full-grain leather</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bundle Builder Embed */}
        <div className="mt-20">
          <BundleOffers />
        </div>
      </div>
    </div>
  );
};

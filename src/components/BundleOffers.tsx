import React, { useState } from 'react';
import { Check, Sparkles, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import { BUNDLE_TIERS, PRODUCTS } from '../data/products';
import { BundleTier, Product, ProductColor } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const BundleOffers: React.FC = () => {
  const { formatPrice } = useCurrency();
  const { applyBundleOffer } = useCart();
  const { showToast } = useToast();

  // Active selected tier
  const [selectedTierId, setSelectedTierId] = useState<string>('bundle-2'); // Default to Duo Ensemble (Most Popular)

  // Handbag selection state for the active bundle
  // Defaults: Aurora Luxe + Golden Muse for Tier 2; plus Rose Signature for Tier 3
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([
    'aurora-luxe',
    'golden-muse-shoulder',
    'rose-signature-tote'
  ]);

  const activeTier = BUNDLE_TIERS.find((t) => t.id === selectedTierId) || BUNDLE_TIERS[1];
  const requiredCount = activeTier.quantity;

  // Selected products for current bundle tier
  const activeSelectedProducts = selectedProductIds.slice(0, requiredCount).map((id) => {
    return PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  });

  // Calculate pricing for current selection
  const rawSubtotalPKR = activeSelectedProducts.reduce((sum, p) => sum + p.pricePKR, 0);
  const bundleDiscountPKR = Math.round(rawSubtotalPKR * (activeTier.discountPercent / 100));
  const finalBundleTotalPKR = rawSubtotalPKR - bundleDiscountPKR;

  const handleSelectProductForSlot = (index: number, newProductId: string) => {
    const updated = [...selectedProductIds];
    updated[index] = newProductId;
    setSelectedProductIds(updated);
  };

  const handleClaimBundle = (tier: BundleTier) => {
    const productsToAdd = selectedProductIds.slice(0, tier.quantity).map((id) => {
      const prod = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
      return {
        product: prod,
        color: prod.colors[0]
      };
    });

    applyBundleOffer(tier, productsToAdd);
    showToast(
      'Bundle Applied to Bag',
      `${tier.title} (${tier.quantity} handbags) added with ${tier.discountPercent}% luxury savings.`,
      'success'
    );
  };

  return (
    <section className="py-20 bg-[#0a0a0a] border-y border-[#302719] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF66] font-semibold block mb-2">
            Curated Luxury Combinations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F8F4EC] font-normal leading-tight">
            The Haute Ensemble Bundles
          </h2>
          <p className="text-xs sm:text-sm text-[#A6A6A6] mt-3 leading-relaxed">
            Acquire multiple signature silhouettes and unlock preferential atelier pricing. Mix and match any designs across our entire collection.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {BUNDLE_TIERS.map((tier) => {
            const isSelected = selectedTierId === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTierId(tier.id)}
                className={`cursor-pointer rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  isSelected
                    ? 'bg-[#121212] border-2 border-[#D4AF66] shadow-[0_0_30px_rgba(212,175,102,0.15)] -translate-y-1'
                    : 'bg-[#0e0e0e] border border-[#302719] hover:border-[#D4AF66]/50'
                }`}
              >
                {/* Badge */}
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF66] text-[#080808] text-[9px] uppercase tracking-[0.25em] font-bold px-3 py-1 shadow-md whitespace-nowrap">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-widest text-[#A6A6A6]">
                      Tier 0{tier.quantity}
                    </span>
                    <span className="text-xs font-semibold text-[#E6C98E]">
                      {tier.discountPercent > 0 ? `${tier.discountPercent}% OFF` : 'Standard'}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#F8F4EC] font-medium mb-1">
                    {tier.title}
                  </h3>
                  <p className="text-xs text-[#A6A6A6] mb-6">{tier.tagline}</p>

                  <div className="p-3 bg-[#080808] border border-[#302719] rounded mb-6 text-xs text-[#F8F4EC]/90 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF66] shrink-0" />
                    <span>{tier.savingsLabel}</span>
                  </div>

                  <ul className="space-y-2 text-xs text-[#A6A6A6] mb-8">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D4AF66]" />
                      <span>Choose any {tier.quantity} distinct handbags</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D4AF66]" />
                      <span>Complimentary insured delivery included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#D4AF66]" />
                      <span>Bespoke presentation packaging for each</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTierId(tier.id);
                  }}
                  className={`w-full py-2.5 px-4 text-xs uppercase tracking-widest font-semibold transition-colors ${
                    isSelected
                      ? 'bg-[#D4AF66] text-[#080808]'
                      : 'bg-[#181818] text-[#F8F4EC] border border-[#302719] hover:border-[#D4AF66]'
                  }`}
                >
                  {isSelected ? '✓ Active Selection' : 'Customize This Bundle'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Customizer for the Selected Bundle */}
        <div className="bg-[#111111] border border-[#302719] rounded-sm p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#302719]">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF66] font-semibold">
                Configure Your Selection
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F8F4EC]">
                {activeTier.title} ({activeTier.quantity} Handbags)
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#A6A6A6] block">Bundle Savings Rate</span>
              <span className="text-lg font-serif text-[#E6C98E] font-medium">
                {activeTier.discountPercent > 0 ? `${activeTier.discountPercent}% OFF Total Order` : 'Standard Rate'}
              </span>
            </div>
          </div>

          {/* Slots for choosing bags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
            {Array.from({ length: requiredCount }).map((_, slotIndex) => {
              const currentProduct = activeSelectedProducts[slotIndex] || PRODUCTS[slotIndex];
              return (
                <div key={slotIndex} className="bg-[#0a0a0a] border border-[#302719] p-4 rounded-sm">
                  <div className="flex items-center justify-between text-xs text-[#A6A6A6] uppercase tracking-wider mb-2">
                    <span>Handbag #{slotIndex + 1}</span>
                    <span className="text-[#D4AF66]">{currentProduct.category}</span>
                  </div>

                  <div className="aspect-[4/3] rounded bg-[#141414] overflow-hidden mb-3 border border-[#302719]">
                    <img
                      src={currentProduct.images[0]}
                      alt={currentProduct.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <label className="block text-xs uppercase tracking-wider text-[#A6A6A6] mb-1.5">
                    Select Design:
                  </label>
                  <select
                    value={currentProduct.id}
                    onChange={(e) => handleSelectProductForSlot(slotIndex, e.target.value)}
                    className="w-full bg-[#141414] border border-[#302719] text-xs text-[#F8F4EC] p-2.5 rounded focus:outline-none focus:border-[#D4AF66]"
                  >
                    {PRODUCTS.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name} ({formatPrice(prod.pricePKR)})
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center justify-between text-xs mt-3 pt-2 border-t border-[#302719]/40 text-[#A6A6A6]">
                    <span>Item Value:</span>
                    <span className="text-[#F8F4EC] tabular-nums font-medium">
                      {formatPrice(currentProduct.pricePKR)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary & Claim Action */}
          <div className="pt-6 border-t border-[#302719] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#A6A6A6]">Combined Value:</span>
                <span className="text-sm text-[#A6A6A6] line-through tabular-nums">
                  {formatPrice(rawSubtotalPKR)}
                </span>
                {bundleDiscountPKR > 0 && (
                  <span className="text-xs text-[#E6C98E] font-medium">
                    (You save {formatPrice(bundleDiscountPKR)})
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl sm:text-3xl text-[#D4AF66] font-semibold tabular-nums">
                  {formatPrice(finalBundleTotalPKR)}
                </span>
                <span className="text-xs text-[#A6A6A6]">
                  {requiredCount > 1 ? `for all ${requiredCount} handbags` : 'for 1 handbag'}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleClaimBundle(activeTier)}
              className="w-full md:w-auto py-3.5 px-8 bg-[#D4AF66] hover:bg-[#E6C98E] text-[#080808] text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-3 transition-colors shadow-xl"
            >
              <span>Add Bundle to Bag & Save</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

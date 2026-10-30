import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { Product } from '../types';

export const BestSellers: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc'>('rating');

  const bestSellerProducts = PRODUCTS.filter((p) => p.isBestSeller).sort((a, b) => {
    if (sortBy === 'price-asc') return a.pricePKR - b.pricePKR;
    if (sortBy === 'price-desc') return b.pricePKR - a.pricePKR;
    return b.rating - a.rating;
  });

  return (
    <div className="bg-[#080808] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="relative rounded-sm overflow-hidden border border-[#302719] mb-14 bg-[#111111]">
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/hero_handbag_collection_1793381775635.jpg"
              alt="Rose and gold best sellers"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-20 filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/80" />
          </div>

          <div className="relative z-10 p-8 sm:p-14 text-center max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF66] font-semibold block mb-2 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demonstration Iconography</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#F8F4EC] font-normal leading-tight">
              Our Best Sellers
            </h1>
            <p className="text-xs sm:text-sm text-[#A6A6A6] mt-4 leading-relaxed">
              Silhouettes that have captured the hearts of women of taste worldwide. Celebrated for architectural balance, flawless leathers, and signature champagne gold appointments.
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between pb-6 border-b border-[#302719] mb-8 text-xs text-[#A6A6A6]">
          <span>Displaying 4 Curated Hallmarks</span>
          <div className="flex items-center gap-2">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#111111] border border-[#302719] text-[#F8F4EC] py-1.5 px-3 rounded focus:outline-none focus:border-[#D4AF66]"
            >
              <option value="rating">Highest Acclaim</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellerProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

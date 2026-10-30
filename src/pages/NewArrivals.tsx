import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { Product } from '../types';

export const NewArrivals: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const newArrivalProducts = PRODUCTS.filter((p) => p.isNewArrival);

  return (
    <div className="bg-[#080808] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF66] font-semibold block mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seasonal Atelier Premieres</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#F8F4EC] font-normal leading-tight">
            New Arrivals
          </h1>
          <p className="text-xs sm:text-sm text-[#A6A6A6] mt-4 leading-relaxed">
            Freshly unboxed from our workshop. Featuring our newest emerald tones, jeweled satin clutches, and petite micro silhouettes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {newArrivalProducts.map((product) => (
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

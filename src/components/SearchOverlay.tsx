import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts: Product[] = query.trim()
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectProduct = (id: string) => {
    onClose();
    navigate(`/product/${id}`);
  };

  const handleCategoryClick = (category: string) => {
    onClose();
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#080808]/95 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Top Header of Overlay */}
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 pt-8 pb-4 flex items-center justify-between border-b border-[#302719]">
        <div className="flex items-center gap-3 flex-1 max-w-2xl">
          <Search className="w-5 h-5 text-[#D4AF66]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search our luxury collection (e.g. Tote, Evening, Aurora)..."
            className="w-full bg-transparent text-lg md:text-xl text-[#F8F4EC] placeholder-[#A6A6A6]/60 focus:outline-none font-serif tracking-wide"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#A6A6A6] hover:text-[#F8F4EC]"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-2 text-[#A6A6A6] hover:text-[#F8F4EC] rounded-full border border-[#302719] hover:border-[#D4AF66] transition-colors ml-4"
          aria-label="Close search"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        {query.trim() === '' ? (
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#A6A6A6] mb-4">
              Trending Categories & Silhouettes
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {['Shoulder Bags', 'Tote Bags', 'Crossbody Bags', 'Evening Bags', 'Best Sellers'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => cat === 'Best Sellers' ? (onClose(), navigate('/best-sellers')) : handleCategoryClick(cat)}
                  className="px-4 py-2 bg-[#111111] hover:bg-[#1a1a1a] text-xs text-[#F8F4EC] hover:text-[#D4AF66] border border-[#302719] rounded-sm transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-[#A6A6A6] mb-4">
              Curated Masterpieces
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {PRODUCTS.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelectProduct(p.id)}
                  className="flex items-center gap-3 p-3 bg-[#111111]/50 border border-[#302719] hover:border-[#D4AF66]/60 cursor-pointer rounded transition-all"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-14 object-cover rounded bg-[#161616]"
                  />
                  <div>
                    <h4 className="font-serif text-sm text-[#F8F4EC] hover:text-[#E6C98E]">{p.name}</h4>
                    <p className="text-xs text-[#D4AF66] mt-0.5">{formatPrice(p.pricePKR)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#A6A6A6] mb-6">
              Found {filteredProducts.length} {filteredProducts.length === 1 ? 'Design' : 'Designs'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelectProduct(p.id)}
                  className="group flex flex-col bg-[#111111] border border-[#302719] hover:border-[#D4AF66] p-3 rounded cursor-pointer transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded bg-[#161616] mb-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A6A6A6]">{p.category}</span>
                  <h4 className="font-serif text-base text-[#F8F4EC] group-hover:text-[#E6C98E] transition-colors mt-0.5">
                    {p.name}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#302719]">
                    <span className="text-sm font-semibold text-[#D4AF66]">{formatPrice(p.pricePKR)}</span>
                    <span className="text-xs text-[#A6A6A6] flex items-center gap-1 group-hover:text-[#F8F4EC]">
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-serif text-xl text-[#F8F4EC] mb-2">No matching silhouettes found</p>
            <p className="text-xs text-[#A6A6A6] max-w-sm mx-auto mb-6">
              We could not find any handbags matching &quot;{query}&quot;. Try exploring our full collection or best sellers.
            </p>
            <button
              onClick={() => {
                onClose();
                navigate('/shop');
              }}
              className="py-2.5 px-6 bg-[#D4AF66] text-[#080808] text-xs uppercase tracking-widest font-semibold hover:bg-[#E6C98E] transition-colors"
            >
              Browse All Handbags
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const currentColor = product.colors[selectedColorIndex] || product.colors[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, currentColor, 1);
    showToast('Added to Shopping Bag', `${product.name} (${currentColor.name}) has been placed in your bag.`, 'success');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    if (!isFavorited) {
      showToast('Saved to Wishlist', `${product.name} added to your private wishlist.`, 'info');
    }
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <div
      className="group relative flex flex-col bg-[#111111]/70 border border-[#302719] hover:border-[#D4AF66]/60 transition-all duration-300 rounded-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <Link to={`/product/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-[#161616]">
        {/* Subtle Discount or Status Kicker */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 text-[10px] tracking-widest uppercase font-medium">
          {product.discountPercent > 0 && (
            <span className="bg-[#080808]/90 text-[#E6C98E] px-2 py-0.5 border border-[#302719]">
              Save {product.discountPercent}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#080808]/90 text-[#D4AF66] px-2 py-0.5 border border-[#302719]">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isFavorited
              ? 'bg-[#080808] text-[#D4AF66] border border-[#D4AF66]'
              : 'bg-[#080808]/80 text-[#F8F4EC] hover:text-[#D4AF66] border border-[#302719]'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#D4AF66]' : ''}`} />
        </button>

        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Quick View & Quick Add Action Overlays on Desktop */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent flex items-center justify-between gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } hidden md:flex`}
        >
          {onQuickView && (
            <button
              onClick={handleQuickViewClick}
              className="flex-1 py-2 px-3 bg-[#111111]/90 hover:bg-[#1a1a1a] text-[#F8F4EC] hover:text-[#E6C98E] text-[11px] uppercase tracking-wider font-medium border border-[#302719] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#D4AF66]" />
              <span>Quick View</span>
            </button>
          )}

          <button
            onClick={handleAddToCart}
            className="flex-1 py-2 px-3 bg-[#D4AF66] hover:bg-[#E6C98E] text-[#080808] text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </Link>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#A6A6A6] tracking-wider mb-1.5">
            <span className="uppercase">{product.category}</span>
            <span className="text-[#E6C98E]">★ {product.rating.toFixed(1)}</span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-serif text-base text-[#F8F4EC] group-hover:text-[#E6C98E] transition-colors leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Short description teaser */}
          <p className="text-xs text-[#A6A6A6] mt-1 line-clamp-1">
            {product.shortDescription}
          </p>

          {/* Color swatches */}
          <div className="flex items-center gap-1.5 mt-3">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIndex === idx
                    ? 'border-[#D4AF66] scale-110 ring-1 ring-[#D4AF66]'
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name}`}
              />
            ))}
            <span className="text-[10px] text-[#A6A6A6] ml-1">{currentColor.name}</span>
          </div>
        </div>

        {/* Pricing & Mobile Quick Add */}
        <div className="mt-4 pt-3 border-t border-[#302719]/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-[#F8F4EC] tracking-tight tabular-nums">
              {formatPrice(product.pricePKR)}
            </span>
            {product.compareAtPricePKR > product.pricePKR && (
              <span className="text-xs text-[#A6A6A6] line-through tabular-nums">
                {formatPrice(product.compareAtPricePKR)}
              </span>
            )}
          </div>

          {/* Mobile direct Add to Cart button */}
          <button
            onClick={handleAddToCart}
            className="md:hidden p-2 bg-[#D4AF66] text-[#080808] rounded hover:bg-[#E6C98E] transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

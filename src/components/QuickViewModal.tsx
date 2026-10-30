import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Heart, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product ? product.colors[0] : null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) return null;

  const currentColor = selectedColor || product.colors[0];
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, currentColor, 1);
    showToast('Added to Shopping Bag', `${product.name} (${currentColor.name}) is in your cart.`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, currentColor, 1);
    onClose();
    navigate('/checkout');
  };

  const handleViewFullDetails = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#0e0e0e] border border-[#302719] shadow-2xl rounded-sm overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#A6A6A6] hover:text-[#F8F4EC] bg-[#080808]/70 rounded-full border border-[#302719] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery / Images (Left) */}
        <div className="md:w-1/2 p-6 flex flex-col bg-[#141414]">
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[#080808] border border-[#302719]">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-12 rounded border overflow-hidden shrink-0 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#D4AF66] opacity-100'
                      : 'border-[#302719] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details (Right) */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between text-xs text-[#A6A6A6] uppercase tracking-widest mb-1.5">
              <span>{product.category}</span>
              <span className="text-[#E6C98E]">SKU: {product.sku}</span>
            </div>

            <h2 className="font-serif text-2xl text-[#F8F4EC] font-medium leading-tight mb-2">
              {product.name}
            </h2>

            {/* Price block */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-xl font-semibold text-[#D4AF66] tabular-nums">
                {formatPrice(product.pricePKR)}
              </span>
              {product.compareAtPricePKR > product.pricePKR && (
                <span className="text-sm text-[#A6A6A6] line-through tabular-nums">
                  {formatPrice(product.compareAtPricePKR)}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="text-xs text-[#E6C98E] bg-[#302719]/60 px-2 py-0.5 border border-[#302719]">
                  {product.discountPercent}% Off
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-[#A6A6A6] leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Color selection */}
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-wider text-[#F8F4EC] mb-2">
                Color: <span className="text-[#D4AF66]">{currentColor.name}</span>
              </label>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs transition-all ${
                      currentColor.name === c.name
                        ? 'border-[#D4AF66] bg-[#1a1a1a] text-[#F8F4EC]'
                        : 'border-[#302719] text-[#A6A6A6] hover:border-[#A6A6A6]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/40"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions & Material quick specs */}
            <div className="grid grid-cols-2 gap-3 text-[11px] text-[#A6A6A6] py-3 border-y border-[#302719]/60 mb-6">
              <div>
                <span className="block text-[#F8F4EC] uppercase text-[10px] tracking-wider">Dimensions</span>
                <span>{product.dimensions}</span>
              </div>
              <div>
                <span className="block text-[#F8F4EC] uppercase text-[10px] tracking-wider">Material</span>
                <span className="line-clamp-1">{product.material}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 bg-[#111111] hover:bg-[#1a1a1a] text-[#F8F4EC] hover:text-[#E6C98E] border border-[#D4AF66] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 px-4 bg-[#D4AF66] hover:bg-[#E6C98E] text-[#080808] text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <span>Buy Now (COD)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="text-[#A6A6A6] hover:text-[#D4AF66] flex items-center gap-1.5 transition-colors"
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-[#D4AF66] text-[#D4AF66]' : ''}`} />
                <span>{isFavorited ? 'In Wishlist' : 'Save to Wishlist'}</span>
              </button>

              <button
                onClick={handleViewFullDetails}
                className="text-[#D4AF66] hover:text-[#E6C98E] underline underline-offset-4 tracking-wider uppercase text-[11px] transition-colors"
              >
                View Full Product Story →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

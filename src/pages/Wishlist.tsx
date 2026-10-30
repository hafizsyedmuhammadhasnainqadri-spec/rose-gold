import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';

export const Wishlist: React.FC = () => {
  const { wishlistProducts, toggleWishlist, clearWishlist, totalWishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { showToast } = useToast();

  const handleAddToCart = (product: any) => {
    addToCart(product, product.colors[0], 1);
    showToast('Added to Shopping Bag', `${product.name} is now in your bag.`, 'success');
  };

  if (totalWishlistCount === 0) {
    return (
      <div className="bg-[#080808] min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 rounded-full bg-[#111111] border border-[#302719] flex items-center justify-center text-[#D4AF66] mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl text-[#F8F4EC] mb-2">Your Private Wishlist Is Empty</h1>
        <p className="text-xs sm:text-sm text-[#A6A6A6] max-w-sm mb-8 leading-relaxed">
          Save your favorite luxury handbag silhouettes to track availability and craft curated ensemble bundles.
        </p>
        <Link
          to="/shop"
          className="py-3.5 px-8 bg-[#D4AF66] hover:bg-[#E6C98E] text-[#080808] text-xs uppercase tracking-widest font-bold shadow-xl transition-all"
        >
          Browse Silhouettes
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#080808] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-[#302719] mb-10 gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF66] font-semibold block mb-1">
              Curated Private Portfolio
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F8F4EC]">
              My Wishlist ({totalWishlistCount})
            </h1>
          </div>
          <button
            onClick={clearWishlist}
            className="text-xs text-[#A6A6A6] hover:text-red-400 transition-colors"
          >
            Clear All Saved Items
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#111111] border border-[#302719] rounded-sm overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative aspect-[4/3] bg-[#161616] overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-[#080808]/80 text-[#D4AF66] hover:text-red-400 border border-[#302719] transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A6A6A6]">{product.category}</span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-serif text-base text-[#F8F4EC] hover:text-[#E6C98E] transition-colors line-clamp-1 mt-0.5">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs font-semibold text-[#D4AF66] tabular-nums mt-2">
                    {formatPrice(product.pricePKR)}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#302719] flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 py-2.5 px-3 bg-[#D4AF66] hover:bg-[#E6C98E] text-[#080808] text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="p-2.5 bg-[#181818] hover:bg-[#202020] text-[#F8F4EC] border border-[#302719] rounded-sm transition-colors"
                    title="View Product"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

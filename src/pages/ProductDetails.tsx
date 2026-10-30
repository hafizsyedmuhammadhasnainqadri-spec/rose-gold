import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Star,
  Check,
  Minus,
  Plus,
  Share2,
  ZoomIn
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { BundleOffers } from '../components/BundleOffers';
import { Product, ProductColor } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = PRODUCTS.find((p) => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<'specs' | 'shipping' | 'care' | null>('specs');
  const [isZoomed, setIsZoomed] = useState(false);

  // Scroll to top on ID change
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
    if (product) {
      setSelectedColor(product.colors[0]);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="bg-[#080808] min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <h1 className="font-serif text-2xl text-[#F8F4EC] mb-3">Product Not Found</h1>
        <p className="text-xs text-[#A6A6A6] mb-6">
          The requested handbag is not in our active catalog.
        </p>
        <Link
          to="/shop"
          className="py-3 px-6 bg-[#D4AF66] text-[#080808] text-xs uppercase tracking-widest font-semibold hover:bg-[#E6C98E] transition-colors"
        >
          Return to Collection
        </Link>
      </div>
    );
  }

  const currentColor = selectedColor || product.colors[0];
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, currentColor, quantity);
    showToast(
      'Added to Shopping Bag',
      `${quantity}x ${product.name} (${currentColor.name}) placed in your bag.`,
      'success'
    );
  };

  const handleBuyNow = () => {
    addToCart(product, currentColor, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Product link copied to your clipboard.', 'info');
    }
  };

  // Related products from the same or adjacent categories
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-[#080808] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#A6A6A6] uppercase tracking-wider mb-8">
          <Link to="/" className="hover:text-[#F8F4EC]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#F8F4EC]">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#F8F4EC]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#D4AF66] line-clamp-1">{product.name}</span>
        </nav>

        {/* Main Product Presentation (Two Column Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-24 items-start">
          
          {/* Left Column: Gallery & Thumbnails (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Vertical/Horizontal Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 pb-2 md:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-sm overflow-hidden border transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#D4AF66] ring-1 ring-[#D4AF66] opacity-100'
                      : 'border-[#302719] opacity-60 hover:opacity-100 bg-[#141414]'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>

            {/* Featured Hero Large Image */}
            <div className="relative flex-1 aspect-[4/3] rounded-sm overflow-hidden bg-[#111111] border border-[#302719] group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-105 cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {/* Status pill tags */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 text-[10px] tracking-widest uppercase font-medium">
                {product.discountPercent > 0 && (
                  <span className="bg-[#080808]/90 text-[#E6C98E] px-2.5 py-1 border border-[#302719]">
                    Save {product.discountPercent}%
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-[#080808]/90 text-[#D4AF66] px-2.5 py-1 border border-[#302719]">
                    Best Seller
                  </span>
                )}
              </div>

              {/* Zoom hint button */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute bottom-4 right-4 p-2.5 rounded-full bg-[#080808]/80 text-[#F8F4EC] border border-[#302719] hover:text-[#D4AF66] transition-colors"
                title="Toggle Zoom"
                aria-label="Toggle zoom"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category, Rating & Wishlist */}
              <div className="flex items-center justify-between pb-2 border-b border-[#302719]/40 mb-3 text-xs text-[#A6A6A6]">
                <span className="uppercase tracking-[0.2em]">{product.category}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[#E6C98E]">
                    <Star className="w-3.5 h-3.5 fill-[#E6C98E]" />
                    <span className="font-semibold">{product.rating.toFixed(1)}</span>
                    <span className="text-[#A6A6A6]">({product.reviewCount} reviews)</span>
                  </div>
                  <button
                    onClick={handleShare}
                    className="hover:text-[#F8F4EC] transition-colors"
                    title="Share silhouette"
                    aria-label="Share"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-3xl sm:text-4xl text-[#F8F4EC] font-normal leading-tight mb-2">
                {product.name}
              </h1>

              {/* SKU & Stock indicator */}
              <div className="flex items-center gap-3 text-xs text-[#A6A6A6] mb-6">
                <span>SKU: <strong className="text-[#F8F4EC]">{product.sku}</strong></span>
                <span>·</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" /> In Stock ({product.stockCount} units remaining)
                </span>
              </div>

              {/* Price Banner */}
              <div className="bg-[#111111] border border-[#302719] p-4 rounded-sm mb-6 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-semibold text-[#D4AF66] tabular-nums tracking-tight">
                    {formatPrice(product.pricePKR)}
                  </span>
                  {product.compareAtPricePKR > product.pricePKR && (
                    <span className="ml-3 text-sm text-[#A6A6A6] line-through tabular-nums">
                      {formatPrice(product.compareAtPricePKR)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#A6A6A6]">Inclusive of all luxury duties</span>
              </div>

              {/* Short Story */}
              <p className="text-xs sm:text-sm text-[#A6A6A6] leading-relaxed mb-6">
                {product.detailedDescription}
              </p>

              {/* Color Swatch Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#F8F4EC] mb-2.5">
                  <span>Colorway:</span>
                  <span className="text-[#D4AF66] font-medium">{currentColor.name}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-sm border text-xs transition-all ${
                        currentColor.name === color.name
                          ? 'border-[#D4AF66] bg-[#181818] text-[#F8F4EC] ring-1 ring-[#D4AF66]'
                          : 'border-[#302719] bg-[#111111] text-[#A6A6A6] hover:border-[#A6A6A6]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/40"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8 flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-[#F8F4EC]">Quantity:</span>
                <div className="flex items-center border border-[#302719] bg-[#111111] rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#A6A6A6] hover:text-[#F8F4EC]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-semibold text-[#F8F4EC] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="p-2 text-[#A6A6A6] hover:text-[#F8F4EC]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Primary Action Buttons: ADD TO CART & BUY NOW */}
              <div className="space-y-3 mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-4 px-6 bg-[#111111] hover:bg-[#1a1a1a] text-[#F8F4EC] hover:text-[#E6C98E] border border-[#D4AF66] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D4AF66]" />
                    <span>ADD TO CART</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-4 px-6 bg-[#D4AF66] hover:bg-[#E6C98E] text-[#080808] text-xs uppercase tracking-[0.25em] font-bold flex items-center justify-center gap-2 transition-all shadow-xl"
                  >
                    <span>BUY NOW (COD)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="w-full py-2.5 px-4 bg-transparent border border-[#302719] hover:border-[#A6A6A6] text-xs text-[#A6A6A6] hover:text-[#F8F4EC] flex items-center justify-center gap-2 transition-colors"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-[#D4AF66] text-[#D4AF66]' : ''}`} />
                  <span>{isFavorited ? 'Saved to Private Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-[#302719]/60 text-center text-[10px] text-[#A6A6A6] uppercase tracking-wider">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#D4AF66]" />
                  <span>Insured Express</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF66]" />
                  <span>Cash on Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-[#D4AF66]" />
                  <span>14-Day Return</span>
                </div>
              </div>
            </div>

            {/* Accordions: Details, Materials, Care */}
            <div className="mt-6 divide-y divide-[#302719]/60 border-b border-[#302719]/60">
              
              {/* Accordion 1: Specifications & Materials */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'specs' ? null : 'specs')}
                  className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-wider text-[#F8F4EC] font-medium"
                >
                  <span>Materials & Hardware Specifications</span>
                  {openAccordion === 'specs' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'specs' && (
                  <div className="pb-4 text-xs text-[#A6A6A6] space-y-2 leading-relaxed">
                    <p><strong className="text-[#F8F4EC]">Material:</strong> {product.material}</p>
                    <p><strong className="text-[#F8F4EC]">Hardware:</strong> {product.hardware}</p>
                    <p><strong className="text-[#F8F4EC]">Dimensions:</strong> {product.dimensions}</p>
                    <p><strong className="text-[#F8F4EC]">Interior Lining:</strong> {product.lining}</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Shipping & COD Information */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-wider text-[#F8F4EC] font-medium"
                >
                  <span>Shipping & Cash on Delivery (COD)</span>
                  {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pb-4 text-xs text-[#A6A6A6] space-y-2 leading-relaxed">
                    <p>Orders are dispatched in signature magnetic velvet gift boxes with dust covers.</p>
                    <p><strong className="text-[#F8F4EC]">Domestic Delivery (Pakistan):</strong> 2–3 business days via TCS / Leopard Express with Cash on Delivery option.</p>
                    <p><strong className="text-[#F8F4EC]">International Shipping:</strong> 4–7 business days via DHL Express to USA, UK, Canada, UAE, and Europe.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Care Instructions */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                  className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-wider text-[#F8F4EC] font-medium"
                >
                  <span>Atelier Care & Longevity</span>
                  {openAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'care' && (
                  <div className="pb-4 text-xs text-[#A6A6A6] space-y-2 leading-relaxed">
                    <p>{product.careInstructions}</p>
                    <p>Complimentary annual leather rejuvenation is offered at our flagship service boutique.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 10: PRODUCT BUNDLE OFFER MODULE */}
        <BundleOffers />

        {/* RELATED PRODUCTS */}
        <div className="mt-24 pt-16 border-t border-[#302719]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF66] font-semibold block mb-1">
                Complementary Silhouettes
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F8F4EC]">
                You May Also Admire
              </h2>
            </div>
            <Link to="/shop" className="text-xs uppercase tracking-widest text-[#E6C98E] hover:text-[#D4AF66]">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

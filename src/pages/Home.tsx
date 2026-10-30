import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { HeroSlider } from '../components/HeroSlider';
import { ProductCard } from '../components/ProductCard';
import { BundleOffers } from '../components/BundleOffers';
import { QuickViewModal } from '../components/QuickViewModal';
import { PRODUCTS, COLLECTIONS, TESTIMONIALS } from '../data/products';
import { Product } from '../types';
import { useToast } from '../context/ToastContext';

export const Home: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const { showToast } = useToast();

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);
  const bestSellerProducts = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Invalid Email', 'Please provide a valid email address.', 'error');
      return;
    }
    setNewsletterSubscribed(true);
    showToast('Subscribed', 'Thank you for joining the Rose & Gold circle.', 'success');
  };

  return (
    <div className="bg-[#080808]">
      {/* SECTION B: HERO SECTION */}
      <HeroSlider />

      {/* SECTION C: BRAND INTRODUCTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with Subtle Gold Accent Frame */}
          <div className="relative group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#111111] border border-[#302719]">
              <img
                src="/src/assets/images/brand_craftsmanship_atelier_1793381776176.jpg"
                alt="Rose & Gold leather craftsmanship atelier"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Subtle decorative gold corner frame */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-r-2 border-b-2 border-[#D4AF66]/40 pointer-events-none -z-0" />
          </div>

          {/* Right Column: Brand Text & Heritage */}
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF66] font-semibold">
              The Heritage of Rose & Gold
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F8F4EC] font-normal leading-[1.2] text-balance">
              Luxury Is in Every Detail.
            </h2>
            <p className="text-xs sm:text-sm text-[#A6A6A6] leading-relaxed">
              At ROSE & GOLD, each silhouette is born from an uncompromising pursuit of harmony. We select only the upper five percent of full-grain French and Italian calfskin leathers, hand-burnishing every edge with organic beeswax and pairing them with 24K champagne gold galvanized hardware.
            </p>
            <p className="text-xs sm:text-sm text-[#A6A6A6] leading-relaxed">
              Designed to transcend ephemeral seasonal trends, our handbags are investments in enduring dignity, accompanying you seamlessly from executive suites in London and New York to soirees in Dubai and Lahore.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF66] hover:text-[#E6C98E] font-semibold border-b border-[#D4AF66] pb-1 transition-all"
              >
                <span>Read the Atelier Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: SHOP BY COLLECTION */}
      <section className="py-20 bg-[#0c0c0c] border-y border-[#302719]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF66] font-semibold block mb-2">
                Curated Silhouettes
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F8F4EC] font-normal">
                Shop by Collection
              </h2>
            </div>
            <Link
              to="/shop"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#E6C98E] hover:text-[#D4AF66] transition-colors"
            >
              <span>Explore All Silhouettes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLLECTIONS.map((col) => (
              <Link
                key={col.slug}
                to={`/shop?category=${encodeURIComponent(col.category)}`}
                className="group relative overflow-hidden rounded-sm bg-[#141414] border border-[#302719] hover:border-[#D4AF66] transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#181818]">
                  <img
                    src={col.image}
                    alt={col.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between flex-1 bg-[#111111]">
                  <div>
                    <h3 className="font-serif text-lg text-[#F8F4EC] group-hover:text-[#E6C98E] transition-colors">
                      {col.name}
                    </h3>
                    <p className="text-xs text-[#A6A6A6] mt-1.5 line-clamp-2 leading-relaxed">
                      {col.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#302719]/60 flex items-center justify-between text-xs text-[#D4AF66]">
                    <span className="uppercase tracking-wider text-[11px] font-medium">Explore</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION E: FEATURED PRODUCTS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF66] font-semibold block mb-2">
              Artisan Selections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F8F4EC] font-normal">
              Featured Creations
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-[#E6C98E] hover:text-[#D4AF66] transition-colors"
          >
            View Entire Catalog ({PRODUCTS.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* SECTION 10: PRODUCT BUNDLE OFFER CARDS */}
      <BundleOffers />

      {/* SECTION F: BEST SELLERS PREVIEW */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF66] font-semibold block mb-2">
              Patron Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F8F4EC] font-normal">
              Iconic Best Sellers
            </h2>
          </div>
          <Link
            to="/best-sellers"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 py-2 px-4 border border-[#302719] bg-[#111111] hover:border-[#D4AF66] text-xs uppercase tracking-widest text-[#F8F4EC] hover:text-[#E6C98E] transition-colors"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellerProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* SECTION G: BRAND EXPERIENCE */}
      <section className="py-20 bg-[#0c0c0c] border-y border-[#302719]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF66] font-semibold block mb-2">
              The Rose & Gold Promise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F8F4EC] font-normal">
              A Distinguished Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111111] border border-[#302719] p-8 rounded-sm text-center">
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-[#181818] border border-[#302719] flex items-center justify-center text-[#D4AF66]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#F8F4EC] mb-3">Premium Design</h3>
              <p className="text-xs text-[#A6A6A6] leading-relaxed">
                Sculptural proportions engineered to balance structural rigidity with day-long ergonomic comfort and intuitive access.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#302719] p-8 rounded-sm text-center">
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-[#181818] border border-[#302719] flex items-center justify-center text-[#D4AF66]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#F8F4EC] mb-3">Carefully Selected Quality</h3>
              <p className="text-xs text-[#A6A6A6] leading-relaxed">
                Single-origin hides certified for ethical sourcing, tanned under low-environmental impact protocols and burnished by hand.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#302719] p-8 rounded-sm text-center">
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-[#181818] border border-[#302719] flex items-center justify-center text-[#D4AF66]">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#F8F4EC] mb-3">Elegant Everyday Style</h3>
              <p className="text-xs text-[#A6A6A6] leading-relaxed">
                Versatile palettes and adaptable straps that elevate casual daylight ensembles into evening galas without pause.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION H: PROMOTIONAL BANNER */}
      <section className="relative py-28 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_handbag_campaign_1793381774762.jpg"
            alt="Promotional campaign"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25 filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-[#080808]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF66] font-semibold block mb-3">
            Haute Couture Accents
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F8F4EC] font-normal leading-tight mb-6 text-balance">
            Your Signature Style Starts Here.
          </h2>
          <p className="text-xs sm:text-sm text-[#A6A6A6] max-w-xl mx-auto leading-relaxed mb-8">
            Experience the tactile allure of fine leather craftsmanship. Every order includes insured dispatch, bespoke presentation boxing, and Cash on Delivery assurance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="py-4 px-9 bg-[#D4AF66] hover:bg-[#E6C98E] text-[#080808] text-xs uppercase tracking-[0.25em] font-bold shadow-xl transition-all"
            >
              SHOP NOW
            </Link>
            <Link
              to="/best-sellers"
              className="py-4 px-8 border border-[#302719] hover:border-[#D4AF66] text-[#F8F4EC] text-xs uppercase tracking-[0.2em] font-semibold transition-colors bg-[#080808]/70 backdrop-blur-sm"
            >
              BEST SELLERS
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION I: CUSTOMER TESTIMONIALS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF66] font-semibold block mb-2">
            Patron Reflections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F8F4EC] font-normal">
            Voices of Refinement
          </h2>
          <p className="text-xs text-[#A6A6A6] mt-2 italic">
            Demonstration customer testimonials reflecting authentic international patron experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#111111] border border-[#302719] p-8 rounded-sm flex flex-col justify-between"
            >
              <div>
                {/* 5 gold stars */}
                <div className="flex items-center gap-1 text-[#D4AF66] mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF66]" />
                  ))}
                </div>
                <p className="font-serif italic text-sm text-[#F8F4EC] leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#302719]/60">
                <p className="font-serif text-sm text-[#F8F4EC]">{t.name}</p>
                <div className="flex items-center justify-between text-xs text-[#A6A6A6] mt-0.5">
                  <span>{t.location}</span>
                  <span className="text-[#D4AF66] flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3 h-3" /> Verified Patron
                  </span>
                </div>
                <p className="text-[11px] text-[#A6A6A6] mt-1 font-medium">{t.productName}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION J: NEWSLETTER BANNER */}
      <section className="py-16 bg-[#0e0e0e] border-y border-[#302719]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Sparkles className="w-6 h-6 text-[#D4AF66] mx-auto mb-3" />
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F8F4EC] mb-2">
            Join the Rose & Gold Circle
          </h2>
          <p className="text-xs text-[#A6A6A6] max-w-md mx-auto mb-6">
            Receive private allocations, first notice of limited edition hardware, and seasonal lookbooks.
          </p>

          {newsletterSubscribed ? (
            <div className="p-4 bg-[#141414] border border-[#D4AF66] text-[#E6C98E] text-xs max-w-md mx-auto">
              ✓ You are now subscribed to the Rose & Gold Circle.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your personal email..."
                className="flex-1 bg-[#141414] border border-[#302719] px-4 py-3 text-xs text-[#F8F4EC] focus:outline-none focus:border-[#D4AF66]"
                required
              />
              <button
                type="submit"
                className="bg-[#D4AF66] text-[#080808] px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-[#E6C98E] transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

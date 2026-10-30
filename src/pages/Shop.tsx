import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, RotateCcw, Search } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { Product, ProductCategory } from '../types';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'newest'>('popularity');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [priceMaxPKR, setPriceMaxPKR] = useState<number>(55000);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Quick view
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync category param when URL changes
  React.useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const categories = ['All', 'Shoulder Bags', 'Tote Bags', 'Crossbody Bags', 'Evening Bags'];
  const allColors = ['All', 'Noir Black', 'Champagne Gold', 'Dusty Rose', 'Bordeaux Wine', 'Classic Ivory', 'Royal Emerald'];

  const filteredAndSortedProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // In stock
      if (onlyInStock && !product.inStock) {
        return false;
      }

      // Max price filter (PKR)
      if (product.pricePKR > priceMaxPKR) {
        return false;
      }

      // Color filter
      if (selectedColor !== 'All') {
        const hasColor = product.colors.some((c) =>
          c.name.toLowerCase().includes(selectedColor.toLowerCase())
        );
        if (!hasColor) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePKR - b.pricePKR;
      if (sortBy === 'price-desc') return b.pricePKR - a.pricePKR;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return b.rating * b.reviewCount - a.rating * a.reviewCount; // Popularity
    });
  }, [selectedCategory, searchQuery, sortBy, selectedColor, onlyInStock, priceMaxPKR]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('popularity');
    setSelectedColor('All');
    setOnlyInStock(false);
    setPriceMaxPKR(55000);
    setSearchParams({});
  };

  return (
    <div className="bg-[#080808] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner & Headline */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF66] font-semibold block mb-2">
            Haute Maroquinerie Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#F8F4EC] font-normal leading-tight">
            The Complete Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#A6A6A6] mt-3 leading-relaxed">
            Nine masterfully sculpted silhouettes crafted from top-grain leathers, 24K champagne gold electroplated hardware, and heirloom construction.
          </p>
        </div>

        {/* Filter & Sorting Controls Strip */}
        <div className="bg-[#111111] border border-[#302719] p-4 rounded-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  if (cat === 'All') setSearchParams({});
                  else setSearchParams({ category: cat });
                }}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium rounded transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF66] text-[#080808]'
                    : 'text-[#A6A6A6] hover:text-[#F8F4EC] hover:bg-[#1a1a1a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden flex items-center justify-center gap-2 py-2 px-4 bg-[#181818] border border-[#302719] text-xs uppercase tracking-wider text-[#F8F4EC] rounded"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#D4AF66]" />
            <span>Filter Silhouettes & Sort</span>
          </button>

          {/* Search within shop + Sort selection */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A6A6A6]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog..."
                className="w-full bg-[#161616] border border-[#302719] text-xs text-[#F8F4EC] pl-8 pr-3 py-2 rounded focus:outline-none focus:border-[#D4AF66]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-[#A6A6A6] hidden sm:inline">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#161616] border border-[#302719] text-xs text-[#F8F4EC] py-2 px-3 rounded focus:outline-none focus:border-[#D4AF66]"
              >
                <option value="popularity">Most Coveted</option>
                <option value="newest">Newest Additions</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer / Collapsible Box */}
        {mobileFiltersOpen && (
          <div className="lg:hidden bg-[#111111] border border-[#302719] p-4 rounded mb-8 space-y-4 animate-in fade-in">
            <div>
              <span className="block text-xs uppercase tracking-wider text-[#D4AF66] mb-2 font-medium">Category</span>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      if (cat === 'All') setSearchParams({});
                      else setSearchParams({ category: cat });
                    }}
                    className={`px-3 py-1.5 text-xs rounded ${
                      selectedCategory === cat
                        ? 'bg-[#D4AF66] text-[#080808] font-semibold'
                        : 'bg-[#181818] text-[#A6A6A6]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-wider text-[#D4AF66] mb-2 font-medium">Color Palette</span>
              <div className="flex flex-wrap gap-1.5">
                {allColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-2.5 py-1 text-xs rounded border ${
                      selectedColor === color
                        ? 'border-[#D4AF66] text-[#D4AF66] bg-[#1a1a1a]'
                        : 'border-[#302719] text-[#A6A6A6]'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <label className="flex items-center gap-2 text-xs text-[#F8F4EC] cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded border-[#302719] text-[#D4AF66] focus:ring-0"
                />
                <span>In Stock Only</span>
              </label>

              <button
                onClick={resetFilters}
                className="ml-auto text-xs text-[#A6A6A6] hover:text-[#D4AF66] flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>
          </div>
        )}

        {/* Results Counter and Active Filter Badges */}
        <div className="flex items-center justify-between text-xs text-[#A6A6A6] mb-6">
          <span>
            Showing <strong className="text-[#F8F4EC]">{filteredAndSortedProducts.length}</strong> of{' '}
            {PRODUCTS.length} silhouettes
          </span>

          {(selectedCategory !== 'All' || selectedColor !== 'All' || searchQuery || onlyInStock) && (
            <button
              onClick={resetFilters}
              className="text-[#D4AF66] hover:text-[#E6C98E] flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear active filters</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#111111]/40 border border-[#302719] rounded-sm p-8">
            <Filter className="w-10 h-10 text-[#302719] mx-auto mb-4" />
            <h3 className="font-serif text-xl text-[#F8F4EC] mb-2">No silhouettes match your criteria</h3>
            <p className="text-xs text-[#A6A6A6] max-w-sm mx-auto mb-6">
              Try adjusting your color preference or category filters to discover available designs.
            </p>
            <button
              onClick={resetFilters}
              className="py-3 px-6 bg-[#D4AF66] text-[#080808] text-xs uppercase tracking-widest font-semibold hover:bg-[#E6C98E] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

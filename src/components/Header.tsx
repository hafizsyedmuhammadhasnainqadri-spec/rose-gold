import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencyCode } from '../types';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const location = useLocation();

  const { totalQuantity, openCart } = useCart();
  const { totalWishlistCount } = useWishlist();
  const { currentCurrency, setCurrency, availableCurrencies, isLiveRates } = useCurrency();

  // Scroll listener for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCurrencyDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Best Sellers', path: '/best-sellers' },
    { label: 'New Arrivals', path: '/new-arrivals' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* SECTION A: Announcement Bar */}
      <div className="bg-[#111111] text-[#E6C98E] text-[11px] uppercase tracking-[0.25em] py-2 px-4 border-b border-[#302719] text-center font-medium transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <Sparkles className="w-3 h-3 text-[#D4AF66] shrink-0 hidden sm:inline" />
          <span>Discover Timeless Elegance · Complimentary Insured Shipping on Orders Over Rs. 30,000</span>
          <span className="hidden md:inline text-[#A6A6A6]">·</span>
          <span className="hidden md:inline text-[#A6A6A6] lowercase font-sans tracking-normal">Cash on Delivery Available</span>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-[#302719] shadow-xl py-3.5'
            : 'bg-[#080808]/80 backdrop-blur-sm border-b border-[#302719]/40 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#F8F4EC] hover:text-[#D4AF66] transition-colors focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#F8F4EC] hover:text-[#D4AF66] transition-colors"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Left / Brand Logo */}
          <Link
            to="/"
            className="flex flex-col items-center group shrink-0"
            aria-label="Rose & Gold Home"
          >
            <span className="font-serif text-xl sm:text-2xl md:text-3xl font-medium tracking-[0.2em] text-[#F8F4EC] group-hover:text-[#E6C98E] transition-colors whitespace-nowrap">
              ROSE & GOLD
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#D4AF66] -mt-1 font-sans">
              Haute Maroquinerie
            </span>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#D4AF66]'
                      : 'text-[#F8F4EC] hover:text-[#E6C98E]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D4AF66]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Currency Selector, Search, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-xs tracking-wider font-medium text-[#F8F4EC] hover:text-[#D4AF66] py-1.5 px-2 rounded border border-[#302719] bg-[#111111]/60 transition-colors"
                aria-label="Select currency"
              >
                <span>{currentCurrency}</span>
                <ChevronDown className="w-3 h-3 text-[#A6A6A6]" />
              </button>

              {currencyDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setCurrencyDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-[#111111] border border-[#302719] shadow-2xl rounded-md py-1.5 z-20">
                    <div className="px-3 py-1.5 border-b border-[#302719] text-[10px] uppercase tracking-wider text-[#A6A6A6] flex justify-between items-center">
                      <span>Select Currency</span>
                      {isLiveRates && <span className="text-[9px] text-[#D4AF66]">Live Rates</span>}
                    </div>
                    {availableCurrencies.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setCurrency(c.code as CurrencyCode);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                          currentCurrency === c.code
                            ? 'bg-[#302719]/40 text-[#D4AF66] font-semibold'
                            : 'text-[#F8F4EC] hover:bg-[#1a1a1a] hover:text-[#E6C98E]'
                        }`}
                      >
                        <span>{c.code} · {c.name}</span>
                        <span className="text-[#A6A6A6]">{c.symbol}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Desktop Search */}
            <button
              onClick={onOpenSearch}
              className="hidden lg:flex items-center justify-center p-2 text-[#F8F4EC] hover:text-[#D4AF66] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-[#F8F4EC] hover:text-[#D4AF66] transition-colors"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {totalWishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D4AF66] text-[#080808] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalWishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag / Cart */}
            <button
              onClick={openCart}
              className="relative p-2 text-[#F8F4EC] hover:text-[#D4AF66] transition-colors"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalQuantity > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#E6C98E] text-[#080808] text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in-50">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#080808] border-r border-[#302719] shadow-2xl flex flex-col justify-between p-6 z-10 animate-in slide-in-from-left duration-300">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-[#302719]">
                <div>
                  <span className="font-serif text-xl tracking-widest text-[#F8F4EC] block">
                    ROSE & GOLD
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF66]">
                    Luxury Handbags
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#A6A6A6] hover:text-[#F8F4EC] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-sm uppercase tracking-[0.2em] font-medium py-2 flex items-center justify-between border-b border-[#302719]/40 ${
                        isActive
                          ? 'text-[#D4AF66]'
                          : 'text-[#F8F4EC] hover:text-[#E6C98E]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="text-[#302719] text-xs">→</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Collections Quick Links in Drawer */}
              <div className="mt-8 pt-4">
                <p className="text-[10px] uppercase tracking-widest text-[#A6A6A6] mb-3">
                  Collections
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#F8F4EC]/80">
                  <Link to="/shop?category=Shoulder+Bags" className="hover:text-[#D4AF66] py-1">
                    Shoulder Bags
                  </Link>
                  <Link to="/shop?category=Tote+Bags" className="hover:text-[#D4AF66] py-1">
                    Tote Bags
                  </Link>
                  <Link to="/shop?category=Crossbody+Bags" className="hover:text-[#D4AF66] py-1">
                    Crossbody Bags
                  </Link>
                  <Link to="/shop?category=Evening+Bags" className="hover:text-[#D4AF66] py-1">
                    Evening Bags
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom concierge contact in mobile drawer */}
            <div className="pt-6 border-t border-[#302719] text-xs text-[#A6A6A6]">
              <p className="text-[#E6C98E] font-serif italic mb-1">Rose & Gold Concierge</p>
              <p>client@roseandgold.luxury</p>
              <p className="mt-1">+92 (0) 42 3578 9900</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

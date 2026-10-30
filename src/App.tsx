/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchOverlay } from './components/SearchOverlay';
import { CartDrawer } from './components/CartDrawer';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { BestSellers } from './pages/BestSellers';
import { NewArrivals } from './pages/NewArrivals';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { Wishlist } from './pages/Wishlist';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Policies } from './pages/Policies';

// Helper to scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);

  return (
    <BrowserRouter>
      <CurrencyProvider>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <div className="min-h-screen flex flex-col bg-[#080808] text-[#F8F4EC]">
                <ScrollToTop />

                {/* Sticky Luxury Header */}
                <Header onOpenSearch={() => setSearchOverlayOpen(true)} />

                {/* Search Overlay */}
                <SearchOverlay
                  isOpen={searchOverlayOpen}
                  onClose={() => setSearchOverlayOpen(false)}
                />

                {/* Slide-out Cart Drawer */}
                <CartDrawer />

                {/* Main Content Router */}
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/best-sellers" element={<BestSellers />} />
                    <Route path="/new-arrivals" element={<NewArrivals />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/shipping-policy" element={<Policies />} />
                    <Route path="/return-policy" element={<Policies />} />
                    <Route path="/privacy-policy" element={<Policies />} />
                    <Route path="/terms" element={<Policies />} />
                    <Route path="*" element={<Shop />} />
                  </Routes>
                </main>

                {/* Luxury Footer */}
                <Footer />
              </div>
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </CurrencyProvider>
    </BrowserRouter>
  );
}

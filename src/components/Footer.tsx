import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to the Circle', 'You have been enrolled in exclusive Rose & Gold previews.', 'success');
  };

  return (
    <footer className="bg-[#080808] border-t border-[#302719] text-[#A6A6A6] pt-16 pb-12">
      {/* Service Highlights Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-[#302719]/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 p-4 rounded bg-[#111111]/40 border border-[#302719]/40">
            <Truck className="w-6 h-6 text-[#D4AF66] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-[#F8F4EC] text-base mb-1">Insured Worldwide Delivery</h4>
              <p className="text-xs text-[#A6A6A6] leading-relaxed">
                Complimentary tracked dispatch on all orders over Rs. 30,000. Full coverage from atelier to doorstep.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded bg-[#111111]/40 border border-[#302719]/40">
            <ShieldCheck className="w-6 h-6 text-[#D4AF66] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-[#F8F4EC] text-base mb-1">Cash on Delivery & Authenticity</h4>
              <p className="text-xs text-[#A6A6A6] leading-relaxed">
                Inspect before paying with zero-risk Cash on Delivery (COD) across Pakistan and select regions.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded bg-[#111111]/40 border border-[#302719]/40">
            <RefreshCw className="w-6 h-6 text-[#D4AF66] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-[#F8F4EC] text-base mb-1">14-Day Complimentary Exchange</h4>
              <p className="text-xs text-[#A6A6A6] leading-relaxed">
                Effortless exchanges and returns in pristine presentation condition. Dedicated concierge service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Vision */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-medium tracking-[0.2em] text-[#F8F4EC]">
                ROSE & GOLD
              </span>
              <span className="block text-[9px] uppercase tracking-[0.35em] text-[#D4AF66]">
                Haute Maroquinerie
              </span>
            </Link>
            <p className="text-xs text-[#A6A6A6] leading-relaxed max-w-sm mb-6">
              Founded on the belief that true luxury is unspoken grace. Handcrafted in limited series using genuine full-grain leathers and jewelry-grade champagne gold hardware.
            </p>

            {/* Newsletter Subscription Box */}
            <div className="max-w-md">
              <h5 className="text-xs uppercase tracking-[0.2em] text-[#E6C98E] mb-2 font-medium">
                Join the Rose & Gold Circle
              </h5>
              <p className="text-xs text-[#A6A6A6] mb-3">
                Receive private invitations to seasonal private sales and limited atelier drops.
              </p>
              {subscribed ? (
                <div className="p-3 bg-[#111111] border border-[#302719] text-[#E6C98E] text-xs flex items-center gap-2">
                  <span>✓ You are on the private client list.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 bg-[#111111] border border-[#302719] px-4 py-2.5 text-xs text-[#F8F4EC] placeholder-[#A6A6A6]/60 focus:outline-none focus:border-[#D4AF66]"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#D4AF66] text-[#080808] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#E6C98E] transition-colors flex items-center justify-center shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h5 className="text-xs uppercase tracking-[0.2em] text-[#F8F4EC] mb-4 font-semibold">
              Explore
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-[#D4AF66] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#D4AF66] transition-colors">Shop All</Link>
              </li>
              <li>
                <Link to="/best-sellers" className="hover:text-[#D4AF66] transition-colors">Best Sellers</Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-[#D4AF66] transition-colors">New Arrivals</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D4AF66] transition-colors">About Our Atelier</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D4AF66] transition-colors">Client Concierge</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Collections */}
          <div>
            <h5 className="text-xs uppercase tracking-[0.2em] text-[#F8F4EC] mb-4 font-semibold">
              Collections
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/shop?category=Shoulder+Bags" className="hover:text-[#D4AF66] transition-colors">
                  Shoulder Bags
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Tote+Bags" className="hover:text-[#D4AF66] transition-colors">
                  Tote Bags
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Crossbody+Bags" className="hover:text-[#D4AF66] transition-colors">
                  Crossbody Bags
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Evening+Bags" className="hover:text-[#D4AF66] transition-colors">
                  Evening Bags & Clutches
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#D4AF66] transition-colors">
                  Shopping Bag & Bundles
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Services & Policies */}
          <div>
            <h5 className="text-xs uppercase tracking-[0.2em] text-[#F8F4EC] mb-4 font-semibold">
              Client Care
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/shipping-policy" className="hover:text-[#D4AF66] transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:text-[#D4AF66] transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#D4AF66] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#D4AF66] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#D4AF66] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>

            {/* Direct Contact mini */}
            <div className="mt-6 pt-4 border-t border-[#302719] text-xs space-y-1.5">
              <p className="flex items-center gap-2 text-[#F8F4EC]/80">
                <Mail className="w-3.5 h-3.5 text-[#D4AF66]" />
                <span>concierge@roseandgold.luxury</span>
              </p>
              <p className="flex items-center gap-2 text-[#F8F4EC]/80">
                <Phone className="w-3.5 h-3.5 text-[#D4AF66]" />
                <span>+92 42 3578 9900 / +971 4 800 7673</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#302719] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[#A6A6A6]">
            © {new Date().getFullYear()} ROSE & GOLD Haute Maroquinerie. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-[11px] text-[#A6A6A6]">
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>Visa</span>
            <span>·</span>
            <span>Mastercard</span>
            <span>·</span>
            <span>American Express</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

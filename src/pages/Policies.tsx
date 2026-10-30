import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw, FileText } from 'lucide-react';

export const Policies: React.FC = () => {
  const location = useLocation();

  // Determine active tab based on current pathname
  const getTabFromPath = () => {
    if (location.pathname.includes('shipping')) return 'shipping';
    if (location.pathname.includes('return')) return 'returns';
    if (location.pathname.includes('privacy')) return 'privacy';
    if (location.pathname.includes('terms')) return 'terms';
    return 'shipping';
  };

  const [activeTab, setActiveTab] = useState<'shipping' | 'returns' | 'privacy' | 'terms'>(getTabFromPath());

  useEffect(() => {
    setActiveTab(getTabFromPath());
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="bg-[#080808] min-h-screen py-16 text-[#A6A6A6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF66] font-semibold block mb-2">
            Legal & Client Assurance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#F8F4EC] font-normal leading-tight mb-4">
            Atelier Policies & Guidelines
          </h1>
          <p className="text-xs sm:text-sm text-[#A6A6A6]">
            Transparent terms safeguarding your acquisition of Rose & Gold limited leathercraft.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#302719] mb-10 overflow-x-auto">
          <Link
            to="/shipping-policy"
            className={`py-3 px-5 text-xs uppercase tracking-wider font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'shipping'
                ? 'border-[#D4AF66] text-[#D4AF66]'
                : 'border-transparent text-[#A6A6A6] hover:text-[#F8F4EC]'
            }`}
          >
            Shipping & Dispatch
          </Link>
          <Link
            to="/return-policy"
            className={`py-3 px-5 text-xs uppercase tracking-wider font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'returns'
                ? 'border-[#D4AF66] text-[#D4AF66]'
                : 'border-transparent text-[#A6A6A6] hover:text-[#F8F4EC]'
            }`}
          >
            Returns & Exchanges
          </Link>
          <Link
            to="/privacy-policy"
            className={`py-3 px-5 text-xs uppercase tracking-wider font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-[#D4AF66] text-[#D4AF66]'
                : 'border-transparent text-[#A6A6A6] hover:text-[#F8F4EC]'
            }`}
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className={`py-3 px-5 text-xs uppercase tracking-wider font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'terms'
                ? 'border-[#D4AF66] text-[#D4AF66]'
                : 'border-transparent text-[#A6A6A6] hover:text-[#F8F4EC]'
            }`}
          >
            Terms & Conditions
          </Link>
        </div>

        {/* Tab 1: Shipping Policy */}
        {activeTab === 'shipping' && (
          <div className="bg-[#111111] border border-[#302719] p-8 rounded-sm space-y-6 text-xs sm:text-sm leading-relaxed">
            <div className="flex items-center gap-3 text-[#D4AF66] pb-4 border-b border-[#302719]">
              <Truck className="w-5 h-5" />
              <h2 className="font-serif text-xl text-[#F8F4EC]">Shipping & Transit Policy</h2>
            </div>

            <section className="space-y-2">
              <h3 className="font-serif text-base text-[#F8F4EC]">1. Presentation & Packaging</h3>
              <p>
                Every Rose & Gold creation is nestled within a custom suede dust cover and encased in a signature magnetic presentation gift box lined with archival tissue and tied with a gold ribbon.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-base text-[#F8F4EC]">2. Domestic Delivery (Pakistan)</h3>
              <p>
                All orders are dispatched from our Lahore atelier within 24 business hours. Deliveries are fulfilled via TCS Express or Leopard Express with full transit insurance. Delivery timeline is 2 to 3 business days.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-base text-[#F8F4EC]">3. International Air Freight</h3>
              <p>
                International deliveries to the United States, Canada, the United Kingdom, United Arab Emirates, and Europe are handled via DHL Express Priority. Transit duration averages 4 to 7 business days with end-to-end tracking.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-base text-[#F8F4EC]">4. Cash on Delivery (COD) Inspection</h3>
              <p>
                When ordering via Cash on Delivery, customers are encouraged to inspect the exterior security seal of the package in the presence of the courier before providing payment.
              </p>
            </section>
          </div>
        )}

        {/* Tab 2: Return Policy */}
        {activeTab === 'returns' && (
          <div className="bg-[#111111] border border-[#302719] p-8 rounded-sm space-y-6 text-xs sm:text-sm leading-relaxed">
            <div className="flex items-center gap-3 text-[#D4AF66] pb-4 border-b border-[#302719]">
              <RefreshCw className="w-5 h-5" />
              <h2 className="font-serif text-xl text-[#F8F4EC]">Returns & Exchanges Policy</h2>
            </div>

            <section className="space-y-2">
              <h3 className="font-serif text-base text-[#F8F4EC]">1. 14-Day Inspection Privilege</h3>
              <p>
                We desire you to be delighted with your Rose & Gold handbag. You may request an exchange or refund within 14 calendar days of receiving your shipment.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-base text-[#F8F4EC]">2. Return Eligibility Criteria</h3>
              <p>
                To qualify for return, items must be in unused, unblemished condition with all protective hardware films intact, original dust bags, authenticity cards, and presentation boxing.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-base text-[#F8F4EC]">3. Return Courier Arrangement</h3>
              <p>
                Our concierge service will schedule a complimentary return courier collection from your doorstep. Once received and verified by our quality assurance team, refunds or exchanges are initiated within 48 hours.
              </p>
            </section>
          </div>
        )}

        {/* Tab 3: Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="bg-[#111111] border border-[#302719] p-8 rounded-sm space-y-6 text-xs sm:text-sm leading-relaxed">
            <div className="flex items-center gap-3 text-[#D4AF66] pb-4 border-b border-[#302719]">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="font-serif text-xl text-[#F8F4EC]">Client Privacy & Data Security</h2>
            </div>

            <section className="space-y-2">
              <h3 className="font-serif text-base text-[#F8F4EC]">1. Data Confidentiality</h3>
              <p>
                ROSE & GOLD treats client information with the utmost discretion. We never trade, rent, or disclose client names, addresses, or purchase history to third-party commercial marketing networks.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-base text-[#F8F4EC]">2. Information Collected</h3>
              <p>
                We collect only details necessary to fulfill your handbag dispatches: full name, shipping address, contact telephone, and email address for order notifications.
              </p>
            </section>
          </div>
        )}

        {/* Tab 4: Terms & Conditions */}
        {activeTab === 'terms' && (
          <div className="bg-[#111111] border border-[#302719] p-8 rounded-sm space-y-6 text-xs sm:text-sm leading-relaxed">
            <div className="flex items-center gap-3 text-[#D4AF66] pb-4 border-b border-[#302719]">
              <FileText className="w-5 h-5" />
              <h2 className="font-serif text-xl text-[#F8F4EC]">Terms of Service</h2>
            </div>

            <section className="space-y-2">
              <h3 className="font-serif text-base text-[#F8F4EC]">1. Intellectual Property & Brand Rights</h3>
              <p>
                All handbag designs, product names (including The Aurora Luxe, The Rose Signature, The Golden Muse, and others), editorial imagery, and brand marks are exclusive intellectual property of ROSE & GOLD Haute Maroquinerie.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif text-base text-[#F8F4EC]">2. Multi-Currency Display</h3>
              <p>
                Base prices are denominated in PKR. Foreign currency displays (USD, CAD, GBP, AED, EUR) are converted for client clarity using institutional reference rates.
              </p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

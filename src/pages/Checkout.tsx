import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, Lock, ArrowLeft, AlertCircle, Check, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { CheckoutFormData, PlacedOrder } from '../types';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotalPKR, bundleDiscountPKR, activeBundleTier, shippingPKR, totalPKR, clearCart } = useCart();
  const { currentCurrency, currencyConfig, formatPrice, convertPrice } = useCurrency();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    country: currentCurrency === 'PKR' ? 'Pakistan' : currentCurrency === 'AED' ? 'United Arab Emirates' : currentCurrency === 'GBP' ? 'United Kingdom' : currentCurrency === 'CAD' ? 'Canada' : 'United States',
    state: '',
    city: '',
    address: '',
    postalCode: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If bag is empty and no checkout can happen
  if (items.length === 0) {
    return (
      <div className="bg-[#080808] min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <h1 className="font-serif text-3xl text-[#F8F4EC] mb-2">No Items for Checkout</h1>
        <p className="text-xs text-[#A6A6A6] max-w-sm mb-6">
          Your shopping bag is currently empty. Please select a luxury handbag to proceed with order confirmation.
        </p>
        <Link
          to="/shop"
          className="py-3 px-6 bg-[#D4AF66] text-[#080808] text-xs uppercase tracking-widest font-bold hover:bg-[#E6C98E] transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full legal name is required.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required for receipt delivery.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required for dispatch courier coordination.';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      errs.phone = 'Please provide a valid telephone number with area code.';
    }

    if (!formData.address.trim()) {
      errs.address = 'Complete physical shipping street address is required.';
    }

    if (!formData.city.trim()) {
      errs.city = 'City of delivery is required.';
    }

    if (!formData.postalCode.trim()) {
      errs.postalCode = 'Postal / ZIP code is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simulate network submission and build realistic order object
    setTimeout(() => {
      const orderRef = `RG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderData: PlacedOrder = {
        orderId: `order-${Date.now()}`,
        orderNumber: orderRef,
        createdAt: new Date().toISOString(),
        customer: formData,
        items: [...items],
        subtotalPKR,
        bundleDiscountPKR,
        bundleTierName: activeBundleTier ? activeBundleTier.title : undefined,
        shippingPKR,
        totalPKR,
        currencyCode: currentCurrency,
        currencyRate: currencyConfig.rateFromPKR,
        totalInCurrency: convertPrice(totalPKR),
        paymentMethod: 'Cash on Delivery (COD)',
        estimatedDelivery: '3 to 5 Business Days via Insured Express Courier',
        status: 'Confirmed (Demo)'
      };

      // Persist in localStorage for OrderSuccess page & history
      localStorage.setItem('rg_latest_order', JSON.stringify(orderData));
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-success?ref=${orderRef}`);
    }, 1500);
  };

  return (
    <div className="bg-[#080808] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation back */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#A6A6A6] hover:text-[#D4AF66] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Shopping Bag</span>
        </Link>

        {/* Header */}
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF66] font-semibold block mb-1">
            Secure Concierge Checkout
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F8F4EC]">
            Cash on Delivery Order Confirmation
          </h1>
          <p className="text-xs text-[#A6A6A6] mt-2">
            Inspect your luxury presentation upon arrival before completing payment.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Form Fields: Left Column (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Card 1: Customer Contact Info */}
              <div className="bg-[#111111] border border-[#302719] p-6 sm:p-8 rounded-sm">
                <h2 className="font-serif text-lg text-[#F8F4EC] pb-3 border-b border-[#302719] mb-6 flex items-center justify-between">
                  <span>1. Client Information</span>
                  <span className="text-xs text-[#D4AF66] font-sans font-normal tracking-wide">Required</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[#A6A6A6] mb-1.5 font-medium">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Sophia Montgomery"
                      className={`w-full bg-[#161616] border ${
                        errors.fullName ? 'border-red-500' : 'border-[#302719]'
                      } text-xs text-[#F8F4EC] p-3 rounded focus:outline-none focus:border-[#D4AF66]`}
                    />
                    {errors.fullName && <p className="text-red-400 text-[11px] mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A6A6A6] mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="sophia@example.com"
                      className={`w-full bg-[#161616] border ${
                        errors.email ? 'border-red-500' : 'border-[#302719]'
                      } text-xs text-[#F8F4EC] p-3 rounded focus:outline-none focus:border-[#D4AF66]`}
                    />
                    {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A6A6A6] mb-1.5 font-medium">
                      Phone Number (For Courier) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+92 300 1234567"
                      className={`w-full bg-[#161616] border ${
                        errors.phone ? 'border-red-500' : 'border-[#302719]'
                      } text-xs text-[#F8F4EC] p-3 rounded focus:outline-none focus:border-[#D4AF66]`}
                    />
                    {errors.phone && <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Card 2: Shipping Destination */}
              <div className="bg-[#111111] border border-[#302719] p-6 sm:p-8 rounded-sm">
                <h2 className="font-serif text-lg text-[#F8F4EC] pb-3 border-b border-[#302719] mb-6 flex items-center justify-between">
                  <span>2. Delivery Destination</span>
                  <span className="text-xs text-[#D4AF66] font-sans font-normal tracking-wide">Courier Dispatch</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[#A6A6A6] mb-1.5 font-medium">
                      Country / Region *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full bg-[#161616] border border-[#302719] text-xs text-[#F8F4EC] p-3 rounded focus:outline-none focus:border-[#D4AF66]"
                    >
                      <option value="Pakistan">Pakistan (Domestic Dispatch · Express COD)</option>
                      <option value="United Arab Emirates">United Arab Emirates (Dubai & Abu Dhabi Hubs)</option>
                      <option value="United Kingdom">United Kingdom (London Central Concierge)</option>
                      <option value="United States">United States (DHL International Express)</option>
                      <option value="Canada">Canada (Express Air Freight)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[#A6A6A6] mb-1.5 font-medium">
                      Complete Shipping Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Suite, House / Apartment Number, Street Name, Sector or Area"
                      className={`w-full bg-[#161616] border ${
                        errors.address ? 'border-red-500' : 'border-[#302719]'
                      } text-xs text-[#F8F4EC] p-3 rounded focus:outline-none focus:border-[#D4AF66]`}
                    />
                    {errors.address && <p className="text-red-400 text-[11px] mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A6A6A6] mb-1.5 font-medium">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Lahore, Karachi, Dubai, London"
                      className={`w-full bg-[#161616] border ${
                        errors.city ? 'border-red-500' : 'border-[#302719]'
                      } text-xs text-[#F8F4EC] p-3 rounded focus:outline-none focus:border-[#D4AF66]`}
                    />
                    {errors.city && <p className="text-red-400 text-[11px] mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A6A6A6] mb-1.5 font-medium">
                      State / Province / Emirate
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="e.g. Punjab, Sindh, England, NY"
                      className="w-full bg-[#161616] border border-[#302719] text-xs text-[#F8F4EC] p-3 rounded focus:outline-none focus:border-[#D4AF66]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[#A6A6A6] mb-1.5 font-medium">
                      Postal / ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="e.g. 54000 or W1K 7AA"
                      className={`w-full bg-[#161616] border ${
                        errors.postalCode ? 'border-red-500' : 'border-[#302719]'
                      } text-xs text-[#F8F4EC] p-3 rounded focus:outline-none focus:border-[#D4AF66]`}
                    />
                    {errors.postalCode && <p className="text-red-400 text-[11px] mt-1">{errors.postalCode}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[#A6A6A6] mb-1.5 font-medium">
                      Delivery Instructions & Landmarking (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="e.g. Ring buzzer 4B or call on arrival"
                      className="w-full bg-[#161616] border border-[#302719] text-xs text-[#F8F4EC] p-3 rounded focus:outline-none focus:border-[#D4AF66]"
                    />
                  </div>
                </div>
              </div>

              {/* Card 3: Payment Method */}
              <div className="bg-[#111111] border border-[#302719] p-6 sm:p-8 rounded-sm">
                <h2 className="font-serif text-lg text-[#F8F4EC] pb-3 border-b border-[#302719] mb-4">
                  3. Payment Method
                </h2>

                <div className="p-4 bg-[#181818] border-2 border-[#D4AF66] rounded flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-[#D4AF66] flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF66]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base text-[#F8F4EC] flex items-center gap-2">
                      <span>Cash on Delivery (COD)</span>
                      <span className="text-[10px] bg-[#D4AF66]/20 text-[#E6C98E] px-2 py-0.5 border border-[#D4AF66]/40 uppercase tracking-wider font-sans font-medium">
                        Zero Risk
                      </span>
                    </h3>
                    <p className="text-xs text-[#A6A6A6] mt-1.5 leading-relaxed">
                      Pay conveniently in cash or via mobile payment upon delivery when the courier hands over your insured Rose & Gold package.
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-[#0a0a0a] border border-[#302719] text-xs text-[#A6A6A6] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF66] shrink-0" />
                  <span>
                    Your order is protected under our 14-day luxury exchange guarantee.
                  </span>
                </div>
              </div>
            </div>

            {/* Order Review Sidebar: Right Column (lg:col-span-5) */}
            <div className="lg:col-span-5">
              <div className="bg-[#111111] border border-[#302719] p-6 rounded-sm sticky top-28 space-y-6">
                <h2 className="font-serif text-xl text-[#F8F4EC] pb-3 border-b border-[#302719]">
                  Order Items ({items.length})
                </h2>

                {/* Items Mini List */}
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-3 border-b border-[#302719]/40">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded bg-[#181818] shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between text-xs">
                        <div>
                          <h4 className="font-serif text-sm text-[#F8F4EC] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] text-[#A6A6A6]">
                            Qty: {item.quantity} · Color: {item.selectedColor.name}
                          </p>
                        </div>
                        <span className="text-[#D4AF66] font-semibold tabular-nums">
                          {formatPrice(item.product.pricePKR * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculations breakdown */}
                <div className="space-y-2 text-xs text-[#A6A6A6] pt-2 border-t border-[#302719]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#F8F4EC] tabular-nums">{formatPrice(subtotalPKR)}</span>
                  </div>

                  {bundleDiscountPKR > 0 && (
                    <div className="flex justify-between text-[#E6C98E]">
                      <span>Bundle Savings ({activeBundleTier?.discountPercent}% Off)</span>
                      <span className="tabular-nums">- {formatPrice(bundleDiscountPKR)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Insured Courier Dispatch</span>
                    <span className="text-[#F8F4EC] tabular-nums">
                      {shippingPKR === 0 ? 'Complimentary' : formatPrice(shippingPKR)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-[#302719] flex justify-between text-base font-semibold text-[#F8F4EC]">
                    <span className="font-serif">Total Payable on Delivery</span>
                    <span className="text-[#D4AF66] tabular-nums text-xl">{formatPrice(totalPKR)}</span>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#D4AF66] hover:bg-[#E6C98E] disabled:opacity-60 text-[#080808] text-xs uppercase tracking-[0.25em] font-bold flex items-center justify-center gap-2 transition-all shadow-2xl cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>GENERATING ATELIER DISPATCH...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>CONFIRM MY ORDER</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-[#A6A6A6] leading-relaxed">
                  Demonstration Order Flow · By confirming, you agree to inspect your parcel upon arrival and provide the exact cash total to the courier.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, PackageCheck, Truck, ArrowRight, ShieldCheck, Download, Printer } from 'lucide-react';
import { PlacedOrder } from '../types';
import { useCurrency } from '../context/CurrencyContext';

export const OrderSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rg_latest_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  if (!order) {
    return (
      <div className="bg-[#080808] min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <h1 className="font-serif text-2xl text-[#F8F4EC] mb-2">No Active Order Confirmation Found</h1>
        <p className="text-xs text-[#A6A6A6] mb-6">
          If you recently placed an order, please review your confirmation email or contact our atelier concierge.
        </p>
        <Link
          to="/shop"
          className="py-3 px-6 bg-[#D4AF66] text-[#080808] text-xs uppercase tracking-widest font-semibold hover:bg-[#E6C98E] transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  const orderRef = searchParams.get('ref') || order.orderNumber;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#080808] min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card Header with subtle gold ring animation */}
        <div className="bg-[#111111] border border-[#302719] rounded-sm p-8 sm:p-12 text-center mb-8 relative overflow-hidden">
          {/* Subtle top gold accent bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#302719] via-[#D4AF66] to-[#302719]" />

          {/* Success Icon */}
          <div className="w-16 h-16 rounded-full bg-[#181818] border-2 border-[#D4AF66] flex items-center justify-center text-[#D4AF66] mx-auto mb-6 shadow-[0_0_25px_rgba(212,175,102,0.25)] animate-in zoom-in-75 duration-500">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF66] font-semibold block mb-2">
            Order Reference: {orderRef}
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#F8F4EC] font-normal leading-tight mb-3">
            Thank You for Choosing Rose & Gold!
          </h1>
          <p className="text-xs sm:text-sm text-[#A6A6A6] max-w-lg mx-auto leading-relaxed mb-6">
            Your demonstration order has been successfully recorded. Dear <strong className="text-[#F8F4EC]">{order.customer.fullName}</strong>, our master artisans are preparing your presentation box.
          </p>

          <div className="inline-flex items-center gap-2 p-3 bg-[#181818] border border-[#302719] rounded text-xs text-[#E6C98E]">
            <Truck className="w-4 h-4 text-[#D4AF66]" />
            <span>Estimated Delivery: {order.estimatedDelivery} (Clearly labeled estimate)</span>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-[#111111] border border-[#302719] rounded-sm p-6 sm:p-8 space-y-8">
          
          {/* Section 1: Dispatch Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-[#302719]">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#A6A6A6] block mb-1">
                Client & Dispatch Address
              </span>
              <p className="font-serif text-base text-[#F8F4EC]">{order.customer.fullName}</p>
              <p className="text-xs text-[#A6A6A6] mt-0.5">{order.customer.address}</p>
              <p className="text-xs text-[#A6A6A6]">
                {order.customer.city}, {order.customer.state} {order.customer.postalCode}
              </p>
              <p className="text-xs text-[#F8F4EC] mt-1">{order.customer.country}</p>
              <p className="text-xs text-[#A6A6A6] mt-1">Tel: {order.customer.phone}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#A6A6A6] block mb-1">
                Payment Method & Terms
              </span>
              <p className="font-serif text-base text-[#D4AF66]">Cash on Delivery (COD)</p>
              <p className="text-xs text-[#A6A6A6] mt-1 leading-relaxed">
                Please prepare the exact payment amount upon courier arrival. Inspect the seal and dust packaging before completing transaction.
              </p>
              <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 14-Day Complimentary Exchange Validated
              </p>
            </div>
          </div>

          {/* Section 2: Items Purchased */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#A6A6A6] block mb-4">
              Itemized Handbag Manifest
            </span>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 p-3 bg-[#161616] border border-[#302719] rounded">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded bg-[#080808]"
                    />
                    <div>
                      <h4 className="font-serif text-sm text-[#F8F4EC]">{item.product.name}</h4>
                      <p className="text-[11px] text-[#A6A6A6]">
                        Color: {item.selectedColor.name} · Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#D4AF66] tabular-nums">
                    {formatPrice(item.product.pricePKR * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Financial Summary */}
          <div className="pt-4 border-t border-[#302719] space-y-2 text-xs text-[#A6A6A6]">
            <div className="flex justify-between">
              <span>Manifest Subtotal</span>
              <span className="text-[#F8F4EC] tabular-nums">{formatPrice(order.subtotalPKR)}</span>
            </div>

            {order.bundleDiscountPKR > 0 && (
              <div className="flex justify-between text-[#E6C98E]">
                <span>Bundle Savings ({order.bundleTierName || 'Multi-Bag Discount'})</span>
                <span className="tabular-nums">- {formatPrice(order.bundleDiscountPKR)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Insured Courier Dispatch</span>
              <span className="text-[#F8F4EC] tabular-nums">
                {order.shippingPKR === 0 ? 'Complimentary' : formatPrice(order.shippingPKR)}
              </span>
            </div>

            <div className="pt-3 border-t border-[#302719] flex justify-between text-base font-semibold text-[#F8F4EC]">
              <span className="font-serif">Total Payable to Courier</span>
              <span className="text-[#D4AF66] tabular-nums text-xl">
                {formatPrice(order.totalPKR)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link
              to="/shop"
              className="flex-1 py-3.5 px-6 bg-[#D4AF66] hover:bg-[#E6C98E] text-[#080808] text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors text-center shadow-lg"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={handlePrint}
              className="py-3.5 px-6 bg-[#161616] hover:bg-[#202020] text-[#F8F4EC] border border-[#302719] text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Order Receipt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

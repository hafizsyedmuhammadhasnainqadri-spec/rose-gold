import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'Orders & Cash on Delivery (COD)',
    question: 'How does Cash on Delivery (COD) work?',
    answer: 'With Cash on Delivery, you make no upfront payment online. When our specialized luxury courier arrives at your shipping destination, you may inspect the sealed package and pay the exact order total in cash directly to the courier agent.'
  },
  {
    category: 'Orders & Cash on Delivery (COD)',
    question: 'Is Cash on Delivery available for all cities in Pakistan?',
    answer: 'Yes. We provide complete nationwide Cash on Delivery coverage across all major and regional cities including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and Sialkot.'
  },
  {
    category: 'Bundle Offers & Pricing',
    question: 'How do the Haute Ensemble Bundle discounts work?',
    answer: 'When you purchase 2 handbags in a single order, a 10% discount is automatically deducted from your entire product subtotal. When you purchase 3 or more handbags, you receive a 15% discount. You may mix and match any distinct models, silhouettes, and colorways.'
  },
  {
    category: 'Bundle Offers & Pricing',
    question: 'Can I choose different bag styles in my bundle?',
    answer: 'Absolutely. Our bundle builder is completely modular. You can combine a tote with an evening clutch, or two shoulder bags in different colorways. The system calculates the combined savings seamlessly.'
  },
  {
    category: 'Materials & Authenticity',
    question: 'What type of leather does Rose & Gold use?',
    answer: 'Every handbag is sculpted from single-origin French or Italian full-grain calfskin or lambskin. We never use faux leather, bonded leather, or split synthetics. You will receive an embossed Certificate of Craftsmanship with every bag.'
  },
  {
    category: 'Materials & Authenticity',
    question: 'Will the champagne gold hardware tarnish or discolor?',
    answer: 'Our hardware is cast in heavyweight solid alloy and electroplated with 24K champagne gold, followed by an invisible micro-ceramic protective coat that prevents tarnishing, oxidation, and scratches under standard luxury care.'
  },
  {
    category: 'Shipping & Delivery',
    question: 'How long does delivery take?',
    answer: 'Domestic deliveries within Pakistan take 2 to 3 business days via TCS or Leopard Express. International deliveries to the UAE, UK, USA, and Canada typically take 4 to 7 business days via DHL Express.'
  },
  {
    category: 'Shipping & Delivery',
    question: 'What are the shipping charges?',
    answer: 'We provide complimentary insured shipping on all orders over Rs. 30,000 (or equivalent international currency). For smaller orders, a standard insured courier fee of Rs. 2,500 applies.'
  },
  {
    category: 'Returns & Exchanges',
    question: 'What is your return and exchange policy?',
    answer: 'We offer a 14-day return and exchange policy from the date of delivery. Items must remain unused with all protective plastic films, tags, dust bags, and presentation boxes intact. Simply contact our concierge to schedule a complimentary courier pickup.'
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Orders & Cash on Delivery (COD)', 'Bundle Offers & Pricing', 'Materials & Authenticity', 'Shipping & Delivery', 'Returns & Exchanges'];

  const filteredFaqs = selectedCategory === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === selectedCategory);

  return (
    <div className="bg-[#080808] min-h-screen py-16 text-[#A6A6A6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF66] font-semibold block mb-2 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#F8F4EC] font-normal leading-tight mb-4">
            Curated Inquiries & Client Care
          </h1>
          <p className="text-xs sm:text-sm text-[#A6A6A6] leading-relaxed">
            Essential guidelines regarding our Cash on Delivery process, bundle discounts, artisanal leathers, and worldwide transit.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs rounded-sm border transition-colors ${
                selectedCategory === cat
                  ? 'border-[#D4AF66] bg-[#181818] text-[#D4AF66]'
                  : 'border-[#302719] text-[#A6A6A6] hover:text-[#F8F4EC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#111111] border border-[#302719] rounded-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#141414] transition-colors"
                >
                  <span className="font-serif text-sm sm:text-base text-[#F8F4EC]">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#D4AF66] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#A6A6A6] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#A6A6A6] leading-relaxed border-t border-[#302719]/50">
                    <p>{faq.answer}</p>
                    <span className="inline-block mt-3 text-[10px] uppercase tracking-wider text-[#D4AF66]">
                      {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom help prompt */}
        <div className="mt-14 p-6 bg-[#111111] border border-[#302719] rounded-sm text-center">
          <p className="font-serif text-base text-[#F8F4EC] mb-1">Have an unaddressed question?</p>
          <p className="text-xs text-[#A6A6A6] mb-4">
            Our atelier client advisors are available 7 days a week via email or WhatsApp.
          </p>
          <a
            href="/contact"
            className="inline-block py-2.5 px-6 bg-[#D4AF66] text-[#080808] text-xs uppercase tracking-widest font-semibold hover:bg-[#E6C98E] transition-colors"
          >
            Speak to a Concierge
          </a>
        </div>
      </div>
    </div>
  );
};

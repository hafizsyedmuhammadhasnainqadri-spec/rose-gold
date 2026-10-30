import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Compass, Shield, Sparkles, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-[#080808] min-h-screen py-16 text-[#A6A6A6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF66] font-semibold block mb-2">
            The House of Rose & Gold
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F8F4EC] font-normal leading-tight mb-6">
            Elegance Forged in Quiet Craftsmanship
          </h1>
          <p className="text-xs sm:text-sm text-[#A6A6A6] leading-relaxed">
            Founded with an unwavering vision: to restore reverence to the art of luxury leathercraft. In an era dominated by mass manufacturing, ROSE & GOLD creates limited architectural bags that celebrate feminine grace.
          </p>
        </div>

        {/* Story Section 1: The Atelier */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <div className="relative">
            <div className="aspect-[4/3] rounded-sm overflow-hidden bg-[#111111] border border-[#302719]">
              <img
                src="/src/assets/images/brand_craftsmanship_atelier_1793381776176.jpg"
                alt="Master leather craftsman in the atelier"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#111111] border border-[#302719] p-4 hidden sm:block max-w-xs">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF66] block font-semibold">
                Single-Origin Calfskin
              </span>
              <p className="text-[11px] text-[#A6A6A6] mt-1">
                Hand-selected from heritage tanneries across Tuscany and Normandy.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF66] font-semibold">
              The Artisan Benchmark
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F8F4EC] leading-snug">
              Every Stitch, a Decade of Discipline.
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed">
              Before a Rose & Gold handbag enters your custody, it undergoes over 38 individual artisanal procedures. From hand-skiving edge thickness to applying five coats of heat-sealed edge paint, no corners are ever truncated.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed">
              Our hardware is cast from solid alloy, double-galvanized in 24K champagne gold, and finished with a micro-brushed protective lacquer that resists scratches, tarnishing, and corrosion.
            </p>
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="py-16 border-y border-[#302719] mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF66] font-semibold block mb-1">
              Foundational Tenets
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F8F4EC]">
              Our Guiding Principles
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111111] border border-[#302719] p-8 rounded-sm">
              <Award className="w-8 h-8 text-[#D4AF66] mb-4" />
              <h4 className="font-serif text-lg text-[#F8F4EC] mb-2">Uncompromising Materials</h4>
              <p className="text-xs text-[#A6A6A6] leading-relaxed">
                We reject bonded or split leathers. Only genuine full-grain hides possessing natural texture and breathability are deemed worthy.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#302719] p-8 rounded-sm">
              <Compass className="w-8 h-8 text-[#D4AF66] mb-4" />
              <h4 className="font-serif text-lg text-[#F8F4EC] mb-2">Global Heritage</h4>
              <p className="text-xs text-[#A6A6A6] leading-relaxed">
                Bridging classic Eastern poise with European couture aesthetics, serving distinguished clients in Lahore, London, Dubai, and New York.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#302719] p-8 rounded-sm">
              <Shield className="w-8 h-8 text-[#D4AF66] mb-4" />
              <h4 className="font-serif text-lg text-[#F8F4EC] mb-2">Patron Assurance</h4>
              <p className="text-xs text-[#A6A6A6] leading-relaxed">
                We stand behind every design with risk-free Cash on Delivery and a 14-day inspection privilege.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center max-w-xl mx-auto pb-10">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#F8F4EC] mb-4">
            Experience the Collection Firsthand
          </h3>
          <p className="text-xs text-[#A6A6A6] mb-8 leading-relaxed">
            Discover the nine inaugural silhouettes and choose an ensemble bundle to elevate your wardrobe.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 py-3.5 px-8 bg-[#D4AF66] hover:bg-[#E6C98E] text-[#080808] text-xs uppercase tracking-widest font-bold shadow-xl transition-all"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

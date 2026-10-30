import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Slide {
  id: number;
  headline: string;
  subheading: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  kicker: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    kicker: 'L’Atelier Collection · Edition 2026',
    headline: 'Elegance That Speaks Without Words.',
    subheading: 'Discover handbags designed to complement your style and elevate every moment with hand-burnished leathers and champagne gold accents.',
    ctaText: 'SHOP COLLECTION',
    ctaLink: '/shop',
    image: '/src/assets/images/hero_handbag_campaign_1793381774762.jpg'
  },
  {
    id: 2,
    kicker: 'Couture Craftsmanship · International Icons',
    headline: 'Carry Confidence. Wear Elegance.',
    subheading: 'Explore our exclusive collection of sophisticated handbags crafted for the discerning modern woman across the globe.',
    ctaText: 'EXPLORE BEST SELLERS',
    ctaLink: '/best-sellers',
    image: '/src/assets/images/hero_handbag_collection_1793381775635.jpg'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative w-full h-[620px] sm:h-[680px] lg:h-[740px] bg-[#080808] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Campaign Hero Carousel"
    >
      {/* Slides */}
      {SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Cinematic Scrim */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.headline}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center transform transition-transform duration-10000 ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
              {/* Luxury dark gradient overlays ensuring WCAG AA readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/80 to-transparent lg:w-3/4" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/40" />
            </div>

            {/* Slide Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="max-w-xl lg:max-w-2xl">
                {/* Kicker */}
                <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#D4AF66] font-semibold mb-4">
                  {slide.kicker}
                </span>

                {/* Headline */}
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F8F4EC] font-normal leading-[1.15] tracking-tight mb-4 text-balance">
                  {slide.headline}
                </h1>

                {/* Subheading */}
                <p className="text-xs sm:text-sm md:text-base text-[#A6A6A6] font-light leading-relaxed mb-8 max-w-lg">
                  {slide.subheading}
                </p>

                {/* Primary CTA */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to={slide.ctaLink}
                    className="py-3.5 px-8 bg-[#D4AF66] hover:bg-[#E6C98E] text-[#080808] text-xs uppercase tracking-[0.25em] font-bold transition-all shadow-xl flex items-center gap-2 group"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/shop"
                    className="py-3.5 px-6 border border-[#302719] bg-[#080808]/60 hover:border-[#D4AF66] text-[#F8F4EC] hover:text-[#E6C98E] text-xs uppercase tracking-[0.2em] font-medium transition-colors backdrop-blur-sm"
                  >
                    View Lookbook
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Manual Arrow Controls */}
      <div className="absolute bottom-10 right-8 sm:right-12 z-20 flex items-center gap-2">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-[#111111]/80 hover:bg-[#1a1a1a] text-[#F8F4EC] hover:text-[#D4AF66] border border-[#302719] transition-colors backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-[#111111]/80 hover:bg-[#1a1a1a] text-[#F8F4EC] hover:text-[#D4AF66] border border-[#302719] transition-colors backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Pagination Line / Dot Indicators */}
      <div className="absolute bottom-10 left-4 sm:left-8 lg:left-12 z-20 flex items-center gap-3">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(idx)}
            className="group py-2 flex items-center"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <span
              className={`h-[2px] transition-all duration-300 ${
                currentSlide === idx
                  ? 'w-10 bg-[#D4AF66]'
                  : 'w-4 bg-[#302719] group-hover:bg-[#A6A6A6]'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

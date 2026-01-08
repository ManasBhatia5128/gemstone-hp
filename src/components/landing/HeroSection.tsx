'use client';

import React from 'react';
import { Gem, CheckCircle, Star } from 'lucide-react';

export function HeroSection() {
  const scrollToBooking = () => {
    const element = document.getElementById('booking-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="hero-section min-h-screen flex items-center justify-center pt-20 pb-16"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="hero-content text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-[#BCA182]" fill="#BCA182" />
            <span className="font-mono text-xs uppercase tracking-wide text-[#353535]">
              Trusted by 10,000+ Indians
            </span>
          </div>

          <h1 className="heading-hero text-[#232323] mb-6">
            Sacred Solutions for Your Life Problems —
            <br />
            <span className="text-[#987D9C]">
              No Guesswork, Only Verified Gemstone Remedies
            </span>
          </h1>

          <p className="body-large text-[#353535] mb-8 max-w-2xl mx-auto">
            Get a <span className="font-semibold text-[#232323]">personal video consultation</span> with 
            certified astrologers for just <span className="font-semibold text-[#232323]">₹251</span> — 
            find your exact lucky gemstone + life guidance.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-10">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#768597]" />
              <span className="body-small text-[#353535]">
                Career, Money, Marriage, Health
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#768597]" />
              <span className="body-small text-[#353535]">
                Birth Chart Based — No Generic Stones
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#768597]" />
              <span className="body-small text-[#353535]">
                Temple-Charged Authentic Gemstones
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={scrollToBooking}
              className="btn-primary text-base px-8 py-4 flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <Gem className="w-5 h-5" />
              <span>Book My Personal Gemstone Consultation @ ₹251</span>
            </button>
            <p className="caption text-[#353535]">
              Limited slots available • Video consultation • Instant booking
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

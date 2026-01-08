'use client';

import React from 'react';
import { Gem } from 'lucide-react';

export function CTAStrip() {
  const scrollToBooking = () => {
    const element = document.getElementById('booking-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-[#232323]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-1 text-white mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="body-medium text-white/70 mb-8">
            Don&apos;t wait any longer. Find your exact gemstone remedy for just ₹251 
            and bring positive changes to your life.
          </p>
          <button
            onClick={scrollToBooking}
            className="bg-white text-[#232323] rounded-full px-8 py-4 font-mono text-sm uppercase tracking-wide font-medium flex items-center gap-3 mx-auto hover:bg-[#FFF9F2] hover:scale-105 transition-all"
          >
            <Gem className="w-5 h-5" />
            <span>Start My Sacred Consultation @ ₹251</span>
          </button>
        </div>
      </div>
    </section>
  );
}

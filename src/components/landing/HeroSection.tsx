'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Gem, CheckCircle, Star, Sparkles, MousePointerClick } from 'lucide-react';

export function HeroSection() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 12391;
    const duration = 3000; 
    const intervalTime = 20; 
    const steps = duration / intervalTime;
    const increment = target / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(current));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const scrollToBooking = () => {
    const element = document.getElementById('booking-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="hero-section relative min-h-screen flex items-center justify-center py-8 overflow-hidden bg-gradient-to-b from-purple-50 to-white"
    >
      {/* ========================================= */}
      {/* 1. MOBILE ONLY: Sticky Floating Button    */}
      {/* ========================================= */}
      <button 
        onClick={scrollToBooking}
        // FIXED: Changed absolute -> fixed, top-20 to sit below nav, z-50
        className="md:hidden fixed top-20 right-4 z-50 animate-bounce group"
      >
        <div className="relative px-5 py-2.5 bg-yellow-400 rounded-full shadow-xl border-2 border-white flex items-center gap-2">
          <span className="text-purple-900 font-extrabold text-xs uppercase tracking-wider">
            Book Now
          </span>
          <MousePointerClick className="w-4 h-4 text-purple-900 fill-purple-900" />
          
          {/* Ping Effect */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
        </div>
      </button>


      {/* ========================================= */}
      {/* 2. DESKTOP ONLY: Sticky Flashy Card       */}
      {/* ========================================= */}
      {/* FIXED: Positioned 'fixed' independently from the layout flow */}
      <div className="hidden md:flex fixed top-12 right-8 z-50">
         <div 
           onClick={scrollToBooking}
           className="group cursor-pointer relative transform rotate-6 hover:rotate-0 transition-all duration-300 ease-in-out"
         >
           <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
           <div className="relative px-6 py-4 bg-yellow-300 ring-2 ring-yellow-500/50 rounded-lg leading-none flex items-center space-x-3 shadow-xl animate-[bounce_2s_infinite]">
             <Sparkles className="w-6 h-6 text-purple-700 animate-spin-slow" />
             <div className="flex flex-col items-start">
                <span className="text-purple-900 font-black text-lg uppercase tracking-wider">Book Now!</span>
                <span className="text-purple-800 text-[10px] font-bold">Only ₹251</span>
             </div>
             <MousePointerClick className="w-5 h-5 text-purple-700" />
           </div>
         </div>
      </div>


      {/* ========================================= */}
      {/* 3. MAIN CONTENT CONTAINER                 */}
      {/* ========================================= */}
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="hero-content text-center max-w-6xl mx-auto">
          
          {/* --- TOP ROW LAYOUT --- */}
          {/* Using a 30% - 40% - 30% split to keep the heading centered */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 w-full mt-12 md:mt-0">
            
            {/* LEFT: Trusted By Stats (30%) */}
            <div className="flex flex-col items-center md:items-start md:text-left w-full md:w-[30%]">
              <div className="flex items-center gap-2 mb-1">
                 <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 animate-pulse" />
                 <span className="font-serif text-[#270404] text-xs md:text-sm uppercase tracking-widest whitespace-nowrap">
                   Trusted By
                 </span>
                 <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 animate-pulse" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-[#7e3878] font-mono leading-tight">
                {count.toLocaleString('en-IN')}
              </h2>
              <span className="text-[#555] text-xs md:text-sm font-medium">Happy Indians</span>
            </div>

            {/* CENTER: Main Headline (40%) */}
            <div className="w-full md:w-[40%] flex justify-center">
              <h1 className="heading-hero text-[#232323] text-3xl md:text-4xl font-bold leading-tight max-w-md">
                A good gemstone can get you:  
              </h1>
            </div>

            {/* RIGHT: GHOST SPACER (30%) */}
            {/* This empty div balances the layout so the center stays centered */}
            <div className="hidden md:block md:w-[30%]"></div>
          </div>


          {/* Benefits List */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-[#7a2488] mb-8">
            <div className="flex items-center gap-2 text-lg md:text-xl font-serif font-medium hover:scale-105 transition-transform">
              <CheckCircle className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
              <span>A good partner</span>
            </div>
            <div className="flex items-center gap-2 text-lg md:text-xl font-serif font-medium hover:scale-105 transition-transform">
              <CheckCircle className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
              <span>A lot of money</span>
            </div>
            <div className="flex items-center gap-2 text-lg md:text-xl font-serif font-medium hover:scale-105 transition-transform">
              <CheckCircle className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
              <span>Health Benefits</span>
            </div>
          </div>

          {/* --- IMAGE SECTION --- */}
          <div className="relative w-full max-w-4xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[#7a2488]/30 transition-shadow border-4 border-white">
            <Image 
              src="/hero-img.png" 
              alt="Gemstone Consultation"
              // IMPORTANT: Update these numbers to your actual image dimensions
              width={1200} 
              height={800}
              className="w-full h-auto hover:scale-105 transition-transform duration-1000 ease-in-out"
              priority
            />
          </div>

          {/* Bottom Subtext & CTA */}
          <div className="max-w-2xl mx-auto">
            <p className="body-large text-[#353535] mb-8 text-sm md:text-base leading-relaxed">
              Get a <span className="font-semibold text-[#232323]">personal consultation</span> with 
              certified astrologers for just <span className="font-semibold text-[#232323]">₹251</span> — 
              find your exact lucky gemstone + life guidance.
            </p>

            <button
              onClick={scrollToBooking}
              className="btn-primary bg-[#7a2488] text-white rounded-full text-sm md:text-lg px-10 py-4 flex items-center justify-center gap-3 mx-auto hover:scale-105 transition-transform shadow-lg hover:shadow-2xl hover:bg-[#651e70] w-full md:w-auto"
            >
              <Gem className="w-5 h-5 md:w-6 md:h-6" />
              <span>Book My Personal Gemstone Consultation @ ₹251</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
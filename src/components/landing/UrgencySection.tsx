'use client';

import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, Gem } from 'lucide-react';

export function UrgencySection() {
  const [slotsLeft, setSlotsLeft] = useState(17);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const slotTimer = setInterval(() => {
      setSlotsLeft((prev) => (prev > 5 ? prev - 1 : prev));
    }, 45000);

    return () => clearInterval(slotTimer);
  }, []);

  const scrollToBooking = () => {
    const element = document.getElementById('booking-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatTime = (num: number) => String(num).padStart(2, '0');

  return (
    <section className="py-12 bg-gradient-to-r from-[#FCC9C7] via-[#FEEFDC] to-[#FCC9C7]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <AlertTriangle className="w-4 h-4 text-[#BCA182]" />
            <span className="font-mono text-sm text-[#232323]">
              Limited Slots Warning
            </span>
          </div>

          <div className="mb-6">
            <span className="heading-hero text-[#232323]">
              Only <span className="text-[#987D9C]">{slotsLeft}</span> Consultations Left Today
            </span>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <Clock className="w-5 h-5 text-[#353535]" />
            <div className="flex items-center gap-2 font-mono text-xl text-[#232323]">
              <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                {formatTime(timeLeft.hours)}
              </div>
              <span>:</span>
              <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                {formatTime(timeLeft.minutes)}
              </div>
              <span>:</span>
              <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                {formatTime(timeLeft.seconds)}
              </div>
            </div>
          </div>

          <p className="body-medium text-[#353535] mb-8">
            Next batch of slots opens <span className="font-semibold">tomorrow morning</span>. 
            Book now to avoid waiting!
          </p>

          <button
            onClick={scrollToBooking}
            className="btn-primary text-base px-8 py-4 flex items-center gap-3 mx-auto hover:scale-105 transition-transform"
          >
            <Gem className="w-5 h-5" />
            <span>Start My Sacred Consultation @ ₹251</span>
          </button>
        </div>
      </div>
    </section>
  );
}

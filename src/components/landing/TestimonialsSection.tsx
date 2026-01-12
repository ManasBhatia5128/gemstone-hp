'use client';

import React, { useState, useEffect, useRef, TouchEvent } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  city: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  { 
    id: 1, 
    name: "Rohit Sharma", 
    city: "Delhi", 
    rating: 5, 
    text: "Bhai 3 months mein job lag gayi finally! Pehle 2 astrologers ne galat stone chipka diya tha. Humara Pandit ki calculation ekdum accurate nikli. Blue Sapphire suit kar gaya boss. " 
  },
  { 
    id: 2, 
    name: "Priya Verma", 
    city: "Mumbai", 
    rating: 5, 
    text: "5 saal se wait kar rahi thi marriage ke liye . Yellow Sapphire pehne ke baad 4 mahine mein hi rishta pakka ho gaya!  Thank you so much, really grateful." 
  },
  { 
    id: 3, 
    name: "Amit Gupta", 
    city: "Bangalore", 
    rating: 5, 
    text: "Yaar business mein continuous loss ho raha tha. Emerald (Panna) ne game change kar diya. Ab profits double ho gaye hain. Highly recommended! 📈💰" 
  },
  { 
    id: 4, 
    name: "Neha Joshi", 
    city: "Jaipur", 
    rating: 5, 
    text: "Health issues samajh hi nahi aa rahe the pehle. Jab se Pearl (Moti) pehna hai, kafi better feel ho raha hai. The astrologer knows his stuff. " 
  },
  { 
    id: 5, 
    name: "Vikram Singh", 
    city: "Pune", 
    rating: 5, 
    text: "Pehle online patthar mangwaya tha, koi asar nahi hua. Yahan se certified stone liya aur 2 mahine mein promotion mil gaya! Quality matters bhai." 
  },
  { 
    id: 6, 
    name: "Sunita Devi", 
    city: "Lucknow", 
    rating: 5, 
    text: "Ghar mein bahut negativity aur kalesh rehta tha. Gomed pehne ke baad ab kaafi shanti hai. 🙏 Inke temple-charged stones mein alag hi power hai." 
  }
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const minSwipeDistance = 50;

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Swipe handlers
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) next();
    if (isRightSwipe) prev();
  };

  return (
    <section id="testimonials" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#FEEFDC] text-[#BCA182] rounded-full px-4 py-2 mb-4">
            <span className="font-mono text-xs uppercase tracking-wide">Real Stories</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#232323]">Real Experiences from <br /> Real People</h2>
          <p className="text-[#353535] mt-4 max-w-xl mx-auto">
            Over 10,000 people have transformed their lives with Humara Pandit
          </p>
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div className="hidden md:block max-w-2xl mx-auto relative">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="min-w-full px-2">
                  <div className="bg-[#FFF9F2] rounded-xl p-8 border border-[#E9E1E1] h-full">
                    <Quote className="w-8 h-8 text-[#E9E1E1] mb-4" />
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#BCA182]" fill="#BCA182" />)}
                    </div>
                    <p className="text-lg text-[#353535] mb-6">&quot;{t.text}&quot;</p>
                    <div className="border-t border-[#E9E1E1] pt-4">
                      <p className="font-bold text-[#232323]">{t.name}</p>
                      <p className="text-sm text-[#353535]">{t.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- MOBILE VIEW (With Swiping) --- */}
        <div 
          className="md:hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="bg-[#FFF9F2] rounded-xl p-6 border border-[#E9E1E1] min-h-75 flex flex-col justify-between">
            <div>
              <Quote className="w-8 h-8 text-[#E9E1E1] mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#BCA182]" fill="#BCA182" />)}
              </div>
              <p className="text-[#353535] leading-relaxed italic">
                &quot;{testimonials[activeIndex].text}&quot;
              </p>
            </div>
            <div className="border-t border-[#E9E1E1] pt-4 mt-4">
              <p className="font-bold text-[#232323]">{testimonials[activeIndex].name}</p>
              <p className="text-sm text-[#353535]">{testimonials[activeIndex].city}</p>
            </div>
          </div>
        </div>

        {/* --- SHARED CONTROLS (Dots & Buttons) --- */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="p-2 rounded-full border border-[#E9E1E1] hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === activeIndex ? 'bg-[#232323] scale-125' : 'bg-[#E9E1E1]'
                }`}
              />
            ))}
          </div>

          <button onClick={next} className="p-2 rounded-full border border-[#E9E1E1] hover:bg-gray-100 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
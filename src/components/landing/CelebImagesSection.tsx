"use client";

import React from 'react';

const CELEB_IDS = [
  "0_j3czmj",
  "1_nmlu7k",
  "2_hxritp",
  "3_e8ialy",
  "4_kol5kz",
  "5_ye2wvw",
  "6_alhlmy",
  "7_lycmuc"
];

const BASE_URL = "https://res.cloudinary.com/dsnjojobi/image/upload/f_auto,q_auto/";

export function CelebImagesSection() {
  const scrollingImages = [...CELEB_IDS, ...CELEB_IDS];

  return (
    <section className="py-4 md:py-8 overflow-hidden bg-white">
      <div className="container mx-auto px-4 mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#232323]">
          Trusted by the Trendsetters
        </h2>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="flex animate-scroll hover:paused items-center">
          {scrollingImages.map((id, index) => (
            // 1. The Outer Container used for margins
            <div key={index} className="shrink-0 mx-2 md:mx-4">

                 {/* 2. THE NEW FRAME WRAPPER */}
                 {/* This div holds the size, borders, radius, and MASKS overflow */}
                 <div className="h-48 md:h-80 overflow-hidden border-3 border-black rounded-4xl relative">
                   <img
                     src={`${BASE_URL}${id}`}
                     alt={`Celebrity ${index % CELEB_IDS.length + 1}`}
                     /* 3. THE IMAGE */
                     /* It fills the wrapper height (h-full) and scales on hover. */
                     /* Borders and rounding are removed from here. */
                     className="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
                     loading="lazy"
                   />
                 </div>

            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white via-white/20 to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white via-white/20 to-transparent z-10"></div>
      </div>
    </section>
  );
}
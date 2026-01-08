"use client";

import React from 'react';

const IMAGE_COUNT = 8;
const IMAGE_PATH = '/celeb_images/';

export function CelebImagesSection() {
  const imageIndices = Array.from({ length: IMAGE_COUNT }, (_, i) => i);

  return (
    <section className="py-4 md:py-8 overflow-hidden bg-white">
      <div className="container mx-auto px-4 mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#232323]">
          Celebrity Blessings
        </h2>
      </div>

      <div className="relative flex overflow-hidden">
        <div 
          className="flex whitespace-nowrap items-center group" 
          style={{
            display: 'flex',
            width: 'max-content',
            // Speed updated to 10 seconds
            animation: 'scroll-infinite 1s linear infinite',
          }}
        >
          {[...imageIndices, ...imageIndices].map((idx, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-2 md:mx-4"
            >
              <img
                src={`${IMAGE_PATH}/${idx}.png`}
                alt={`Celebrity ${idx + 1}`}
                className="h-48 md:h-80 w-auto object-contain transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <style jsx global>{`
          @keyframes scroll-infinite {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          /* Pause the 10s sprint when the user interacts */
          .group:hover {
            animation-play-state: paused !important;
          }
        `}</style>

        {/* Edge Gradient Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/20 to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/20 to-transparent z-10"></div>
      </div>
    </section>
  );
}
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
        {/* 'animate-scroll' now maps to the variable we added in globals.css */}
        <div className="flex animate-scroll hover:[animation-play-state:paused] items-center">
          {[...imageIndices, ...imageIndices].map((idx, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-2 md:mx-4"
            >
              <img
                src={`${IMAGE_PATH}/${idx}.png`}
                alt={`Celebrity ${idx + 1}`}
                /* Removed card wrapper, height-driven sizing */
                className="h-48 md:h-80 w-auto object-contain transition-transform duration-300 hover:scale-105 border-3 border-black rounded-4xl"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Edge Gradient Fades for polish */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/20 to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/20 to-transparent z-10"></div>
      </div>
    </section>
  );
}
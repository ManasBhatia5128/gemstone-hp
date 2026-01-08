import React from 'react';

const trustStats = [
  { value: "10,000+", label: "Consultations Completed" },
  { value: "4.9★", label: "Average Rating" },
  { value: "100%", label: "Birth Chart Based Remedies" },
  { value: "Pan-India", label: "Delivery" }
];

export function TrustBar() {
  return (
    <section className="bg-white py-8 border-y border-[#E9E1E1]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="heading-2 text-[#232323] mb-1">{stat.value}</div>
              <div className="caption text-[#353535]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

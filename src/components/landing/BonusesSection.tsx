import React from 'react';
import { Palette, BookOpen, Sparkles, Gift } from 'lucide-react';

const bonuses = [
  {
    id: 1,
    title: "Personal Lucky Colour & Number",
    description: "Your lucky colour and number based on your birth chart that you can use in daily life",
    value: "Worth ₹199"
  },
  {
    id: 2,
    title: "Free 7-Day Mantra Remedy Guide",
    description: "Complete guide of powerful mantras to chant daily along with your stone",
    value: "Worth ₹299"
  },
  {
    id: 3,
    title: "Stone Energization Ritual",
    description: "Every stone is energized in temple with sacred rituals before delivery",
    value: "Worth ₹499"
  }
];

const icons = [Palette, BookOpen, Sparkles];

export function BonusesSection() {
  return (
    <section className="py-20 bg-[#FFF9F2]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[#F9E8FA] text-[#987D9C] rounded-full px-4 py-2 mb-4">
            <Gift className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-wide">Free Bonuses</span>
          </span>
          <h2 className="heading-1 text-[#232323]">
            FREE with Your Consultation
          </h2>
          <p className="body-medium text-[#353535] mt-4 max-w-xl mx-auto">
            All these extra bonuses are included in your ₹251 consultation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {bonuses.map((bonus, index) => {
            const IconComponent = icons[index];
            return (
              <div
                key={bonus.id}
                className="relative bg-white rounded-xl p-6 border border-[#E9E1E1] hover:border-[#987D9C] transition-all hover:shadow-lg group overflow-hidden"
              >
                <div className="absolute top-4 right-4 bg-[#b8d1ba] text-[#232323] rounded-full px-3 py-1">
                  <span className="font-mono text-xs">{bonus.value}</span>
                </div>

                <div className="w-14 h-14 rounded-xl bg-[#F9E8FA] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-7 h-7 text-[#987D9C]" />
                </div>

                <h3 className="heading-3 text-[#232323] mb-2 pr-16">{bonus.title}</h3>
                <p className="body-small text-[#353535]">{bonus.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <p className="body-medium text-[#353535]">
            Total Value: <span className="line-through">₹997</span>
            <span className="font-semibold text-[#232323] ml-2">You get it FREE!</span>
          </p>
        </div>
      </div>
    </section>
  );
}

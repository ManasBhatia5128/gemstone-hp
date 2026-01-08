import React from 'react';
import { FileText, Video, Package } from 'lucide-react';

const howItWorks = [
  {
    step: 1,
    title: "Fill Basic Details",
    description: "Enter your name, birth date, time and place"
  },
  {
    step: 2,
    title: "Talk to Certified Astrologer",
    description: "Get personal consultation via video call"
  },
  {
    step: 3,
    title: "Get Exact Gemstone + Remedy",
    description: "Temple-charged stone delivered to your home with wearing guide"
  }
];

const icons = [FileText, Video, Package];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#E4EDF8] text-[#768597] rounded-full px-4 py-2 mb-4">
            <span className="font-mono text-xs uppercase tracking-wide">Simple 3-Step Process</span>
          </span>
          <h2 className="heading-1 text-[#232323]">
            How Does It Work?
          </h2>
          <p className="body-medium text-[#353535] mt-4 max-w-xl mx-auto">
            Get your exact gemstone remedy in just 3 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {howItWorks.map((step, index) => {
            const IconComponent = icons[index];
            return (
              <div
                key={step.step}
                className="relative text-center group"
              >
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-[#E9E1E1]" />
                )}
                
                <div className="relative z-10 mx-auto w-32 h-32 rounded-full bg-[#FFF9F2] border border-[#E9E1E1] flex items-center justify-center mb-6 group-hover:border-[#987D9C] transition-colors">
                  <div className="text-center">
                    <span className="font-mono text-xs text-[#353535] uppercase">Step</span>
                    <div className="heading-2 text-[#232323]">{step.step}</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-[#E9E1E1] hover:border-[#987D9C] transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-[#F9E8FA] flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-[#987D9C]" />
                  </div>
                  <h3 className="heading-3 text-[#232323] mb-2">{step.title}</h3>
                  <p className="body-small text-[#353535]">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

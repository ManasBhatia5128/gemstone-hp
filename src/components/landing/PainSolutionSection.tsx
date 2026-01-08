import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react';

const painPoints = [
  { text: 'Random gemstones fail because they don\'t match your birth chart' },
  { text: 'Money gets wasted on fake or low-quality stones' },
  { text: 'Wrong stones can make your problems worse' },
  { text: 'Without proper energization, stones are useless' },
];

const solutions = [
  { text: 'Birth chart based exact stone selection' },
  { text: '100% authentic certified gemstones' },
  { text: 'Temple energized with sacred rituals' },
  { text: 'Personal guidance from expert astrologers' },
];

export function PainSolutionSection() {
  return (
    <section className="py-20 bg-[#FFF9F2]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[#FEEFDC] text-[#BCA182] rounded-full px-4 py-2 mb-4">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-wide">Why Most Gemstones Fail</span>
          </span>
          <h2 className="heading-1 text-[#232323]">
            Are You Making These Mistakes Too?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl p-8 border border-[#E9E1E1]">
            <h3 className="heading-3 text-[#232323] mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#FCC9C7] flex items-center justify-center">
                <XCircle className="w-4 h-4 text-[#232323]" />
              </span>
              Common Problems
            </h3>
            <div className="space-y-4">
              {painPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-[#BCA182] shrink-0 mt-0.5" />
                  <p className="body-medium text-[#353535]">{point.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 border border-[#E9E1E1]">
            <h3 className="heading-3 text-[#232323] mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#b8d1ba] flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#232323]" />
              </span>
              Humara Pandit Solution
            </h3>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#768597] shrink-0 mt-0.5" />
                  <p className="body-medium text-[#353535]">{solution.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="body-large text-[#232323] max-w-2xl mx-auto">
            Humara Pandit gives you an <span className="font-semibold">ethical, scientific and sacred approach</span> — 
            with birth chart analysis, expert consultation and temple-charged stones all included.
          </p>
        </div>
      </div>
    </section>
  );
}

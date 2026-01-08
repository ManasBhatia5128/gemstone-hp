import React from 'react';
import { TrendingUp, Briefcase, Heart, Shield, Eye, Sparkles, LucideIcon } from 'lucide-react';

interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const benefits: Benefit[] = [
  {
    id: 1,
    title: "Wealth & Money Growth",
    description: "Powerful gemstone remedies for financial stability and growth",
    icon: "TrendingUp"
  },
  {
    id: 2,
    title: "Career Stability",
    description: "Exact stone guidance for job, promotion and business success",
    icon: "Briefcase"
  },
  {
    id: 3,
    title: "Love & Marriage Fix",
    description: "Permanent solution for relationship problems and marriage delays",
    icon: "Heart"
  },
  {
    id: 4,
    title: "Health Protection",
    description: "Protective gemstones for physical and mental health",
    icon: "Shield"
  },
  {
    id: 5,
    title: "Evil Eye / Negative Energy Removal",
    description: "Complete protection from evil eye and negative vibes",
    icon: "Eye"
  },
  {
    id: 6,
    title: "Mental Peace & Confidence",
    description: "Remove anxiety and stress, boost inner peace and confidence",
    icon: "Sparkles"
  }
];

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Briefcase,
  Heart,
  Shield,
  Eye,
  Sparkles,
};

const accentColors = [
  { bg: 'bg-[#FEEFDC]', icon: 'text-[#BCA182]' },
  { bg: 'bg-[#E4EDF8]', icon: 'text-[#768597]' },
  { bg: 'bg-[#FCC9C7]', icon: 'text-[#987D9C]' },
  { bg: 'bg-[#b8d1ba]', icon: 'text-[#4a7c59]' },
  { bg: 'bg-[#F9E8FA]', icon: 'text-[#987D9C]' },
  { bg: 'bg-[#E9E1E1]', icon: 'text-[#768597]' },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 bg-[#FFF9F2]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#b8d1ba] text-[#232323] rounded-full px-4 py-2 mb-4">
            <span className="font-mono text-xs uppercase tracking-wide">Gemstone Benefits</span>
          </span>
          <h2 className="heading-1 text-[#232323]">
            Solutions for Every Life Problem
          </h2>
          <p className="body-medium text-[#353535] mt-4 max-w-xl mx-auto">
            The right gemstone can improve every area of your life
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon];
            const colors = accentColors[index % accentColors.length];
            
            return (
              <div
                key={benefit.id}
                className="bg-white rounded-xl p-6 border border-[#E9E1E1] hover:border-[#999999] transition-all hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className={`w-7 h-7 ${colors.icon}`} />
                </div>
                <h3 className="heading-3 text-[#232323] mb-2">{benefit.title}</h3>
                <p className="body-small text-[#353535]">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import {
  Header,
  HeroSection,
  TrustBar,
  PainSolutionSection,
  HowItWorksSection,
  BenefitsSection,
  TestimonialsSection,
  BonusesSection,
  UrgencySection,
  FAQSection,
  BookingForm,
  CTAStrip,
  Footer,
} from '@/components/landing';

import { CelebImagesSection } from '@/components/landing/CelebImagesSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF9F2]">
      <Header />
      <main>
        <HeroSection />
        <TrustBar />
        <CelebImagesSection />
        <TestimonialsSection />
        <PainSolutionSection />
        <HowItWorksSection />
        <BenefitsSection /> 
        <BonusesSection />
        <UrgencySection />
        <BookingForm />
        <FAQSection />
        <CTAStrip />
      </main>
      <Footer />
    </div>
  );
}

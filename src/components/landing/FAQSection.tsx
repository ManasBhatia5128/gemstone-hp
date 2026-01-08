'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "Is this real? How can I trust you?",
    answer: "Humara Pandit is India's trusted faith-tech platform. All our astrologers are certified and our stones are genuine quality. Over 10,000 successful consultations and a 4.9 rating proves our credibility."
  },
  {
    id: 2,
    question: "How is the stone selected?",
    answer: "Your birth chart is created from your exact birth details (date, time, place). Then the position of planets is analyzed scientifically to determine which stone will benefit you. We don't give generic stones."
  },
  {
    id: 3,
    question: "What if I already wear a stone?",
    answer: "The astrologer will analyze your current stone during the consultation. If it's the wrong stone, you'll need to remove it immediately, and the right stone will be recommended with the proper wearing time."
  },
  {
    id: 4,
    question: "When will I see results?",
    answer: "Authentic stone results usually show within 21-90 days. Everyone's birth chart is different, so the timeline varies. Patience and faith are important."
  },
  {
    id: 5,
    question: "Is this safe? Any side effects?",
    answer: "A birth chart based stone is completely safe. Problems occur when you wear the wrong stone. That's why expert consultation is necessary. We only recommend beneficial stones."
  },
  {
    id: 6,
    question: "Can I cancel? What's the refund policy?",
    answer: "You can cancel the consultation 24 hours before with full refund. Cancellation is not possible after the stone order because each stone is specifically energized before delivery."
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[#E4EDF8] text-[#768597] rounded-full px-4 py-2 mb-4">
            <HelpCircle className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-wide">Common Questions</span>
          </span>
          <h2 className="heading-1 text-[#232323]">
            Frequently Asked Questions
          </h2>
          <p className="body-medium text-[#353535] mt-4 max-w-xl mx-auto">
            Here are answers to some common questions
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`item-${faq.id}`}
                className="bg-[#FFF9F2] rounded-xl border border-[#E9E1E1] px-6 data-[state=open]:border-[#987D9C] transition-colors"
              >
                <AccordionTrigger className="text-left heading-3 text-[#232323] hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="body-medium text-[#353535] pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

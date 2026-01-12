'use client';

import React, { useState, useEffect } from 'react';
const NAV_SECTIONS = [
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
];
import { Menu, X } from 'lucide-react';

const LOGO_URL = '/hp_logo.png';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      // Find the currently visible section
      let found = '';
      for (const section of NAV_SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            found = section.id;
            break;
          }
        }
      }
      setActiveSection(found);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-yellow-50 backdrop-blur-md shadow-sm font-red'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <img 
              src={LOGO_URL} 
              alt="Humara Pandit" 
              className="h-12 w-auto"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-base font-bold text-[#353535] hover:text-[#232323] transition-all duration-200 transform hover:scale-110 pb-2 relative ${
                  activeSection === section.id ? 'after:content-[""] after:block after:h-1 after:w-[90%] after:bg-black after:rounded-full after:mx-auto after:mt-1' : ''
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#232323]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#E9E1E1] py-4">
            <nav className="flex flex-col gap-4">
              {NAV_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={
                    'text-left px-4 py-2 text-[#353535] font-bold text-base hover:bg-[#FFF9F2] transition-all duration-200 transform hover:scale-105'
                  }
                >
                  {section.label}
                </button>
              ))}
              <div className="px-4 pt-2">
                <button
                  onClick={() => scrollToSection('booking-form')}
                  className="btn-primary w-full font-bold text-base transition-all duration-200 transform hover:scale-105"
                >
                  Book Now @ ₹251
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

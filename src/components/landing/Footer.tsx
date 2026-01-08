import React from 'react';
import { Phone, Mail, MapPin, Shield, AlertTriangle, Heart } from 'lucide-react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_humara-pandit/artifacts/zuqvly06_hplogo.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#232323] text-white">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={LOGO_URL} 
                alt="Humara Pandit" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-white/70 body-small mb-6 max-w-sm">
              India&apos;s trusted faith-tech platform providing authentic gemstone remedies 
              through verified astrologers and temple-charged stones.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/70">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Verified Astrologers</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Heart className="w-4 h-4" />
                <span className="text-sm">10,000+ Happy Clients</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#how-it-works" className="text-white/70 hover:text-white transition-colors text-sm">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#benefits" className="text-white/70 hover:text-white transition-colors text-sm">
                  Benefits
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-white/70 hover:text-white transition-colors text-sm">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white/70 hover:text-white transition-colors text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2 text-white/70 text-sm">
                <Mail className="w-4 h-4" />
                <span>support@humarapandit.com</span>
              </li>
              <li className="flex items-start gap-2 text-white/70 text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#BCA182] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-sm mb-2">Spiritual & Karmic Disclaimer</h5>
                  <p className="text-white/60 text-xs leading-relaxed">
                    Gemstone remedies are based on Vedic astrology principles. Results vary 
                    based on individual karma and planetary positions. We do not provide medical or 
                    financial advice. Gemstones are spiritual tools and we do not claim guaranteed 
                    results.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#768597] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-sm mb-2">Anti-Fraud Warning</h5>
                  <p className="text-white/60 text-xs leading-relaxed">
                    Only book through the official Humara Pandit website. Beware of fake accounts 
                    and unauthorized sellers. Make payments only through official channels. 
                    No stone is authentic without a certificate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-xs">
              <span className="font-semibold text-white/80">Refund Policy:</span> Consultation 
              can be cancelled 24 hours before with full refund. Cancellation is not possible 
              after stone order because each stone is specifically energized before delivery.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-xs">
              © {currentYear} Humara Pandit. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/50 hover:text-white/80 text-xs transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/50 hover:text-white/80 text-xs transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/50 hover:text-white/80 text-xs transition-colors">
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React, { useState, useCallback } from 'react';
import { Gem, User, Calendar, Clock, MapPin, Phone, Loader2, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    contact: string;
    email: string;
  };
  notes: Record<string, string>;
  theme: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal: {
    ondismiss: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface FormData {
  name: string;
  phone: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  problem: string;
}

export function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    problem: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const loadRazorpayScript = useCallback(() => {
    return new Promise<boolean>((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const handlePayment = useCallback(async (bookingData: { id: string; name: string; phone: string }) => {
    setIsProcessingPayment(true);
    
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay. Please refresh and try again.');
      }

      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_id: bookingData.id,
          name: bookingData.name,
          phone: bookingData.phone,
          email: null
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create payment order');
      }

      const orderData = await orderResponse.json();

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Humara Pandit',
        description: 'Gemstone Consultation Fee',
        order_id: orderData.order_id,
        prefill: {
          name: orderData.prefill.name,
          contact: orderData.prefill.contact,
          email: orderData.prefill.email
        },
        notes: {
          booking_id: bookingData.id
        },
        theme: {
          color: '#232323'
        },
        handler: async function (response: RazorpayResponse) {
          try {
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                booking_id: bookingData.id
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              setPaymentId(response.razorpay_payment_id);
              setIsSubmitted(true);
            }
          } catch (err) {
            console.error('Payment verification error:', err);
            setError('Payment verification failed. Please contact support with your payment ID.');
          }
          setIsProcessingPayment(false);
        },
        modal: {
          ondismiss: function () {
            setIsProcessingPayment(false);
            setError('Payment was cancelled. Your booking is saved. You can complete payment later.');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Payment initialization failed. Please try again.');
      setIsProcessingPayment(false);
    }
  }, [loadRazorpayScript]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const bookingData = {
        name: formData.name,
        phone: formData.phone,
        birth_date: formData.birthDate,
        birth_time: formData.birthTime || null,
        birth_place: formData.birthPlace,
        problem: formData.problem || null,
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Booking failed');
      }

      const createdBooking = await response.json();
      
      setBookingId(createdBooking._id);
      setIsSubmitting(false);
      
      await handlePayment({
        id: createdBooking._id,
        name: formData.name,
        phone: formData.phone
      });
      
    } catch (err) {
      console.error('Booking error:', err);
      setError(err instanceof Error ? err.message : 'Booking failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="booking-form" className="py-20 bg-gradient-to-b from-[#FFF9F2] to-[#FEEFDC]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-10 border border-[#E9E1E1] shadow-lg">
              <div className="w-20 h-20 rounded-full bg-[#b8d1ba] flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-[#232323]" />
              </div>
              <h3 className="heading-2 text-[#232323] mb-4">
                Payment Successful!
              </h3>
              <p className="body-medium text-[#353535] mb-6">
                Your payment has been received. Our team will call you 
                <span className="font-semibold"> within 30 minutes</span> to 
                schedule your consultation.
              </p>
              {bookingId && (
                <div className="bg-[#E4EDF8] rounded-xl p-4 border border-[#768597]/30 mb-4">
                  <p className="caption text-[#768597] mb-1">Booking Reference</p>
                  <p className="font-mono text-sm text-[#232323]">{bookingId}</p>
                </div>
              )}
              {paymentId && (
                <div className="bg-[#b8d1ba]/30 rounded-xl p-4 border border-[#b8d1ba] mb-4">
                  <p className="caption text-[#4a7c59] mb-1">Payment ID</p>
                  <p className="font-mono text-sm text-[#232323]">{paymentId}</p>
                </div>
              )}
              <div className="bg-[#FFF9F2] rounded-xl p-4 border border-[#E9E1E1]">
                <p className="caption text-[#353535]">
                  Confirmation will also be sent via WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking-form" className="py-20 bg-gradient-to-b from-[#FFF9F2] to-[#FEEFDC]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-[#232323] text-white rounded-full px-4 py-2 mb-4">
              <Gem className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-wide">Book Now</span>
            </span>
            <h2 className="heading-1 text-[#232323]">
              Start Your Sacred Consultation
            </h2>
            <p className="body-medium text-[#353535] mt-4">
              Fill in your details and book your personal consultation for ₹251
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-[#FCC9C7] rounded-xl border border-red-300 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="body-small text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-[#E9E1E1] shadow-lg">
            <div className="space-y-5">
              <div>
                <label className="block body-small text-[#232323] mb-2 font-medium">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    minLength={2}
                    disabled={isSubmitting || isProcessingPayment}
                    className="w-full pl-12 pr-4 py-3 border border-[#999999] rounded-xl bg-white text-[#232323] placeholder:text-[#999999] focus:border-[#4D4D4D] focus:outline-none focus:ring-2 focus:ring-[#4D4D4D]/20 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block body-small text-[#232323] mb-2 font-medium">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10 digit mobile number"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    disabled={isSubmitting || isProcessingPayment}
                    className="w-full pl-12 pr-4 py-3 border border-[#999999] rounded-xl bg-white text-[#232323] placeholder:text-[#999999] focus:border-[#4D4D4D] focus:outline-none focus:ring-2 focus:ring-[#4D4D4D]/20 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block body-small text-[#232323] mb-2 font-medium">
                    Birth Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting || isProcessingPayment}
                      className="w-full pl-12 pr-4 py-3 border border-[#999999] rounded-xl bg-white text-[#232323] focus:border-[#4D4D4D] focus:outline-none focus:ring-2 focus:ring-[#4D4D4D]/20 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
                <div>
                  <label className="block body-small text-[#232323] mb-2 font-medium">
                    Birth Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                    <input
                      type="time"
                      name="birthTime"
                      value={formData.birthTime}
                      onChange={handleChange}
                      disabled={isSubmitting || isProcessingPayment}
                      className="w-full pl-12 pr-4 py-3 border border-[#999999] rounded-xl bg-white text-[#232323] focus:border-[#4D4D4D] focus:outline-none focus:ring-2 focus:ring-[#4D4D4D]/20 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block body-small text-[#232323] mb-2 font-medium">
                  Birth Place
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                  <input
                    type="text"
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleChange}
                    placeholder="City/Town where you were born"
                    required
                    minLength={2}
                    disabled={isSubmitting || isProcessingPayment}
                    className="w-full pl-12 pr-4 py-3 border border-[#999999] rounded-xl bg-white text-[#232323] placeholder:text-[#999999] focus:border-[#4D4D4D] focus:outline-none focus:ring-2 focus:ring-[#4D4D4D]/20 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block body-small text-[#232323] mb-2 font-medium">
                  Main Problem (Optional)
                </label>
                <textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  placeholder="Briefly describe the problem you want to solve..."
                  rows={3}
                  maxLength={500}
                  disabled={isSubmitting || isProcessingPayment}
                  className="w-full px-4 py-3 border border-[#999999] rounded-xl bg-white text-[#232323] placeholder:text-[#999999] focus:border-[#4D4D4D] focus:outline-none focus:ring-2 focus:ring-[#4D4D4D]/20 transition-all resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-[#FFF9F2] rounded-xl border border-[#E9E1E1]">
              <div className="flex items-center justify-between">
                <span className="body-medium text-[#353535]">Consultation Fee</span>
                <div className="text-right">
                  <span className="line-through text-[#999999] text-sm mr-2">₹999</span>
                  <span className="heading-2 text-[#232323]">₹251</span>
                </div>
              </div>
              <p className="caption text-[#353535] mt-2">
                Includes: Video Call + Birth Chart Analysis + Stone Recommendation + Free Bonuses
              </p>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-[#768597]">
              <CreditCard className="w-4 h-4" />
              <span className="text-xs">Secured by Razorpay • 100% Safe Payment</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isProcessingPayment}
              className="btn-primary w-full mt-6 py-4 text-base flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Booking...</span>
                </>
              ) : isProcessingPayment ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <Gem className="w-5 h-5" />
                  <span>Pay ₹251 & Book Consultation</span>
                </>
              )}
            </button>

            <p className="caption text-center text-[#353535] mt-4">
              100% secure • No spam calls • Money back guarantee
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

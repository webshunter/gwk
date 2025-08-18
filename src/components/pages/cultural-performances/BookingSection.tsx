"use client";

import { useState } from "react";
import { Calendar, Clock, Users, CreditCard, Phone, Mail, MapPin } from "lucide-react";

const bookingOptions = [
  {
    id: 1,
    title: "Single Performance Ticket",
    price: "Rp 150,000",
    description: "Access to one cultural performance of your choice",
    includes: [
      "Reserved seating",
      "Program booklet",
      "Refreshments",
      "Photo opportunities"
    ],
    duration: "1-2 hours",
    availability: "Daily"
  },
  {
    id: 2,
    title: "Cultural Package",
    price: "Rp 350,000",
    description: "Full day access to multiple performances and activities",
    includes: [
      "3 performances of your choice",
      "Cultural workshop",
      "Traditional lunch",
      "Guided tour",
      "Souvenir package"
    ],
    duration: "6-8 hours",
    availability: "Daily"
  },
  {
    id: 3,
    title: "Premium Experience",
    price: "Rp 750,000",
    description: "Exclusive access with VIP treatment and special experiences",
    includes: [
      "All performances",
      "Private guide",
      "Premium seating",
      "Gourmet dining",
      "Backstage access",
      "Professional photos",
      "Traditional attire rental"
    ],
    duration: "Full day",
    availability: "By appointment"
  }
];

const BookingSection = () => {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [bookingStep, setBookingStep] = useState<'select' | 'details' | 'payment'>('select');

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-white to-tropical-teal/5 py-100">
      <div className="container mx-auto px-60">
        {/* Header */}
        <div className="text-center mb-80">
          <div className="flex items-center justify-center gap-16 mb-20">
            <CreditCard className="w-80 h-80 text-golden-amber" />
            <h2 className="font-perfectly-vintage text-51d text-golden-amber">
              Book Your Cultural Experience
            </h2>
          </div>
          <p className="font-inter text-18d text-steel-navy max-w-800 mx-auto">
            Secure your spot for an unforgettable cultural journey. Choose from our carefully curated 
            packages and experience the magic of Balinese culture at GWK.
          </p>
        </div>

        {/* Booking Steps */}
        <div className="flex justify-center mb-60">
          <div className="flex items-center gap-20">
            {['select', 'details', 'payment'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-60 h-60 rounded-full flex items-center justify-center font-inter font-bold text-16d ${
                  bookingStep === step 
                    ? 'bg-golden-amber text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index + 1}
                </div>
                {index < 2 && (
                  <div className={`w-40 h-2 mx-15 ${
                    bookingStep === step ? 'bg-golden-amber' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Package Selection */}
        {bookingStep === 'select' && (
          <div className="grid grid-cols-3 gap-30 mb-60">
            {bookingOptions.map((option) => (
              <div
                key={option.id}
                className={`bg-white rounded-25d p-40 shadow-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                  selectedPackage === option.id ? 'border-golden-amber' : 'border-transparent'
                }`}
                onClick={() => setSelectedPackage(option.id)}
              >
                <div className="text-center mb-30">
                  <h3 className="font-inter font-bold text-20d text-steel-navy mb-15">
                    {option.title}
                  </h3>
                  <div className="font-inter font-bold text-32d text-golden-amber mb-15">
                    {option.price}
                  </div>
                  <p className="font-inter text-14d text-steel-navy">
                    {option.description}
                  </p>
                </div>

                <div className="space-y-15 mb-30">
                  {option.includes.map((item, index) => (
                    <div key={index} className="flex items-center gap-10">
                      <div className="w-5 h-5 bg-tropical-teal rounded-full flex items-center justify-center">
                        <span className="text-white text-10d font-bold">✓</span>
                      </div>
                      <span className="font-inter text-14d text-steel-navy">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-15 text-center text-12d text-steel-navy mb-30">
                  <div>
                    <Clock className="w-16 h-16 text-golden-amber mx-auto mb-5" />
                    <div className="font-medium">Duration</div>
                    <div>{option.duration}</div>
                  </div>
                  <div>
                    <Calendar className="w-16 h-16 text-golden-amber mx-auto mb-5" />
                    <div className="font-medium">Availability</div>
                    <div>{option.availability}</div>
                  </div>
                </div>

                <button
                  className={`w-full py-15 rounded-full font-inter font-bold transition-colors duration-300 ${
                    selectedPackage === option.id
                      ? 'bg-golden-amber text-white'
                      : 'bg-gray-100 text-steel-navy hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedPackage(option.id)}
                >
                  {selectedPackage === option.id ? 'Selected' : 'Select Package'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Step 2: Booking Details */}
        {bookingStep === 'details' && selectedPackage && (
          <div className="max-w-800 mx-auto">
            <div className="bg-white rounded-25d p-50 shadow-lg">
              <h3 className="font-inter font-bold text-24d text-steel-navy mb-30 text-center">
                Complete Your Booking
              </h3>
              
              <div className="grid grid-cols-2 gap-30 mb-30">
                <div>
                  <label className="block font-inter font-medium text-14d text-steel-navy mb-10">
                    Number of Guests
                  </label>
                  <select className="w-full p-15 border border-gray-300 rounded-10d font-inter text-14d">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-inter font-medium text-14d text-steel-navy mb-10">
                    Preferred Date
                  </label>
                  <input 
                    type="date" 
                    className="w-full p-15 border border-gray-300 rounded-10d font-inter text-14d"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-30 mb-30">
                <div>
                  <label className="block font-inter font-medium text-14d text-steel-navy mb-10">
                    Preferred Time
                  </label>
                  <select className="w-full p-15 border border-gray-300 rounded-10d font-inter text-14d">
                    <option>09:00 AM</option>
                    <option>11:00 AM</option>
                    <option>02:00 PM</option>
                    <option>04:00 PM</option>
                    <option>06:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block font-inter font-medium text-14d text-steel-navy mb-10">
                    Special Requests
                  </label>
                  <input 
                    type="text" 
                    placeholder="Any special requirements..."
                    className="w-full p-15 border border-gray-300 rounded-10d font-inter text-14d"
                  />
                </div>
              </div>

              <div className="mb-30">
                <label className="block font-inter font-medium text-14d text-steel-navy mb-10">
                  Contact Information
                </label>
                <div className="grid grid-cols-2 gap-20">
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    className="w-full p-15 border border-gray-300 rounded-10d font-inter text-14d"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    className="w-full p-15 border border-gray-300 rounded-10d font-inter text-14d"
                  />
                </div>
              </div>

              <div className="flex gap-20">
                <button
                  className="flex-1 bg-gray-300 text-steel-navy font-inter font-bold py-20 rounded-full hover:bg-gray-400 transition-colors duration-300"
                  onClick={() => setBookingStep('select')}
                >
                  Back
                </button>
                <button
                  className="flex-1 bg-tropical-teal text-white font-inter font-bold py-20 rounded-full hover:bg-tropical-teal/90 transition-colors duration-300"
                  onClick={() => setBookingStep('payment')}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {bookingStep === 'payment' && (
          <div className="max-w-800 mx-auto">
            <div className="bg-white rounded-25d p-50 shadow-lg">
              <h3 className="font-inter font-bold text-24d text-steel-navy mb-30 text-center">
                Payment & Confirmation
              </h3>
              
              <div className="bg-amber-50 rounded-15d p-25 mb-30">
                <h4 className="font-inter font-semibold text-18d text-steel-navy mb-15">
                  Booking Summary
                </h4>
                <div className="grid grid-cols-2 gap-20 text-14d text-steel-navy">
                  <div>
                    <span className="font-medium">Package:</span> {bookingOptions.find(p => p.id === selectedPackage)?.title}
                  </div>
                    <div>
                    <span className="font-medium">Price:</span> {bookingOptions.find(p => p.id === selectedPackage)?.price}
                  </div>
                </div>
              </div>

              <div className="mb-30">
                <label className="block font-inter font-medium text-14d text-steel-navy mb-10">
                  Payment Method
                </label>
                <div className="space-y-15">
                  <label className="flex items-center gap-15 cursor-pointer">
                    <input type="radio" name="payment" value="credit" className="w-16 h-16" />
                    <span className="font-inter text-14d text-steel-navy">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center gap-15 cursor-pointer">
                    <input type="radio" name="payment" value="transfer" className="w-16 h-16" />
                    <span className="font-inter text-14d text-steel-navy">Bank Transfer</span>
                  </label>
                  <label className="flex items-center gap-15 cursor-pointer">
                    <input type="radio" name="payment" value="ewallet" className="w-16 h-16" />
                    <span className="font-inter text-14d text-steel-navy">E-Wallet (GoPay, OVO, DANA)</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-20">
                <button
                  className="flex-1 bg-gray-300 text-steel-navy font-inter font-bold py-20 rounded-full hover:bg-gray-400 transition-colors duration-300"
                  onClick={() => setBookingStep('details')}
                >
                  Back
                </button>
                <button className="flex-1 bg-gradient-to-r from-tropical-teal to-golden-amber text-white font-inter font-bold py-20 rounded-full hover:opacity-90 transition-opacity duration-300">
                  Complete Booking
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {bookingStep === 'select' && selectedPackage && (
          <div className="text-center">
            <button
              className="bg-gradient-to-r from-tropical-teal to-golden-amber text-white font-inter font-bold px-50 py-20 rounded-full hover:opacity-90 transition-opacity duration-300"
              onClick={() => setBookingStep('details')}
            >
              Continue with Selected Package
            </button>
          </div>
        )}

        {/* Contact Information */}
        <div className="mt-80 text-center">
          <div className="bg-white rounded-25d p-50 shadow-lg">
            <h3 className="font-inter font-bold text-20d text-steel-navy mb-30">
              Need Help with Your Booking?
            </h3>
            <div className="grid grid-cols-3 gap-30">
              <div className="flex flex-col items-center gap-15">
                <Phone className="w-40 h-40 text-tropical-teal" />
                <div className="font-inter font-medium text-16d text-steel-navy">Call Us</div>
                <div className="font-inter text-14d text-steel-navy">+62 361 123 456</div>
              </div>
              <div className="flex flex-col items-center gap-15">
                <Mail className="w-40 h-40 text-golden-amber" />
                <div className="font-inter font-medium text-16d text-steel-navy">Email Us</div>
                <div className="font-inter text-14d text-steel-navy">bookings@gwk.com</div>
              </div>
              <div className="flex flex-col items-center gap-15">
                <MapPin className="w-40 h-40 text-tropical-teal" />
                <div className="font-inter font-medium text-16d text-steel-navy">Visit Us</div>
                <div className="font-inter text-14d text-steel-navy">GWK Cultural Park, Bali</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection; 
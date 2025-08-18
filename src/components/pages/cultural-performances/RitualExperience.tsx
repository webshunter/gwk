"use client";

import { useState } from "react";
import GradientImage from "@/components/ui/GradientImage";
import { Heart, Eye, Users, Calendar, MapPin, Clock } from "lucide-react";

const ritualExperiences = [
  {
    id: 1,
    title: "Traditional Blessing Ceremony",
    image: "/images/regular-events/image-data/barong-show.png",
    description: "Participate in an authentic Balinese blessing ceremony led by local priests",
    duration: "2-3 hours",
    participants: "Max 15 people",
    location: "Sacred Temple Area",
    price: "Rp 500,000",
    includes: [
      "Traditional Balinese attire",
      "Blessing from local priest",
      "Holy water purification",
      "Traditional offerings",
      "Cultural explanation",
      "Photography session"
    ],
    schedule: "Daily at 08:00 AM",
    requirements: "Modest dress, respectful behavior"
  },
  {
    id: 2,
    title: "Meditation & Mindfulness",
    image: "/images/regular-events/image-data/barong-show.png",
    description: "Experience guided meditation in the serene surroundings of GWK cultural park",
    duration: "1-2 hours",
    participants: "Max 20 people",
    location: "Meditation Garden",
    price: "Rp 300,000",
    includes: [
      "Guided meditation session",
      "Traditional Balinese music",
      "Aromatherapy",
      "Tea ceremony",
      "Mindfulness techniques",
      "Peaceful environment"
    ],
    schedule: "Daily at 06:00 AM & 06:00 PM",
    requirements: "Comfortable clothing, open mind"
  },
  {
    id: 3,
    title: "Cultural Workshop",
    image: "/images/regular-events/image-data/barong-show.png",
    description: "Learn traditional Balinese arts and crafts from local artisans",
    duration: "3-4 hours",
    participants: "Max 12 people",
    location: "Cultural Workshop Center",
    price: "Rp 750,000",
    includes: [
      "Hands-on workshop",
      "Traditional materials",
      "Expert instruction",
      "Take-home creation",
      "Cultural stories",
      "Refreshments"
    ],
    schedule: "Tuesday, Thursday, Saturday at 10:00 AM",
    requirements: "No experience needed, all ages welcome"
  }
];

const RitualExperience = () => {
  const [selectedRitual, setSelectedRitual] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'booking'>('overview');

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-amber-50 to-white py-100">
      <div className="container mx-auto px-60">
        {/* Header */}
        <div className="text-center mb-80">
          <div className="flex items-center justify-center gap-16 mb-20">
            <Heart className="w-80 h-80 text-tropical-teal" />
            <h2 className="font-perfectly-vintage text-51d text-tropical-teal">
              Ritual Experiences
            </h2>
          </div>
          <p className="font-inter text-18d text-steel-navy max-w-800 mx-auto">
            Immerse yourself in authentic Balinese spiritual practices and cultural rituals. 
            Experience the sacred traditions that have been passed down through generations.
          </p>
        </div>

        {/* Ritual Experiences Grid */}
        <div className="grid gap-40">
          {ritualExperiences.map((ritual) => (
            <div
              key={ritual.id}
              className={`bg-white rounded-25d shadow-lg overflow-hidden border-2 transition-all duration-300 ${
                selectedRitual === ritual.id ? 'border-tropical-teal' : 'border-transparent'
              }`}
            >
              <div className="grid grid-cols-2">
                {/* Left Side - Image */}
                <div className="relative h-400">
                  <GradientImage
                    src={ritual.image}
                    alt={ritual.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-20 left-20">
                    <h3 className="font-inter font-bold text-24d text-white mb-10">
                      {ritual.title}
                    </h3>
                    <div className="flex items-center gap-15 text-white text-14d">
                      <Clock className="w-16 h-16" />
                      <span>{ritual.duration}</span>
                      <Users className="w-16 h-16" />
                      <span>{ritual.participants}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="p-40">
                  <p className="font-inter text-16d text-steel-navy mb-25 leading-relaxed">
                    {ritual.description}
                  </p>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-20 mb-25">
                    <div className="flex items-center gap-10">
                      <MapPin className="w-16 h-16 text-golden-amber" />
                      <span className="font-inter text-14d text-steel-navy">{ritual.location}</span>
                    </div>
                    <div className="flex items-center gap-10">
                      <Calendar className="w-16 h-16 text-golden-amber" />
                      <span className="font-inter text-14d text-steel-navy">{ritual.schedule}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="bg-golden-amber/10 rounded-15d p-20 mb-25">
                    <div className="text-center">
                      <div className="font-inter text-14d text-steel-navy mb-5">Price per person</div>
                      <div className="font-inter font-bold text-24d text-golden-amber">
                        {ritual.price}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-15">
                    <button
                      className="flex-1 bg-tropical-teal text-white font-inter font-bold py-15 rounded-full hover:bg-tropical-teal/90 transition-colors duration-300"
                      onClick={() => setSelectedRitual(ritual.id)}
                    >
                      View Details
                    </button>
                    <button className="flex-1 bg-golden-amber text-white font-inter font-bold py-15 rounded-full hover:bg-golden-amber/90 transition-colors duration-300">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedRitual === ritual.id && (
                <div className="border-t border-gray-200">
                  {/* Tabs */}
                  <div className="flex border-b border-gray-200">
                    {['overview', 'details', 'booking'].map((tab) => (
                      <button
                        key={tab}
                        className={`flex-1 py-20 font-inter font-medium transition-colors duration-300 ${
                          activeTab === tab
                            ? 'text-tropical-teal border-b-2 border-tropical-teal'
                            : 'text-steel-navy hover:text-tropical-teal'
                        }`}
                        onClick={() => setActiveTab(tab as any)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="p-40">
                    {activeTab === 'overview' && (
                      <div className="space-y-20">
                        <h4 className="font-inter font-semibold text-18d text-steel-navy">
                          What's Included
                        </h4>
                        <div className="grid grid-cols-2 gap-15">
                          {ritual.includes.map((item, index) => (
                            <div key={index} className="flex items-center gap-10">
                              <div className="w-6 h-6 bg-tropical-teal rounded-full flex items-center justify-center">
                                <span className="text-white text-10d font-bold">✓</span>
                              </div>
                              <span className="font-inter text-14d text-steel-navy">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'details' && (
                      <div className="space-y-20">
                        <h4 className="font-inter font-semibold text-18d text-steel-navy">
                          Experience Details
                        </h4>
                        <div className="grid grid-cols-2 gap-30">
                          <div>
                            <h5 className="font-inter font-medium text-16d text-steel-navy mb-10">
                              Requirements
                            </h5>
                            <p className="font-inter text-14d text-steel-navy">
                              {ritual.requirements}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-inter font-medium text-16d text-steel-navy mb-10">
                              What to Bring
                            </h5>
                            <ul className="font-inter text-14d text-steel-navy space-y-5">
                              <li>• Comfortable clothing</li>
                              <li>• Respectful attitude</li>
                              <li>• Camera (if allowed)</li>
                              <li>• Open mind and heart</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'booking' && (
                      <div className="space-y-20">
                        <h4 className="font-inter font-semibold text-18d text-steel-navy">
                          Booking Information
                        </h4>
                        <div className="bg-amber-50 rounded-15d p-25">
                          <div className="grid grid-cols-2 gap-20 text-14d text-steel-navy">
                            <div>
                              <span className="font-medium">Advance Booking:</span> Required (24 hours)
                            </div>
                            <div>
                              <span className="font-medium">Cancellation:</span> Free (24 hours notice)
                            </div>
                            <div>
                              <span className="font-medium">Group Discounts:</span> Available (10+ people)
                            </div>
                            <div>
                              <span className="font-medium">Weather Policy:</span> Rain or shine (indoor alternatives)
                            </div>
                          </div>
                        </div>
                        <button className="w-full bg-gradient-to-r from-tropical-teal to-golden-amber text-white font-inter font-bold py-20 rounded-full hover:opacity-90 transition-opacity duration-300">
                          Book This Experience
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-80 text-center">
          <div className="bg-white rounded-25d p-50 shadow-lg">
            <h3 className="font-inter font-bold text-20d text-steel-navy mb-20">
              Important Notes for Ritual Experiences
            </h3>
            <div className="grid grid-cols-3 gap-30 text-14d text-steel-navy">
              <div>
                <div className="font-medium text-tropical-teal mb-10">Cultural Respect</div>
                <p>Please dress modestly and behave respectfully during all rituals</p>
              </div>
              <div>
                <div className="font-medium text-tropical-teal mb-10">Photography</div>
                <p>Some rituals may have restrictions on photography - please ask first</p>
              </div>
              <div>
                <div className="font-medium text-tropical-teal mb-10">Participation</div>
                <p>Active participation is encouraged but not mandatory</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RitualExperience; 
"use client";

import { useState } from "react";
import GradientImage from "@/components/ui/GradientImage";
import { Music, Users, Star, Clock } from "lucide-react";

const performanceTypes = [
  {
    id: 1,
    title: "Traditional Dance",
    image: "/images/regular-events/image-data/barong-show.png",
    description: "Classical Balinese dances including Legong, Baris, and Topeng",
    features: ["Authentic costumes", "Traditional music", "Historical stories", "Professional dancers"],
    duration: "30-60 minutes",
    difficulty: "Easy to understand",
    bestTime: "Morning & Afternoon"
  },
  {
    id: 2,
    title: "Theatrical Shows",
    image: "/images/regular-events/image-data/barong-show.png",
    description: "Modern interpretations of Balinese mythology and legends",
    features: ["Special effects", "Live music", "Narrative storytelling", "Interactive elements"],
    duration: "60-90 minutes",
    difficulty: "Family friendly",
    bestTime: "Afternoon & Evening"
  },
  {
    id: 3,
    title: "Ritual Performances",
    image: "/images/regular-events/image-data/barong-show.png",
    description: "Sacred ceremonies and spiritual performances",
    features: ["Sacred atmosphere", "Traditional instruments", "Spiritual significance", "Cultural authenticity"],
    duration: "45-75 minutes",
    difficulty: "Cultural immersion",
    bestTime: "Sunset & Evening"
  },
  {
    id: 4,
    title: "Music & Gamelan",
    image: "/images/regular-events/image-data/barong-show.png",
    description: "Traditional Balinese music and orchestra performances",
    features: ["Gamelan orchestra", "Traditional instruments", "Rhythmic patterns", "Cultural heritage"],
    duration: "20-40 minutes",
    difficulty: "Musical appreciation",
    bestTime: "Any time"
  }
];

const PerformanceTypes = () => {
  const [selectedType, setSelectedType] = useState<number | null>(null);

  return (
    <section className="w-full min-h-screen bg-white py-100">
      <div className="container mx-auto px-60">
        {/* Header */}
        <div className="text-center mb-80">
          <div className="flex items-center justify-center gap-16 mb-20">
            <Music className="w-80 h-80 text-tropical-teal" />
            <h2 className="font-perfectly-vintage text-51d text-tropical-teal">
              Types of Performances
            </h2>
          </div>
          <p className="font-inter text-18d text-steel-navy max-w-800 mx-auto">
            Discover the diverse range of cultural performances that bring Balinese heritage to life. 
            From traditional dances to modern theatrical shows, each performance offers a unique experience.
          </p>
        </div>

        {/* Performance Types Grid */}
        <div className="grid grid-cols-2 gap-40">
          {performanceTypes.map((type) => (
            <div
              key={type.id}
              className={`bg-white rounded-25d shadow-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                selectedType === type.id ? 'border-tropical-teal' : 'border-transparent'
              }`}
              onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
            >
              {/* Image */}
              <div className="relative h-300 overflow-hidden">
                <GradientImage
                  src={type.image}
                  alt={type.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-20 left-20">
                  <h3 className="font-inter font-bold text-24d text-white">
                    {type.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-30">
                <p className="font-inter text-16d text-steel-navy mb-20 leading-relaxed">
                  {type.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-15 mb-20">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-10">
                      <Star className="w-14 h-14 text-golden-amber flex-shrink-0" />
                      <span className="font-inter text-14d text-steel-navy">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-3 gap-15 text-center">
                  <div className="bg-amber-50 rounded-10d p-15">
                    <Clock className="w-20 h-20 text-golden-amber mx-auto mb-8" />
                    <div className="font-inter font-medium text-12d text-steel-navy">
                      Duration
                    </div>
                    <div className="font-inter text-11d text-steel-navy">
                      {type.duration}
                    </div>
                  </div>
                  <div className="bg-tropical-teal/10 rounded-10d p-15">
                    <Users className="w-20 h-20 text-tropical-teal mx-auto mb-8" />
                    <div className="font-inter font-medium text-12d text-steel-navy">
                      Difficulty
                    </div>
                    <div className="font-inter text-11d text-steel-navy">
                      {type.difficulty}
                    </div>
                  </div>
                  <div className="bg-golden-amber/10 rounded-10d p-15">
                    <Star className="w-20 h-20 text-golden-amber mx-auto mb-8" />
                    <div className="font-inter font-medium text-12d text-steel-navy">
                      Best Time
                    </div>
                    <div className="font-inter text-11d text-steel-navy">
                      {type.bestTime}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedType === type.id && (
                  <div className="mt-20 pt-20 border-t border-gray-200">
                    <div className="bg-gradient-to-r from-tropical-teal/5 to-golden-amber/5 rounded-15d p-20">
                      <h4 className="font-inter font-semibold text-16d text-steel-navy mb-15">
                        Performance Highlights
                      </h4>
                      <div className="space-y-10 text-14d text-steel-navy">
                        <div className="flex items-center gap-10">
                          <div className="w-8 h-8 bg-tropical-teal rounded-full flex items-center justify-center">
                            <span className="text-white text-10d font-bold">1</span>
                          </div>
                          <span>Authentic Balinese cultural experience</span>
                        </div>
                        <div className="flex items-center gap-10">
                          <div className="w-8 h-8 bg-tropical-teal rounded-full flex items-center justify-center">
                            <span className="text-white text-10d font-bold">2</span>
                          </div>
                          <span>Professional performers with years of training</span>
                        </div>
                        <div className="flex items-center gap-10">
                          <div className="w-8 h-8 bg-tropical-teal rounded-full flex items-center justify-center">
                            <span className="text-white text-10d font-bold">3</span>
                          </div>
                          <span>Interactive elements for audience participation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-80 text-center">
          <div className="bg-gradient-to-r from-tropical-teal to-golden-amber rounded-25d p-50 text-white">
            <h3 className="font-inter font-bold text-24d mb-20">
              Experience the Magic of Balinese Culture
            </h3>
            <p className="font-inter text-16d mb-30 max-w-600 mx-auto">
              Book your tickets now and immerse yourself in the rich traditions and 
              spectacular performances that make GWK a cultural destination like no other.
            </p>
            <button className="bg-white text-tropical-teal font-inter font-bold px-40 py-20 rounded-full hover:bg-amber-50 transition-colors duration-300">
              Book Performance Tickets
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceTypes; 
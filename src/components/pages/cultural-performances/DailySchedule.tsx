"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

const scheduleData = [
  {
    time: "09:00",
    performance: "Morning Barong Dance",
    location: "Main Stage",
    duration: "45 minutes",
    description: "Traditional Balinese dance performance featuring the mythical Barong creature"
  },
  {
    time: "11:00",
    performance: "Kecak Fire Dance",
    location: "Sunset Stage",
    duration: "60 minutes",
    description: "Mesmerizing Kecak dance with rhythmic chanting and fire elements"
  },
  {
    time: "14:00",
    performance: "Legong Dance",
    location: "Cultural Pavilion",
    duration: "30 minutes",
    description: "Graceful classical Balinese dance performed by young dancers"
  },
  {
    time: "16:00",
    performance: "BarAong Show",
    location: "Theater Hall",
    duration: "90 minutes",
    description: "GWK's original theatrical show with stunning visuals and music"
  },
  {
    time: "18:00",
    performance: "Evening Cultural Show",
    location: "Main Stage",
    duration: "75 minutes",
    description: "Spectacular evening performance combining multiple dance forms"
  }
];

const DailySchedule = () => {
  const [selectedPerformance, setSelectedPerformance] = useState<number | null>(null);

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-white to-amber-50 py-100">
      <div className="container mx-auto px-60">
        {/* Header */}
        <div className="text-center mb-80">
          <div className="flex items-center justify-center gap-16 mb-20">
            <Calendar className="w-80 h-80 text-golden-amber" />
            <h2 className="font-perfectly-vintage text-51d text-golden-amber">
              Daily Performance Schedule
            </h2>
          </div>
          <p className="font-inter text-18d text-steel-navy max-w-800 mx-auto">
            Experience the rich cultural heritage of Bali with our daily performances. 
            Each show is carefully crafted to showcase the beauty and tradition of Balinese arts.
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="grid gap-30">
          {scheduleData.map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-20d p-40 shadow-lg border-l-8 border-golden-amber transition-all duration-300 cursor-pointer hover:shadow-xl ${
                selectedPerformance === index ? 'ring-4 ring-golden-amber/30' : ''
              }`}
              onClick={() => setSelectedPerformance(selectedPerformance === index ? null : index)}
            >
              <div className="flex items-start gap-30">
                {/* Time */}
                <div className="flex-shrink-0">
                  <div className="bg-golden-amber text-white rounded-full w-80 h-80 flex items-center justify-center">
                    <Clock className="w-40 h-40" />
                  </div>
                  <div className="text-center mt-10">
                    <div className="font-inter font-bold text-20d text-golden-amber">
                      {item.time}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-16 mb-15">
                    <h3 className="font-inter font-bold text-24d text-steel-navy">
                      {item.performance}
                    </h3>
                    <div className="bg-tropical-teal text-white px-16 py-8 rounded-full text-12d font-medium">
                      {item.duration}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-16 mb-15 text-14d text-steel-navy">
                    <MapPin className="w-16 h-16 text-golden-amber" />
                    <span>{item.location}</span>
                  </div>
                  
                  <p className="font-inter text-16d text-steel-navy leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedPerformance === index && (
                <div className="mt-30 pt-30 border-t border-gray-200">
                  <div className="bg-amber-50 rounded-15d p-25">
                    <h4 className="font-inter font-semibold text-18d text-steel-navy mb-15">
                      Performance Details
                    </h4>
                    <div className="grid grid-cols-2 gap-20 text-14d text-steel-navy">
                      <div>
                        <span className="font-medium">Best Viewing:</span> Arrive 15 minutes early
                      </div>
                      <div>
                        <span className="font-medium">Photography:</span> Allowed (no flash)
                      </div>
                      <div>
                        <span className="font-medium">Seating:</span> First come, first served
                      </div>
                      <div>
                        <span className="font-medium">Weather:</span> Indoor/Outdoor venues
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-80 text-center">
          <div className="bg-white rounded-20d p-40 shadow-lg">
            <h3 className="font-inter font-bold text-20d text-steel-navy mb-20">
              Important Information
            </h3>
            <div className="grid grid-cols-3 gap-30 text-14d text-steel-navy">
              <div>
                <div className="font-medium text-golden-amber mb-10">Schedule Changes</div>
                <p>Performances may be rescheduled due to weather or special events</p>
              </div>
              <div>
                <div className="font-medium text-golden-amber mb-10">Special Shows</div>
                <p>Additional performances available during peak season and holidays</p>
              </div>
              <div>
                <div className="font-medium text-golden-amber mb-10">Group Bookings</div>
                <p>Special arrangements available for groups of 10 or more</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailySchedule; 
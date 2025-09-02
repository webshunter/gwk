"use client";
import React, { useState } from "react";
import Image from "next/image";
import ImageCard from "@/components/ui/ImageCard";

const FestivalSection = () => {
  const [activeTab, setActiveTab] = useState("OGOH - OGOH FESTIVAL");
  const imageOgohOgoh = [
    "/images/mice-event/ogoh-ogoh/Group 46.png",
    "/images/mice-event/ogoh-ogoh/Group 47.png",
    "/images/mice-event/ogoh-ogoh/Group 48.png",
    "/images/mice-event/ogoh-ogoh/Group 46.png",
    "/images/mice-event/ogoh-ogoh/Group 47.png",
    "/images/mice-event/ogoh-ogoh/Group 48.png",
    "/images/mice-event/ogoh-ogoh/Group 46.png",
    "/images/mice-event/ogoh-ogoh/Group 47.png",
    "/images/mice-event/ogoh-ogoh/Group 48.png",
    "/images/mice-event/ogoh-ogoh/Group 46.png",
    "/images/mice-event/ogoh-ogoh/Group 47.png",
    "/images/mice-event/ogoh-ogoh/Group 48.png",
  ];
  const festivals = [
    "OGOH - OGOH FESTIVAL",
    "PESTA RAKYAT",
    "PENJOR FESTIVAL",
    "BALI COUNTDOWN",
  ];

  return (
    <div className="bg-gray-50 py-16 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {festivals.map((festival) => (
            <button
              key={festival}
              onClick={() => setActiveTab(festival)}
              className={`px-40 py-17 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === festival
                  ? "bg-[#D08700] text-white shadow-lg"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500"
              }`}
            >
              {festival}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center mt-20">
        <div className="relative w-full max-w-4xl mx-auto mb-8">
          <div className="relative bg-white p-2 md:p-4 rounded-lg shadow-md">
            <div className="relative w-full aspect-[3/2]">
              <Image
                src="/images/mice-event/ogoh-ogoh/Mask group (4).png"
                alt="Ogoh Ogoh Festival - Traditional Balinese ceremony with mythological figures"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-[#D08700] mb-8 font-serif">
          Ogoh Ogoh Festival
        </h2>

        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed font-light">
            The Ogoh-Ogoh Festival At GWK Cultural Park Is Held Annually After
            Nyepi, Bali's Day Of Silence. The Event Features Towering,
            Artistically Crafted Ogoh-Ogoh Figures Paraded Through The Park In A
            Celebration That Honors Tradition, Creativity, And Cultural
            Reflection. Set Against The Iconic Garuda Wisnu Kencana Statue, The
            Festival Offers A Post-Nyepi Experience That Brings The Community
            Together Through Color, Rhythm, And Symbolic Renewal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-12 md:mt-16 lg:mt-20">
        {imageOgohOgoh.map((item, index) => (
          <ImageCard
            image={item}
            alt="ogoh"
            key={index}
            // PERBAIKAN: Ukuran kartu dibuat responsif
            className="w-full aspect-square" // aspect-square (1:1) atau aspect-[4/3]
          />
        ))}
      </div>
    </div>
  );
};

export default FestivalSection;

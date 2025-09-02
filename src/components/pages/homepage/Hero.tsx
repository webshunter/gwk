"use client";

import React from "react";
import { clsx } from "clsx";
import GradientImage from "@/components/ui/GradientImage";

const Hero = () => {
  return (
    <section className="w-full h-screen relative overflow-hidden">
      <GradientImage
        src="/images/homepage/hero.png"
        alt="Hero Background"
        priority
        className="scale-105"
      />

      <div className="absolute inset-0 bg-black/40 sm:bg-black/50 z-20" />

      <div className="absolute inset-0 z-30 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div
          className={clsx(
            "flex flex-col items-center justify-center text-center",
            "gap-6 sm:gap-8 md:gap-12 lg:gap-16",
            "max-w-4xl mx-auto"
          )}
        >
          <div className="space-y-2 sm:space-y-4">
            <div
              className={clsx(
                "font-playfair font-normal text-white",
                "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl",
                "tracking-wide opacity-90"
              )}
            >
              Welcome to
            </div>

            <h1
              className={clsx(
                "font-playfair font-extrabold text-white leading-none",
                "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl",
                "tracking-tight"
              )}
            >
              <span className="block">Garuda Wisnu</span>
              <span className="block">Kencana</span>
            </h1>
          </div>

          <p
            className={clsx(
              "font-inter font-normal text-white",
              "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl",
              "tracking-wide opacity-95",
              "max-w-2xl mx-auto leading-relaxed"
            )}
          >
            The Magnificent Masterpiece of Indonesia
          </p>

          <div className="mt-4 sm:mt-6 lg:mt-8">
            <button
              className={clsx(
                "group relative px-8 py-3 sm:px-10 sm:py-4",
                "bg-white/10 backdrop-blur-sm border border-white/20",
                "text-white font-medium",
                "rounded-full",
                "hover:bg-white/20 hover:border-white/30",
                "transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-white/50",
                "text-sm sm:text-base lg:text-lg"
              )}
            >
              <span className="relative z-10">Explore GWK</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-tropical-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "absolute bottom-0 left-0 w-full z-40",
          "h-32 sm:h-40 md:h-48 lg:h-56",
          "bg-gradient-to-t from-tropical-teal/80 via-tropical-teal/40 to-transparent",
          "pointer-events-none"
        )}
      />

      <div
        className={clsx(
          "absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8",
          "w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20",
          "rounded-full bg-white/10 backdrop-blur-sm border border-white/20",
          "flex items-center justify-center",
          "opacity-60 hover:opacity-100 transition-opacity duration-300",
          "z-30"
        )}
      >
        <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full bg-white/50" />
      </div>
    </section>
  );
};

export default Hero;

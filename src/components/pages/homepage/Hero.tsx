"use client";

import React from "react";
import GradientImage from "@/components/ui/GradientImage";

const Hero = () => {
  return (
    <section className="w-full h-screen relative">
      <GradientImage
        src="/images/homepage/hero.png"
        alt="Hero Background"
        priority
      />
      <div className="w-full h-full absolute top-0 left-0 z-10 flex justify-center items-center">
        <div className="flex justify-center items-center flex-col md:landscape:gap-y-32">
          <div className="">
            <div className="font-playfair font-normal md:landscape:text-24d text-center text-white split">
              Welcome to
            </div>
            <div className="font-playfair font-extrabold md:landscape:text-64d text-center text-white leading-none split">
              Garuda Wisnu <br />
              Kencana
            </div>
          </div>
          <div className="font-inter font-normal md:landscape:text-24d text-center text-white split">
            The Magnificent Masterpiece of Indonesia
          </div>
        </div>
      </div>

      <div className="w-full h-full absolute top-0 left-0 bg-black/50"></div>

      <div className="absolute bottom-0 left-0 w-full h-1/5 bg-gradient-to-t from-tropical-teal/100 to-transparent z-50"></div>
    </section>
  );
};

export default Hero;

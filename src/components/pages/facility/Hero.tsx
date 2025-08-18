"use client";

import React from "react";
import GradientImage from "@/components/ui/GradientImage";

const Hero = () => {
  return (
    <section className="w-full h-[120vh] relative">
      <GradientImage src="/images/facility/hero.png" />
      <div className="split font-perfectly-vintage text-51d text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        Facilities
      </div>
    </section>
  );
};

export default Hero;

"use client";

import GradientImage from "@/components/ui/GradientImage";

const Hero = () => {
  return (
    <section className="w-full h-[120vh] relative">
      <GradientImage src="/images/wedding/hero.png" />
      <div className="split font-perfectly-vintage text-51d text-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        Wedding
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/5 bg-gradient-to-t from-white to-transparent z-50"></div>
    </section>
  );
};

export default Hero;

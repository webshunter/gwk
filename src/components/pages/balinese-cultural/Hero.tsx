"use client";

import GradientImage from "@/components/ui/GradientImage";

const Hero = () => {
  return (
    <section className="w-full h-screen relative">
      <GradientImage src="/images/balinese-cultural/hero.png" />

      <div className="split absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-perfectly-vintage text-51d text-white leading-none">
        Soulful
        <br />
        Activity
      </div>
    </section>
  );
};

export default Hero;

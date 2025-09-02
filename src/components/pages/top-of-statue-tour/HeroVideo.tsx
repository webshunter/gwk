"use client";
import SwiperImageShow from "@/components/ui/SwiperImageShow";
import ViewVideo from "@/components/ui/ViewVideo";
import Image from "next/image";

export default function HeroVideo() {
  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-b bg-blue-sky overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
          {/* Hero Text */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10 max-w-xs sm:max-w-lg md:max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              GWK Cultural Park
            </h1>
            <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed drop-shadow-lg">
              A unique tour inside the statue to the 9th and 23rd floor,
              featuring breathtaking views of Bali's southern coast and
              exhibitions showcasing the statue's creation
            </p>
          </div>

          {/* Video Component */}
          <div className="w-full mb-6 sm:mb-8 md:mb-10">
            <ViewVideo />
          </div>

          {/* Image Sliders - Stacked on mobile, side by side on larger screens */}
          <div className="flex flex-col lg:flex-row justify-center w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl gap-4 sm:gap-6 lg:gap-8">
            <div className="w-full lg:w-1/2">
              <SwiperImageShow />
            </div>
            <div className="w-full lg:w-1/2">
              <SwiperImageShow />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

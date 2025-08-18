"use client";
import SwiperImageShow from "@/components/ui/SwiperImageShow";
import ViewVideo from "@/components/ui/ViewVideo";
import Image from "next/image";

export default function HeroVideo() {
  return (
    <>
      <section className="relative min-h-screen bg-blue-sky  overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
          <div className="text-center mb-8 max-w-2xl">
            <p className="text-white text-lg md:text-xl leading-relaxed drop-shadow-lg split">
              A unique tour inside the statue to the 9th and 23rd floor,
              featuring breathtaking views of Bali's southern coast and
              exhibitions showcasing the statue's creation
            </p>
          </div>

          <ViewVideo />
          <div className="flex justify-center w-full max-w-4xl">
            <SwiperImageShow />
            <SwiperImageShow />
          </div>
        </div>
      </section>
    </>
  );
}

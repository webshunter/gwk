import GradientImage from "@/components/ui/GradientImage";

export default function Hero() {
  return (
    <section className="w-full h-screen relative">
      <GradientImage src="/images/homepage/hero.png" alt="Hero Background" />

      <div className="w-full h-full absolute top-0 left-0 z-10 flex justify-center items-center px-4">
        <div className="flex justify-center items-center flex-col gap-y-8 md:gap-y-16 lg:gap-y-32">
          <div className="w-full">
            <div className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-white leading-tight">
              Regular Calendar
            </div>
          </div>
          <div className="font-normal text-base sm:text-lg md:text-xl lg:text-2xl text-center text-white">
            in GWK Cultural Park
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 sm:h-24 md:h-32 lg:h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-5"></div>
    </section>
  );
}

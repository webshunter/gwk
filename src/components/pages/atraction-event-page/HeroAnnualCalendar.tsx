import GradientImage from "@/components/ui/GradientImage";

export default function HeroAnnualCalendar() {
  return (
    <section className="w-full h-screen relative mt-30">
      <GradientImage
        src="/images/regular-events/g20.png"
        alt="Hero Background"
      />

      <div className="w-full h-full absolute top-0 left-0 z-10 flex justify-center items-center px-4 md:landscape:mt-60">
        <div className="flex justify-center items-center flex-col gap-y-8 md:gap-y-16 lg:gap-y-32">
          <div className="w-full">
            <div className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-white leading-tight">
              Annual Calendar
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-white via-white/80 to-transparent z-5"></div>
    </section>
  );
}

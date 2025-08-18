import GradientImage from "@/components/ui/GradientImage";

export default function HeroAnnualCalendar() {
  return (
    <section className="w-full h-screen relative mt-30">
      <GradientImage
        src="/images/regular-events/g20.png"
        alt="Hero Background"
      />

      <div className="w-full h-full absolute top-0 left-0 z-10 flex justify-center items-center">
        <div className="flex justify-center items-center flex-col md:landscape:gap-y-32">
          <div className="">
            <div className="font-playfair font-extrabold md:landscape:text-64d text-center text-white leading-none split">
              Annual Calendar
            </div>
          </div>
          {/* <div className="font-inter font-normal md:landscape:text-24d text-center text-white">
            in GWK Cultural Park
          </div> */}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-white via-white/80 to-transparent z-5"></div>
    </section>
  );
}

import GradientImage from "@/components/ui/GradientImage";

export default function HeroMain() {
  return (
    <section className="w-full h-screen relative">
      <GradientImage
        src="/images/mice-event/heromain.png"
        alt="Hero Background"
      />

      <div className="w-full h-full absolute top-0 left-0 z-10 flex justify-center items-center">
        <div className="flex justify-center items-center flex-col md:landscape:gap-y-32">
          <div className="">
            <div
              className="
            font-playfair font-extrabold text-white text-center leading-none
            text-6xl     
            sm:text-7xl  
            md:text-8xl 
            lg:text-64d   
          "
            >
              MICE & Events
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

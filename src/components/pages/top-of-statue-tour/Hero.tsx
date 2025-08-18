import GradientImage from "@/components/ui/GradientImage";

export default function Hero() {
  return (
    <section className="w-full h-screen relative">
      <GradientImage
        src="/images/top-of-statue-tour/garuda.png"
        alt="Hero Background"
      />

      <div className="w-full h-full absolute top-0 left-0 z-10 flex justify-center items-center">
        <div className="flex justify-center items-center flex-col md:landscape:gap-y-32">
          <div className="">
            <div className="font-playfair font-normal md:landscape:text-24d text-center text-white split">
              The Soul of Garuda Wisnu Kencana
            </div>
            <div className="font-playfair font-extrabold md:landscape:text-64d text-center text-white leading-none split">
              Top Of The Statue Tour
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[20%] bg-gradient-to-t from-blue-sky via-blue-sky/80 to-transparent z-10"></div>
    </section>
  );
}

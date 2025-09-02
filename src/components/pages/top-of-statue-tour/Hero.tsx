import GradientImage from "@/components/ui/GradientImage";

export default function Hero() {
  return (
    <section className="w-full h-screen relative">
      <GradientImage
        src="/images/top-of-statue-tour/garuda.png"
        alt="Hero Background"
      />

      <div className="w-full h-full absolute top-0 left-0 z-10 flex justify-center items-center p-4 sm:p-6">
        <div className="flex flex-col items-center gap-y-2 sm:gap-y-4 max-w-4xl text-center text-white">
          <h2
            className="
              font-playfair font-normal split
              text-xl sm:text-2xl lg:text-4xl
            "
          >
            The Soul of Garuda Wisnu Kencana
          </h2>
          <h1
            className="
              font-playfair font-extrabold leading-tight md:leading-none split
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            "
          >
            Top Of The Statue Tour
          </h1>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[15%] sm:h-[18%] md:h-[20%] bg-gradient-to-t from-blue-sky via-blue-sky/80 to-transparent z-10"></div>
    </section>
  );
}

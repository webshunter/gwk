import ImageCard from "@/components/ui/ImageCard";
import Image from "next/image";

const CurvedHeroSection = () => {
  return (
    <>
      <div className="relative h-64 sm:h-72 md:h-300 lg:h-300 bg-black">
        <div className="absolute bottom-0 left-0 w-full md:h-1/4 lg:h-1/2">
          <div className="w-full h-full bg-white rounded-t-full transform scale-103"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 md:px-8 pb-8 sm:pb-12 md:pb-20 lg:pb-120">
          <div className="text-center max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
            <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light tracking-wide">
              <span className="block md:hidden">
                From vibrant festivals to corporate gatherings, GWK offers a
                unique venue surrounded by Bali's heritage.
              </span>

              <span className="hidden md:block">
                From vibrant cultural festivals to unforgettable corporate
                <br />
                gatherings, GWK offers a one-of-a-kind venue surrounded by
                <br />
                Bali's majestic heritage.
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center px-4 mt-8 md:mt-0">
        <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 w-full max-w-6xl">
          <div className="w-full">
            <div className="relative w-full aspect-video lg:aspect-[2.16/1] overflow-hidden rounded-lg md:rounded-xl shadow-lg">
              <Image
                src="/images/homepage/hero.png"
                fill
                alt="Concert stage with dramatic lighting"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1080px"
              />
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="flex justify-center items-start gap-4 w-full">
              <ImageCard
                alt="show"
                image="/images/homepage/hero.png"
                title="Annual Events"
                className="w-1/2 aspect-square"
              />
              <ImageCard
                alt="show"
                image="/images/homepage/hero.png"
                title="For Your MICE"
                className="w-1/2 aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurvedHeroSection;

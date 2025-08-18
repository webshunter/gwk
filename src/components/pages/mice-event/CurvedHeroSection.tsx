import ImageCard from "@/components/ui/ImageCard";
import Image from "next/image";

const CurvedHeroSection = () => {
  return (
    <>
      <div className="relative h-300 bg-black ">
        <div className="absolute bottom-0 left-0 w-full h-1/2">
          <div className="w-full h-full bg-white rounded-t-full transform scale-103"></div>
        </div>
        <div className="relative z-10 flex items-start justify-center pt-30 px-6 md:px-8">
          <div className="text-center max-w-2xl">
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light tracking-wide">
              From vibrant cultural festivals to unforgettable corporate
              <br />
              gatherings, GWK offers a one-of-a-kind venue surrounded by
              <br />
              Bali's majestic heritage.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-20">
          <div className="relative h-500 w-1080 mt-10 ">
            <Image
              src="/images/homepage/hero.png"
              fill
              alt="Concert stage with dramatic lighting"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-between gap-10 px-20">
            <ImageCard
              alt="show"
              image="/images/homepage/hero.png"
              title="Annual Events"
              className="w-499 h-499"
            />
            <ImageCard
              alt="show"
              image="/images/homepage/hero.png"
              title="For Your Mice"
              className="w-499 h-499"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CurvedHeroSection;

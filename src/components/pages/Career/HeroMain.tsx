import GradientImage from "@/components/ui/GradientImage";
import { clsx } from "clsx";

export default function HeroMain() {
  return (
    <section className="w-full h-screen relative">
      <GradientImage
        src="/images/career/imagecareer.jpg"
        alt="Hero Background"
      />

      <div className="w-full h-full absolute top-0 left-0 z-10 flex justify-center items-center">
        <div
          className={clsx(
            "flex justify-center items-center flex-col",
            "gap-y-4 portrait:gap-y-6",
            "landscape:gap-y-8 landscape:sm:gap-y-12 landscape:md:gap-y-16",
            "landscape:lg:gap-y-20 landscape:xl:gap-y-24 landscape:2xl:gap-y-32"
          )}
        >
          <div className="">
            <div
              className={clsx(
                "font-playfair font-extrabold text-center text-white leading-none split",
                "text-2xl portrait:text-3xl portrait:sm:text-4xl portrait:md:text-5xl portrait:lg:text-6xl",
                "landscape:text-xl landscape:sm:text-2xl landscape:md:text-3xl landscape:lg:text-4xl landscape:xl:text-5xl landscape:2xl:text-6xl",
                "landscape:min-h-[800px]:text-5xl landscape:min-h-[800px]:xl:text-6xl landscape:min-h-[800px]:2xl:text-7xl"
              )}
            >
              Career & Opportunity
            </div>
          </div>
          <div
            className={clsx(
              "font-inter font-normal text-center text-white split",
              "text-sm portrait:text-base portrait:sm:text-lg portrait:md:text-xl portrait:lg:text-2xl",
              "landscape:text-xs landscape:sm:text-sm landscape:md:text-base landscape:lg:text-lg landscape:xl:text-xl landscape:2xl:text-2xl",
              "landscape:min-h-[800px]:text-lg landscape:min-h-[800px]:xl:text-xl landscape:min-h-[800px]:2xl:text-2xl"
            )}
          >
            Career & Jobs Opportunity
          </div>
        </div>
      </div>
    </section>
  );
}

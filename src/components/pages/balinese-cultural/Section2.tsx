"use client";

import GradientImage from "@/components/ui/GradientImage";

import { cx } from "class-variance-authority";
import { useMemo } from "react";
import useMediaQueries from "@/hook/useMediaQueries";
import ViewVideo from "@/components/ui/ViewVideo";
const datas = [
  {
    img: "/images/balinese-cultural/image-3.png",
    text: "At Bale Bengong, Plaza Wisnu, discover the Balinese belief in five universal elements — a quiet space where nature and spirit exist in harmony.",
  },
  {
    img: "/images/balinese-cultural/image-4.png",
    text: "take part in the serene activity of crafting your own canang — a daily Balinese offering made with intention, beauty, and gratitude.",
  },
  {
    img: "/images/balinese-cultural/image-5.png",
    text: "Experience a moment of spiritual reflection at Parahyangan Somaka Giri — a sacred site within GWK Cultural Park where visitors can offer prayers in peace and harmony.",
  },
  {
    img: "/images/balinese-cultural/image-6.png",
    text: "Receive holy water drawn from an eternal spring at Somaka Giri — a sacred source that flows continuously, even through the longest dry season.",
  },
  {
    img: "/images/balinese-cultural/image-7.png",
    text: "Wear the Tridatu bracelet — a sacred thread symbolizing protection, balance, and the unity of life’s three energies in Balinese belief.",
  },
];

const Section2 = () => {
  const queries = useMemo(
    () => ({
      isDesktop: "(min-width: 768px) and (orientation: landscape)",
    }),
    []
  );
  const { isDesktop } = useMediaQueries(queries);
  return (
    <section className="w-full min-h-screen bg-dark-forest-green relative overflow-hidden pb-160 max-xl:portrait:px-20">
      <div className="absolute !top-170 !-left-50">
        <div className="relative md:landscape:w-455 h-161">
          <GradientImage
            src="/ornament/kakul.png"
            className="!object-contain"
          />
        </div>
      </div>

      <div className="absolute  top-0 left-1/2 -translate-x-1/2">
        <div className="relative md:landscape:w-512 md:landscape:h-512 w-315 h-315">
          <GradientImage
            src="/ornament/flower-lotus.png"
            className="!object-contain"
          />
        </div>
      </div>

      <div className="absolute  !top-170 !-right-50">
        <div className="relative md:landscape:w-455 h-161">
          <GradientImage
            src="/ornament/kakul-2.png"
            className="!object-contain"
          />
        </div>
      </div>

      <div className="pt-130 relative z-10">
        <div className="md:landscape:w-560 font-inter font-light md:landscape:text-17d text-14d mx-auto text-center text-[#FAFAFA] split">
          Experience unforgettable dining at Jendela Bali, a restaurant with
          breathtaking views of Southern Bali, offering sweeping sights of the
          sea, city lights, and dramatic sunsets.
        </div>

        <div className="aspect-video md:landscape:w-1055 relative mx-auto mt-40">
          <div className="w-full h-full absolute top-0 left-0 bg-[#0E1F19] rotate-[3deg]"></div>
          <ViewVideo img="/images/balinese-cultural/section-2.png" />
        </div>
      </div>

      <div className="mt-96 w-full flex flex-col md:landscape:gap-y-20 gap-y-60 items-center">
        <div className="md:landscape:w-865 w-full flex md:landscape:flex-row flex-col max-xl:portrait:gap-y-24 md:landscape:justify-between items-center reveal">
          <div className="relative max-xl:portrait:w-full max-xl:portrait:order-2">
            <div className="relative md:landscape:w-332 md:landscape:h-266 w-full max-xl:portrait:aspect-video">
              <GradientImage
                src="/images/balinese-cultural/image-1.png"
                className="z-10"
              />

              <svg
                className="w-319 h-14 absolute top-1/2 -translate-y-1/2 left-90 md:landscape:block hidden"
                width="319"
                height="14"
                viewBox="0 0 319 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="0.5" y1="6.5" x2="305.5" y2="6.5" stroke="#3F574E" />
                <circle cx="311.5" cy="7" r="6.5" stroke="#3F574E" />
              </svg>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <div className="relative md:landscape:w-332 md:landscape:h-266 w-full max-xl:portrait:aspect-video">
                <GradientImage
                  src="/images/balinese-cultural/shadow.png"
                  className="top-0 left-0 rotate-[-3deg] !object-contain"
                />
              </div>
            </div>
          </div>
          <div className="w-423 font-inter font-light text-14d md:landscape:text-17d text-[#DCFCE7] split">
            Make a wish by tossing a coin into the Turtle Pon at Plaza
            Kura-kura, where the statue of Dewi Laksmi stands gracefully at the
            center. A serene moment of hope and gratitude in the heart of GWK
            Cultural Park.
          </div>
        </div>
        <div className="md:landscape:w-865 w-full flex md:landscape:flex-row max-xl:portrait:gap-y-24 flex-col md:landscape:justify-between items-center reveal">
          <div className="md:landscape:w-423 w-full font-inter font-light text-14d md:landscape:text-17d text-[#DCFCE7] md:landscape:text-center split">
            Capture the beauty of Balinese tradition with a photo beside a
            vibrant gebogan at Plaza Kura-Kura — a colorful symbol of devotion
            and culture.
          </div>
          <div className="relative max-xl:portrait:w-full">
            <div className="relative md:landscape:w-332 md:landscape:h-266  max-xl:portrait:aspect-video w-full">
              <GradientImage
                src="/images/balinese-cultural/image-1.png"
                className="z-10"
              />

              <svg
                className="w-319 h-14 absolute top-[75%] translate-y-1/2 right-250 md:landscape:block hidden"
                width="319"
                height="14"
                viewBox="0 0 319 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  y1="-0.5"
                  x2="305"
                  y2="-0.5"
                  transform="matrix(-1 0 0 1 318.5 7)"
                  stroke="#3F574E"
                />
                <circle
                  cx="7"
                  cy="7"
                  r="6.5"
                  transform="matrix(-1 0 0 1 14.5 0)"
                  stroke="#3F574E"
                />
              </svg>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <div className="relative md:landscape:w-332 md:landscape:h-266  max-xl:portrait:aspect-video w-full">
                <GradientImage
                  src="/images/balinese-cultural/shadow.png"
                  className="top-0 left-0 rotate-[-3deg] !object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {datas.map((data, index) => (
          <div
            className="md:landscape:w-865 w-full flex md:flex-row flex-col md:landscape:justify-between md:landscape:items-center reveal"
            key={index}
          >
            <div
              className={cx(
                "md:landscape:w-423 w-full font-inter font-light text-14d md:landscape:text-17d text-[#DCFCE7] md:landscape:text-center  split",
                {
                  "order-2": index % 2 === 0 && isDesktop,
                  "order-1": index % 2 === 1 && isDesktop,
                }
              )}
            >
              {data.text}
            </div>
            <div
              className={cx("relative max-xl:portrait:mt-24", {
                "order-1": index % 2 === 0 && isDesktop,
                "order-2": index % 2 === 1 && isDesktop,
              })}
            >
              <div
                className={
                  "relative md:landscape:w-332 md:landscape:h-266 w-full max-xl:portrait:aspect-video"
                }
              >
                <GradientImage src={data.img} className="z-10" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <div className="relative md:landscape:w-332 md:landscape:h-266 w-full max-xl:portrait:aspect-video">
                  <GradientImage
                    src="/images/balinese-cultural/shadow.png"
                    className="top-0 left-0 rotate-[-3deg] !object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto py-10 px-72 border border-[#A6A09B] rounded-8d w-max text-[#D08700] mt-120 reveal">
        BUY TICKET
      </div>
    </section>
  );
};

export default Section2;

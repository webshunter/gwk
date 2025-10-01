"use client";

import { useState, useMemo } from "react";
import GradientImage from "@/components/ui/GradientImage";
import MarkerMap, { type MarkerData } from "@/components/ui/MarkerMap";
import Link from "next/link";
import { cx } from "class-variance-authority";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASING } from "@/lib/easing";
import useMediaQueries from "@/hook/useMediaQueries";
import Image from "next/image";

const dataMarkerMaps = [
  {
    title: "Plaza Kura -  Kura",
    number: "01",
    classname: "md:landscape:top-222 md:landscape:right-462",
    img: "/images/homepage/image.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Plaza Kura -  Kura",
    number: "02",
    classname: "md:landscape:top-162 md:landscape:right-445",
    img: "/images/homepage/image.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Plaza Kura -  Kura",
    number: "03",
    classname: "md:landscape:top-168 md:landscape:right-362",
    img: "/images/homepage/image.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Plaza Kura -  Kura",
    number: "04",
    classname: "md:landscape:top-211 md:landscape:right-304",
    img: "/images/homepage/image.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Plaza Kura -  Kura",
    number: "05",
    classname: "md:landscape:top-217 md:landscape:right-241",
    img: "/images/homepage/image.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Plaza Kura -  Kura",
    number: "06",
    classname: "md:landscape:top-191 md:landscape:right-182",
    img: "/images/homepage/image.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Plaza Kura -  Kura",
    number: "07",
    classname: "md:landscape:top-128 md:landscape:right-98",
    img: "/images/homepage/image.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Plaza Kura -  Kura",
    number: "08",
    classname: "md:landscape:top-261 md:landscape:right-415",
    img: "/images/homepage/image.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Plaza Kura -  Kura",
    number: "09",
    classname: "md:landscape:top-300 md:landscape:right-344",
    img: "/images/homepage/image.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Plaza Kura -  Kura",
    number: "10",
    classname: "md:landscape:top-263 md:landscape:right-517",
    img: "/images/homepage/image.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Plaza Kura -  Kura",
    number: "11",
    classname: "md:landscape:top-93 md:landscape:right-277",
    img: "/images/homepage/image.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Plaza Kura -  Kura",
    number: "12",
    classname: "md:landscape:top-130 md:landscape:right-238",
    img: "/images/homepage/image.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Plaza Kura -  Kura",
    number: "13",
    classname: "md:landscape:top-105 md:landscape:right-455",
    img: "/images/homepage/image.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

const CulturePark = () => {
  const [activeMarker, setActiveMarker] = useState<MarkerData | null>(null);

  const queries = useMemo(
    () => ({
      isDesktop: "(min-width: 768px) and (orientation: landscape)",
    }),
    []
  );

  const { isDesktop } = useMediaQueries(queries);

  useGSAP(
    () => {
      if (activeMarker) {
        gsap.fromTo(
          ".popup",
          {
            y: 100,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: EASING.custom,
          }
        );
      } else {
        gsap.to(".popup", {
          y: 100,
          autoAlpha: 0,
          duration: 0.8,
          ease: EASING.custom,
        });
      }
    },
    { dependencies: [activeMarker] }
  );

  return (
    <section className="w-full md:landscape:min-h-1000 min-h-900 md:landscape:px-60 px-20 md:landscape:pt-100  md:landscape:pb-100 pt-60 bg-tropical-teal relative">
      <div className="w-full h-full">
        <div className="split leading-none md:landscape:text-51d text-31d text-soft-snow font-perfectly-vintage w-full text-center md:landscape:">
          Cultural Park
        </div>

        <div className="split md:landscape:w-768 md:landscape:mt-37 mt-24 font-inter md:landscape:text-16d text-14d font-light text-center mx-auto text-white">
          Discover the cultural heart of Bali at Garuda Wisnu Kencana (GWK).
          Home to one of the world&apos;s tallest monumental statues, GWK offers a
          unique blend of Balinese heritage, cultural performances, scenic
          dining, and breathtaking views. Whether you&apos;re here to explore, learn,
          or simply enjoy, your unforgettable Bali journey starts here.
        </div>

        <div className="w-full flex justify-center md:landscape:mt-60 mt-40">
          <div className="md:landscape:w-714 md:landscape:h-632 relative w-full h-400">
            <GradientImage
              src={"/images/homepage/map-gwk.png"}
              priority
              unoptimized
              className="max-xl:portrait:!object-contain"
            />
            {dataMarkerMaps.map((data, index) => (
              <MarkerMap
                className={data.classname}
                key={index}
                data={data}
                setActiveMarker={setActiveMarker}
              />
            ))}
          </div>
        </div>

        {/* popup */}

        {isDesktop ? (
          <div
            className={cx(
              "absolute top-300 w-292 left-60 rounded-15d overflow-hidden z-100 popup",
              {
                hidden: !activeMarker,
              }
            )}
          >
            <div className="w-full h-167 relative popup">
              {activeMarker?.img && (
                <Image
                  src={activeMarker.img}
                  fill
                  alt="marker image"
                  className="w-full h-full object-cover"
                />
              )}
              <div
                className="w-37 h-37 rounded-full bg-white absolute right-13 top-13 flex justify-center items-center cursor-pointer"
                onClick={() => setActiveMarker(null)}
              >
                <svg
                  className="w-24 h-24"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
            <div className="py-18 px-16 bg-white">
              <h3 className="text-20d font-inter text-[#1C1917] leading-none">
                {activeMarker?.title}
              </h3>
              <p className="font-light font-inter text-12d mt-12">
                {activeMarker?.desc}
              </p>
              <div className="flex justify-center mt-42">
                <Link href={"/"}>
                  <div className="!w-219 !h-37 bg-[#F0B100] rounded-8d flex justify-center items-center font-inter font-bold text-14d text-[#FEFCE8]">
                    SEE DETAILS
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={cx(
              "fixed w-screen h-screen top-0 px-20 left-0 flex justify-center items-center z-[1000] bg-black/50",
              {
                hidden: !activeMarker,
              }
            )}
          >
            <div className={cx(" rounded-15d overflow-hidden z-[1000] popup")}>
              <div className="w-full h-167 relative">
                {activeMarker?.img && <GradientImage src={activeMarker?.img} />}
                <div
                  className="w-37 h-37 rounded-full bg-white absolute right-13 top-13 flex justify-center items-center cursor-pointer"
                  onClick={() => setActiveMarker(null)}
                >
                  <svg
                    className="w-24 h-24"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
              <div className="py-18 px-16 bg-white">
                <h3 className="text-20d font-inter text-[#1C1917] leading-none">
                  {activeMarker?.title}
                </h3>
                <p className="font-light font-inter text-12d mt-12">
                  {activeMarker?.desc}
                </p>
                <div className="flex justify-center mt-42">
                  <Link href={"/"}>
                    <div className="!w-219 !h-37 bg-[#F0B100] rounded-8d flex justify-center items-center font-inter font-bold text-14d text-[#FEFCE8]">
                      SEE DETAILS
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* popup */}

        <div className="absolute md:landscape:left-60 left-20 md:landscape:top-300 top-650 z-50">
          <div className="">
            <svg
              className="w-70 h-45 reveal inline-block"
              width="70"
              height="45"
              viewBox="0 0 70 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.14915 18.2727H7.99432V23.9403C7.99432 24.5767 7.84233 25.1335 7.53835 25.6108C7.23722 26.0881 6.81534 26.4602 6.27273 26.7273C5.73011 26.9915 5.09801 27.1236 4.37642 27.1236C3.65199 27.1236 3.01847 26.9915 2.47585 26.7273C1.93324 26.4602 1.51136 26.0881 1.21023 25.6108C0.909091 25.1335 0.758523 24.5767 0.758523 23.9403V18.2727H2.60369V23.7827C2.60369 24.1151 2.67614 24.4105 2.82102 24.669C2.96875 24.9276 3.17614 25.1307 3.44318 25.2784C3.71023 25.4261 4.02131 25.5 4.37642 25.5C4.73438 25.5 5.04545 25.4261 5.30966 25.2784C5.5767 25.1307 5.78267 24.9276 5.92756 24.669C6.07528 24.4105 6.14915 24.1151 6.14915 23.7827V18.2727Z"
                fill="white"
              />
              <g clipPath="url(#clip0_263_6057)">
                <path
                  d="M41.125 16.875L35.5 0L29.875 16.875L13 22.5L29.875 28.125L35.5 45L41.125 28.125L58 22.5L41.125 16.875ZM20.5 22.5L31.75 18.75L33.625 22.5H20.5ZM35.5 37.5L31.75 26.25L35.5 24.375V37.5ZM35.5 7.5L39.25 18.75L35.5 20.625V7.5ZM39.25 26.25L37.375 22.5H50.5L39.25 26.25ZM29.3125 32.4375L22.375 35.625L25.5625 28.6875L28.5625 29.625L29.3125 32.4375ZM45.4375 28.6875L48.625 35.625L41.6875 32.4375L42.625 29.4375L45.4375 28.6875ZM25.5625 16.3125L22.375 9.375L29.3125 12.5625L28.375 15.375L25.5625 16.3125ZM41.6875 12.5625L48.625 9.375L45.4375 16.3125L42.4375 15.375L41.6875 12.5625Z"
                  fill="white"
                />
              </g>
              <path
                d="M67.4929 20.7827C67.4588 20.4389 67.3125 20.1719 67.054 19.9815C66.7955 19.7912 66.4446 19.696 66.0014 19.696C65.7003 19.696 65.446 19.7386 65.2386 19.8239C65.0313 19.9062 64.8722 20.0213 64.7614 20.169C64.6534 20.3168 64.5994 20.4844 64.5994 20.6719C64.5938 20.8281 64.6264 20.9645 64.6974 21.081C64.7713 21.1974 64.8722 21.2983 65 21.3835C65.1278 21.4659 65.2756 21.5384 65.4432 21.6009C65.6108 21.6605 65.7898 21.7116 65.9801 21.7543L66.7642 21.9418C67.1449 22.027 67.4943 22.1406 67.8125 22.2827C68.1307 22.4247 68.4063 22.5994 68.6392 22.8068C68.8722 23.0142 69.0526 23.2585 69.1804 23.5398C69.3111 23.821 69.3778 24.1435 69.3807 24.5071C69.3778 25.0412 69.2415 25.5043 68.9716 25.8963C68.7045 26.2855 68.3182 26.5881 67.8125 26.804C67.3097 27.017 66.7031 27.1236 65.9929 27.1236C65.2884 27.1236 64.6747 27.0156 64.152 26.7997C63.6321 26.5838 63.2259 26.2642 62.9332 25.8409C62.6435 25.4148 62.4915 24.8878 62.4773 24.2599H64.2628C64.2827 24.5526 64.3665 24.7969 64.5142 24.9929C64.6648 25.1861 64.8651 25.3324 65.1151 25.4318C65.3679 25.5284 65.6534 25.5767 65.9716 25.5767C66.2841 25.5767 66.5554 25.5312 66.7855 25.4403C67.0185 25.3494 67.1989 25.223 67.3267 25.0611C67.4545 24.8991 67.5185 24.7131 67.5185 24.5028C67.5185 24.3068 67.4602 24.142 67.3438 24.0085C67.2301 23.875 67.0625 23.7614 66.8409 23.6676C66.6222 23.5739 66.3537 23.4886 66.0355 23.4119L65.0852 23.1733C64.3494 22.9943 63.7685 22.7145 63.3423 22.3338C62.9162 21.9531 62.7045 21.4403 62.7074 20.7955C62.7045 20.267 62.8452 19.8054 63.1293 19.4105C63.4162 19.0156 63.8097 18.7074 64.3097 18.4858C64.8097 18.2642 65.3778 18.1534 66.0142 18.1534C66.6619 18.1534 67.2273 18.2642 67.7102 18.4858C68.196 18.7074 68.5739 19.0156 68.8438 19.4105C69.1136 19.8054 69.2528 20.2628 69.2614 20.7827H67.4929Z"
                fill="white"
              />
              <defs>
                <clipPath id="clip0_263_6057">
                  <rect
                    width="45"
                    height="45"
                    fill="white"
                    transform="translate(13)"
                  />
                </clipPath>
              </defs>
            </svg>

            <div className="mt-10">
              <div className="w-65 h-10 bg-[#A8509E] rounded-full reveal"></div>
              <div className="split font-inter md:landscape:text-16d text-14d text-white mt-5">
                FREE Shuttle Bus Route
              </div>
            </div>
            <div className="mt-15">
              <div className="w-65 h-10 bg-[#F36F21] rounded-full reveal"></div>
              <div className="split font-inter md:landscape:text-16d text-14d text-white mt-5">
                FREE Shuttle Bus Route
              </div>
            </div>
          </div>
        </div>

        <div className="grid-cols-2 grid w-full mt-135 pb-60 gap-16 md:landscape:hidden">
          {dataMarkerMaps.map((item, index) => (
            <div
              className="flex items-center gap-x-8"
              onClick={() => setActiveMarker(item)}
              key={index}
            >
              <div className="w-22 h-22 bg-[#4B3425] p-2 rounded-full flex items-center justify-center shadow-lg relative z-10">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <span className=" font-extrabold font-inter text-center text-10d text-[#4B3425]">
                    {item.number}
                  </span>
                </div>
              </div>
              <div className="text-12d">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CulturePark;

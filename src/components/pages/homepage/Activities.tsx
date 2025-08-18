import React from "react";
import ImageCard from "@/components/ui/ImageCard";
import GradientImage from "@/components/ui/GradientImage";

const dataActivities = [
  {
    title: "Top of The Statue Tour",
    img: "/images/homepage/activities/image-1.png",
  },
  {
    title: "CUltural activity",
    img: "/images/homepage/activities/image-2.png",
  },
  {
    title: "soulful activity",
    img: "/images/homepage/activities/image-3.png",
  },
  {
    title: "scenic dining",
    img: "/images/homepage/activities/image-4.png",
  },
  {
    title: "SHop",
    img: "/images/homepage/activities/image-5.png",
  },
  {
    title: "mice & events",
    img: "/images/homepage/activities/image-5.png",
  },
];

const Activities = () => {
  return (
    <section className="w-full min-h-screen md:landscape:pt-100">
      <div className="w-full h-full md:landscape:px-90">
        <div className="split w-full font-perfectly-vintage md:landscape:text-45d text-golden-amber text-center leading-none">
          Activities
        </div>
        <div className="split w-full text-center font-inter md:landscape:text-15d font-light text-steel-navy">
          Explore the Cultural Richness of Bali at GWK
        </div>

        <div className="grid md:landscape:grid-cols-3 gap-25 md:landscape:mt-44">
          {dataActivities.map((data, index) => (
            <div className="reveal" key={index}>
              <ImageCard alt={data.title} image={data.img} title={data.title} />
            </div>
          ))}
        </div>

        <div className="w-full md:landscape:h-604 relative md:landscape:mt-52 reveal">
          <GradientImage
            src="/images/homepage/banner.png"
            alt="Activities Background"
            className="object-cover w-full h-full"
          />
          <svg
            className="md:landscape:w-1200 md:landscape:h-67  absolute bottom-0 left-0 translate-y-[1%]"
            width="1200"
            height="67"
            viewBox="0 0 1200 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M878.61 35.4877C820.61 41.5121 764.45 52.3103 706.61 58.8595C624.22 68.1948 538.42 68.7588 456.16 59.0773C376.22 49.6917 293.33 26.8 214.34 15.1699C144.29 4.85192 67.81 0.602998 0 13.4949V67H1200V51.7296C1097.53 30.036 986.387 24.419 878.61 35.4877Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Activities;

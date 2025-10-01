"use client";

import type { Dispatch, SetStateAction } from "react";

export type MarkerData = {
  title: string;
  number: string;
  img: string;
  desc: string;
};

const MarkerMap = ({
  data,
  className,
  setActiveMarker,
}: {
  data: MarkerData;
  className: string;
  setActiveMarker: Dispatch<SetStateAction<MarkerData | null>>;
}) => {
  return (
    <div
      className={`absolute ${className}`}
      onClick={() => setActiveMarker(data)}
    >
      <div className="relative  flex-col items-center gap-y-4 group md:landscape:flex hidden">
        <div className="relative z-20 bg-white rounded-full px-10 py-4 flex justify-center items-center opacity-0 group-hover:opacity-100">
          <span className="font-inter font-bold text-10d whitespace-nowrap">
            {data.title}
          </span>
        </div>

        <div className="relative cursor-pointer">
          <div className="w-22 h-22 bg-[#4B3425] p-2 rounded-full flex items-center justify-center shadow-lg relative z-10">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <span className=" font-extrabold font-inter text-center text-10d text-[#4B3425]">
                {data.number}
              </span>
            </div>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 top-full -translate-[23%]">
            <div className="w-0 h-0 border-l-8d border-r-8d border-t-12d border-l-transparent border-r-transparent border-t-[#4B3425]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkerMap;

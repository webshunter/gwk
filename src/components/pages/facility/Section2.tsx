"use client";

import GradientImage from "@/components/ui/GradientImage";

const datas = [
  {
    title: "Shuttle Bus & Buggy Car",
    desc: "Shuttle bus gratis memudahkan pengunjung menjelajahi area GWK dengan nyaman tanpa kelelahan.",
    img: "/images/facility/facility-1.png",
  },
  {
    title: "mushola",
    desc: "Musholla tersedia untuk memenuhi kebutuhan ibadah pengunjung Muslim selama berwisata.",
    img: "/images/facility/facility-2.png",
  },
  {
    title: "Klinik & Ambulance",
    desc: "Klinik dan ambulans siap memberikan layanan medis demi keamanan dan kenyamanan pengunjung.",
    img: "/images/facility/facility-3.png",
  },
  {
    title: "Payung & Kursi Roda",
    desc: "Payung dan kursi roda gratis disediakan untuk mendukung aksesibilitas dan kenyamanan semua pengunjung.",
    img: "/images/facility/facility-4.png",
  },
];

const Section2 = () => {
  return (
    <section className="w-full pb-60">
      <div className="w-full flex justify-center">
        <div className="h-full w-full md:w-1048 md:h-784 flex justify-center items-center -translate-y-[10%] bg-white">
          <div className="w-full aspect-[4/3] p-4 md:w-816 md:h-596  relative">
            <GradientImage src="/images/facility/map gwk.png" />
          </div>
        </div>
      </div>

      <div className="w-full px-4 md:px-80 mt-8 md:mt-0">
        <div className="flex flex-col md:flex-row md:gap-x-41 items-center justify-center mb-6">
          {/* Mobile: No lines, just title */}
          <div className="block md:hidden font-bold text-2xl text-[#292524] text-center mb-4">
            Services in GWK BALI
          </div>

          {/* Desktop: Original design with lines */}
          <div className="hidden md:block w-202 h-1 bg-[#99A1AF]"></div>
          <div className="hidden md:block font-perfectly-vintage text-41d text-[#292524]">
            Services in GWK BALI
          </div>
          <div className="hidden md:block w-202 h-1 bg-[#99A1AF]"></div>
        </div>

        <div className="max-w-sm md:w-378 font-inter text-sm md:text-17d font-light text-[#737373] text-center mx-auto">
          Comprehensive amenities provided for comfort, safety, and
          accessibility throughout your visit.
        </div>
      </div>

      <div className="w-full px-4 md:px-94 mt-8 md:mt-62">
        {/* Mobile: Single column */}
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {datas.map((data, index) => (
            <div
              className="w-full aspect-[4/3] relative rounded-lg overflow-hidden"
              key={index}
            >
              <GradientImage src={data.img} />

              {/* Mobile overlay untuk readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="font-inter text-lg font-light text-[#F1F5F9] uppercase mb-2">
                  {data.title}
                </div>
                <div className="font-inter text-sm font-light text-white">
                  {data.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Original 2-column grid design preserved */}
        <div className="hidden md:grid grid-cols-2 gap-16">
          {datas.map((data, index) => (
            <div
              className="w-full h-321 col-span-1 relative reveal"
              key={index}
            >
              <GradientImage src={data.img} />

              <div className="absolute px-25 bottom-20 left-0">
                <div className="font-inter text-27d font-light text-[#F1F5F9] uppercase">
                  {data.title}
                </div>
                <div className="font-inter text-16d font-light text-white mt-16">
                  {data.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section2;

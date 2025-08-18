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
        <div className="w-1048 h-784 flex justify-center items-center -translate-y-[10%] bg-white">
          <div className="w-816 h-596 relative">
            <GradientImage src="/images/facility/map gwk.png" />
          </div>
        </div>
      </div>

      <div className="w-full px-80">
        <div className="flex gap-x-41 items-center justify-center">
          <div className="w-202 h-1 bg-[#99A1AF]"></div>
          <div className="font-perfectly-vintage text-41d text-[#292524]">
            Services in GWK BALI
          </div>
          <div className="w-202 h-1 bg-[#99A1AF]"></div>
        </div>

        <div className="w-378 font-inter text-17d font-light text-[#737373] text-center mx-auto split">
          Comprehensive amenities provided for comfort, safety, and
          accessibility throughout your visit.
        </div>
      </div>

      <div className="w-full px-94 mt-62 grid grid-cols-2 gap-16">
        {datas.map((data, index) => (
          <div className="w-full h-321 col-span-1 relative reveal" key={index}>
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
    </section>
  );
};

export default Section2;

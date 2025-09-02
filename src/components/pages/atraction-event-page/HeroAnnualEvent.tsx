import ShowCard from "@/components/ui/ShowCard";
import { AnnualEvent } from "./data";

export default function HeroAnnualEvent() {
  return (
    <section className="relative z-10 bg-white md:landscape:py-60 py-60 px-4 max-xl:portrait:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Mobile First */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start lg:items-center mb-8 md:mb-12 lg:mb-16">
          {/* Title */}
          <div className="text-left">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 leading-tight">
              Annual Events
            </h2>
          </div>

          {/* Description */}
          <div className="lg:pl-8 max-xl:portrait:mt-24">
            <p className="font-normal text-sm sm:text-base md:text-lg text-gray-600 text-left lg:text-right leading-relaxed">
              GWK Cultural Park menghadirkan standar baru untuk penyelenggaraan
              MICE events di Bali. Dengan lanskap budaya yang ikonik dan latar
              Patung Garuda Wisnu Kencana yang megah, setiap acara—dari
              konferensi hingga gala eksklusif—diangkat ke level prestise yang
              mencerminkan kualitas dan reputasi penyelenggara
            </p>
          </div>
        </div>

        {/* Events Cards */}
        <div className="space-y-6 max-xl:portrait:mt-24 mt-60">
          {/* Mobile: Stack vertically */}
          <div className="grid grid-cols-2 gap-4 sm:hidden">
            {AnnualEvent.map((items, index) => (
              <ShowCard
                key={items.label}
                image={items.image}
                title={items.label}
                alt={items.alt}
              />
            ))}
          </div>

          {/* Desktop: 4 columns */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-25">
            {AnnualEvent.map((items, index) => (
              <ShowCard
                key={items.label}
                image={items.image}
                title={items.label}
                alt={items.alt}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

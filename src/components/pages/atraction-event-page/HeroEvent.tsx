import ShowCard from "@/components/ui/ShowCard";
import { regularEvent } from "./data";

export default function HeroEvent() {
  return (
    <section className="relative z-10 max-xl:portrait:pt-60 md:landscape:py-60 bg-white pt-8 pb-8 px-20 sm:pt-12 sm:pb-8 sm:px-6 md:pt-16 md:pb-8 md:px-8 lg:px-10 ">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start lg:items-center mb-8 md:mb-12 lg:mb-16">
          {/* Title */}
          <div className="text-left">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 leading-tight">
              Regular Events
            </h2>
          </div>

          {/* Description */}
          <div className="lg:pl-8 max-xl:portrait:mt-20">
            <p className="font-normal text-sm sm:text-base md:text-lg text-gray-600 text-left lg:text-right leading-relaxed">
              GWK Cultural Park menghadirkan standar baru untuk penyelenggaraan
              MICE events di Bali. Dengan lanskap budaya yang ikonik dan latar
              Patung Garuda Wisnu Kencana yang megah, setiap acara—dari
              konferensi hingga gala eksklusif—diangkat ke level prestise yang
              mencerminkan kualitas dan reputasi penyelenggara
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 max-xl:portrait:mt-24 md:landscape:mt-60">
          <div className="space-y-6">
            {/* Mobile: Stack vertically */}
            <div className="grid grid-cols-2 gap-4 sm:hidden">
              {regularEvent.map((items, index) => (
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
              {regularEvent.map((items, index) => (
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
      </div>
    </section>
  );
}

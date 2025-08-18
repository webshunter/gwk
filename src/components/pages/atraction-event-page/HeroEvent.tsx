import ShowCard from "@/components/ui/ShowCard";
import { regularEvent } from "./data";

export default function HeroEvent() {
  return (
    <section className="relative z-10 bg-white pt-16 pb-8 px-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-100">
        <div className="text-left">
          <h2 className="font-playfair font-bold md:text-5xl text-gray-800 text-41d split">
            Regular Events
          </h2>
        </div>
        <div className="pr-50">
          <p className="font-inter text-gray-600 text-right text-17d split">
            GWK Cultural Park menghadirkan standar baru untuk penyelenggaraan
            MICE events di Bali. Dengan lanskap budaya yang ikonik dan latar
            Patung Garuda Wisnu Kencana yang megah, setiap acara—dari konferensi
            hingga gala eksklusif—diangkat ke level prestise yang mencerminkan
            kualitas dan reputasi penyelenggara
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-52 px-50">
        <div className="flex justify-between gap-20">
          {regularEvent.map((items) => (
            <div key={items.label}>
              <ShowCard
                image={items.image}
                title={items.label}
                alt={items.alt}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

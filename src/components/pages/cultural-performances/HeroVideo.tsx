import ShowItem, { Show } from "@/components/ui/ShowItem";
import ViewVideo from "@/components/ui/ViewVideo";
import Image from "next/image";
const showsData: Show[] = [
  {
    id: 1,
    title: "BARAONG SHOW",
    description:
      "BarAong is GWK’s original theatrical show that tells the story of Prince Bara and his journey to unite five mythical spirits. With striking visuals, music, and dance, BarAong brings a bold cultural fantasy to life — only at GWK Cultural Park.",
    imageSrc: "/images/regular-events/image-data/barong-show.png",
    altText: "Baraong Show Performance",
    kakulSrc: "/images/regular-events/hero-video/kakul-left.png",
  },
  {
    id: 2,
    title: "KECAK DANCE",
    description:
      "Experience the mesmerizing Kecak dance, a captivating performance featuring a choir of over 70 men chanting rhythmically, telling the epic Ramayana saga as the sun sets over the majestic cliffs of Uluwatu.",
    imageSrc: "/images/regular-events/image-data/barong-show.png",
    altText: "Kecak Dance Performance",
    kakulSrc: "/images/regular-events/hero-video/kakul-right.png",
  },
  {
    id: 3,
    title: "BARAONG SHOW",
    description:
      "BarAong is GWK’s original theatrical show that tells the story of Prince Bara and his journey to unite five mythical spirits. With striking visuals, music, and dance, BarAong brings a bold cultural fantasy to life — only at GWK Cultural Park.",
    imageSrc: "/images/regular-events/image-data/barong-show.png",
    altText: "Baraong Show Performance",
    kakulSrc: "/images/regular-events/hero-video/kakul-left.png",
  },
  {
    id: 4,
    title: "KECAK DANCE",
    description:
      "Experience the mesmerizing Kecak dance, a captivating performance featuring a choir of over 70 men chanting rhythmically, telling the epic Ramayana saga as the sun sets over the majestic cliffs of Uluwatu.",
    imageSrc: "/images/regular-events/image-data/barong-show.png",
    altText: "Kecak Dance Performance",
    kakulSrc: "/images/regular-events/hero-video/kakul-right.png",
  },
];

export default function HeroVideo() {
  return (
    <section className="relative py-16">
      <div className="relative flex flex-col justify-center items-center gap-y-4 mb-16">
        <div className="relative w-150 h-100 reveal">
          <Image
            alt="logo-image"
            src={"/images/regular-events/hero-video/logo.png"}
            fill
            className="object-contain"
            priority
          />
        </div>
        <p className="text-center max-w-xl text-gray-600 split">
          The magical richness of Balinese culture awaits, where 15 cultural
          performances are held daily, staged by talented dancers in stunning
          costumes amid majestic Balinese architecture
        </p>
      </div>

      <div className="relative mt-100">
        <div className="relative z-20 mask-border-torn mask-size-full mask-repeat-no-repeat mask-position-center">
          <ViewVideo />
        </div>

        <div className="absolute bottom-550 left-0 w-300 h-200 z-10">
          <Image
            alt="kakul-left"
            src={"/images/regular-events/hero-video/kakul-left.png"}
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-550 right-0 w-300 h-200 z-10">
          <Image
            alt="kakul-right"
            src={"/images/regular-events/hero-video/kakul-right.png"}
            fill
            className="object-contain"
          />
        </div>
      </div>
      {showsData.map((show, index) => (
        <ShowItem key={show.id} {...show} isReversed={index % 2 !== 0} />
      ))}
    </section>
  );
}

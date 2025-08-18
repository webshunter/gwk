import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Gunakan Link untuk navigasi

interface NewsCardProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  date?: string;
  description?: string;
  href?: string;
}

export default function NewsCard({
  imageSrc = "/images/homepage/hero.png",
  imageAlt = "Pertunjukan Barong di GWK",
  title = "Barong Show di GWK: Wisata Tari Barong Bali yang Spektakuler dan Modern",
  date = "04-06-2025",
  description = "Kesenian dari Pulau Bali menjadi salah satu daya tarik utama dari wisata pulau cantik tersebut. Salah satu yang tidak bisa dikesampingkan jika topik ini dibahas adalah Tari Barong Bali. Wisata Tari Barong Bali memiliki daya magis yang luar biasa, baik untuk menarik turis asing, turis lokal, penikmat seni dan tradisi, hingga pelajar dan pegiat konten [...]",
  href = "/news/barong-show-gwk",
}: NewsCardProps) {
  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg overflow-hidden group">
      <div className="md:flex h-250">
        <div className="md:w-5/12 relative">
          <div className="relative h-64 md:h-full transform group-hover:scale-105 transition-transform duration-300">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>

        <div className="md:w-7/12 p-6 md:p-8 flex flex-col">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 leading-tight">
            {title}
          </h2>
          <div className="flex gap-4">
            {" "}
            <Calendar />
            <p className="text-sm text-gray-500 mb-2 ">{date}</p>
          </div>

          <p className="text-gray-600 text-base leading-relaxed mb-6 flex-grow">
            {description}
          </p>

          <div className="mt-auto">
            <Link
              href={href}
              className="text-orange-600 hover:text-orange-800 font-semibold transition-colors duration-200"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

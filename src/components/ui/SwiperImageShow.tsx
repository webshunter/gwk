"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function SwiperImageShow() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const images = [
    {
      src: "/images/homepage/activities/image-1.png",
      alt: "9 Floor View",
      title: "9 Floor View",
    },
    {
      src: "/images/homepage/activities/image-2.png",
      alt: "City Sunset View",
      title: "City Sunset View",
    },
    {
      src: "/images/homepage/activities/image-3.png",
      alt: "Mountain View",
      title: "Mountain View",
    },
    {
      src: "/images/homepage/activities/image-4.png",
      alt: "Ocean View",
      title: "Ocean View",
    },
  ];
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className=" mx-auto p-8 reveal">
      <div className="relative">
        <div className="relative overflow-hidden">
          <div className="relative w-520 h-350   rounded-lg overflow-hidden">
            <Image
              src={images[currentSlide].src}
              alt={images[currentSlide].alt}
              fill
              className="object-cover"
            />
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentSlide === index
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-4">
          <h3 className="text-lg font-medium text-gray-800">
            {images[currentSlide].title}
          </h3>
        </div>
      </div>
    </div>
  );
}

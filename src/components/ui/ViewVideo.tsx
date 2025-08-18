"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ViewVideo({
  img = "/images/top-of-statue-tour/wisnu.png",
}: {
  img?: string;
}) {
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  const openVideoPopup = () => {
    setShowVideoPopup(true);
  };

  const closeVideoPopup = () => {
    setShowVideoPopup(false);
  };

  useEffect(() => {
    const handleEscapeKey = () => {
      closeVideoPopup();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleEscapeKey();
      }
    };

    if (showVideoPopup) {
      document.addEventListener("keydown", handleKeyDown);

      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [showVideoPopup]);
  return (
    <>
      <div className="reveal">
        <div className="w-full flex justify-center items-center  mx-auto">
          <div className="relative aspect-video rounded-lg overflow-hidden w-1080 h-617 cursor-pointer group">
            <Image
              src={img}
              alt="Video Thumbnail"
              fill
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            <button
              onClick={openVideoPopup}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <Image
                alt="play"
                src={"/icon/Vector.png"}
                width={100}
                height={100}
                className="cursor-pointer"
              />
            </button>
          </div>
        </div>
      </div>

      {showVideoPopup && (
        <div
          className="fixed inset-0 bg-black/80 z-[2000] flex items-center justify-center p-4"
          onClick={closeVideoPopup}
        >
          <div
            className="relative w-full max-w-6xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideoPopup}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={closeVideoPopup}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-20 bg-black/70 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-white text-xl font-semibold mb-2">
                Inside the GWK Statue - Virtual Tour
              </h3>
              <p className="text-gray-300 text-sm">
                Explore the magnificent statue from the inside with breathtaking
                views
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

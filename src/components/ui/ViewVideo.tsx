"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ViewVideo({
  img = "/images/top-of-statue-tour/wisnu.png",
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

    const handleKeyDown = (e: any) => {
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
      <div className="w-full px-4 sm:px-6 md:px-8">
        <div className="w-full flex justify-center items-center mx-auto">
          <div className="relative aspect-video rounded-lg overflow-hidden w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl cursor-pointer group">
            <img
              src={img}
              alt="Video Thumbnail"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            <button
              onClick={openVideoPopup}
              className="absolute inset-0 flex items-center justify-center group"
              aria-label="Play video"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-800 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Video Popup Modal */}
      {showVideoPopup && (
        <div
          className="fixed inset-0 bg-black/80 z-[2000] flex items-center justify-center p-4"
          onClick={closeVideoPopup}
        >
          <div
            className="relative w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button for larger screens */}
            <button
              onClick={closeVideoPopup}
              className="hidden sm:block absolute -top-10 md:-top-12 right-0 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-1.5 md:p-2"
              aria-label="Close video"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Close button for all screens (inside video frame) */}
            <button
              onClick={closeVideoPopup}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 text-white hover:text-gray-300 transition-colors z-20 bg-black/70 rounded-full p-1.5 sm:p-2"
              aria-label="Close video"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Video Container */}
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

            {/* Video Info - Hidden on very small screens */}
            <div className="hidden sm:block mt-3 md:mt-4 text-center px-4">
              <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold mb-1 md:mb-2">
                Inside the GWK Statue - Virtual Tour
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm">
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

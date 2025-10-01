import ImageCornerBorder from "@/components/ui/ImageCornerBorder";
import { Clock } from "lucide-react";
const features = [
  "Animated tale of the Garuda Wisnu Kencana statue",
  "GWK Statue Construction Process",
  "Interactive Wall",
  "Panoramic Window",
  "Glass Floor",
  "Steel Structure Seeing Spot",
];
export default function HeroTime() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 lg:py-20 mt-10">
      <ImageCornerBorder
        topLeftImage={"/icon/border/top-left.png"}
        topRightImage={"/icon/border/top-right.png"}
        bottomLeftImage={"/icon/border/bottom-left.png"}
        bottomRightImage={"/icon/border/bottom-right.png"}
        className="w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto"
        padding="p-2"
      >
        <div className="w-full ">
          <div className="p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
              {/* Left Column */}
              <div className="order-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  What&apos;s Inside 9th and 23th floor of the GWK Statue?
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8">
                  Step into the heart of the Garuda Wisnu Kencana Statue and
                  experience
                </p>

                <div className="mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                    Tours available daily, every hour
                  </h2>

                  <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-base sm:text-lg md:text-xl font-medium">
                      10AM – 8PM
                    </span>
                  </div>
                </div>

                {/* Mobile Buy Button - Shows only on mobile */}
                <div className="block lg:hidden order-3 mt-6">
                  <button className="w-full bg-white border-2 border-orange-400 text-orange-500 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:bg-orange-50 active:bg-orange-100 transition-colors duration-200 text-base sm:text-lg">
                    BUY TICKET
                  </button>
                </div>
              </div>

              {/* Right Column */}
              <div className="order-2 space-y-4 sm:space-y-6">
                <ul className="space-y-3 sm:space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full mt-2 sm:mt-2.5 flex-shrink-0"></div>
                      <span className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Desktop Buy Button - Shows only on desktop */}
                <div className="hidden lg:block pt-4 sm:pt-6">
                  <button className="w-full bg-white border-2 border-orange-400 text-orange-500 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:bg-orange-50 transition-colors duration-200 text-base sm:text-lg">
                    BUY TICKET
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ImageCornerBorder>
    </div>
  );
}

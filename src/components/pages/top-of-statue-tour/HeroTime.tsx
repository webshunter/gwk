import ImageCornerBorder from "@/components/ui/ImageCornerBorder";
import { Clock } from "lucide-react";
const features = [
  "Animated tale of Garuda Wisnu Kencana's",
  "GWK Statue Construction Process",
  "Interactive Wall",
  "Panoramic Window",
  "Glass Floor",
  "Steel Structure Seeing Spot",
];
export default function HeroTime() {
  return (
    <ImageCornerBorder
      topLeftImage={"/icon/border/top-left.png"}
      topRightImage={"/icon/border/top-right.png"}
      bottomLeftImage={"/icon/border/bottom-left.png"}
      bottomRightImage={"/icon/border/bottom-right.png"}
      cornerSize={45}
      cornerOffset={3}
      className={`w-1000 h-382 mx-auto flex justify-center items-center mt-40`}
      padding="p-0"
    >
      <div className="max-w-4xl mx-auto p-6  bg-white">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight split">
              What's Inside 9th and 23th floor of the GWK Statue?
            </h1>

            <p className="text-gray-600 text-lg mb-8 split">
              Step into the heart of the Garuda Wisnu Kencana Statue and
              experience
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 split">
                Tours available daily, every hour
              </h2>

              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="w-6 h-6" />
                <span className="text-xl font-medium split">10AM – 8PM</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-gray-700 text-lg leading-relaxed split">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-6">
              <button className="reveal w-full bg-white border-2 border-orange-400 text-orange-500 font-semibold py-4 px-8 rounded-lg hover:bg-orange-50 transition-colors duration-200 text-lg">
                BUY TICKET
              </button>
            </div>
          </div>
        </div>
      </div>
    </ImageCornerBorder>
  );
}

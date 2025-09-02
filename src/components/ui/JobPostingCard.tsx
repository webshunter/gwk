import Image from "next/image";
import { Calendar, Clock, MapPin, Send, Zap } from "lucide-react";
import Button from "./Button";

export interface JobData {
  title: string;
  date: string;
  type: string;
  location: string;
  company: string;
  description: string;
  requirements: string[];
  imageSrc: string;
  imageAlt: string;
}

interface JobPostingCardProps {
  jobData: JobData;
  imagePosition?: "left" | "right";
}

export default function JobPostingCard({
  jobData,
  imagePosition = "right",
}: JobPostingCardProps) {
  const {
    title,
    date,
    type,
    location,
    company,
    description,
    requirements,
    imageSrc,
    imageAlt,
  } = jobData;

  const ContentSection = () => (
    <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{type}</span>
          </div>
          <button className="flex items-center gap-1.5 sm:gap-2 text-orange-500 hover:text-orange-600 transition-colors font-medium">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Apply</span>
          </button>
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <div className="flex items-start gap-2 mb-3">
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 mt-0.5 sm:mt-1 flex-shrink-0" />
          <p className="text-sm sm:text-base text-gray-700">
            Lowongan Kerja Posisi <span className="font-semibold">{title}</span>{" "}
            ({location}) di {company}.
          </p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
            Deskripsi Lowongan Kerja:
          </h3>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {description}
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
            Requirements:
          </h3>
          <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-700">
            {requirements.map((requirement, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-orange-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
        <Button className="w-full sm:w-auto">
          <span>Apply Now</span>
          <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const ImageSection = () => (
    <div className="relative w-full h-48 sm:h-64 md:h-72 lg:h-auto lg:w-80 xl:w-96 2xl:w-[450px] overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority
      />
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 sm:mt-8 md:mt-10 bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl overflow-hidden">
      <div
        className={`flex flex-col ${
          imagePosition === "left" ? "lg:flex-row-reverse" : "lg:flex-row"
        } lg:min-h-[400px] xl:min-h-[500px]`}
      >
        <ImageSection />

        <ContentSection />
      </div>
    </div>
  );
}

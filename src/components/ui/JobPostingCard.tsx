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
    <div className="flex-1 p-6 md:p-8 lg:p-20">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-15 h-15" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-15 h-15" />
            <span>{type}</span>
          </div>
          <button className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors font-medium">
            <Zap className="w-15 h-15" />
            <span>Apply</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-start gap-2 mb-3">
          <MapPin className="w-15 h-15 text-gray-400 mt-1 flex-shrink-0" />
          <p className="text-gray-700">
            Lowongan Kerja Posisi <span className="font-semibold">{title}</span>{" "}
            ({location}) di {company}.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Deskripsi Lowongan Kerja:
          </h3>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Requirements:
          </h3>
          <ul className="space-y-2 text-gray-700">
            {requirements.map((requirement, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <Button>
          <span>Apply Now</span>
          <Send className="w-10 h-10 mt-3" />
        </Button>
      </div>
    </div>
  );

  const ImageSection = () => (
    <div className="w-350  relative overflow-hidden h-full lg:h-auto">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
      />
    </div>
  );

  return (
    <div className="w-full max-w-6xl mt-10 mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {imagePosition === "left" ? (
          <>
            <ImageSection />
            <ContentSection />
          </>
        ) : (
          <>
            <ContentSection />
            <ImageSection />
          </>
        )}
      </div>
    </div>
  );
}

import Image from "next/image";
import HeroMain from "./HeroMain";
import { Calendar, Clock, MapPin, Zap } from "lucide-react";
import { jobsData } from "./data";
import JobPostingCard from "@/components/ui/JobPostingCard";
import Button from "@/components/ui/Button";

export default function CareerPage() {
  return (
    <>
      <HeroMain />

      {/* Job Cards Section */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-10">
        {jobsData.map((job, index) => (
          <JobPostingCard
            key={index}
            jobData={job}
            imagePosition={index % 2 === 0 ? "right" : "left"}
          />
        ))}
      </div>

      {/* Buttons Section */}
      <div className="flex justify-center mt-12 sm:mt-20 md:mt-24 lg:mt-30 w-full px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 md:gap-7 lg:gap-10 w-full max-w-lg sm:max-w-2xl md:max-w-3xl">
          <Button className=" w-full sm:w-150 h-30 text-white">
            STROLL THE PARK
          </Button>
          <Button isActive className="w-full sm:w-150 h-30 text-white">
            BUY TICKET
          </Button>
          <Button className="w-full sm:w-150 h-30 text-white">
            ASK QUESTION
          </Button>
        </div>
      </div>
    </>
  );
}

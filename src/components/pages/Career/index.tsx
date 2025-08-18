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
      {jobsData.map((job, index) => (
        <JobPostingCard
          key={index}
          jobData={job}
          imagePosition={index % 2 === 0 ? "right" : "left"}
        />
      ))}
      <div className="flex justify-center mt-30">
        <div className="flex justify-between items-center gap-50">
          <Button className="w-150 h-30 text-white">STROLL THE PARK</Button>
          <Button isActive className="w-150 h-30 text-white">
            BUY TICKET
          </Button>
          <Button className="w-150 h-30 text-white">ASK QUESTION</Button>
        </div>
      </div>
    </>
  );
}

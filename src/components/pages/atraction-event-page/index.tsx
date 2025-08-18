import GradientImage from "@/components/ui/GradientImage";
import Hero from "./Hero";
import HeroEvent from "./HeroEvent";
import HeroAnnualCalendar from "./HeroAnnualCalendar";
import HeroAnnualEvent from "./HeroAnnualEvent";

export default function AtrationEventPage() {
  return (
    <>
      <Hero />
      <HeroEvent />
      <HeroAnnualCalendar />
      <HeroAnnualEvent />
    </>
  );
}

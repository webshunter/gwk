import GradientImage from "@/components/ui/GradientImage";

export default function HeroMain() {
  return (
    <section className="w-full h-screen relative">
      <GradientImage
        src="/images/career/imagecareer.jpg"
        alt="Hero Background"
      />

      <div className="w-full h-full absolute top-0 left-0 z-10 flex justify-center items-center">
        <div className="flex justify-center items-center flex-col md:landscape:gap-y-32">
          <div className="">
            <div className="font-playfair font-extrabold md:landscape:text-64d text-center text-white leading-none split">
              Career & Opportunity
            </div>
          </div>
          <div className="font-inter font-normal md:landscape:text-24d text-center text-white split">
            Career & Jobs Opportunity
          </div>
        </div>
      </div>
    </section>
  );
}

import GradientImage from "@/components/ui/GradientImage";

export default function HeroMain() {
  return (
    <section className="w-full h-screen relative">
      <GradientImage
        src="/images/perfomace/preformace-image.png"
        alt="Hero Background"
      />

      <div className="w-full h-full absolute top-0 left-0 z-10 flex justify-center items-center">
        <div className="flex justify-center items-center flex-col md:landscape:gap-y-32">
          <div className="">
            <div className="font-playfair font-extrabold md:landscape:text-64d text-center text-white leading-none split">
              Finest Balinese <br /> Cultural Performance
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

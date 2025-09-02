import GradientImage from "@/components/ui/GradientImage";

export default function HeroMain() {
  return (
    <section className="w-full h-screen relative">
      <GradientImage
        src="/images/perfomace/preformace-image.png"
        alt="Hero Background"
      />
      <div className="w-full h-full absolute top-0 left-0 z-10 flex justify-center items-center p-4">
        <div
          className="
            font-playfair font-extrabold text-white text-center leading-tight
            text-4xl    
            sm:text-5xl  
            lg:text-6xl   
            xl:text-64d   
          "
        >
          Finest Balinese
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> </span>
          Cultural Performance
        </div>
      </div>
    </section>
  );
}

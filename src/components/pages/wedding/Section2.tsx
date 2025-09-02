import GradientImage from "@/components/ui/GradientImage";

const Section2 = () => {
  return (
    <section className="w-full md:landscape:px-70 px-20">
      <div className="w-full">
        <div className="w-full flex md:landscape:flex-row flex-col md:landscape:justify-between mt-120">
          <div className="md:landscape:w-411 font-inter md:landscape:text-31d text-24d font-light text-[#A1A1A1] leading-[1.1] split">
            Let your dream wedding unfold in the heart of Bali's most Iconic
            landmark
          </div>

          <div className="md:landscape:w-427 max-xl:portrait:mt-24 font-inter font-light md:landscape:text-17d text-14d md:landscape:text-right text-[#737373] split">
            Garuda Wisnu Kencana (GWK) Cultural Park offers a stunning blend of
            natural beauty and culture for unforgettable weddings. With majestic
            views and versatile spaces, it’s perfect for any celebration.
          </div>
        </div>

        <div className="w-full flex md:landscape:flex-row flex-col gap-x-25 md:landscape:h-686 mt-87">
          <div className="md:landscape:w-[40%] w-full max-xl:portrait:aspect-video md:landscape:h-full relative ">
            <GradientImage
              src="/images/wedding/image-1.png
            "
            />
          </div>
          <div className="md:landscape:w-[60%] w-full md:landscape:h-full h-425 flex flex-col gap-y-25 max-xl:portrait:mt-25">
            <div className="w-full md:landscape:h-[40%] max-xl:portrait:aspect-video relative">
              <GradientImage
                src="/images/wedding/image-2.png
            "
              />
            </div>
            <div className="w-full h-[60%] relative flex gap-x-25">
              <div className="w-full h-full">
                <GradientImage
                  src="/images/wedding/image-3.png
            "
                />
              </div>
              <div className="w-full h-full">
                <GradientImage
                  src="/images/wedding/image-4.png
            "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;

import GradientImage from "@/components/ui/GradientImage";

const Section2 = () => {
  return (
    <section className="w-full px-70">
      <div className="w-full">
        <div className="w-full flex justify-between mt-120">
          <div className="w-411 font-inter text-31d font-light text-[#A1A1A1] leading-[1.1] split">
            Let your dream wedding unfold in the heart of Bali's most Iconic
            landmark
          </div>

          <div className="w-427 font-inter font-light text-17d text-right text-[#737373] split">
            Garuda Wisnu Kencana (GWK) Cultural Park offers a stunning blend of
            natural beauty and culture for unforgettable weddings. With majestic
            views and versatile spaces, it’s perfect for any celebration.
          </div>
        </div>

        <div className="w-full flex gap-x-25 h-686 mt-87">
          <div className="w-[40%] h-full relative ">
            <GradientImage
              src="/images/wedding/image-1.png
            "
            />
          </div>
          <div className="w-[60%] h-full flex flex-col gap-y-25">
            <div className="w-full h-[40%] relative">
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

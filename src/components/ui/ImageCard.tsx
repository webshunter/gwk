import Image from "next/image";
import GradientImage from "./GradientImage";

const ImageCard = ({
  image,
  title,
  alt,
  className = "md:landscape:w-350 max-xl:portrait:aspect-square md:landscape:h-350",
}: {
  image: string;
  title?: string;
  alt: string;
  className?: string;
}) => {
  return (
    <div className={`relative group cursor-pointer ${className}`}>
      <GradientImage
        src={image}
        alt={alt}
        className="duration-300 group-hover:scale-105 transition-all"
      />
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-center text-white bottom-20 w-full md:landscape:w-258">
        <h4 className="md:landscape:text-27d font-light font-inter text-center uppercase w-full">
          {title}
        </h4>
      </div>
    </div>
  );
};

export default ImageCard;

import Image from "next/image";

const ShowCard = ({
  image,
  title,
  alt,
}: {
  image: string;
  title: string;
  alt: string;
}) => {
  return (
    <div className="relative group cursor-pointer w-full h-full">
      <Image
        src={image}
        alt={alt}
        width={350}
        height={400}
        className="transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white p-4 sm:p-6">
        <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight">
          {title}
        </h4>
      </div>
    </div>
  );
};

export default ShowCard;

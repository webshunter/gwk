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
    <div className="relative group cursor-pointer reveal">
      <Image
        src={image}
        alt={alt}
        width={350}
        height={400}
        className="transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white mt-6 py-4">
        <h4 className="text-xl md:text-4xl font-medium font-playfair mt-80">
          {title}
        </h4>
      </div>
    </div>
  );
};

export default ShowCard;

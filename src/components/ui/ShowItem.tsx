import Image from "next/image";

export type Show = {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  kakulSrc: string;
};

export type ShowItemProps = Show & {
  isReversed?: boolean;
};

const ShowItem = ({
  title,
  description,
  imageSrc,
  altText,
  kakulSrc,
  isReversed = false,
}: ShowItemProps) => {
  const kakulPosition = isReversed
    ? "absolute top-0 right-0 w-300 h-200 z-0 opacity-50"
    : "absolute top-0 left-0 w-300 h-200 z-0 opacity-50";

  const flexDirection = isReversed
    ? "flex items-center justify-center gap-30 flex-row-reverse"
    : "flex items-center justify-center gap-30";

  return (
    <div className="relative mt-100 px-200 reveal">
      <div className={kakulPosition}>
        <Image alt="ornament" src={kakulSrc} fill className="object-contain" />
      </div>

      <div className="relative z-10">
        <div className={flexDirection}>
          <div className="relative w-382 h-274">
            <Image alt={altText} fill src={imageSrc} className="object-cover" />
          </div>
          <div className="flex flex-col max-w-md">
            <h3 className="text-3xl font-bold text-gray-800 tracking-wider mb-4">
              {title}
            </h3>
            <p className="text-base text-gray-500 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowItem;

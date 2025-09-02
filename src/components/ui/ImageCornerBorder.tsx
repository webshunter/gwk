import Image from "next/image";
import { useMemo } from "react";

// Definisikan tipe props agar lebih jelas dan aman
interface ImageCornerBorderProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
  topLeftImage?: string;
  topRightImage?: string;
  bottomLeftImage?: string;
  bottomRightImage?: string;
  imageClassName?: string;

  cornerSize?: { mobile: number; tablet: number; desktop: number };
  cornerOffset?: { mobile: number; tablet: number; desktop: number };
}

const ImageCornerBorder = ({
  children,
  className = "",
  padding = "p-6 sm:p-8 md:p-10",
  topLeftImage,
  topRightImage,
  bottomLeftImage,
  bottomRightImage,
  imageClassName = "",

  cornerSize = { mobile: 25, tablet: 35, desktop: 45 },
  cornerOffset = { mobile: 12, tablet: 16, desktop: 20 },
}: ImageCornerBorderProps) => {
  const corners = useMemo(
    () => [
      {
        key: "topLeft",
        src: topLeftImage,
        positionClasses: "top-0 left-0",

        style: {
          transform: `translate(-${cornerOffset.mobile}px, -${cornerOffset.mobile}px)`,
          "--tablet-transform": `translate(-${cornerOffset.tablet}px, -${cornerOffset.tablet}px)`,
          "--desktop-transform": `translate(-${cornerOffset.desktop}px, -${cornerOffset.desktop}px)`,
        },
      },
      {
        key: "topRight",
        src: topRightImage,
        positionClasses: "top-0 right-0",
        style: {
          transform: `translate(${cornerOffset.mobile}px, -${cornerOffset.mobile}px)`,
          "--tablet-transform": `translate(${cornerOffset.tablet}px, -${cornerOffset.tablet}px)`,
          "--desktop-transform": `translate(${cornerOffset.desktop}px, -${cornerOffset.desktop}px)`,
        },
      },
      {
        key: "bottomLeft",
        src: bottomLeftImage,
        positionClasses: "bottom-0 left-0",
        style: {
          transform: `translate(-${cornerOffset.mobile}px, ${cornerOffset.mobile}px)`,
          "--tablet-transform": `translate(-${cornerOffset.tablet}px, ${cornerOffset.tablet}px)`,
          "--desktop-transform": `translate(-${cornerOffset.desktop}px, ${cornerOffset.desktop}px)`,
        },
      },
      {
        key: "bottomRight",
        src: bottomRightImage,
        positionClasses: "bottom-0 right-0",
        style: {
          transform: `translate(${cornerOffset.mobile}px, ${cornerOffset.mobile}px)`,
          "--tablet-transform": `translate(${cornerOffset.tablet}px, ${cornerOffset.tablet}px)`,
          "--desktop-transform": `translate(${cornerOffset.desktop}px, ${cornerOffset.desktop}px)`,
        },
      },
    ],
    [
      topLeftImage,
      topRightImage,
      bottomLeftImage,
      bottomRightImage,
      cornerOffset,
    ]
  );

  return (
    <div className={`relative ${padding} ${className}`}>
      {corners.map((corner) =>
        corner.src ? (
          <div
            key={corner.key}
            className={`absolute z-10 ${corner.positionClasses} 
              // Terapkan transform responsif menggunakan CSS variable
              sm:[transform:var(--tablet-transform)] 
              md:[transform:var(--desktop-transform)]`}
            style={corner.style}
          >
            <Image
              src={corner.src}
              alt={`Corner decoration ${corner.key}`}
              className={`object-contain ${imageClassName}
                w-[${cornerSize.mobile}px] h-[${cornerSize.mobile}px]
                sm:w-[${cornerSize.tablet}px] sm:h-[${cornerSize.tablet}px]
                md:w-[${cornerSize.desktop}px] md:h-[${cornerSize.desktop}px]
              `}
              width={cornerSize.desktop}
              height={cornerSize.desktop}
            />
          </div>
        ) : null
      )}

      <div className="relative">{children}</div>
    </div>
  );
};

export default ImageCornerBorder;

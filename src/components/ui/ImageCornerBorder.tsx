import Image from "next/image";

interface ImageCornerBorderProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
  cornerSize?: number;
  topLeftImage?: string;
  topRightImage?: string;
  bottomLeftImage?: string;
  bottomRightImage?: string;
  cornerOffset?: number;
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
}

const ImageCornerBorder = ({
  children,
  className = "",
  padding = "p-8",
  cornerSize = 40,
  topLeftImage,
  topRightImage,
  bottomLeftImage,
  bottomRightImage,
  cornerOffset = 16,
  imageClassName = "",
  imageStyle = {},
}: ImageCornerBorderProps) => {
  // Helper function to render a single corner image
  const renderCornerImage = (
    position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
  ) => {
    let imageSrc;
    const style: React.CSSProperties = {};

    // Determine the image source and position styles based on the corner
    switch (position) {
      case "topLeft":
        imageSrc = topLeftImage;
        style.top = `-${cornerOffset}px`;
        style.left = `-${cornerOffset}px`;
        break;
      case "topRight":
        imageSrc = topRightImage;
        style.top = `-${cornerOffset}px`;
        style.right = `-${cornerOffset}px`;
        break;
      case "bottomLeft":
        imageSrc = bottomLeftImage;
        style.bottom = `-${cornerOffset}px`;
        style.left = `-${cornerOffset}px`;
        break;
      case "bottomRight":
        imageSrc = bottomRightImage;
        style.bottom = `-${cornerOffset}px`;
        style.right = `-${cornerOffset}px`;
        break;
    }

    if (!imageSrc) return null;

    return (
      <div className="absolute z-10" style={style}>
        <Image
          src={imageSrc}
          alt={`Corner decoration ${position}`}
          width={cornerSize}
          height={cornerSize}
          className={`object-contain ${imageClassName}`}
          style={imageStyle}
          priority={false}
          quality={90}
        />
      </div>
    );
  };

  return (
    <div className={`relative ${padding} ${className}`}>
      {/* Corner Images */}
      {renderCornerImage("topLeft")}
      {renderCornerImage("topRight")}
      {renderCornerImage("bottomLeft")}
      {renderCornerImage("bottomRight")}

      <div className="relative z-20">{children}</div>
    </div>
  );
};

export default ImageCornerBorder;

import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  rounded?: boolean;
  shadow?: boolean;
  height?: string | number;
  width?: string | number;
}

const Images: React.FC<ImageProps> = ({
  src,
  alt,
  className = "",
  rounded = false,
  shadow = false,
  height,
  width,
}) => {
  const baseClasses = "object-cover";
  const roundedClasses = rounded ? "rounded-full" : "";
  const shadowClasses = shadow ? "shadow-lg" : "";

  return (
    <img
      src={src}
      alt={alt}
      className={`${baseClasses} ${roundedClasses} ${shadowClasses} ${className}`}
      height={height}
      width={width}
    />
  );
};

export default Images;

import React from "react";
import Button from "../Button/Button";
import Images from "../../Image/Images";

interface CardProps {
  Src: string;
  imageAlt?: string;
  title?: string;
  text?: string;

  onButtonClick: () => void;
  width?: string; // Optional prop
  height?: string; // Optional prop
}

export default function Card({
  Src,
  imageAlt = "Default Alt Text",
  title = "Default Title",
  text = "Default Text",

  width = "14%", // Adjusted width to fit 7 cards
  height = "auto", // Default height
}: CardProps) {
  return (
    <div
      className="border border-gray-300 rounded overflow-hidden shadow-md"
      style={{ width, height }}
    >
      <Images
        src={Src}
        alt={imageAlt}
        className="w-full h-32 object-cover  transition-transform duration-300 transform hover:scale-105" // Adjusted height to match card size
      />

      <div className="p-2 ">
        <h5 className="text-sm decoration-solid mb-2">{title.trim()}</h5>
        <p className="text-xs  font-bold mb-3">{text.trim()}</p>
      </div>
    </div>
  );
}

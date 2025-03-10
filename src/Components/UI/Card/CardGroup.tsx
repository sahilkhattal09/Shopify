import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { ImageData } from "../../../types/types";

interface CardGroupProps {
  cardData: ImageData[];
  initialLimit?: number;
}

export default function CardGroup({
  cardData,
  initialLimit = 6,
}: CardGroupProps) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleItems = 4;
  const [arrowImage, setArrowImage] = useState<string | null>(null);
  const arrowImageId = "67cc166f6597930739d0aceb";

  // Only load up to `initialLimit` cards
  const [limitedCardData, setLimitedCardData] = useState<ImageData[]>([]);

  useEffect(() => {
    setLimitedCardData(cardData.slice(0, initialLimit)); // Limit initially loaded cards
  }, [cardData, initialLimit]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/images/${arrowImageId}`)
      .then((response) => setArrowImage(response.data.imageUrl))
      .catch((error) => console.error("Error fetching arrow image:", error));
  }, []);

  // Move cards left
  const nextSlide = () => {
    if (startIndex < limitedCardData.length - visibleItems) {
      setStartIndex(startIndex + 1);
    }
  };

  // Move cards right
  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="relative flex items-center w-full">
      {/* Left Arrow Button */}
      <button
        onClick={prevSlide}
        disabled={startIndex === 0}
        className={`absolute left-0 z-10 p-2 rounded-full ${
          startIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
        }`}
      >
        {arrowImage ? (
          <img
            src={arrowImage}
            alt="Left Arrow"
            className="w-8 h-8 transform scale-x-[-1]"
          />
        ) : (
          "←"
        )}
      </button>

      {/* Cards Container */}
      <div className="overflow-hidden w-full">
        <div
          className="flex gap-4 transition-transform duration-300"
          style={{
            transform: `translateX(-${startIndex * (100 / visibleItems)}%)`,
          }}
        >
          {limitedCardData.map((card) => (
            <div
              key={card._id}
              className="w-1/4 flex-shrink-0 p-4 bg-white rounded-2xl  hover:scale-105  shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={card.src || "placeholder.jpg"}
                alt={card.name}
                className="w-full h-40 object-contain"
              />
              <p className="text-center font-bold">
                {card.name || "Unnamed Product"}
              </p>
              <p className="text-center text-gray-600">
                Price: ₹{card.price ?? "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Arrow Button */}
      <button
        onClick={nextSlide}
        disabled={startIndex >= limitedCardData.length - visibleItems}
        className={`absolute right-0 z-10 p-2 rounded-full ${
          startIndex >= limitedCardData.length - visibleItems
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-110"
        }`}
      >
        {arrowImage ? (
          <img src={arrowImage} alt="Right Arrow" className="w-8 h-8" />
        ) : (
          "→"
        )}
      </button>
    </div>
  );
}

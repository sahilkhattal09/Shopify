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
  const [limit, setLimit] = useState(initialLimit);
  const [arrowImage, setArrowImage] = useState<string | null>(null);
  const arrowImageId = "67cc166f6597930739d0aceb"; // Arrow image ID in MongoDB

  // Fetch the arrow image from the backend
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/images/${arrowImageId}`)
      .then((response) => {
        setArrowImage(response.data.imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching arrow image:", error);
      });
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-4">
      {cardData.slice(0, limit).map((card) => (
        <Card
          key={card._id}
          src={card.src || "placeholder.jpg"}
          title={card.name || "Unnamed Product"}
          text={`Price: ₹${card.price ?? "N/A"}`}
          onButtonClick={() => console.log(`Card ${card.name} clicked`)}
        />
      ))}

      {/* Show More Button with Arrow Image */}
      {limit < cardData.length && (
        <button
          onClick={() => setLimit((prev) => prev + 6)}
          className="ml-4 p-3 bg-gray-800 rounded-full flex justify-center items-center transition-transform hover:scale-110"
        >
          {arrowImage ? (
            <img src={arrowImage} alt="Arrow" className="w-8 h-8" />
          ) : (
            <span className="text-white text-sm">Loading...</span>
          )}
        </button>
      )}
    </div>
  );
}

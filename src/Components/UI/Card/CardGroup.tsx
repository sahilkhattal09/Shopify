import React, { useEffect, useState } from "react";
import Card from "./Card";

interface CardData {
  _id: string;
  data: { data: number[] }; // Binary data (Buffer) from the backend
  contentType: string; // MIME type (e.g., "image/jpeg")
  name: string; // Product name
  price: number; // Price field from backend
  src?: string; // Base64 encoded image source
}

export default function CardGroup() {
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/images");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const rawData: CardData[] = await response.json();

        // Convert binary data to Base64
        const processedData = rawData.map((card) => ({
          ...card,
          src: `data:${card.contentType};base64,${btoa(
            Array.from(new Uint8Array(card.data.data), (byte) =>
              String.fromCharCode(byte)
            ).join("")
          )}`,
        }));

        setCardData(processedData);
        setError(null);
      } catch (error) {
        console.error("Error fetching card data:", error);
        setError("Failed to fetch card data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, []);

  if (loading) {
    return <p>Loading cards...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-row gap-4 flex-wrap">
      {cardData.map((card) => (
        <Card
          key={card._id}
          src={card.src || "placeholder.jpg"} // Placeholder for missing images
          title={card.name || "Unnamed Product"}
          text={`Price: ₹${card.price || "N/A"}`}
          onButtonClick={() => console.log(`Card ${card.name} clicked`)}
        />
      ))}
    </div>
  );
}

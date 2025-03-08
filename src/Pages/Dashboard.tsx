import React, { useEffect, useState } from "react";
import Header from "../Components/UI/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import Carousel from "../Components/UI/Carousel/Carousel";
import CardContainer from "../Components/UI/Containers/CardContainer";
import CardGroup from "../Components/UI/Card/CardGroup";
import Footer from "../Components/Footer/Footer";

import { ImageData } from "../types/types";
import CategorySection from "../Components/UI/category/CategorySection";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/images");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const rawData: ImageData[] = await response.json();

        // Convert binary data to Base64 for each image
        const processedData = rawData.map((card) => ({
          ...card,
          src: `data:${card.contentType};base64,${btoa(
            Array.from(new Uint8Array(card.data.data), (byte) =>
              String.fromCharCode(byte)
            ).join("")
          )}`,
        }));

        setImages(processedData);
        setError(null);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Failed to fetch images.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Define the height of the header to be used as top padding for content
  const headerHeight = 64; // Adjust this value according to your header height

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  const trendingImages = images.filter(
    (img) => img.category === "Trending Products"
  );

  return (
    <div className="relative flex h-screen">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 transition-transform duration-500 ease-in-out">
        <Header
          toggleSidebar={toggleSidebar}
          className="fixed top-0 left-0 right-0 z-10"
        />
        {/* Add top padding equivalent to the header height */}
        <div
          className="w-full px-2 mt-2"
          style={{ paddingTop: `${headerHeight + 20}px` }} // Added 20px to headerHeight
        >
          <CategorySection />
          <div className="mb-3">
            <Carousel />
          </div>

          <CardContainer title="Trending Products">
            <CardGroup cardData={trendingImages} initialLimit={6} />
          </CardContainer>
          <div className="mt-2">
            <CardContainer title="Trending Products">
              <CardGroup cardData={[]} />
            </CardContainer>
          </div>
        </div>
        <Footer className="mt-1" />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        >
          <div
            className="fixed left-0 top-0 h-full w-64 bg-white z-20 transition-transform duration-500 ease-in-out"
            style={{
              transform: isOpen ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
          </div>
        </div>
      )}
    </div>
  );
}

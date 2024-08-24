import React, { useState, useEffect } from "react";

export default function Carousel() {
  const carouselItems = [
    {
      src: "/Logo/samsung.jpg",
      alt: "Slide 1",
      captionTitle: "",
      captionText: "",
    },
    {
      src: "/Logo/vegetables.jpg",
      alt: "Slide 2",
      captionTitle: "Second Slide Title",
      captionText:
        "Some representative placeholder content for the second slide.",
    },
    {
      src: "/Logo/watchnoise.jpg",
      alt: "Slide 3",
      captionTitle: "Third Slide Title",
      captionText:
        "Some representative placeholder content for the third slide.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Automatically advance slides every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-full max-w-full mx-auto overflow-hidden mt-2">
      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full bg-gray-500 ${
              index === currentIndex ? "bg-white opacity-100" : "opacity-50"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Carousel Items */}
      <div
        className={`flex transition-transform duration-1000 ${
          transitioning && currentIndex === 0 ? "transition-none" : ""
        }`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {carouselItems.map((item, index) => (
          <div key={index} className="relative min-w-full">
            <img
              src={item.src}
              alt={item.alt}
              className="w-full max-h-72 object-cover"
            />
            {(item.captionTitle || item.captionText) && (
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white p-4 rounded-lg">
                <h5 className="text-lg font-bold">{item.captionTitle}</h5>
                <p className="text-sm">{item.captionText}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={handlePrev}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={handleNext}
      >
        &#10095;
      </button>
    </div>
  );
}

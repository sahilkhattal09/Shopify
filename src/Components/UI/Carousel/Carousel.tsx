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

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-full mx-auto overflow-hidden mt-10 sm:mt-2 h-56 sm:h-72 md:h-96">
      {/* Carousel Items */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {carouselItems.map((item, index) => (
          <div key={index} className="relative min-w-full h-56 sm:h-72 md:h-96">
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover"
            />
            {(item.captionTitle || item.captionText) && (
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-4 rounded-lg w-3/4 sm:w-1/2 text-center text-xs sm:text-sm">
                <h5 className="text-sm sm:text-lg font-bold">
                  {item.captionTitle}
                </h5>
                <p className="text-xs sm:text-sm">{item.captionText}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full text-base sm:text-2xl"
        onClick={handlePrev}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full text-base sm:text-2xl"
        onClick={handleNext}
      >
        &#10095;
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-500 ${
              index === currentIndex ? "bg-white opacity-100" : "opacity-50"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

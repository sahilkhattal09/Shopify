import React, { useEffect, useState } from "react";
import Header from "../Components/UI/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import Images from "../Components/Image/Images";
import Carousel from "../Components/UI/Carousel/Carousel";
import CardContainer from "../Components/UI/Containers/CardContainer";
import CardGroup from "../Components/UI/Card/CardGroup";
import axios from "axios";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/images");
        setImages(response.data); // Assuming the API returns an array of images
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  // Define the height of the header to be used as top padding for content
  const headerHeight = 64; // Adjust this value according to your header height

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
          <div className="bg-gray-200 p-12 shadow-md h-40 flex items-center">
            {[
              { src: "/icon/Toy.png", alt: "toy", order: 1, text: "Toys" },
              { src: "/icon/gym.png", alt: "gym", order: 2, text: "gym" },
              {
                src: "/icon/HomeAppliances.png",
                alt: "car",
                order: 3,
                text: "Home Appliances",
              },
              {
                src: "/icon/Mobile.png",
                alt: "ball",
                order: 4,
                text: "Mobile",
              },
              {
                src: "/icon/watch.png",
                alt: "bike",
                order: 5,
                text: "Watches",
              },
              {
                src: "/icon/shopping.png",
                alt: "shopping",
                order: 6,
                text: "Grocery",
              },
            ].map((image, index) => (
              <div
                key={index}
                className={`order-${image.order} flex-1 flex flex-col items-center`}
              >
                <Images
                  src={image.src}
                  alt={image.alt}
                  height={105}
                  width={105}
                  className="mx-auto mb-4  transition-transform duration-300 transform hover:scale-105"
                />
                <p className="text-center text-sm font-bold">{image.text}</p>
              </div>
            ))}
          </div>
          <div className="mb-3">
            <Carousel />
          </div>

          <CardContainer title="Trending Products">
            <CardGroup />
          </CardContainer>
          <div className="mt-2">
            <CardContainer title="Trending Products">
              <CardGroup />
            </CardContainer>
          </div>
        </div>
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

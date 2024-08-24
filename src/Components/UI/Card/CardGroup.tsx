import React from "react";
import Card from "./Card";

export default function CardGroup() {
  const cardData = [
    {
      src: "/icon/Smartwatch.png",
      title: "watches",
      text: "at  ₹ 3000 onwards",
    },
    {
      src: "/icon/car.jpeg",
      title: "kids toys",
      text: "at  ₹ 200 onwards",
    },
    {
      src: "/icon/HomeAppliances.png",
      title: "Home Appliances",
      text: " at ₹ 5000 onwards",
    },
    {
      src: "/icon/gym.png",
      title: "Gym equipments",
      text: "at ₹ 300 onwards",
    },

    { src: "/icon/Iphone.png", title: "Iphone", text: "at ₹ 70000 onwards" },
    { src: "/icon/earbuds.png", title: "earbuds", text: "at ₹ 900 onwards" },
    {
      src: "/icon/Laptop.png",
      title: "Gaming Laptops",
      text: "at ₹ 55000 onwards",
    },
  ];
  return (
    <div className="flex flex-row gap-4">
      {cardData.map((card, index) => (
        <Card
          key={index}
          Src={card.src}
          title={card.title}
          text={card.text}
          onButtonClick={() => {
            console.log(`Card ${index + 1} button clicked`);
          }}
        />
      ))}
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import Images from "../../Image/Images";

type NavigationItemsType = { name: string; route: string };

const navigationItems: NavigationItemsType[] = [
  { name: "Orders", route: "/signin" },
  { name: "Return", route: "/login" },
];

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="flex items-center space-x-2"
          onClick={() => navigate("/")}
          aria-label="Navigate to home"
        >
          <Images
            src="/Logo/Shopmart.png"
            alt="Shopmart logo"
            height={60}
            width={60}
          />
          <span className="text-white font-cursive font-extrabold text-3xl">
            ShopMart
          </span>
        </div>

        <div className="space-x-4">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.route)}
              className="text-gray-300 hover:text-white"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

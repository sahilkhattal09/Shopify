import React, { useState } from "react";
import Header from "../Components/UI/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex h-screen">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-transform duration-500 ease-in-out ${
          isOpen ? "ml-1" : "ml-0" // Adjust the margin for a slight shift
        }`}
      >
        <Header toggleSidebar={toggleSidebar} />
        <div
          className={` transition-opacity duration-500 ease-in-out ${
            isOpen ? "bg-black bg-opacity-50" : "bg-transparent"
          }`}
        >
          {/* Your main content here */}
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

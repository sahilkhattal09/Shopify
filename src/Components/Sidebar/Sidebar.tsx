import { IoMdClose } from "react-icons/io";
import Button from "../UI/Button/Button";
import "./Sidebar.css";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { toastMessage } from "../../Modules/toast";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const [FirstName, setFirstName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Update state based on local storage value
  useEffect(() => {
    const storedFirstName = localStorage.getItem("FirstName");
    if (storedFirstName) {
      setFirstName(storedFirstName);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Handle click events for sidebar items
  const handleSidebarItemClick = (item: string) => {
    if (item === "Logout") {
      // Perform logout
      localStorage.removeItem("FirstName");
      setFirstName("");
      toastMessage({
        message: "Logged out successfully.",
        type: "success",
      });
      setTimeout(() => {
        setIsLoggedIn(false);
      }, 2000);
      // Redirect to login page
      navigate("/login");
    } else if (item === "Login") {
      // Redirect to login page or show login form
      navigate("/login");
    }
  };

  // Sidebar items including the conditional Logout/Login button
  const sidebarItems = [
    { name: "home" },
    { name: "orders" },
    { name: "settings" },
    { name: isLoggedIn ? "Logout" : "Login" }, // Conditional button name
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 pt-3 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="relative">
        <Button
          varient="none"
          onClick={toggleSidebar}
          className="text-white absolute sidebar-close-btn"
        >
          <IoMdClose size={24} />
        </Button>
      </div>
      <div className="flex flex-col items-center">
        <CgProfile size={45} color="white" mb-2 />
        <div className="text-white border-b-2 border-white mt-1">
          Hey {FirstName || "User"}
        </div>
      </div>

      <ul className="mt-4 flex flex-col items-center">
        {sidebarItems.map((item, index) => (
          <li key={index} className="w-[96%] mt-2 mx-4">
            <Button
              className="text-black p-4 rounded-lg border border-white bg-softBlue transition-colors duration-300 hover:bg-darkerSoftBlue w-full h-full"
              varient="none"
              onClick={() => handleSidebarItemClick(item.name)}
            >
              {item.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

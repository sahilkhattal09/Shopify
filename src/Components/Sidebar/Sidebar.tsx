import React from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../UI/Button/Button";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toastMessage } from "../../Modules/toast";
import { logout } from "../../app/Slices/authSlice";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state: any) => state.auth);

  // Handle logout action
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("FirstName"); // Optionally clear storage
    toastMessage({
      message: "Logged out successfully.",
      type: "success",
    });

    setTimeout(() => {
      navigate("/login"); // Redirect to login page
    }, 2000);
  };

  // Sidebar items
  const sidebarItems = [
    { name: "Home" },
    { name: "Orders" },
    { name: "Settings" },
    { name: isLoggedIn ? "Logout" : "Login" },
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
          Hey {user?.FirstName || "User"}
        </div>
      </div>
      <ul className="mt-4 flex flex-col items-center">
        {sidebarItems.map((item, index) => (
          <li key={index} className="w-[96%] mt-2 mx-4">
            <Button
              className="text-black p-4 rounded-lg border border-white bg-softBlue transition-colors duration-300 hover:bg-darkerSoftBlue w-full h-full"
              varient="none"
              onClick={() =>
                item.name === "Logout"
                  ? handleLogout()
                  : navigate(item.name.toLowerCase())
              }
            >
              {item.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

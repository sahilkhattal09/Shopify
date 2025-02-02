import React, { useState } from "react";
import LogoutPopup from "../Components/UI/LogoutPopup/LogoutPopup";

const DummyComponent: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleLogoutConfirm = () => {
    console.log("Logout confirmed!");
    setIsPopupVisible(false);
  };

  const handleLogoutCancel = () => {
    console.log("Logout cancelled!");
    setIsPopupVisible(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dummy Component</h1>
      <button
        onClick={() => setIsPopupVisible(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Show Logout Popup
      </button>

      {isPopupVisible && (
        <LogoutPopup
          onConfirm={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
        />
      )}
    </div>
  );
};

export default DummyComponent;

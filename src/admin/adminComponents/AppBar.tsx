import { useState } from "react";
import { FiSearch, FiBell, FiSettings } from "react-icons/fi";
import Searchbar from "../../Components/SearchBar/Searchbar";

export default function AppBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm">
      {/* Left - Branding or Logo */}
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold text-gray-800">Shopmart Admin</span>
      </div>

      {/* Center - Searchbar */}
      <div className="flex-1 flex justify-center">
        <div className="w-96">
          <Searchbar suggestions={[]} />
        </div>
      </div>

      {/* Right - Icons + Profile */}
      <div className="flex items-center gap-6 relative">
        {/* Notification Icon */}
        <div className="relative">
          <FiBell
            className="text-gray-600 text-xl cursor-pointer"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowSettings(false);
            }}
          />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
            3
          </span>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute top-8 right-0 bg-white border rounded-md w-64 shadow-lg p-4 text-sm z-50">
              <p className="font-medium mb-2">Notifications</p>
              <ul className="space-y-2 text-gray-700">
                <li>📦 New order received</li>
                <li>⚠️ Low stock on "Shoes"</li>
                <li>🧑 New user signed up</li>
              </ul>
            </div>
          )}
        </div>

        {/* Settings Icon */}
        <div className="relative">
          <FiSettings
            className="text-gray-600 text-xl cursor-pointer"
            onClick={() => {
              setShowSettings(!showSettings);
              setShowNotifications(false);
            }}
          />
          {showSettings && (
            <div className="absolute top-8 right-0 bg-white border rounded-md w-48 shadow-lg p-3 text-sm z-50">
              <ul className="space-y-2 text-gray-700">
                <li className="cursor-pointer">Profile Settings</li>
                <li className="cursor-pointer">Site Settings</li>
                <li className="cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40?img=4"
            alt="Admin"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-gray-700">Admin</span>
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Images from "../../Image/Images";
import SearchBar from "../../SearchBar/Searchbar";
import { FaShoppingCart } from "react-icons/fa";
import Button from "../Button/Button";

interface HeaderProps {
  toggleSidebar?: () => void;
  className?: string;
  showHamburger?: boolean;
}

export default function Header({
  toggleSidebar,
  className = "",
  showHamburger = true,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className={`bg-gray-800 p-4 ${className}`}>
      {/* Large Screen Layout */}
      <div className="hidden sm:flex items-center">
        {/* Left: Logo & Hamburger */}
        <div className="flex items-center space-x-4">
          {showHamburger && (
            <button
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
              className="text-white"
            >
              <GiHamburgerMenu size={24} />
            </button>
          )}
          <div
            className="flex items-center space-x-2 cursor-pointer"
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
        </div>

        {/* Center: SearchBar */}
        <div className="flex-1 flex justify-center">
          <SearchBar
            suggestions={[]}
            placeholder="Search for Products, brands, and more"
            className="w-[50%] max-w-5xl"
          />
        </div>

        {/* Right: Cart Button */}
        <div className="flex items-center">
          <Button
            onClick={() => navigate("/cart")}
            className="text-white hover:text-gray-300"
            aria-label="Go to cart"
          >
            <FaShoppingCart size={24} />
          </Button>
        </div>
      </div>

      {/* Small Screens Layout */}
      <div className="sm:hidden flex flex-col items-center relative">
        {/* Cart Button - Fully to the Right */}
        <div className="absolute right-2 top-2">
          <Button
            onClick={() => navigate("/cart")}
            className="text-white hover:text-gray-300"
            aria-label="Go to cart"
          >
            <FaShoppingCart size={24} />
          </Button>
        </div>

        {/* Centered Logo & Text */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 top-2 flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
          aria-label="Navigate to home"
        >
          <Images
            src="/Logo/Shopmart.png"
            alt="Shopmart logo"
            height={45}
            width={45}
          />
          <span className="text-white font-cursive font-extrabold text-2xl">
            ShopMart
          </span>
        </div>

        {/* Search Bar - Narrower for Small Screens */}
        <div className="w-full px-4 mt-14 flex justify-center">
          <SearchBar
            suggestions={[]}
            placeholder="Search for Products, brands, and more"
            className="w-[60%] max-w-[250px]"
          />
        </div>
      </div>
    </div>
  );
}

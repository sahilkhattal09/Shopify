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
      <div className="flex items-center">
        {/* Left section with logo and hamburger menu */}
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

        {/* Center section with SearchBar */}
        <div className="flex-1 flex justify-center">
          <SearchBar
            suggestions={[]}
            placeholder="Search for Products, brands, and more"
            className="w-[50%] max-w-5xl"
          />
        </div>

        {/* Right section with cart button */}
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
    </div>
  );
}

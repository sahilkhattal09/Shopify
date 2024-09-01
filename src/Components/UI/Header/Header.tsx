import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Images from "../../Image/Images";
import SearchBar from "../../SearchBar/Searchbar";

type NavigationItemsType = { name: string; route: string };

const navigationItems: NavigationItemsType[] = [
  { name: "Orders", route: "/signin" },
  { name: "Return", route: "/login" },
];

interface HeaderProps {
  toggleSidebar?: () => void;
  className?: string; // Add className as an optional prop
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
      <div className="container mr-auto flex justify-between items-center">
        {/* Left section with logo and hamburger menu */}
        <div className="flex items-center space-x-4">
          {showHamburger && ( // Conditionally render the hamburger button
            <button
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
              className="text-white"
            >
              <GiHamburgerMenu size={24} />
            </button>
          )}
          <div
            className="flex items-center space-x-2 ml-2 cursor-pointer"
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

        <SearchBar
          suggestions={[]}
          placeholder="Search for Products, brands, and more"
        />

        {/* Right section with navigation items */}
        <div className="space-x-4 hidden md:flex">
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

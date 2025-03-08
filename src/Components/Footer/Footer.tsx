import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const navigate = useNavigate();

  const paymentMethods = [
    { icon: FaCcVisa, label: "Visa" },
    { icon: FaCcMastercard, label: "MasterCard" },
    { icon: FaCcPaypal, label: "PayPal" },
    { icon: FaCcAmex, label: "American Express" },
  ];

  const socialMediaContent = (
    <div className="flex flex-col space-y-2 sm:items-start items-center">
      <div className="flex items-center space-x-2">
        <FaFacebook size={20} />
        <span>Facebook</span>
      </div>
      <div className="flex items-center space-x-2">
        <FaTwitter size={20} />
        <span>Twitter</span>
      </div>
      <div className="flex items-center space-x-2">
        <FaInstagram size={20} />
        <span>Instagram</span>
      </div>
    </div>
  );

  const items = [
    {
      label: "Company",
      content: (
        <div className="flex flex-col space-y-2">
          <button onClick={() => navigate("/about")}>About Us</button>
          <button onClick={() => navigate("/contact")}>Contact</button>
          <button onClick={() => navigate("/careers")}>Careers</button>
        </div>
      ),
    },
    {
      label: "Customer Service",
      content: (
        <div className="flex flex-col space-y-2">
          <button onClick={() => navigate("/help")}>Help Center</button>
          <button onClick={() => navigate("/shipping")}>
            Shipping Information
          </button>
          <button onClick={() => navigate("/returns")}>
            Returns & Exchange
          </button>
        </div>
      ),
    },
    {
      label: "Quick Links",
      content: (
        <div className="flex flex-col space-y-2">
          <button onClick={() => navigate("/new")}>New Arrivals</button>
          <button onClick={() => navigate("/best-sellers")}>
            Best Sellers
          </button>
          <button onClick={() => navigate("/gift-cards")}>Gift Cards</button>
        </div>
      ),
    },
    { label: "Social Media", content: socialMediaContent },
  ];

  return (
    <div className={`bg-black text-white p-6 sm:p-8 md:p-10 ${className}`}>
      {/* Grid Layout for Responsiveness */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 text-center sm:text-left">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center sm:items-start"
          >
            <div className="font-bold text-lg">{item.label}</div>
            <div className="mt-2 space-y-2 cursor-pointer">{item.content}</div>
          </div>
        ))}
      </div>

      {/* Separator Line */}
      <div className="w-full h-[1px] bg-white my-6"></div>

      {/* Payment Methods - Centered on Small Screens */}
      <div className="flex flex-wrap justify-center sm:justify-start space-x-4">
        {paymentMethods.map((method, index) => (
          <div key={index} className="flex items-center space-x-2">
            <method.icon size={28} />
            <span>{method.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

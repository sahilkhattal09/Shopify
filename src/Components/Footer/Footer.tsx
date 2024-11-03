import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Footer {
  className: string;
}
export default function Footer({ className = "" }: Footer) {
  const navigate = useNavigate();

  const paymentMethods = [
    { icon: FaCcVisa, label: "Visa" },
    { icon: FaCcMastercard, label: "MasterCard" },
    { icon: FaCcPaypal, label: "PayPal" },
    { icon: FaCcAmex, label: "American Express" },
  ];
  const socialMediaContent = (
    <div className="space-y-2">
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
        <div className="space-y-2">
          <div onClick={() => navigate("/about")}>About Us</div>
          <div onClick={() => navigate("/contact")}>Contact</div>
          <div onClick={() => navigate("/careers")}>Careers</div>
        </div>
      ),
    },
    {
      label: "Customer Service",
      content: (
        <div className="space-y-2">
          <div onClick={() => navigate("/about")}>Help Center</div>
          <div onClick={() => navigate("/contact")}>Shipping Information</div>
          <div onClick={() => navigate("/careers")}>Returns & Exchange</div>
        </div>
      ),
    },
    {
      label: "Quick links",
      content: (
        <div className="space-y-2">
          <div onClick={() => navigate("/about")}>New Arrivals</div>
          <div onClick={() => navigate("/contact")}>Best Sellers</div>
          <div onClick={() => navigate("/careers")}>Gift Cards</div>
        </div>
      ),
    },
    { label: "Social Media", content: socialMediaContent },
  ];

  return (
    <div
      className={`bottom-0 left-0 w-full bg-black text-white p-4 sm:p-4 md:p-3 lg:p-2 xl:p-3 h-32 sm:h-36 md:h-40 lg:h-48 xl:h-56 ${className}`}
    >
      <div className="flex justify-between">
        {items.map((item, index) => (
          <div
            key={index}
            className={`${
              index === 0 ? "ml-12" : index === items.length - 1 ? "mr-12" : ""
            }`}
          >
            <div className="font-bold">{item.label}</div>
            {item.content && (
              <div className="mt-2 space-y-2 hover:underline cursor-pointer">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full h-[1px] bg-white mt-8"></div>
      <div className="flex justify-center space-x-4 mt-4">
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

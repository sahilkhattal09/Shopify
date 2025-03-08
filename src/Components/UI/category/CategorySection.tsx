import Images from "../../Image/Images";

const categories = [
  { src: "/icon/Toy.png", alt: "toy", text: "Toys" },
  { src: "/icon/gym.png", alt: "gym", text: "Gym" },
  {
    src: "/icon/HomeAppliances.png",
    alt: "home-appliances",
    text: "Home Appliances",
  },
  { src: "/icon/Mobile.png", alt: "mobile", text: "Mobile" },
  { src: "/icon/watch.png", alt: "watch", text: "Watches" },
  { src: "/icon/shopping.png", alt: "shopping", text: "Grocery" },
];

export default function CategorySection() {
  return (
    <div className="hidden sm:flex bg-gray-200 p-6 md:p-12 shadow-md h-auto md:h-40 items-center justify-between">
      {categories.map((image, index) => (
        <div key={index} className="flex-none flex flex-col items-center px-4">
          <Images
            src={image.src}
            alt={image.alt}
            height={85}
            width={85}
            className="mx-auto mb-2 sm:mb-4 transition-transform duration-300 transform hover:scale-105"
          />
          <p className="text-center text-xs sm:text-sm font-bold">
            {image.text}
          </p>
        </div>
      ))}
    </div>
  );
}

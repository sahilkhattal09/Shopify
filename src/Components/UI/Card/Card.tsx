import Images from "../../Image/Images";

interface CardProps {
  src: string;
  imageAlt?: string;
  title?: string;
  text?: string;
}

export default function Card({
  src,
  imageAlt = "Default Alt Text",
  title = "Default Title",
  text = "Default Text",
}: CardProps) {
  return (
    <div className="border border-gray-300 rounded-lg shadow-md bg-white overflow-hidden w-full sm:w-[48%] md:w-[30%] lg:w-[22%] xl:w-[18%] p-3">
      <div className="w-full h-40 flex items-center justify-center overflow-hidden">
        <Images
          src={src}
          alt={imageAlt}
          className="w-auto h-full max-h-full object-contain"
        />
      </div>

      <div className="p-2 text-center">
        <h5 className="text-sm font-semibold">{title.trim()}</h5>
        <p className="text-xs font-bold text-gray-600">{text.trim()}</p>
      </div>
    </div>
  );
}

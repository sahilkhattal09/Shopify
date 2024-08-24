import React from "react";

interface CardContainerProps {
  children?: React.ReactNode;
  containerWidth?: number; // Optional prop to customize container width
  title?: string; // Optional prop to add title text
}

export default function CardContainer({
  children,
  containerWidth,
  title,
}: CardContainerProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="bg-white p-8 rounded-lg custom-shadow"
        style={{ width: containerWidth ? `${containerWidth}px` : "100%" }}
      >
        {title && (
          <h2 className="text-2xl font-bold mb-4">{title}</h2> // Title displayed at the top
        )}
        {children}
      </div>
    </div>
  );
}

import React from "react";

interface CartContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export default function CartContainer({
  children,
  className = "",
}: CartContainerProps) {
  return (
    <div
      className={`container mx-auto my-6 p-6 bg-white shadow-2xl rounded-lg ${className}`}
    >
      {children}
    </div>
  );
}

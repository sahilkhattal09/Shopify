import React from "react";
import "./LoginContainer.css";

export default function LoginContainer({
  children,
  className = "",
  containerWidth = 900,
}: {
  children?: React.ReactNode;
  containerWidth?: number;
  className?: string;
}) {
  return (
    <div className={`flex justify-center items-center h-screen  ${className}`}>
      <div
        className={`bg-white p-8 rounded-lg custom-shadow`}
        style={{ width: `${containerWidth}px` }}
      >
        {children}
      </div>
    </div>
  );
}

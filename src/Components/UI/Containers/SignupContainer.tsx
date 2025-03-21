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
    <div className={`flex justify-center items-center mt-24 ${className}`}>
      <div
        className={`bg-white p-6 rounded-lg custom-shadow`}
        style={{
          width: `${containerWidth}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

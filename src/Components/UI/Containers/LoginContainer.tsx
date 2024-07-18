import React from "react";
import "./LoginContainer.css";

export default function LoginContainer({
  children,
  containerWidth = 900,
}: {
  children?: React.ReactNode;
  containerWidth?: number;
}) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`bg-white p-8 rounded-lg custom-shadow`}
        style={{ width: `${containerWidth}px` }}
      >
        {children}
      </div>
    </div>
  );
}

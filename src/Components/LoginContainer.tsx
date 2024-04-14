import React from "react";

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
        className={`bg-white p-8 rounded-lg shadow-lg`}
        style={{ width: `${containerWidth}px` }}
      >
        {children}
      </div>
    </div>
  );
}

import React from "react";

export default function CartContainer() {
  return (
    <div className="cart-container container mx-auto my-6 p-6 bg-white shadow-lg rounded-lg">
      <slot></slot>
    </div>
  );
}

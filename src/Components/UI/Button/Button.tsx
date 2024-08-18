import React from "react";
import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  shape?: "rectangle" | "rounded";
  varient?: "colored" | "outlined" | "none";
  className?: string;
  type?: "button" | "submit" | "reset"; // Adding type for button types
}

const Button = ({
  children,
  onClick = () => {},
  shape = "rectangle",
  varient = "colored",
  className = "",
  type = "button", // Default type
  ...props
}: ButtonProps) => {
  const baseStyles = "btn-base";
  const shapeStyles = shape === "rounded" ? "btn-rounded" : "btn-rectangle";
  const variantStyles =
    varient === "outlined"
      ? "btn-outlined"
      : varient === "none"
      ? "btn-none" // Handle "none" variant
      : "btn-colored"; // Default to "colored" if no match
  const combinedStyles = `${baseStyles} ${shapeStyles} ${variantStyles} ${className}`;

  return (
    <button onClick={onClick} className={combinedStyles} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;

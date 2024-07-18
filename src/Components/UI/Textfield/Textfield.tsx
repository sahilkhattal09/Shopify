import React, { useState } from "react";
import "../../../Components/UI/Textfield/Textfield.css";

interface TextFieldProps {
  label?: string | undefined;
  className?: string;
  type?: "text" | "email" | "password" | "number";
}

const TextField = ({
  label,
  className = "",
  type = "text",
}: TextFieldProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={`textfield-wrapper ${className}`}>
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        className={`textfield-input ${className}`}
        placeholder=" "
      />
      <label
        className={`textfield-label ${inputValue ? "floating-label" : ""}`}
      >
        {label}
      </label>
    </div>
  );
};

export default TextField;

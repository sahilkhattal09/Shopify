import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ErrorMessage from "../../Error/ErrortextMessage";

interface TextFieldProps {
  label?: string;
  className?: string;
  type?: "text" | "email" | "password" | "number";
  error?: boolean;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  errorMessage?: string | undefined | false;
  hidePasswordToggle?: boolean;
  showCheckmark?: boolean;
}

const TextField = ({
  label,
  className = "",
  type = "text",
  error = false,
  name,
  value,
  onChange,
  onBlur,
  errorMessage,
  hidePasswordToggle = false,
  showCheckmark = false,
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(
    type === "password" ? false : true
  );

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className={`relative mb-10 ${className} flex items-center`}>
      <input
        type={type === "password" && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        name={name}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
          error
            ? "border-red-500"
            : isFocused
            ? "border-black"
            : "border-gray-300"
        } h-12`}
        placeholder=" "
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {label && (
        <label
          className={`absolute left-3 transition-all duration-300 ${
            value || isFocused
              ? "-top-4 text-xs font-bold text-black-500"
              : "top-2 text-gray-500"
          }`}
        >
          {label}
        </label>
      )}
      {type === "password" && value && !hidePasswordToggle && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
      {showCheckmark && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <svg
            className="w-6 h-6 text-green-500 animate-fadeIn"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
      {error && errorMessage && (
        <div className="absolute bottom-[-1.5rem] left-0 text-red-600 text-sm mt-1">
          <ErrorMessage error={error} message={errorMessage} />
        </div>
      )}
    </div>
  );
};

export default TextField;

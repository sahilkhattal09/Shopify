import React, { useState } from "react";

interface TextFieldProps {
  placeholder?: string;
  label?: string;
  name: string;
  id?: string;
}

const TextField = ({ placeholder, label, name, id }: TextFieldProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all ${
          inputValue
            ? "-top-2.5 left-2 bg-white px-1 s-font"
            : "top-2/4 -translate-y-2 text-xs text-gray-400"
        }`}
      >
        {label || placeholder}
      </label>
    </div>
  );
};

export default TextField;

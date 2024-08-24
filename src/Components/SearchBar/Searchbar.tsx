import React, { useState, ChangeEvent } from "react";
import Images from "../Image/Images";

interface SearchBarProps {
  suggestions: string[];
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  suggestions,
  placeholder,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setSearchTerm(userInput);

    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(userInput.toLowerCase())
    );

    setFilteredSuggestions(filtered);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setFilteredSuggestions([]);
    if (onSearch) {
      onSearch(suggestion);
    }
  };

  return (
    <div className="flex items-center w-1/2 ml-2">
      <input
        type="text"
        className="flex-grow p-2 pl-4 border rounded-l-md border-r-0" // No right border to merge with button
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
      />
      <button
        onClick={() => onSearch && onSearch(searchTerm)}
        className="flex-shrink-0 p-2 bg-gray-200 border border-gray-300 rounded-r-md" // Match styling with input
        aria-label="Search"
      >
        <Images
          src="/icon/search.png"
          alt="search icon"
          height={24} // Adjust size to fit within button
          width={24} // Adjust size to fit within button
        />
      </button>
      {filteredSuggestions.length > 0 && (
        <ul className="absolute mt-1 w-full bg-white border rounded shadow-lg z-10">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 border-b cursor-pointer hover:bg-gray-200"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

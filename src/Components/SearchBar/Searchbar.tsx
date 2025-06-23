import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Images from "../Image/Images";
import Button from "../UI/Button/Button";

interface SearchBarProps {
  suggestions: string[];
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ suggestions, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setSearchTerm(userInput);

    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(userInput.toLowerCase())
    );

    setFilteredSuggestions(filtered);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="flex items-center w-1/2 ml-2">
      <input
        type="text"
        className="flex-grow p-2 pl-4 border rounded-l-md border-r-0"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
      />
      <Button
        onClick={handleSearch}
        className="flex-shrink-0 p-2 bg-gray-200 border border-gray-300 rounded-r-md"
        aria-label="Search"
      >
        <Images
          src="/icon/search.png"
          alt="search icon"
          height={24}
          width={24}
        />
      </Button>
      {filteredSuggestions.length > 0 && (
        <ul className="absolute mt-1 w-full bg-white border rounded shadow-lg z-10">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 border-b cursor-pointer hover:bg-gray-200"
              onClick={() => setSearchTerm(suggestion)}
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

"use client";

import { useState } from "react";

import { toast } from "../ui/use-toast";

interface BaseSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  onClear?: () => void; // Added an optional onClear callback
}

const BaseSearch: React.FC<BaseSearchProps> = ({ className = "", onSearch, ...rest }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    rest.onChange?.(e);
  };

  const handleSearch = () => {
    onSearch?.(inputValue);
  };

  return (
    <div className={`base-search ${className}`}>
      <div className="relative flex items-center">
        <input
          className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter Search Keyword"
          type="text"
          {...rest}
        />
        <i
          onClick={handleSearch}
          className="icon-[carbon--search] text-xl absolute right-2 text-white bg-[#596A95] px-3 py-1 rounded-lg hover:bg-[#4a5b84] transition-colors cursor-pointer"
          aria-label="Search"
        />
      </div>
    </div>
  );
};

export default BaseSearch;

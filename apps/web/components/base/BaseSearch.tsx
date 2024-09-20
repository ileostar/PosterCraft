"use client";

import "@/styles/base/search.css";

import { useState } from "react";

interface BaseSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (e: any) => void;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SearchButton: React.FC<ButtonProps> = ({ className, onClick, ...rest }) => (
  <button
    className={`btn-search ${className}`}
    onClick={onClick}
    {...rest}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
    >
      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
      <circle
        id="svg-circle"
        cx="208"
        cy="208"
        r="144"
      ></circle>
    </svg>
  </button>
);

const ClearButton: React.FC<ButtonProps> = ({ className, onClick, ...rest }) => (
  <button
    className={`btn-cleare ${className}`}
    onClick={onClick}
    {...rest}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 384 512"
    >
      <path
        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
        id="cleare-line"
      ></path>
    </svg>
  </button>
);

const BaseSearch: React.FC<BaseSearchProps> = ({ className, onClick, onSearch, ...rest }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="search-panels">
      <div className="search-group">
        <input
          required={true}
          type="text"
          name="text"
          autoComplete="on"
          className={`search-input ${className}`}
          // onClick={onClick}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          {...rest}
        />
        <label className="enter-label">Search</label>
        <div className="btn-box">
          <SearchButton onClick={() => onSearch?.(inputValue)} />
        </div>
        <div className="btn-box-x">
          <ClearButton />
        </div>
      </div>
    </div>
  );
};

export default BaseSearch;

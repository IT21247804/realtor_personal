import React, { useState } from "react";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [mode, setMode] = useState("Buy");

  const categories = ["Apartment", "House", "Land", "Commercial"];
  const handleSearch = () => {
    console.log({ mode, city, category, minPrice, maxPrice });
  };

  return (
    <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg shadow-md">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            mode === "Buy" ? "bg-red-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => setMode("Buy")}
        >
          Buy
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            mode === "Rent" ? "bg-red-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => setMode("Rent")}
        >
          Rent
        </button>
      </div>

      {/* City Search */}
      <input
        type="text"
        placeholder="Search City..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-grow border border-gray-300 rounded-md px-4 py-2"
      />

      {/* Categories Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2"
      >
        <option value="">Categories</option>
        {categories.map((cat, index) => (
          <option value={cat} key={index}>
            {cat}
          </option>
        ))}
      </select>

      {/* Min Price */}
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="w-28 border border-gray-300 rounded-md px-4 py-2"
      />

      {/* Max Price */}
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="w-28 border border-gray-300 rounded-md px-4 py-2"
      />

      {/* Filter Button */}
      <button className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V20l-4-2v-3.172a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z"
          />
        </svg>
      </button>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Search
      </button>
    </div>
  );
};

export default SearchBar;

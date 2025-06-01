import React, { useState, useEffect } from "react";
import { AutoComplete } from "antd";
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [mode, setMode] = useState("Buy");
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const navigate = useNavigate();

  const categories = ["apartment", "house", "land", "commercial", "villa/bungalow", "hotel"];

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/get-all-properties`);
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        const uniqueLocations = [...new Set(data.map(property => property.location))];
        setLocations(uniqueLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationChange = (value) => {
    setLocation(value);
    if (!value.trim()) {
      setFilteredLocations([]);
      return;
    }
    const filtered = locations.filter((loc) =>
      loc.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  const handleSelect = (value) => {
    setLocation(value);
    setFilteredLocations([]);
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      location: location || '',
      category: category || '',
      minPrice: minPrice || '',
      maxPrice: maxPrice || '',
      mode: mode
    }).toString();

    if (mode === 'Buy') {
      navigate(`/explore-to-buy?${searchParams}`);
    } else {
      navigate(`/browse-rentals?${searchParams}`);
    }
  };
  
  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-md space-y-4 md:space-y-0 md:flex-row md:flex-wrap md:items-center md:gap-4"> 
      {/* Mode Toggle */}
      <div className="w-full md:w-auto flex gap-2">
        <button
          className={`flex-1 md:flex-none px-4 py-2 rounded-md font-semibold transition-colors ${
            mode === "Buy" ? "bg-[#272c63] text-white" : "bg-gray-100"
          }`}
          onClick={() => setMode("Buy")}
        >
          Buy
        </button>
        <button
          className={`flex-1 md:flex-none px-4 py-2 rounded-md font-semibold transition-colors ${
            mode === "Rent" ? "bg-[#272c63] text-white" : "bg-gray-100"
          }`}
          onClick={() => setMode("Rent")}
        >
          Rent
        </button>
      </div>

      {/* Location Search */}
      <AutoComplete
        value={location}
        options={filteredLocations.map((loc) => ({ value: loc }))}
        onChange={handleLocationChange}
        onSelect={handleSelect}
        placeholder="Search Location"
        className="w-full md:w-48"
        dropdownStyle={{ zIndex: 9999 }}
      />

      {/* Category Select */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full md:w-auto border border-gray-300 rounded-md px-4 py-2"
      >
        <option value="">Categories</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Price Range Container */}
       <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full md:w-28 border border-gray-300 rounded-md px-4 py-2"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full md:w-28 border border-gray-300 rounded-md px-4 py-2"
        />
      </div>

      {/* Buttons Container */}
      <div className="flex gap-2 w-full md:w-auto">
        {/* Filter Button */}
        <button className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
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
          className="flex-1 md:flex-none px-4 py-2 bg-[#272c63] text-white rounded-md flex items-center justify-center hover:bg-[#1a1f4d] transition-colors"
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
    </div>
  );
};

export default SearchBar;
import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setinput] = useState(data ? data : "");
  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input);
  };
  return (
    <div className="w-full max-w-xl">
      <form
        onSubmit={onSearchHandler}
        className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white shadow-sm"
      >
        {/* Search Icon */}
        <img
          src={assets.search_icon}
          alt="search_icon"
          className="w-5 h-5 ml-4 opacity-60"
        />

        {/* Input */}
        <input
          type="text"
          onChange={(e) => setinput(e.target.value)}
          value={input}
          placeholder="Search Courses"
          className="flex-1 px-4 py-3 outline-none text-gray-600 placeholder-gray-400 bg-transparent"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition-colors font-medium"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

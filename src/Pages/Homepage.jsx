import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Component/Logo";
import SearchBar from "../Component/Searchbar";

function Homepage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (searchQuery) => {
    navigate(`/${searchQuery}`);
    console.log(searchQuery);
  };

  const handleFilter = (filter) => {
    navigate(`/${filter}`);
    console.log(filter);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-200 via-orange-200 to-red-300 text-white">
      <div className="text-center p-6">
        <Logo />
        <h1 className="text-4xl font-bold mb-4 text-red-950">Welcome to the Recipe Hub</h1>
        <p className="text-lg mb-8 text-amber-800">Find your next delicious meal with ease!</p>

        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          className="mb-6"
        />

        <div className="flex space-x-6 mt-6">
          <button
            onClick={() => handleFilter("dessert")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-full text-xl font-semibold"
          >
            Dessert
          </button>
          <button
            onClick={() => handleFilter("breakfast")}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 transition rounded-full text-xl font-semibold"
          >
            Breakfast
          </button>
          <button
            onClick={() => handleFilter("lunch")}
            className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 transition rounded-full text-xl font-semibold"
          >
            Lunch
          </button>
          <button
            onClick={() => handleFilter("dinner")}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 transition rounded-full text-xl font-semibold"
          >
            Dinner
          </button>
        </div>
      </div>

      <footer className="absolute bottom-4 text-center w-full text-sm text-gray-950">
        <p>Made with ❤️ by Sahil Patra</p>
      </footer>
    </div>
  );
}

export default Homepage;

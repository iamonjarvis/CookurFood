import React from "react";

function SearchBar({ query, setQuery, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mt-6">
      <input
        type="text"
        className="w-80 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-800" // Add text color class here
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="ml-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;

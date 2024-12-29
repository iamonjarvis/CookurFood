import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../Component/RecipeCard"; // Assuming you have a component to display each recipe

function SearchPage() {
  const { query } = useParams(); // Get search query from URL
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [diet, setDiet] = useState(""); // State for diet preference
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage error state

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error before making a new request
        const dietParam = diet ? `&diet=${diet}` : ""; // Apply diet filter if selected
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=4f16a02dcacd4e5a86c8a20fc3b3b0a6${dietParam}`
        );
        setRecipes(response.data.results);
      } catch (error) {
        setError("An error occurred while fetching recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [query, diet]); // Re-fetch when query or diet changes

  const handleDietFilter = (dietType) => {
    setDiet(dietType); // Set diet filter (veg/non-veg)
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`); // Navigate to detailed recipe page
  };

  const handleBackButton = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 rounded-full w-12 h-12"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-white to-green-100">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600 text-xl">Find your next delicious recipe!</p>
      </div>

      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={handleBackButton}
          className="px-6 py-3 bg-gray-600 text-white rounded-full shadow-md hover:bg-gray-500 transition-all"
        >
          Back to Search
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-lg mb-6">{error}</div>
      )}

      {/* Diet Filter Buttons */}
      <div className="flex space-x-6 mb-8">
        <button
          onClick={() => handleDietFilter("vegetarian")}
          className="px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-all"
        >
          Vegetarian
        </button>
        <button
          onClick={() => handleDietFilter("non-vegetarian")}
          className="px-6 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-green-600 transition-all"
        >
          Non-Vegetarian
        </button>
        <button
          onClick={() => handleDietFilter("")}
          className="px-6 py-3 bg-gray-400 text-white rounded-full shadow-md hover:bg-gray-500 transition-all"
        >
          All
        </button>
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
        {recipes.length === 0 ? (
          <div className="text-gray-500 text-lg">No recipes found</div>
        ) : (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => handleRecipeClick(recipe.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default SearchPage;

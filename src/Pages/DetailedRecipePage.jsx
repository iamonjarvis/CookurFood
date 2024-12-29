import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function DetailedRecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=4f16a02dcacd4e5a86c8a20fc3b3b0a6`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 rounded-full w-12 h-12"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="text-blue-500 mb-6 text-lg font-semibold hover:underline"
        >
          &larr; Back to Results
        </button>

        {/* Recipe Image */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-80 object-cover rounded-lg shadow-lg"
        />

        {/* Recipe Title */}
        <h1 className="text-4xl font-bold text-center mt-6 text-gray-800">
          {recipe.title}
        </h1>

        {/* Recipe Summary */}
        <div
          className="mt-4 text-gray-600 text-lg leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: recipe.summary,
          }}
        />

        {/* Health Benefits */}
        {recipe.healthScore > 0 && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold text-green-500 mb-2">Health Benefits</h2>
            <p className="text-lg text-gray-700">Health Score: {recipe.healthScore}</p>
          </div>
        )}

        {/* Nutritional Information */}
        {recipe.nutrition && (
          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Nutritional Information</h2>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>Calories: {recipe.nutrition.nutrients.find(nutrient => nutrient.title === "Calories")?.amount} kcal</li>
              <li>Fat: {recipe.nutrition.nutrients.find(nutrient => nutrient.title === "Fat")?.amount} g</li>
              <li>Protein: {recipe.nutrition.nutrients.find(nutrient => nutrient.title === "Protein")?.amount} g</li>
              <li>Carbs: {recipe.nutrition.nutrients.find(nutrient => nutrient.title === "Carbohydrates")?.amount} g</li>
              <li>Sugar: {recipe.nutrition.nutrients.find(nutrient => nutrient.title === "Sugar")?.amount} g</li>
            </ul>
          </div>
        )}

        {/* Ingredients Section with Images */}
        <div className="mt-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Ingredients</h2>
          <ul className="list-disc pl-8 space-y-2 text-lg text-gray-700">
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id} className="flex items-center">
                {/* Ingredient Image */}
                {ingredient.image && (
                  <img
                    src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                    alt={ingredient.name}
                    className="w-10 h-10 object-cover rounded-full mr-4"
                  />
                )}
                {ingredient.original}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions Section */}
        <div className="mt-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Instructions</h2>
          <div
            className="text-lg text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: recipe.instructions,
            }}
          />
        </div>

        {/* Additional Recipe Info (optional) */}
        <div className="mt-8 text-center">
          <span className="inline-block px-6 py-2 text-sm font-semibold text-white bg-green-500 rounded-full">
            {recipe.cuisines.join(', ') || 'Cuisine not specified'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DetailedRecipePage;

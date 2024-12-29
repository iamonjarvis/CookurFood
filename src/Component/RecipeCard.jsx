import React from "react";

function RecipeCard({ recipe, onClick }) {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105"
      onClick={onClick}
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-52 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800 leading-tight mb-2">{recipe.title}</h2>
      
    </div>
  );
}

export default RecipeCard;

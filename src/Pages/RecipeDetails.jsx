import React from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Recipe Details for ID: {id}</h1>
      {/* Display recipe details here */}
    </div>
  );
}

export default RecipeDetails;

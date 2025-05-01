import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 max-w-xs mx-auto transform transition-transform hover:scale-105 hover:shadow-2xl">
      {/* Recipe Image */}
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />

      {/* Recipe Name */}
      <h2 className="text-xl font-semibold text-gray-800">{recipe.name}</h2>
    </div>
  );
};

export default RecipeCard;

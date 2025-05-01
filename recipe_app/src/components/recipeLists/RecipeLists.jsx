import React from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from '../card/RecipeCard';

const RecipeLists = () => {
  const { loading, error, recipes } = useSelector(state => state.recipe);
  console.log('recipe', recipes);

  if (loading) return <p>Loading recipes...</p>;
  if (!recipes || recipes.length === 0) return <p>No recipes available.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeLists;

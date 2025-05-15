import React from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from '../card/RecipeCard';
import { NavLink } from 'react-router-dom';

const RecipeLists = () => {
  const { loading, error, recipes } = useSelector(state => state.recipe);

  if (loading) return <p className="text-center mt-10 text-xl">Loading recipes...</p>;
  if (!recipes || recipes.length === 0) return <p className="text-center mt-10">No recipes available.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {recipes.map(recipe => (
        <NavLink key={recipe.id} to={`/recipe/${recipe.id}`}>
          <RecipeCard recipe={recipe} />
        </NavLink>
      ))}
    </div>
  );
};

export default RecipeLists;

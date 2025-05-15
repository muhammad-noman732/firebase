import React from 'react';
import { useSelector } from 'react-redux';

const RecipeCard = ({ recipe }) => {

  const {loading , error , user} = useSelector(state => state.auth);
   console.log('user in card ' , user);
   

   return (
    <div className="relative w-full max-w-xs mx-auto overflow-hidden rounded-xl shadow-lg transform transition-transform hover:scale-105">
      {/* Recipe Image */}
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-52 object-cover rounded-t-xl"
      />

      {/* Dark Overlay with Text */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-3 rounded-b-xl">
        <h2 className="text-white text-center text-lg font-medium">{recipe.name}</h2>
      </div>

    </div>
  );
};

export default RecipeCard;

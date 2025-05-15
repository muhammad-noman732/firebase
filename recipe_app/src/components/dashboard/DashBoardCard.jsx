import React from 'react';
import { useSelector } from 'react-redux';

const DashBoardCard = ({ recipe }) => {

  const {loading , error , user} = useSelector(state => state.auth);
   console.log('user in card ' , user);
   
   // update handler
    const updateRecipeHandler = (id)=>{
              console.log('update handler is called' );
              
    }

    
   // delete handler
   const deleteRecipeHandler = (id)=>{

   }

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
  
    {/* Conditional Buttons */}
    {recipe.uid && user && user.uid === recipe.uid && (
      <div className="flex justify-center gap-4 mt-3 p-2">
        <button
          onClick={() => updateRecipeHandler(recipe.id)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md text-sm"
        >
          Update
        </button>
        <button
          onClick={() => deleteRecipeHandler(recipe.id)}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md text-sm"
        >
          Delete
        </button>
      </div>
    )}
  </div>
  
  );
};

export default RecipeCard;

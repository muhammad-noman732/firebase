import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, getUserRecipes } from '../../store/features/recipeSlice'
import LoadingSpinner from '../../components/LoadingSpinner'
import RecipeCard from '../../components/card/RecipeCard'
import DashBoardCard from '../../components/dashboard/DashBoardCard'


const Dashboard = () => {

  const {error , loading ,   userRecipe } = useSelector(state => state.recipe)
  const {user} = useSelector(state => state.auth)
  console.log("userRecipes" , userRecipe);
  console.log("user in dahboard page" , user);
  
  const dispatch = useDispatch();

  //  on refresh get the recipes
  useEffect(() => {

    if (user && user.uid) {
      dispatch(getUserRecipes(user.uid));
    }
  }, [dispatch , user]);

  {loading && <LoadingSpinner/>}
  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Welcome {user?.userName}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {userRecipe.length > 0 ? (
          userRecipe.map((recipe) => (
            <NavLink to= {`/recipe/${recipe.id}`}>
            <DashBoardCard key={recipe.id} recipe={recipe} />
            </NavLink>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard

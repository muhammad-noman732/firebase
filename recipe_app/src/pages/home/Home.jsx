import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RecipeLists from '../../components/recipeLists/RecipeLists'
import { getRecipes } from '../../store/features/recipeSlice'

const Home = () => {
  const dispatch = useDispatch();

  // on refresh, get the recipes
  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch])

  return (
    <div className="min-h-screen flex justify-center items-center px-4 sm:px-6 md:px-12">
      <div className="w-full max-w-screen-lg">
        <RecipeLists />
      </div>
    </div>
  )
}

export default Home;

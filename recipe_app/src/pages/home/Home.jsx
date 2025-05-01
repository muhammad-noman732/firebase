import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RecipeLists from '../../components/recipeLists/RecipeLists'
import { getRecipes } from '../../store/features/recipeSlice'



const Home = () => {


  const dispatch = useDispatch();

  //  on refresh get the recipes
   useEffect( ()=>{
    //  in home page get all recipes of all the user 
       dispatch(getRecipes())

   },[dispatch])

  return (
    <div>
        
     <RecipeLists/>
    </div>
  )
}
export default Home;

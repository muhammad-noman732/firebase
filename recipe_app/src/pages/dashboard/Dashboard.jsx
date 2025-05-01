import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RecipeLists from '../../components/recipeLists/RecipeLists'
import { getRecipes } from '../../store/features/recipeSlice'


const Dashboard = () => {

  const {error , loading , user} = useSelector(state => state.auth )
  const dispatch = useDispatch();

  //  on refresh get the recipes
   useEffect(()=>{
  
         dispatch(getRecipes());

   },[dispatch])
  return (
    <div>
      <h2>Welcome {user.userName}</h2>
     {/* <RecipeLists/> */}
    </div>
  )
}

export default Dashboard

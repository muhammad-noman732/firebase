import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice';
import recipeReducer from './features/recipeSlice';

export const store = configureStore({ 
    reducer:{
        auth: authReducer,
        recipe: recipeReducer
    }
})

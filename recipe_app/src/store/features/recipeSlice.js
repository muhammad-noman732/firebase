import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc , collection , getDocs , doc} from "firebase/firestore";
import { db } from "../../config/firebase";
console.log("db" , db);


export const createRecipe = createAsyncThunk('/recipe/createrecipe',
     async(recipeData , {rejectWithValue})=>{

        try {
               //   create  a new recipe
    
        // data to save in db 
        const saveToDb = {
            name : recipeData.name,
            ingredients: recipeData.ingredients,
            createdAt : new Date(),
            instruction: recipeData.instruction,
            category: recipeData.category,
            image : recipeData.image,
        }
        const docRef = await addDoc(collection(db ,  "recipes"), saveToDb);
        return { id: docRef.id, ...saveToDb };
        

        } catch (error) {
           console.log('error ' , error);  
           return rejectWithValue(error.message);
        }
     })

//  get all recipes 

export const getRecipes = createAsyncThunk('/recipe/getrecipe',
       async()=>{

        try {
            const querySnap  = await getDocs(collection(db , "recipes"));
            let posts =[];
           //  foreach does not return 
            querySnap.forEach(doc => {
               console.log("doc data" , doc.data());
               posts.push({ id: doc.id, ...doc.data() });
            });
   
            return posts;

        } catch (error) {
            
            console.log("error" , error);
            return rejectWithValue(error.message); 
        }
    })
const recipeSlice = createSlice({
    name:"recipe",
    initialState:{
        recipes : [],
        error :  null,
        loading : false
    },

    reducers:{

    },

    extraReducers:(builder)=>{
        builder.addCase(createRecipe.pending , (state , action)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(createRecipe.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(createRecipe.fulfilled , (state , action)=>{
            console.log('data in create recipe reducer' , action.payload);
            
            state.loading = false;
            state.error = null;
            state.recipes = [action.payload , ...state.recipe];
        })

        //  get all recipes
        builder.addCase(getRecipes.pending , (state , action)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getRecipes.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(getRecipes.fulfilled , (state , action)=>{
            console.log('data in get recipe' , action.payload);
            
            state.loading = false;
            state.error = null;
            state.recipes = action.payload;
        })
    }
})

export default recipeSlice.reducer
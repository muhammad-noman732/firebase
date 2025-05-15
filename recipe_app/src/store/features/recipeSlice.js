import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc , collection , getDocs , doc, getDoc, query, where, updateDoc} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { getAuth } from "firebase/auth";
console.log("db" , db);


export const createRecipe = createAsyncThunk('/recipe/createrecipe',
     async(recipeData , {rejectWithValue})=>{

        try {
               //   create  a new recipe
               const auth = getAuth(); // get the current user from auth 
               const user = auth.currentUser;
               if (!user) throw new Error("User not authenticated");
        // data to save in db 
        const saveToDb = {
            name : recipeData.name,
            ingredients: recipeData.ingredients,
            createdAt : new Date().toISOString(),
            instruction: recipeData.instruction,
            category: recipeData.category,
            image : recipeData.image,
            uid: user.uid   // using currently authenticated user id 
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

//  get singe recipes
export const getSingleRecipe = createAsyncThunk('/recipe/getsinglerecipe' , 
         async( id , {rejectWithValue})=>{
                
        try {
            const docRef = doc(db , "recipes" , id);
            const snapshot = await getDoc(docRef);
            
            if (!snapshot.exists()) {
              console.log("No such document!");
              return rejectWithValue("Recipe not found");
            }
            
            console.log("Document data:", snapshot.data());
            return { id: snapshot.id , ...snapshot.data() };
            
             } catch (error) {
                return rejectWithValue(error.message);
             }
        }) 

        //  get user Recipes 
export const getUserRecipes = createAsyncThunk("/recipe/getuserrecipes" ,
           async(uid , {rejectWithValue})=>{
            try {
       // find the documents of logged in user         
             
       // Create a reference to the recipes collection
                const recipesRef = collection(db, "recipes");
             // Create a query against the collection.
             const q = query(recipesRef, where("uid", "==", uid ));
             let recipes = [];
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            recipes.push({id: doc.id , ...doc.data()})
         });
          return recipes
            } catch (error) {
               return rejectWithValue(error.message)
            }
                
         })

    //  update recipe action
export const updateRecipe = createAsyncThunk('/recipe/updaterecipe' ,
        async(id , {rejectWithValue})=>{

            try {
                
                 console.log("edit recipe id in update action" , id );
                 await updateDoc(doc(db ,'recipes' , id));

                // get the update doc data and return 
                const docSnap = await getDocs(collection(db , 'recipes' ));
                const recipes  =[];
                
                recipes.forEach((doc)=>{
                    console.log('recipe data' , doc.data())
                     recipes.push({id : doc.id , ...doc.data()})
                })

                return recipes
            
            } catch (error) {
                console.log('error' , error);
                return rejectWithValue (error.message)

            }
        }
)

         // slice 
const recipeSlice = createSlice({
    name:"recipe",
    initialState:{
        recipes : [],
        singleRecipe:{},
        userRecipe : [],
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
            state.recipes = [action.payload , ...state.recipes];
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

        // single recipe 
        builder.addCase(getSingleRecipe.pending , (state , action)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getSingleRecipe.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(getSingleRecipe.fulfilled , (state , action)=>{
            console.log('data in get single  recipe' , action.payload);
            
            state.loading = false;
            state.error = null;
            state.singleRecipe = action.payload;
        })

        // get user recipes 
            builder.addCase(getUserRecipes.pending , (state , action)=>{
                state.loading = true;
                state.error = null;
            })
            builder.addCase(getUserRecipes.rejected , (state , action)=>{
                state.loading = false;
                state.error = action.payload;
            })
            builder.addCase(getUserRecipes.fulfilled , (state , action)=>{
                console.log('data in get user recipe' , action.payload);
                
                state.loading = false;
                state.error = null;
                state.userRecipe = action.payload;
            })

    // update recipe reducer
  
      builder.addCase(updateRecipe.pending , (state , action)=>{
        state.loading = true;
        state.error = null;
    })
    builder.addCase(updateRecipe.rejected , (state , action)=>{
        state.loading = false;
        state.error = action.payload;
    })
    builder.addCase(updateRecipe.fulfilled , (state , action)=>{
        console.log('data in update  recipe' , action.payload);
        const updatedRecipe = action.payload;
        state.loading = false;
        state.error = null;
        state.recipes = state.recipes.map(recipe => recipe.id === action.payload.id ? updateRecipe : recipe)
    })
    }
})

export default recipeSlice.reducer

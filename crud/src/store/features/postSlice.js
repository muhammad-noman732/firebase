import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, addDoc  , getDocs , deleteDoc , doc, updateDoc} from "firebase/firestore";
import { db } from "../../config/firebase";


export const createPost = createAsyncThunk(
  "/posts/createpost",
  async (postData, { rejectWithValue }) => {
    try {
      //  refrence of collection and add data
      const docRef = await addDoc(collection(db, "posts"), postData);
      console.log("doc ref with id ", docRef.id); // adddoc automatically create id for document

      return {
        id: docRef.id,
        ...postData,
      };
    } catch (error) {
      return rejectWithValue(error || "error in adding docs");
    }
  }
);

// fetch posts

export const fetchPosts = createAsyncThunk(
  "/posts/fetchposts",
  async (_, { rejectWithValue }) => {
    try {
      //  get the complete data
      const querySnapshot = await getDocs(collection(db, "posts"));
      const posts = [];
      //   loop on the complete data (for each does not return data )
      querySnapshot.forEach((doc) => {
        console.log("docs in fetch posts ", doc.id , doc.data());
        posts.push({ id: doc.id, ...doc.data() });
      });
      return posts;
    } catch (error) {
      console.log("error in fetcing posts", error);
      return rejectWithValue(error.message);
    }
  }
);

// delete posts 

export const deletePosts = createAsyncThunk('/posts/deletePosts' , 
     async(postId, {rejectWithValue})=>{
        try {
            await deleteDoc(doc(db, "posts", postId));
            return postId
        } catch (error) {
            console.error("error in deleteing post" , error ) 
            return rejectWithValue(error.message)
        }
    })

// update posts 

export const updatePosts = createAsyncThunk('/posts/updatePosts' , 
    async({postId, postData} , {rejectWithValue})=>{
       try {
               //   reference of document 
               console.log("post data " , postData);
               
                const docRef = doc(db ,'posts' , postId);
                //   update the document with the provided field
                await updateDoc(docRef , postData)
                return { id : postId , ...postData}
       } catch (error) {
           console.log("error in updating post" , error.message ) 
           return rejectWithValue(error.message)
       }
   })


const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    error: null,
    loading: false,
    updatePostId : null
  },
  reducers: {
     setUpdatePostId : (state , action)=>{
        console.log("id of update post" , action.payload);
        
         state.updatePostId = action.payload
     }
  },

  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.posts = [action.payload, ...state.posts];
    });
    //     for fetch posts
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
     console.log("data in fetch posts reducer" , action.payload);
        
      state.error = null;
      state.loading = false;
      state.posts = action.payload
    });


    //     for delete posts
    builder.addCase(deletePosts.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      });
      builder.addCase(deletePosts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = true;
      });
      builder.addCase(deletePosts.fulfilled, (state, action) => {
       console.log("data in delete posts reducer" , action.payload);
          
        state.error = null;
        state.loading = false;
        state.posts = state.posts.filter(post => post.id !== action.payload)
      });

    //   updating posts 
    

    //     for delete posts
    builder.addCase(updatePosts.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      });
      builder.addCase(updatePosts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = true;
      });
        builder.addCase(updatePosts.fulfilled, (state, action) => {
            console.log("data in update posts reducer", action.payload);
            const updatedPost = action.payload; 
            state.error = null;
            state.loading = false;
            
            // Update the post
            state.posts = state.posts.map(post => post.id === updatedPost.id ? updatedPost : post);
          });
  }
});

export const {setUpdatePostId} = postSlice.actions
export default postSlice.reducer;

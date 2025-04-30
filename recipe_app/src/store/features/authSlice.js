import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword  , signInWithEmailAndPassword, signOut , onAuthStateChanged} from "firebase/auth";
import { setDoc, doc, getDoc  } from "firebase/firestore";
import { auth } from "../../config/firebase";
import { db } from "../../config/firebase";

export const signup = createAsyncThunk(
  "/auth/signup",
  async (user, { rejectWithValue }) => {
    try {
      // this will save email and password in authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      const firebaseUser = userCredential.user;
      console.log("fire base signup user", firebaseUser);

      const saveintoDb = {
        userName: user.userName,
        email: user.email,
        password: user.password,
        address: user.address,
        gender: user.gender,
        uid: firebaseUser.uid,
      };

      // save in firestore db
      // setdoc does not return anything
      await setDoc(doc(db, "users", firebaseUser.uid), saveintoDb);
      console.log("firebase success");

      return saveintoDb;
    } catch (error) {
      console.log("firebase error", error.message);
      return rejectWithValue(error.message);
    }
  }
);

//  login

export const login = createAsyncThunk("/auth/login",
  async (user, { rejectWithValue }) => {
    try {
      //  sign in in authentication of firebase
    const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password)
    console.log('user' , userCredential.user.uid);

    // get the user from db

      const docSnap = await getDoc(doc(db , 'users' , userCredential.user.uid));
      console.log('data in login action' , docSnap.data);
      const dbUser = docSnap?.data(); // heve to return a single document thats why no foreach
      return dbUser;
          
    } catch (error) {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.log('error in login '  , error.message);
         
         return rejectWithValue(errorMessage)
    }
  }
);

// logout 
const logout = createAsyncThunk('/auth/logout' ,
     async(_ , {rejectWithValue})=>{

      try {

        await signOut(auth);
        return true

      } catch (error) {
        console.log("error in logout " , error);
        
        return rejectWithValue(error.message)
      }
     }
)

//  get current user detail

export const getCurrentUser = createAsyncThunk("/auth/getcurrentuser" ,
     async(setLoading ,store )=>{
        
      onAuthStateChanged(auth, async(user) => {

        try {
          
          setLoading(true)
          if (user) {
            const uid = user.uid;
             console.log('user' , user);
             console.log("uid" , uid);
             // User is signed in, see docs for a list of available properties
             const docSnap = await getDoc(doc(db ,"users" , uid));
             const dbUser = docSnap?.data();
             store.dispatch(setState(dbUser))
  
          } else {
               setLoading(false)
          }
        } catch (error) {
            console.log("error" , error.message);
            return error.message
        }
    
      });
     }
)
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    loading: false,
  },
  reducer: {
     setState : (state ,action)=>{
         state.user = action.payload
     }
  },

  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      console.log("data in signup reducer", action.payload);
      state.loading = false;
      state.error = false;
      state.user = action.payload;
    });
    // login
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("data in login reducer", action.payload);
      state.loading = false;
      state.error = false;
      state.user = action.payload;
    });

    // logout
    builder.addCase(logout.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      console.log("data in login reducer", action.payload);
      state.loading = false;
      state.error = false;
      state.user = null;
    });
  },

});

export default authSlice.reducer;

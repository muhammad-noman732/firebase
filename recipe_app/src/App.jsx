import React, { useEffect, useState } from "react"
import { useDispatch , useSelector } from "react-redux";
import { setUserState } from "./store/features/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./config/firebase";
import { doc, getDoc } from "firebase/firestore";
import Routing from "./routing/Routing";
import LoadingSpinner from "./components/LoadingSpinner";


function App() {
  const [loading , setLoading ] = useState(false)

  const {user ,error} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  console.log("user" , user);
  
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
  
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        const dbUser = docSnap?.data();
        dispatch(setUserState(dbUser));
      } else {
        dispatch(setUserState(null));
      }
      setLoading(false);
    });
  
    return () => unsubscribe(); // cleanup
  }, [dispatch]);

   // If loading is true (auth check in progress), show a loading message 
   
   if (loading) return <p><LoadingSpinner/></p>;

   return <Routing />;
  
}

export default App

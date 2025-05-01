import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouting = ({ children }) => {
  const { user , authChecked } = useSelector((state) => state.auth);

  // authchecked agar nhi true to loading dekhae ga  
  if (!authChecked) {
    return <p>Checking authentication...</p>; // Optional loading state while checking auth
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRouting;

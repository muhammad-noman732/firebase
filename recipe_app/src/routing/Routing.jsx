import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/login/LoginPage'
import SignupPage from '../pages/signup/SignupPage'
import Dashboard from '../pages/dashboard/Dashboard'
import PublicRouting from './PublicRouting'
import PrivateRouting from './PrivateRouting'
import Navbar from '../components/navbar/Navbar'
import CreateRecipe from '../pages/createRecipe/CreateRecipe'
import Home from '../pages/home/Home'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import SingleRecipe from '../pages/singleRcipe/SingleRecipe'

const Routing = () => {
  
  const { user , authChecked } = useSelector((state) => state.auth);
  if (!authChecked) return <p><LoadingSpinner/></p>; 
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/recipe/:id" element={<SingleRecipe/>} />

      <Route
        path="/dashboard"
        element={
          <PrivateRouting>
            <Dashboard />
          </PrivateRouting>
        }
      />
      <Route
        path="/createrecipe"
        element={
          <PrivateRouting>
            <CreateRecipe />
          </PrivateRouting>
        }
      />
    </Routes>
    </>
  );
};


export default Routing

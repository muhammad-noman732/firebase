import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { signup } from '../../store/features/authSlice';
import * as Yup from 'yup'
import { Formik, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
//   const [userName, setUserName] = useState("");
//   const [address, setAddress] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [gender, setGender] = useState("");


 const {user , error , loading } = useSelector(state => state.auth)
 const dispatch = useDispatch();
 const navigate = useNavigate()
  const validationSchema = Yup.object(
    {
        userName: Yup.string()
        .min(5, 'Must be at least 5 characters')
        .required('userName is Required'),
        email: Yup.string()
        .email('Invalid email address')
        .required('email is Required'),
        password: Yup.string()
        .min(6, 'Must be at least 6 characters')
        .required('password is Required'),
        address:Yup.string().min(5, "Must be atleast 5 character")
        .required("address is required"),
        gender: Yup.string().required("gender is required")

  })
  const formik = useFormik({
    initialValues:{
        userName:"",
        email:'',
        password:'',
        address:"",
        gender:"",
     },
    validationSchema,

    onSubmit :  async(values ,{resetForm})=>{
               console.log("values" , values);     
               const result =  await  dispatch(signup(values));
               
               if (signup.fulfilled.match(result)) {
                console.log('Signup success ✅', result.payload);
                navigate("/dashboard")
                resetForm(); // This resets all fields and touched state
               }
    }
  })



//   const submitHandler = (e) => {
//     e.preventDefault();

//     const user = {
//       userName,
//       email,
//       password,
//       address,
//       gender
//     };
//     console.log("user in signup page" , user);
    

//     dispatch(signup(user)); 
//   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Username</label>
          <input
            type="text"
            name="userName"
            value= {formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          
          {formik.touched.userName && formik.errors.userName ? (
          <div className="text-red-500">{formik.errors.userName}</div>
        ) : null}
        </div>
       

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          {
             formik.touched.address && formik.errors.address ? (
                <div className='bg-red-500'>{formik.errors.address}</div>)
                : null
         }
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
           {
             formik.touched.email && formik.errors.email ? (
                <div className='bg-red-500'>{formik.errors.email}</div>)
                : null
         }
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
             {
             formik.touched.password && formik.errors.password ? (
                <div className='bg-red-500'>{formik.errors.password}</div>)
                : null
            }
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-medium">Gender</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mr-2"
              />
              Female
            </label>
          </div>
          {formik.touched.gender && formik.errors.gender ? (
             <div className="text-red-500">{formik.errors.gender}</div>
           ) : null}

        </div>
 
        { error && <p className='bg-red-500'>{error}</p>}
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
        >
          Create Account
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account? <span className="text-teal-600 font-medium cursor-pointer hover:underline">Login</span>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/features/authSlice';


const LoginPage = () => {
  const { user, error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Must be a valid email"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("values " , values);
      
      const result = await dispatch(login(values));
      if (login.fulfilled.match(result)) {
        resetForm();
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
              formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
            }`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
              formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"
            }`}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
          )}
        </div>

        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span className="text-indigo-600 font-medium cursor-pointer hover:underline">Sign up</span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

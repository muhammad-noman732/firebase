import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white border-b-2 border-teal-400 font-semibold"
      : "text-gray-300 hover:text-white transition duration-200";

  return (
    <nav className="bg-gray-900 px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* LEFT NAV LINKS */}
        <div className="flex items-center gap-6">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          {user && (
            <>
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>

              <NavLink to="/createrecipe" className={linkClass}>
                Create Recipe
              </NavLink>
            </>
          )}
        </div>

        {/* RIGHT SIDE - AUTH OPTIONS */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/signup" className={linkClass}>
                Signup
              </NavLink>
            </>
          ) : (
            <>
              <span className="text-teal-300 text-sm">
                Hello, {user.userName }
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

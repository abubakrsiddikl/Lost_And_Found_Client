import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { logInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";
  // console.log(location)
  const [showPassword, setShowPassword] = useState(false);
  const handleLogIn = (e) => {
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    // login implement
    logInUser(email, password)
      .then((result) => {
        // console.log(result.user);
        navigate(from);
        toast.success("You are logged in .");
      })
      .catch((err) => {
        toast.error("Email or Password Wrong .");
      });
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        // console.log(result.user);
        // console.log("sign successfull");s
        navigate(from);
        toast.success("Logged in successfull.");
      })
      .catch((err) => {
        // console.log("errror", err);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogIn}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password  */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          <button
          type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-12 right-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Link to="#" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </div>
        {/* login button */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
          Login
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t"></div>
          <span className="mx-3 text-gray-400">OR</span>
          <div className="flex-grow border-t"></div>
        </div>

        <button
          className="w-full flex items-center justify-center bg-black py-3 text-white font-bold rounded-md  transition"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="mr-2 text-xl" /> Login with Google
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

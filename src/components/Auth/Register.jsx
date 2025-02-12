import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createNewUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password should be strong . ");
      return;
    }
    // register new user
    createNewUser(email, password)
      .then((result) => {
        // console.log(result.user);
        updateProfile(result.user, { displayName: name, photoURL: photo });
        toast.success("Registration successfully.");
        navigate("/");
      })
      .catch((err) => {
        // console.log(err);
        toast.error("This email allready exist");
      });
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        // console.log(result.user);
        toast.success("sign successfull");
        navigate("/");
      })
      .catch((err) => {
        // console.log("errror", err);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md lg:my-3">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          {/* Email  */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          {/* photo url  */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Profile Photo URL
            </label>
            <input
              type="text"
              placeholder="Enter your profile URL"
              name="photo"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>

          {/* Password  */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-10 right-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* register button */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition">
            Register
          </button>

          {/* google sign up */}
          <button
          type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md bg-black text-white font-bold transition"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="text-xl" /> Sign up with Google
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?
          <a
            href="/login"
            className="text-blue-500 font-medium hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;

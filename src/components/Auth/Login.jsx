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
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

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
    <div className="flex justify-center items-center p-9">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 border">
        <form onSubmit={handleLogIn} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-12  btn-xs "
            >
              {showPassword ? <FaEyeSlash /> : <FaEye></FaEye>}
            </button>
            <label className="label">
              <Link to="/forget" className="label-text-alt link link-hover">
                Forgot password?
              </Link>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
          <button onClick={handleGoogleSignIn} className="btn btn-neutral ">
            Login with Google <FcGoogle />
          </button>
        </form>

        <p className="pl-7">
          You Have Not Account Please ?{" "}
          <Link to={"/register"} className="text-red-600 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

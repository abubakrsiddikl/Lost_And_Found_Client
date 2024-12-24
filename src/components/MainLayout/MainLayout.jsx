import React from "react";
import Navbar from "../pages/Shared/Navbar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Home from "../pages/Home/Home";

const MainLayout = () => {
  return (
    <div>
        <Toaster></Toaster>
      <nav className="w-11/12 mx-auto">
        <Navbar></Navbar>
      </nav>
       <Home></Home>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;

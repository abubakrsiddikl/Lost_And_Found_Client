import React from "react";
import Navbar from "../pages/Shared/Navbar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Toaster></Toaster>
      <nav className="w-11/12 mx-auto">
        <Navbar></Navbar>
      </nav>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;

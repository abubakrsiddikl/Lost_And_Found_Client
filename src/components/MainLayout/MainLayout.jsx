import React from "react";
import Navbar from "../pages/Shared/Navbar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Toaster></Toaster>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;

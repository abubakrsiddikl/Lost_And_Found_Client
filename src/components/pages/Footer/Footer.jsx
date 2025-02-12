import React from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral  shadow dark:bg-gray-900 ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse" href="/">
            <img src={logo} className="h-8 rounded-full" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-neutral-content">
              Lost&Found
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0 text-neutral-content">
            <li>
              <a className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a className="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">Contact</Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-neutral-content sm:text-center dark:text-gray-400">
          © 2026 <a className="hover:underline">Lost&Found Ltd™</a>. All Rights
          Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;

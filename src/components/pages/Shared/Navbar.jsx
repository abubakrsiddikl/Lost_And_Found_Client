// import React, { useContext, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { AuthContext } from "../../context/AuthProvider";
// import toast from "react-hot-toast";
// import logo from "../../../assets/WEBLOGO_BLACK.avif";
// import "./Navbar.css"

// const Navbar = () => {
//   const [dropdown, setDropdown] = useState(false);
//   const { user, logOutUser } = useContext(AuthContext);
//   const handleLogOut = () => {
//     logOutUser().then(() => {
//       toast.success("logout successfull");
//     });
//   };
//   const links = (
//     <>
//       <ul className=" md:flex gap-3 text-base">
//         <li>
//           <NavLink to="/">Home</NavLink>
//         </li>
//         <li>
//           <NavLink to="/allItems">All Lost & Found Items</NavLink>
//         </li>
//         <li>
//         <NavLink to="/contact">Contact</NavLink>
//         </li>
//       </ul>
//     </>
//   );
//   return (
//     <div className="navbar bg-[#9ACBD0]">
//       <div className="navbar-start">
//         {/* <div className="dropdown z-50">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//           >
//             {links}
//           </ul>
//         </div> */}
//         <div className=" text-xl ">
//           <img src={logo} className="w-16 " alt="" />
//         </div>
//       </div>
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">{links}</ul>
//       </div>
//       <div className="navbar-end gap-3">
//         {user ? (
//           <>
//             <div className="dropdown dropdown-end z-50">
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="btn btn-ghost btn-circle avatar"
//               >
//                 <div className="w-10 rounded-full">
//                   <img alt="" src={user?.photoURL} />
//                 </div>
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//               >
//                 <li>
//                   <NavLink to="/addItems" className="justify-between">
//                     Add Lost & Found Item Page
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/allRecovered">All Recovered Items Page</NavLink>
//                 </li>
//                 <li>
//                   <NavLink to="/myItems">Manage My Items Page</NavLink>
//                 </li>
//               </ul>
//             </div>
//             <button onClick={handleLogOut} className="btn btn-sm btn-neutral">
//               Log out
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="btn btn-info">
//               Login
//             </Link>
//             <Link to="/register" className="btn btn-neutral">
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import logo from "../../../assets/WEBLOGO_BLACK.avif";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOutUser } = useContext(AuthContext);

  const handleLogOut = () => {
    logOutUser().then(() => {
      toast.success("Logout successful");
    });
  };
  const closeDropdown = () => {
    setMenuOpen(false);
  };
  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-[#9ACBD0]  shadow-md  ">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} className="w-16" alt="Lost & Found Logo" />
          </Link>

          {/* desk navigation */}
          <ul className="hidden md:flex gap-6 text-lg">
            <li>
              <NavLink to="/" className="hover:text-blue-600">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/allItems" className="hover:text-blue-600">
                All Lost & Found Items
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-blue-600">
                Contact
              </NavLink>
            </li>
          </ul>

          {/* User Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="dropdown dropdown-end">
                  <button className="btn btn-ghost btn-circle avatar">
                    <img
                      alt="User Avatar"
                      src={user?.photoURL}
                      className="w-10 rounded-full"
                    />
                  </button>
                  <ul className="dropdown-content menu z-50 p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                      <NavLink to="/addItems">Add Lost & Found Item</NavLink>
                    </li>
                    <li>
                      <NavLink to="/allRecovered">All Recovered Items</NavLink>
                    </li>
                    <li>
                      <NavLink to="/myItems">Manage My Items</NavLink>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm btn-neutral"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-info">
                  Login
                </Link>
                <Link to="/register" className="btn btn-neutral">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden btn btn-ghost"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* mobile Navigation menu */}
        {menuOpen && (
          <ul className="md:hidden z-50 bg-white shadow-lg absolute w-full px-4 py-3 flex flex-col gap-3 text-lg">
            <li>
              <NavLink
                to="/"
                onClick={() => {
                  closeDropdown(); // Close menu after click
                }}
                className="hover:text-blue-600"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/allItems"
                onClick={() => {
                  closeDropdown(); // Close menu after click
                }}
                className="hover:text-blue-600"
              >
                All Lost & Found Items
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={() => {
                  closeDropdown(); // Close menu after click
                }}
                className="hover:text-blue-600"
              >
                Contact
              </NavLink>
            </li>
            {user ? (
              <>
                <li>
                  <NavLink
                    to="/addItems"
                    onClick={() => {
                      closeDropdown(); // Close menu after click
                    }}
                  >
                    Add Lost & Found Item
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/allRecovered"
                    onClick={() => {
                      closeDropdown(); // Close menu after click
                    }}
                  >
                    All Recovered Items
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myItems"
                    onClick={() => {
                      closeDropdown(); // Close menu after click
                    }}
                  >
                    Manage My Items
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="btn btn-sm btn-neutral w-full"
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="btn btn-info w-full"
                    onClick={closeDropdown}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="btn btn-neutral w-full"
                    onClick={closeDropdown}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

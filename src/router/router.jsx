import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout/MainLayout";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Home from "../components/pages/Home/Home";
import AddLostORFound from "../components/pages/AddLostORFound/ AddLostORFound";
import AllLostAndFoundItems from "../components/pages/AllLostAndFoundItems/AllLostAndFoundItems";
import Details from "../components/pages/Details/Details";
import ManageMyPost from "../components/pages/ManageMyPost/ManageMyPost";
import UpdatePost from "../components/pages/UpdatePost/UpdatePost";
import PrivateRoute from "./PrivateRoute";
import AllRecoveredItemsPage from "../components/pages/AllRecoveredItemsPage/AllRecoveredItemsPage";
import Contact from "../components/pages/Contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addItems",
        element: (
          <PrivateRoute>
            <AddLostORFound></AddLostORFound>
          </PrivateRoute>
        ),
      },
      {
        path: "/allItems",
        element: <AllLostAndFoundItems></AllLostAndFoundItems>,
        loader: () =>
          fetch("http://localhost:5000/allItems"),
      },
      {
        path: "/items/:id",
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
      },
      {
        path: "/myItems",
        element: (
          <PrivateRoute>
            {" "}
            <ManageMyPost></ManageMyPost>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateItems/:id",
        element: (
          <PrivateRoute>
            <UpdatePost></UpdatePost>
          </PrivateRoute>
        ),
      },
      {
        path: "/allRecovered",
        element: <AllRecoveredItemsPage></AllRecoveredItemsPage>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;

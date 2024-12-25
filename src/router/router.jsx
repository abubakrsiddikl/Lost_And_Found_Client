import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout/MainLayout";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Home from "../components/pages/Home/Home";
import AddLostORFound from "../components/pages/AddLostORFound/ AddLostORFound";
import AllLostAndFoundItems from "../components/pages/AllLostAndFoundItems/AllLostAndFoundItems";
import Details from "../components/pages/Details/Details";
import ManageMyPost from "../components/pages/ManageMyPost/ManageMyPost";

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
        element: <AddLostORFound></AddLostORFound>,
      },
      {
        path: "/allItems",
        element: <AllLostAndFoundItems></AllLostAndFoundItems>,
        loader: () => fetch("http://localhost:5000/allItems"),
      },
      {
        path: "/items/:id",
        element: <Details></Details>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/items/${params.id}`),
      },
      {
        path: "/myItems",
        element: <ManageMyPost></ManageMyPost>,
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

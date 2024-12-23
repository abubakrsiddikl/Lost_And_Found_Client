
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/MainLayout/MainLayout';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
     children: [
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      }
     ],
    },
  ]);

export default router;
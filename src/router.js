import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoutes from './ProtectedRoutes';


const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
            path: "/",
            element: <Login/>
        },

        {
          path: 'home',
          element: <ProtectedRoutes />,
          children: [
            {
              path: '',
              element: <Home />,
            },
          ],
        }
      ],
    },
  ]);

export default router;
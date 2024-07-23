import { FC } from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "../pages/login/Index";
import Layout from "../layout/Layout";
import App from "../pages/main-page/Index";
import Despacho from "../pages/despacho/Index";
import BoletasDesp from "../pages/despacho/boletas/Index";

const Index: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      loader: () => {
        const userData = localStorage.getItem("credentials");
        if (userData) {
          return redirect("/app");
        }
        return null;
      },
    },
    {
      path: "/app",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <App />,
        },
        {
          path: "despacho",
          children: [
            { index: true, element: <Despacho /> },
            { path: "boletas", element: <BoletasDesp /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
export default Index;

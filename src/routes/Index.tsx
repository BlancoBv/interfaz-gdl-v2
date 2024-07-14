import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/login/Index";

const Index: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
};
export default Index;

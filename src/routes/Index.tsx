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
import BoletasDespxEmp from "../pages/despacho/boletas/idDespachador/Index";
import Axios from "../assets/Axios";

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
      errorElement: <>Error 404</>,
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
            {
              path: "boletas",
              children: [
                { index: true, element: <BoletasDesp /> },
                {
                  path: ":idDespachador",
                  element: <BoletasDespxEmp />,
                  loader: async ({ params, request }) => {
                    console.log(params);

                    const url = new URL(request.url);
                    const { month, year, quincena } = Object.fromEntries(
                      url.searchParams
                    );
                    const res = await Axios.get(
                      `/view/boletas?idEmpleado=${params.idDespachador}&year=${year}&month=${month}&quincena=${quincena}`
                    );
                    if (!res.data.response.empleado) {
                      throw new Response("Not Found", { status: 404 });
                    }
                    console.log(res.data.response.empleado);
                    return res.data;
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
export default Index;

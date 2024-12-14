import App from "@pages/app/Index";
import { redirect, RouteObject } from "react-router-dom";
import Layout from "@layout/Layout";
import RedactarSNC from "@pages/app/salidas-no-conformes/redactar/RedactarSNC";
import Archivos from "@pages/app/salidas-no-conformes/archivos/Archivos";
import GIyE from "@pages/app/salidas-no-conformes/reportes/GIyE";
import GIyExID from "@pages/app/salidas-no-conformes/reportes/GIyExID";

export default {
  path: "/app",
  loader: () => {
    const userData = localStorage.getItem("credentials");
    const token = localStorage.getItem("token");
    if (!userData && !token) {
      return redirect("/");
    }
    return null;
  },
  element: <Layout />,
  children: [
    {
      index: true,
      element: <App />,
    },
    {
      path: "salidas-no-conformes",
      children: [
        {
          // index: true,
          // element: <RedactarSNC />,
          children: [
            { path: "redactar", element: <RedactarSNC /> },
            { path: "archivos", element: <Archivos /> },
            {
              path: "reportes",
              children: [
                { path: "graficas", element: <GIyE /> },
                { path: "graficas/:idEmpleado", element: <GIyExID /> },
              ],
            },
          ],
        },
      ],
    },
  ],
} satisfies RouteObject;

import { FC } from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

//layouts
import LayoutPreliquidacion from "@layout/LayoutPreliquidacion";
import Layout from "@layout/Layout";

import Login from "@pages/login/Index";
import App from "@pages/app/Index";

//administrativo
import Usuarios from "@pages/app/administrativo/usuarios/Index";

//Salidas no conformes
import SncRoutes from "@routes/snc.routes";

//preliquidacion
import Preliquidacion from "@pages/preliquidacion/Index";
import ConfigurarPrecios from "@pages/preliquidacion/configurar-precios/Index";
import CapturarLecturas from "@pages/preliquidacion/capturar-lecturas/Index";
import CapturarEfectivo from "@pages/preliquidacion/capturar-efectivo/Index";
import CapturarVales from "@pages/preliquidacion/capturar-vales/Index";
import Previsualizar from "@pages/preliquidacion/previsualizar/Index";
//recursos humanos
import RecursosHumanos from "@pages/app/recursos-humanos/Index";
import Departamentos from "@pages/app/recursos-humanos/empleados/departamentos/Index";
import Documentos from "@pages/app/recursos-humanos/empleados/documentos/Index";
import Empleados from "@pages/app/recursos-humanos/empleados/Index";
import despachoRoutes from "./despacho.routes";
import { Dep } from "@assets/auth";

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
        despachoRoutes,
        {
          path: "administrativo",
          children: [{ path: "usuarios", element: <Usuarios /> }],
        },
        {
          path: "recursos-humanos",
          children: [
            { index: true, element: <RecursosHumanos /> },
            {
              path: "empleados",
              children: [
                { index: true, element: <Empleados /> },
                { path: "departamentos", element: <Departamentos /> },
                { path: "documentos", element: <Documentos /> },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/preliquidacion",
      element: <LayoutPreliquidacion />,
      children: [
        { index: true, element: <Preliquidacion /> },
        { path: "configurar-precios", element: <ConfigurarPrecios /> },
        { path: "capturar-lecturas", element: <CapturarLecturas /> },
        { path: "capturar-efectivo", element: <CapturarEfectivo /> },
        { path: "capturar-vales", element: <CapturarVales /> },
        { path: "previsualizar", element: <Previsualizar /> },
      ],
    },
    SncRoutes,
  ]);

  return <RouterProvider router={router} />;
};
export default Index;

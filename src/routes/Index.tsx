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
import Axios from "@assets/Axios";
import Despacho from "@pages/app/despacho/Index";
import BoletasDesp from "@pages/app/despacho/boletas/Index";
import BoletasDespxEmp from "@pages/app/despacho/boletas/idDespachador/Index";
import ReporteMF from "@pages/app/despacho/monto-faltante/reporte/Index";

//administrativo
import Usuarios from "@pages/app/administrativo/usuarios/Index";

//preliquidacion
import Preliquidacion from "@pages/preliquidacion/Index";
import ConfigurarPrecios from "@pages/preliquidacion/configurar-precios/Index";
import CapturarLecturas from "@pages/preliquidacion/capturar-lecturas/Index";
import CapturarEfectivo from "@pages/preliquidacion/capturar-efectivo/Index";
import CapturarVales from "@pages/preliquidacion/capturar-vales/Index";
import Previsualizar from "@pages/preliquidacion/previsualizar/Index";
import RecursosHumanos from "@pages/app/recursos-humanos/Index";
import Departamentos from "@pages/app/recursos-humanos/empleados/departamentos/Index";
import Documentos from "@pages/app/recursos-humanos/empleados/documentos/Index";
import Empleados from "@pages/app/recursos-humanos/empleados/Index";

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
                    return {
                      data: res.data.response,
                      filtros: { month, year, quincena },
                    };
                  },
                },
              ],
            },
            {
              path: "monto-faltante",
              children: [{ path: "reporte", element: <ReporteMF /> }],
            },
            {
              path: "checklist-bomba",
              children: [{ path: "capturar", element: <ReporteMF /> }],
            },
          ],
        },
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
  ]);

  return <RouterProvider router={router} />;
};
export default Index;

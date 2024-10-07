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
import RegistrosChecklist from "@pages/app/despacho/checklist-bomba/registros";
import CapturarOyL from "@pages/app/despacho/orden-limpieza-isla/capturar";
import ReporteOyl from "@pages/app/despacho/orden-limpieza-isla/reporte";
import ReporteEmpleadoOyL from "@pages/app/despacho/orden-limpieza-isla/reporte/id-empleado";
import TendenciaOyL from "@pages/app/despacho/orden-limpieza-isla/tendencia/Index";
import ReportesChecklist from "@pages/app/despacho/checklist-bomba/reporte/Index";
import ReporteEmpleadoChecklist from "@pages/app/despacho/checklist-bomba/reporte/id-empleado/Index";
import HistorialOyL from "@pages/app/despacho/orden-limpieza-isla/historial/Index";
import CapturarEvUniforme from "@pages/app/despacho/evaluacion-uniforme/capturar/Index";
import CapturarPasosDespachar from "@pages/app/despacho/pasos-despachar/capturar/Index";

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
              path: "checklist-bomba",
              children: [
                {
                  path: "reporte",
                  children: [
                    { index: true, element: <ReportesChecklist /> },
                    {
                      path: ":year/:mes/:idDespachador",
                      element: <ReporteEmpleadoChecklist />,
                    },
                  ],
                },
                { path: "registros", element: <RegistrosChecklist /> },
              ],
            },
            {
              path: "orden-limpieza-isla",
              children: [
                {
                  path: "capturar",
                  element: <CapturarOyL />,
                },
                {
                  path: "reporte",

                  children: [
                    { index: true, element: <ReporteOyl /> },
                    {
                      path: ":year/:mes/:idDespachador",
                      element: <ReporteEmpleadoOyL />,
                    },
                  ],
                },
                { path: "tendencia", element: <TendenciaOyL /> },
                { path: "historial", element: <HistorialOyL /> },
              ],
            },
            {
              path: "evaluacion-uniforme",
              children: [
                {
                  path: "capturar",
                  element: <CapturarEvUniforme />,
                },
                {
                  path: "reporte",

                  children: [
                    { index: true, element: <ReporteOyl /> },
                    {
                      path: ":idDespachador",
                      element: <ReporteEmpleadoOyL />,
                    },
                  ],
                },
                { path: "tendencia", element: <TendenciaOyL /> },
                { path: "historial", element: <HistorialOyL /> },
              ],
            },
            {
              path: "pasos-despachar",
              children: [
                {
                  path: "capturar",
                  element: <CapturarPasosDespachar />,
                },
                {
                  path: "reporte",

                  children: [
                    { index: true, element: <ReporteOyl /> },
                    {
                      path: ":idDespachador",
                      element: <ReporteEmpleadoOyL />,
                    },
                  ],
                },
                { path: "tendencia", element: <TendenciaOyL /> },
                { path: "historial", element: <HistorialOyL /> },
              ],
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

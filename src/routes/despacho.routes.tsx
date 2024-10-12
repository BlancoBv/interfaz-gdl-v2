import Despacho from "@pages/app/despacho/Index";
import RegistrosChecklist from "@pages/app/despacho/checklist-bomba/registros";
import ReporteEmpleadoChecklist from "@pages/app/despacho/checklist-bomba/reporte/id-empleado/Index";
import ReportesChecklist from "@pages/app/despacho/checklist-bomba/reporte/Index";
import CapturarEvUniforme from "@pages/app/despacho/evaluacion-uniforme/capturar/Index";
import HistorialEvUniforme from "@pages/app/despacho/evaluacion-uniforme/historial/Index";
import ReporteEmpleadoEvUniforme from "@pages/app/despacho/evaluacion-uniforme/reporte/id-empleado/Index";
import ReporteEvUniforme from "@pages/app/despacho/evaluacion-uniforme/reporte/Index";
import TendenciaEvUniforme from "@pages/app/despacho/evaluacion-uniforme/tendencia/Index";
import CapturarOyL from "@pages/app/despacho/orden-limpieza-isla/capturar/Index";
import HistorialOyL from "@pages/app/despacho/orden-limpieza-isla/historial/Index";
import ReporteEmpleadoOyL from "@pages/app/despacho/orden-limpieza-isla/reporte/id-empleado";
import ReporteOyl from "@pages/app/despacho/orden-limpieza-isla/reporte/Index";
import TendenciaOyL from "@pages/app/despacho/orden-limpieza-isla/tendencia/Index";
import CapturarPasosDespachar from "@pages/app/despacho/pasos-despachar/capturar/Index";
import HistorialPasosDespachar from "@pages/app/despacho/pasos-despachar/historial/Index";
import ReporteEmpleadoPasosDespacho from "@pages/app/despacho/pasos-despachar/reporte/id-empleado/Index";
import ReportePasosDespacho from "@pages/app/despacho/pasos-despachar/reporte/Index";
import TendenciaPasosDespacho from "@pages/app/despacho/pasos-despachar/tendencia/Index";
import { redirect, RouteObject } from "react-router-dom";
import { Dep } from "@assets/auth";

export default {
  path: "despacho",
  loader: () => {
    if (Dep(2)) {
      return null;
    }
    return redirect("/404");
  },
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
            { index: true, element: <ReporteEvUniforme /> },
            {
              path: ":year/:mes/:idDespachador",
              element: <ReporteEmpleadoEvUniforme />,
            },
          ],
        },
        { path: "tendencia", element: <TendenciaEvUniforme /> },
        { path: "historial", element: <HistorialEvUniforme /> },
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
            { index: true, element: <ReportePasosDespacho /> },
            {
              path: ":year/:mes/:idDespachador",
              element: <ReporteEmpleadoPasosDespacho />,
            },
          ],
        },
        { path: "tendencia", element: <TendenciaPasosDespacho /> },
        { path: "historial", element: <HistorialPasosDespachar /> },
      ],
    },
  ],
} satisfies RouteObject;

import Liquidacion from "@pages/app/liquidacion/Index";

import { redirect, RouteObject } from "react-router-dom";
import { Dep } from "@assets/auth";
import LiqPorCapturar from "@pages/app/liquidacion/por-capturar/Index";
import LayoutLiquidacion from "@layout/LayoutLiquidacion";
import CapturarLecturas from "@pages/app/liquidacion/capturar/Index";
import CapturarEfectivo from "@pages/app/liquidacion/capturar/capturar-efectivo/Index";
import CapturarVales from "@pages/app/liquidacion/capturar/capturar-vales/Index";
import Previsualizar from "@pages/app/liquidacion/capturar/previsualizar/Index";

export default {
  path: "liquidacion",
  loader: () => {
    if (Dep(2)) {
      return null;
    }
    return redirect("/404");
  },
  children: [
    { index: true, element: <>Inicio</> },
    { path: "reportes", element: <Liquidacion /> },
    {
      path: "liquidaciones",
      children: [
        {
          path: "por-capturar",
          element: <LiqPorCapturar />,
          children: [{ index: true }],
        },

        {
          path: "capturar/:idLiquidacion",
          element: <LayoutLiquidacion />,
          children: [
            { index: true, element: <CapturarLecturas /> },
            { path: "previsualizar-lecturas", element: "lecturas-prev" },
            { path: "capturar-efectivo", element: <CapturarEfectivo /> },
            { path: "capturar-vales", element: <CapturarVales /> },
            { path: "previsualizar", element: <Previsualizar /> },
          ],
        },
      ],
    },
  ],
} satisfies RouteObject;

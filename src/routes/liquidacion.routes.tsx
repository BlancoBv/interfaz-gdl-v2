import Liquidacion from "@pages/app/liquidacion/Index";

import { redirect, RouteObject } from "react-router-dom";
import { Dep } from "@assets/auth";
import LiqPorCapturar from "@pages/app/liquidacion/por-capturar/Index";
import LayoutLiquidacion from "@layout/LayoutLiquidacion";

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
            { index: true, element: "captura" },
            { path: "previsualizar-lecturas", element: "lecturas-prev" },
            { path: "capturar-efectivo", element: "captura de efetvi" },
            { path: "capturar-vales", element: "captura de vales" },
            { path: "previsualizar", element: "previsualizar" },
          ],
        },
      ],
    },
  ],
} satisfies RouteObject;

import Liquidacion from "@pages/app/liquidacion/Index";

import { redirect, RouteObject } from "react-router-dom";
import { Dep } from "@assets/auth";
import LiqPorCapturar from "@pages/app/liquidacion/por-capturar/Index";

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
        { path: "por-capturar", element: <LiqPorCapturar /> },
        { path: "capturar/:idLiquidacion", element: <>captira</> },
      ],
    },
  ],
} satisfies RouteObject;

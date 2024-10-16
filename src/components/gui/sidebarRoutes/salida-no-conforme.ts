import { Dep } from "@assets/auth";
import { sideBarItems } from "@assets/interfaces";

export default {
  icon: "thumbs-down",
  name: "Salidas no conformes",
  to: "salidas-no-conformes",
  show: Dep(3),
  links: [
    {
      to: "redactar",
      name: "Redactar",
      icon: "pencil",
      // collapse: [
      //   {
      //     to: "reporte",
      //     name: "Reporte (pendiente por errores)",
      //   },
      //   {
      //     to: "registros",
      //     name: "Registros checklist",
      //   },
      // ],
    },

    {
      to: "orden-limpieza-isla",
      name: "Órden y limpieza isla",
      icon: "spray-can-sparkles",
      collapse: [
        { to: "capturar", name: "Capturar", show: true },
        {
          to: "reporte",
          name: "Reporte",
          show: true,
        },
        { to: "tendencia", name: "Tendencia", show: true },
        /* { to: "despacho/orden-limpieza/reporte", name: "Reporte mensual" },
        {
          to: "despacho/orden-limpieza/historial",
          name: "Historial",
        },
        {
          to: "despacho/orden-limpieza/tendencia",
          name: "Tendencia",
        }, */
      ],
    },
    /*
      {
        to: "evaluacion-uniforme",
        name: "Evaluación de uniforme",
        icon: "shirt",
        collapse: [
          { to: "despacho/evaluacion-uniforme/capturar", name: "Capturar" },
          {
            to: "despacho/evaluacion-uniforme/capturarreporte",
            name: "Reporte mensual",
          },
          {
            to: "despacho/evaluacion-uniforme/capturarhistorial",
            name: "Historial",
          },
          {
            to: "despacho/evaluacion-uniforme/capturartendencia",
            name: "Tendencias",
          },
        ],
      },
      {
        to: "pasos-despachar",
        name: "Pasos de despacho",
        icon: "list-check",
        collapse: [
          { to: "despacho/pasos-despachar/capturar", name: "Capturar" },
          { to: "despacho/pasos-despachar/reporte", name: "Reporte mensual" },
          {
            to: "despacho/pasos-despachar/historial",
            name: "Historial",
          },
          {
            to: "despacho/pasos-despachar/tendencia",
            name: "Tendencia",
          },
        ],
      }, */
  ],
} satisfies sideBarItems;

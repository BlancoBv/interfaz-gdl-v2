export default {
  icon: "gas-pump",
  name: "Despacho",
  to: "despacho",
  links: [
    {
      to: "checklist-bomba",
      name: "Checklist bomba",
      icon: "check",
      collapse: [
        {
          to: "reporte",
          name: "Reporte",
        },
        {
          to: "registros",
          name: "Registros",
        },
      ],
    },

    {
      to: "orden-limpieza-isla",
      name: "Órden y limpieza isla",
      icon: "spray-can-sparkles",
      collapse: [
        { to: "capturar", name: "Capturar" },
        {
          to: "reporte",
          name: "Reporte",
        },
        { to: "tendencia", name: "Tendencia" },
        { to: "historial", name: "Historial" },
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
};

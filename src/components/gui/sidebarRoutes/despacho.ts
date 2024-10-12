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
    {
      to: "evaluacion-uniforme",
      name: "Evaluación de uniforme",
      icon: "shirt",
      collapse: [
        { to: "capturar", name: "Capturar" },
        {
          to: "reporte",
          name: "Reporte",
        },
        {
          to: "tendencia",
          name: "Tendencia",
        },
        {
          to: "historial",
          name: "Historial",
        },
      ],
    },
    {
      to: "pasos-despachar",
      name: "Pasos de despacho",
      icon: "list-check",
      collapse: [
        { to: "capturar", name: "Capturar" },
        { to: "reporte", name: "Reporte" },
        {
          to: "tendencia",
          name: "Tendencia",
        },
        {
          to: "historial",
          name: "Historial",
        },
      ],
    },
  ],
};

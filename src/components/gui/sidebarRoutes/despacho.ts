import { Dep, Per } from "@assets/auth";
import { sideBarItems } from "@assets/interfaces";

export default {
  icon: "gas-pump",
  name: "Despacho",
  to: "despacho",
  show: Dep(2),
  links: [
    {
      to: "checklist-bomba",
      name: "Checklist bomba",
      icon: "check",
      show: Per(5) || Per(6) || Per(7),
      collapse: [
        {
          to: "reporte",
          name: "Reporte",
          show: true,
        },
        {
          to: "registros",
          name: "Registros",
          show: true,
        },
      ],
    },

    {
      to: "orden-limpieza-isla",
      name: "Órden y limpieza isla",
      icon: "spray-can-sparkles",
      show: Per(12) || Per(13) || Per(25),
      collapse: [
        { to: "capturar", name: "Capturar", show: Per(25) },
        {
          to: "reporte",
          name: "Reporte",
          show: true,
        },
        { to: "tendencia", name: "Tendencia", show: true },
        { to: "historial", name: "Historial", show: Per(25) },
      ],
    },
    {
      to: "evaluacion-uniforme",
      name: "Evaluación de uniforme",
      icon: "shirt",
      show: Per(8) || Per(9) || Per(10),
      collapse: [
        { to: "capturar", name: "Capturar", show: Per(8) },
        {
          to: "reporte",
          name: "Reporte",
          show: Per(8),
        },
        {
          to: "tendencia",
          name: "Tendencia",
          show: true,
        },
        {
          to: "historial",
          name: "Historial",
          show: Per(8),
        },
      ],
    },
    {
      to: "pasos-despachar",
      name: "Pasos de despacho",
      icon: "list-check",
      show: Per(14) || Per(15) || Per(16),
      collapse: [
        { to: "capturar", name: "Capturar", show: Per(14) },
        { to: "reporte", name: "Reporte", show: Per(14) },
        {
          to: "tendencia",
          name: "Tendencia",
          show: true,
        },
        {
          to: "historial",
          name: "Historial",
          show: Per(14),
        },
      ],
    },
  ],
} satisfies sideBarItems;

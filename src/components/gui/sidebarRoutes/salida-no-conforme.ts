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
      show: true,
    },
    {
      to: "archivos",
      name: "Archivos",
      icon: "file-pdf",
      show: true,
    },
    {
      to: "reportes",
      name: "Reportes",
      icon: "chart-simple",
      show: true,
      collapse: [
        {
          show: true,
          to: "graficas",
          name: "Incumplimientos y Empleados",
        },
      ],
    },
  ],
} satisfies sideBarItems;

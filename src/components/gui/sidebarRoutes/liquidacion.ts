import { Dep } from "@assets/auth";
import { sideBarItems } from "@assets/interfaces";

export default {
  icon: "clipboard-check",
  name: "Liquidación",
  to: "liquidacion",
  show: Dep(2), //cambiar
  links: [
    { to: "reportes", name: "Dashboard (reportes)", icon: "home", show: true },
    { to: "ajustes", name: "Ajustes", icon: "gear", show: true },
    {
      to: "liquidaciones",
      name: "Liquidaciones",
      icon: "file-lines",
      show: true,
      collapse: [
        { name: "Por capturar", show: true, to: "por-capturar" },
        { name: "Registros", show: true, to: "registros" },
      ],
    },
  ],
} satisfies sideBarItems;

import { Dep } from "@assets/auth";
import { sideBarItems } from "@assets/interfaces";

export default {
  icon: "clipboard-check",
  name: "Liquidación",
  to: "liquidacion",
  show: Dep(2), //cambiar
  links: [
    { to: "", name: "Dashboard (reportes)", icon: "home", show: true },
    { to: "ajustes", name: "Ajustes", icon: "gear", show: true },
    {
      to: "liquidacion",
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

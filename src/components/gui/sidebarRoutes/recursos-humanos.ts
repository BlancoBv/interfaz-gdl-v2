import { Dep } from "@assets/auth";
import { sideBarItems } from "@assets/interfaces";

export default {
  icon: "people-group",
  name: "Recursos humanos",
  to: "recursos-humanos",
  show: Dep(7),
  links: [
    {
      to: "empleados",
      name: "Empleados",
      icon: "briefcase",
      show: true,
      collapse: [
        { to: "departamentos", name: "Departamentos", show: true },
        { to: "", name: "Control de empleados", end: true, show: true },
        { to: "documentos", name: "Documentos", show: true },
      ],
    },
  ],
} satisfies sideBarItems;

import { Dep, Per } from "@assets/auth";
import { sideBarItems } from "@assets/interfaces";

export default {
  icon: "rectangle-list",
  name: "Administrativo",
  to: "administrativo",
  show: Dep(8),
  links: [{ to: "usuarios", name: "Usuarios", icon: "users", show: Per(1) }],
} satisfies sideBarItems;

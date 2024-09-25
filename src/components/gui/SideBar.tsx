import { FC, SyntheticEvent, useCallback, useMemo, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Icon from "@components/Icon";
import { toast } from "react-toastify";
import despacho from "./sidebarRoutes/despacho";

const SideBar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData: {
    auth: {
      nombre: string;
      apellido_paterno: string;
      apellido_materno: string;
    };
  } = JSON.parse(String(localStorage.getItem("credentials")));
  const overlay = useRef<HTMLLabelElement>(null);
  const navElements: {
    icon: string;
    name: string;
    to: string;
    links?: {
      to: string;
      name: string;
      show?: boolean;
      icon: string;
      collapse?: { to: string; name: string; show?: boolean; end?: boolean }[];
    }[];
  }[] = [
    despacho,
    /* {
      icon: "thumbs-down",
      name: "Salidas no conformes",
      to: "salidas-no-conformes",
    },
    { icon: "screwdriver-wrench", name: "Mantenimiento", to: "mantenimiento" }, */
    /*   { icon: "box", name: "Almacen", to: "/almacen" }, */
    {
      icon: "people-group",
      name: "Recursos humanos",
      to: "recursos-humanos",
      links: [
        {
          to: "empleados",
          name: "Empleados",
          icon: "briefcase",
          collapse: [
            { to: "departamentos", name: "Departamentos" },
            { to: "", name: "Control de empleados", end: true },
            { to: "documentos", name: "Documentos" },
          ],
        },
      ],
    },
    {
      icon: "rectangle-list",
      name: "Administrativo",
      to: "administrativo",
      links: [{ to: "usuarios", name: "Usuarios", icon: "users" }],
    },
    /* { icon: "clipboard-check", name: "Liquidación", to: "liquidacion" },
    { icon: "shop", name: "Tienda", to: "tienda" }, */
    /* { icon: "shield", name: "Seguridad", to: "/despacho" }, */
    /* { icon: "money-check-dollar", name: "Pagarés", to: "pagares" }, */
    /*  { icon: "file", name: "Documentos SGC don lalo", to: "/despacho" }, */
  ];

  const logout = () => {
    localStorage.removeItem("credentials");
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Sesión cerrada correctamente", { containerId: "global" });
  };

  const handleClick = () => {
    handleClick: {
      const visibilityOfDrawer = document
        .getElementById("my-drawer")
        ?.checkVisibility({ visibilityProperty: true });

      if (visibilityOfDrawer) {
        overlay.current?.click();
      }
      break handleClick;
    }
  };

  const openSummary = useCallback(
    (routeToCompare: string) => {
      const visibilityOfDrawer = document
        .getElementById("my-drawer")
        ?.checkVisibility({ visibilityProperty: true });
      if (visibilityOfDrawer) {
        return true;
      }
      if (location.pathname === "/app") {
        return true;
      }
      if (location.pathname.match(/\/app\/([^\/]+)/)?.[1] === routeToCompare) {
        return true;
      }
      return false;
    },
    [location.pathname]
  );

  return (
    <nav className="drawer-side z-50 lg:z-auto">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
        ref={overlay}
      />
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <li>
          <NavLink to="/app" end onClick={handleClick}>
            <Icon icon="house" /> Inicio
          </NavLink>
        </li>
        {/* <li>
          <a>Sidebar Item 2</a>
        </li>
        <li>
          <details open>
            <summary>Xd</summary>
            <ul>
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
              <li>
                <ul>
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
            </ul>
          </details>
        </li> */}
        {navElements.map((item) => (
          <li key={`parent ${item.name}`}>
            <details open={openSummary(item.to)}>
              <summary>
                <Icon icon={item.icon} />
                {item.name}
              </summary>
              <ul>
                {item.hasOwnProperty("links") &&
                  item.links?.map((child) => (
                    <li key={`child ${child.name}`}>
                      {child.hasOwnProperty("collapse") ? (
                        <>
                          <h2 className="menu-title flex gap-2 items-center">
                            <Icon icon={child.icon} />
                            {child.name}
                          </h2>
                          <ul>
                            {child.collapse?.map((subchild) => (
                              <li key={`subchild ${subchild.name}`}>
                                <NavLink
                                  to={`${item.to}/${child.to}/${subchild.to}`}
                                  onClick={handleClick}
                                  end={subchild.end}
                                >
                                  {subchild.name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <NavLink
                          to={`${item.to}/${child.to}`}
                          onClick={handleClick}
                        >
                          <Icon icon={child.icon} /> {child.name}
                        </NavLink>
                      )}
                    </li>
                  ))}
              </ul>
            </details>
          </li>
        ))}

        <div className="sticky bottom-0 flex flex-col p-4 bg-base-200/80 backdrop-blur-sm">
          <div className="divider" />
          <div className="flex justify-evenly pb-4 items-center">
            <div className="avatar placeholder flex justify-evenly items-center">
              <div className="bg-neutral text-neutral-content size-14 rounded-full">
                <span className="text-3xl">
                  {userData.auth.nombre.charAt(0)}
                </span>
              </div>
            </div>
            <p className="text-center">{`${userData.auth.nombre} ${userData.auth.apellido_paterno} ${userData.auth.apellido_materno}`}</p>
          </div>

          <button
            className="btn btn-error btn-block"
            type="button"
            title="Cerrar sesión"
            onClick={logout}
          >
            <Icon icon="arrow-right-from-bracket" />
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default SideBar;

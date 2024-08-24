import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "../Icon";
import { toast } from "react-toastify";

const SideBar: FC = () => {
  const navigate = useNavigate();
  const userData: {
    auth: {
      nombre: string;
      apellido_paterno: string;
      apellido_materno: string;
    };
  } = JSON.parse(String(localStorage.getItem("credentials")));

  const navElements: {
    icon: string;
    name: string;
    to: string;
    links?: {
      to: string;
      name: string;
      show?: boolean;
      icon: string;
      collapse?: { to: string; name: string; show?: boolean }[];
    }[];
  }[] = [
    {
      icon: "gas-pump",
      name: "Despacho",
      to: "despacho",
      links: [
        { to: "despacho/boletas", name: "Boletas", icon: "chart-column" },
        {
          to: "despacho/monto-faltante",
          name: "Monto faltante",
          icon: "money-bills",
          collapse: [
            //{ to: "despacho/monto-faltante/capturar", name: "Capturar" },
            { to: "despacho/monto-faltante/reporte", name: "Reporte" },
            {
              to: "despacho/monto-faltante/reporte/empleado",
              name: "Reporte de empleado",
            },
            { to: "despacho/monto-faltante/historial", name: "Historial" },
          ],
        },
        /* {
          to: "checklist-bomba",
          name: "Checklist bomba",
          icon: "check",
          collapse: [
            { to: "despacho/checklist-bomba/capturar", name: "Capturar" },
            { to: "despacho/checklist-bomba/reporte", name: "Reporte" },
            {
              to: "despacho/checklist-bomba/registros",
              name: "Registros checklist",
            },
            {
              to: "despacho/checklist-bomba/reporte/registros",
              name: "Reporte de registros checklist",
            },
            { to: "despacho/checklist-bomba/historial", name: "Historial" },
          ],
        },
        {
          to: "orden-limpieza-isla",
          name: "Órden y limpieza isla",
          icon: "spray-can-sparkles",
          collapse: [
            { to: "despacho/orden-limpieza/capturar", name: "Capturar" },
            { to: "despacho/orden-limpieza/reporte", name: "Reporte mensual" },
            {
              to: "despacho/orden-limpieza/historial",
              name: "Historial",
            },
            {
              to: "despacho/orden-limpieza/tendencia",
              name: "Tendencia",
            },
          ],
        },
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
    },
    /* {
      icon: "thumbs-down",
      name: "Salidas no conformes",
      to: "salidas-no-conformes",
    },
    { icon: "screwdriver-wrench", name: "Mantenimiento", to: "mantenimiento" }, */
    /*   { icon: "box", name: "Almacen", to: "/almacen" }, */
    /* { icon: "people-group", name: "Recursos humanos", to: "recursos-humanos" }, */
    {
      icon: "rectangle-list",
      name: "Administrativo",
      to: "administrativo",
      links: [
        { to: "administrativo/usuarios", name: "Usuarios", icon: "users" },
      ],
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
  return (
    <nav className="drawer-side z-50 lg:z-auto">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      />
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <li>
          <NavLink to="/app" end>
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
            <details open>
              <summary>
                <Icon icon={item.icon} />
                {item.name}
              </summary>
              <ul>
                {item.links?.map((child) => (
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
                              <NavLink to={subchild.to}>
                                {subchild.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <NavLink to={child.to}>
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

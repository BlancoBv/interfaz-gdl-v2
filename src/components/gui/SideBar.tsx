import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../Icon";

const SideBar: FC = () => {
  const userData: {
    auth: {
      nombre: string;
      apellido_paterno: string;
      apellido_materno: string;
    };
  } = JSON.parse(String(localStorage.getItem("credentials")));

  console.log(userData);

  return (
    <nav className="drawer-side z-50 lg:z-auto">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <li>
          <NavLink to="/app" end>
            <Icon icon="house" /> Inicio
          </NavLink>
        </li>
        <li>
          <a>Sidebar Item 2</a>
        </li>
        <li>
          <details open>
            <summary>Parent</summary>
            <ul>
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
              <li>
                <details open>
                  <summary>Parent</summary>
                  <ul>
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </details>
        </li>

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
          >
            <Icon icon="arrow-right-from-bracket" />
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default SideBar;

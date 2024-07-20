import { FC } from "react";
import Header from "../components/gui/Header";
import { Outlet } from "react-router-dom";
import SideBar from "../components/gui/SideBar";

const Layout: FC = () => {
  return (
    <div className="w-screen h-screen ">
      <div className="drawer lg:drawer-open sm:h-full sm:w-full">
        {/* Trigger barra lateral */}
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        {/* Barra lateral */}
        <SideBar />
        {/* Contenido */}
        <div className="drawer-content flex flex-col relative lg:overflow-y-auto h-full bg-neutral">
          <Header />
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
      {/* <div className="drawer drawer-open">
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
           
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>{" "}
       */}
    </div>
  );
};

export default Layout;

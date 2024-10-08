import { FC, ReactNode } from "react";
import logoGDL from "@assets/img/logogdl.png";
import { NavLink } from "react-router-dom";
import Icon from "@components/Icon";
import Clock from "react-live-clock";

const Header: FC<{ noShowBarMenu?: boolean; children?: ReactNode }> = ({
  noShowBarMenu,
  children,
}) => {
  return (
    <div className="navbar bg-base-100/80 backdrop-blur-sm sticky top-0 z-40 pb-0 shadow-sm">
      {!noShowBarMenu && (
        <div className="flex-none">
          <label
            htmlFor="my-drawer"
            className="btn btn-ghost drawer-button lg:hidden"
          >
            <Icon icon="bars" size="2x" />
          </label>
        </div>
      )}
      {children}
      <div className="flex-1">
        <NavLink className="btn btn-ghost text-xl" to="/app">
          <img src={logoGDL} alt="LogoGDL" className="h-full" />
        </NavLink>
      </div>
      <Clock
        format={"HH:mm:ssa"}
        ticking={true}
        timezone={"America/Mexico_City"}
      />
    </div>
  );
};
export default Header;

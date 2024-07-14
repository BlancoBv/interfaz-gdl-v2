import { FC } from "react";
import logoGDL from "../../assets/img/logogdl.png";

const Header: FC = () => {
  return (
    <div className="navbar bg-base-100/80 backdrop-blur-sm sticky top-0">
      <div className="flex-none">
        <label htmlFor="my-drawer" className=" drawer-button lg:hidden">
          Open drawer
        </label>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
    </div>
  );
};
export default Header;

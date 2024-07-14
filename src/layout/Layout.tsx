import { FC } from "react";
import Header from "../components/gui/Header";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className="w-screen h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;

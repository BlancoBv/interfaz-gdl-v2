import { FC, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Icon from "../components/Icon";
import ScrollToTop from "../assets/ScrollToTop";
import Header from "../components/gui/Header";
import { ModalConfirmNoMutate } from "../components/gui/Modal";

const LayoutPreliquidacion: FC = () => {
  useEffect(() => {
    console.log("rerender");

    const infoGralCache = localStorage.getItem("infoGeneralPreliq");
    if (infoGralCache) {
      const modal = document.getElementById(
        "modal-confirm-no-mutate"
      ) as HTMLDialogElement;
      modal.showModal();
    }
  }, []);

  const cleanAll = () => {
    console.log("ola");
  };

  return (
    <div className="h-screen w-screen flex">
      <ModalConfirmNoMutate
        action={cleanAll}
        msg="Existen datos sin guardar, ¿desea recuperarlos?"
        title="Advertencia"
      />
      <ul className="menu bg-base-200 rounded-box w-2/6 lg:w-1/6 h-full gap-2">
        <li>
          <NavLink to="/preliquidacion" end>
            <Icon icon="info" />
            Información general
          </NavLink>
        </li>
        <li>
          <NavLink to="/preliquidacion/configurar-precios">
            <Icon icon="coins" />
            Configuración de precios
          </NavLink>
        </li>
        <li>
          <a>Captura de lecturas</a>
        </li>
        <li>
          <a>Captura de efectivo</a>
        </li>
        <li>
          <a>Captura de vales</a>
        </li>
        <li>
          <a>Previsualizar y enviar</a>
        </li>
        <NavLink
          to="/"
          className="btn btn-error btn-block"
          type="button"
          title="Cerrar sesión"
        >
          <Icon icon="arrow-right-from-bracket" /> Volver al inicio
        </NavLink>
      </ul>
      <ScrollToTop scrollAreaID="scroll-area">
        <div
          className="flex flex-col w-4/6 lg:w-5/6 h-full overflow-auto"
          id="scroll-area"
        >
          <Header noShowBarMenu />
          <div className="w-full h-full p-4">
            <Outlet />
          </div>
        </div>
      </ScrollToTop>
    </div>
  );
};
export default LayoutPreliquidacion;

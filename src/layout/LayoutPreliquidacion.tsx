import { FC, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Icon from "../components/Icon";
import ScrollToTop from "../assets/ScrollToTop";
import Header from "../components/gui/Header";
import { ModalConfirmNoMutate } from "../components/gui/Modal";
import {
  ContextPreliq,
  islasInterface,
} from "../pages/preliquidacion/components/ContextPreliq";

const LayoutPreliquidacion: FC = () => {
  const CACHE_INFOGENERAL = localStorage.getItem("infoGeneralPreliq");
  const PARSED_INFOGENERAL = CACHE_INFOGENERAL
    ? JSON.parse(CACHE_INFOGENERAL)
    : {};

  const [infoGeneral, setInfoGeneral] = useState<{
    empleado?: number;
    turno?: number;
    estacion?: number;
    islas?: islasInterface[];
  }>(PARSED_INFOGENERAL);
  //Empieza configuracion de precios
  const CACHE_PRECIOS = localStorage.getItem("preciosPreliq");
  const PARSED_PRECIOS = CACHE_PRECIOS ? JSON.parse(CACHE_PRECIOS) : {};

  const [precios, setPrecios] = useState<{
    M?: string;
    P?: string;
    D?: string;
  }>(PARSED_PRECIOS);

  useEffect(() => {
    const infoGralCache = localStorage.getItem("infoGeneralPreliq");
    if (infoGralCache) {
      //comprueba que existe la variable en el almacenamiento local
      if (JSON.parse(infoGralCache).hasOwnProperty("empleado")) {
        //comprueba que exista al menos la informacion del empleado
        const modal = document.getElementById(
          "modal-confirm-no-mutate"
        ) as HTMLDialogElement;
        modal.showModal();
      }
    }
  }, []);

  const cleanAll = () => {
    console.log("ola");
  };

  return (
    <ContextPreliq.Provider
      value={{
        infoGeneral: { body: infoGeneral, setBody: setInfoGeneral },
        precios: { body: precios, setBody: setPrecios },
      }}
    >
      <div className="h-screen w-screen flex">
        <ModalConfirmNoMutate
          action={cleanAll}
          msg="Existen datos sin guardar, ¿desea recuperarlos?"
          title="Advertencia"
        />
        <ul className="menu bg-base-200 rounded-box w-1/4 lg:w-1/6 h-full gap-2">
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
            <NavLink to="/preliquidacion/capturar-lecturas">
              <Icon icon="gauge-simple-high" />
              Captura de lecturas
            </NavLink>
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
            className="flex flex-col w-3/4 lg:w-5/6 h-full overflow-auto"
            id="scroll-area"
          >
            <Header noShowBarMenu />
            <div className="w-full h-full p-4">
              <Outlet />
            </div>
          </div>
        </ScrollToTop>
      </div>
    </ContextPreliq.Provider>
  );
};
export default LayoutPreliquidacion;

import { FC, useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Icon from "@components/Icon";
import ScrollToTop from "@assets/ScrollToTop";
import Header from "@components/gui/Header";
import { ModalConfirmNoMutate } from "@components/gui/Modal";
import {
  ContextPreliq,
  efectivoInterface,
  manguerasInterface,
  preciosInterface,
  valesInterface,
} from "@pages/preliquidacion/components/ContextPreliq";
import Decimal from "decimal.js-light";
import format from "@assets/format";
import { useGetData } from "@hooks/useGetData";

const LayoutLiquidacion: FC = () => {
  const CACHE_INFOGENERAL = localStorage.getItem("infoGeneralPreliq");
  const PARSED_INFOGENERAL = CACHE_INFOGENERAL
    ? JSON.parse(CACHE_INFOGENERAL)
    : {};
  const [infoGeneral, setInfoGeneral] = useState<{
    empleado?: number;
    turno?: number;
    estacion?: number;
    islas?: { nIsla: string; idIsla: number }[];
  }>(PARSED_INFOGENERAL);
  //Empieza configuracion de precios
  const CACHE_PRECIOS = localStorage.getItem("preciosPreliq");
  const PARSED_PRECIOS = CACHE_PRECIOS ? JSON.parse(CACHE_PRECIOS) : {};
  const [precios, setPrecios] = useState<preciosInterface>(PARSED_PRECIOS);
  //mangueras
  const CACHE_MANGUERAS = localStorage.getItem("manguerasPreliq");
  const PARSED_MANGUERAS = CACHE_MANGUERAS ? JSON.parse(CACHE_MANGUERAS) : [];
  const [mangueras, setMangueras] =
    useState<manguerasInterface[]>(PARSED_MANGUERAS);
  //efetivo
  const CACHE_EFECTIVO = localStorage.getItem("efectivoPreliq");
  const PARSED_EFECTIVO = CACHE_EFECTIVO
    ? JSON.parse(CACHE_EFECTIVO)
    : { type: "efectivo", cantidad: [] };
  const [efectivo, setEfectivo] = useState<efectivoInterface>(PARSED_EFECTIVO);
  //vales
  const CACHE_VALES = localStorage.getItem("valesPreliq");
  const PARSED_VALES = CACHE_VALES
    ? JSON.parse(CACHE_VALES)
    : { type: "efectivo", cantidad: [] };
  const [vales, setVales] = useState<valesInterface>(PARSED_VALES);
  //error de reinicio o lectura mal capturada
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  const empleados = useGetData(
    "/empleado?departamento=1&auth=false&estatus=1&estatus=6",
    "empleadoDespachoData"
  );
  const estacionServicio = useGetData(
    "/estaciones-servicio/",
    "estacionSelectData"
  );
  const islas = useGetData(
    `/liquidacion/islas/${infoGeneral.estacion}&auth=false`,
    "islaSelectData",
    { fetchInURLChange: true }
  );
  const turnos = useGetData(
    "/administrativo/turnos/buscartodo",
    "turnoSelectData"
  );

  const otherData = useMemo(() => {
    const values: {
      islas: any[];
      estacionServicio: any;
      turno: any;
      empleado: any;
    } = {
      islas: [],
      estacionServicio: "",
      turno: "",
      empleado: "",
    };

    if (!islas.isPending) {
      const filteredIslas: any[] = [];
      infoGeneral.islas?.forEach((element) => {
        const indexOfValue = islas.data.response.findIndex(
          (el: { idisla: number }) => el.idisla === element.idIsla
        );
        if (indexOfValue >= 0) {
          filteredIslas.push(islas.data.response[indexOfValue]);
        }
      });
      values.islas = filteredIslas;
    }

    if (!estacionServicio.isPending) {
      const indexOfValue = estacionServicio.data.response.findIndex(
        (el: any) => el.idestacion_servicio === infoGeneral.estacion
      );

      if (indexOfValue >= 0) {
        values.estacionServicio = estacionServicio.data.response[indexOfValue];
      }
    }

    if (!turnos.isPending) {
      const indexOfValue = turnos.data.response.findIndex(
        (el: { idturno: number }) => el.idturno === infoGeneral.turno
      );
      if (indexOfValue >= 0) {
        values.turno = turnos.data.response[indexOfValue];
      }
    }

    if (!empleados.isPending) {
      const indexOfValue = empleados.data.response.findIndex(
        (el: { idempleado: number }) => el.idempleado === infoGeneral.empleado
      );
      if (indexOfValue >= 0) {
        values.empleado = empleados.data.response[indexOfValue];
      }
    }
    return values;
  }, [islas, estacionServicio, turnos, empleados]);

  //totales
  const totales = useMemo(() => {
    const valores = {
      totalEntregar: 0,
      totalVales: 0,
      totalEfectivo: 0,
      totalEntregado: 0,
      diferencia: "0",
    }; // sirve para almacenar los valores temporalmente

    if (mangueras.length > 0) {
      const sumatoriaImportes = mangueras
        .map((el) => {
          if (
            el.litrosVendidos !== undefined &&
            el.precioUnitario !== undefined
          ) {
            return Number(el.litrosVendidos) * Number(el.precioUnitario);
          }
          return 0;
        })
        .reduce((a, b) => Number(new Decimal(a).add(b).toFixed(2)), 0);

      valores.totalEntregar = sumatoriaImportes;
    }

    if (vales.cantidad.length > 0) {
      const sumatoriaVales: number = vales.cantidad.reduce(
        (a, b) => Number(new Decimal(Number(a)).add(Number(b)).toFixed(2)),
        0
      );
      valores.totalVales = sumatoriaVales;
    }

    if (efectivo.cantidad.length > 0) {
      const sumatoriaEfectivo: number = efectivo.cantidad.reduce(
        (a, b) => Number(new Decimal(Number(a)).add(Number(b)).toFixed(2)),
        0
      );
      valores.totalEfectivo = sumatoriaEfectivo;
    }

    valores.totalEntregado = valores.totalEfectivo + valores.totalVales;
    valores.diferencia = new Decimal(valores.totalEntregar)
      .minus(valores.totalEntregado)
      .toFixed(2);

    return valores;
  }, [infoGeneral, mangueras, efectivo, vales]);

  console.log(otherData);

  useEffect(() => {
    const infoGralCache = localStorage.getItem("infoGeneralPreliq");
    if (infoGralCache) {
      //comprueba que existe la variable en el almacenamiento local
      if (JSON.parse(infoGralCache).hasOwnProperty("empleado")) {
        //comprueba que exista al menos la informacion del empleado
        (
          document.getElementById(
            "modal-confirm-no-mutate"
          ) as HTMLDialogElement
        ).showModal();
      }
    }
  }, []);

  const cleanAll = () => {
    setInfoGeneral({});
    setPrecios({});
    setEfectivo({ type: "efectivo", cantidad: [] });
    setVales({ type: "vales", cantidad: [] });
    setMangueras([]);
    setError(false);

    localStorage.removeItem("efectivoPreliq");
    localStorage.removeItem("infoGeneralPreliq");
    localStorage.removeItem("manguerasPreliq");
    localStorage.removeItem("preciosPreliq");
    localStorage.removeItem("valesPreliq");
    localStorage.removeItem("errorPreliq");

    navigate("/preliquidacion");
  };

  return (
    <ContextPreliq.Provider
      value={{
        infoGeneral: { body: infoGeneral, setBody: setInfoGeneral },
        precios: { body: precios, setBody: setPrecios },
        mangueras: { body: mangueras, setBody: setMangueras },
        efectivo: { body: efectivo, setBody: setEfectivo },
        vales: { body: vales, setBody: setVales },
        error: { body: error, setBody: setError },
        otherData,
        totales,
        cleanAll,
      }}
    >
      <div className="w-full h-[calc(100vh-6rem)] flex">
        <ModalConfirmNoMutate
          action={cleanAll}
          msg="Existen datos sin guardar, ¿desea recuperarlos?"
          title="Advertencia"
          actionOnCloseButton
          confirmButtonText="Sí"
          closeButtonText="No"
        />
        <ul className="menu bg-base-300 rounded-box lg:w-1/6 h-full gap-2">
          {/* <NavButton
            to="/preliquidacion"
            icon="circle-info"
            text="Información general"
            end
          /> */}

          <NavButton
            to="."
            icon="gauge-simple-high"
            text="Capturar lecturas"
            end
            //disabled={Object.values(precios).length < 3}
          />
          <NavButton
            to="previsualizar-lecturas"
            icon="eye"
            text="Previsualizar lecturas"
          />
          <NavButton
            to="capturar-efectivo"
            icon="hand-holding-dollar"
            text="Capturar efectivo"
          />
          <NavButton
            to="capturar-vales"
            icon="file-invoice-dollar"
            text="Capturar vales"
          />
          <NavButton
            to="previsualizar"
            icon="eye"
            text="Previsualizar y enviar"
          />
        </ul>
        <ScrollToTop scrollAreaID="scroll-area">
          <div
            className="flex flex-col w-full lg:w-5/6 h-full overflow-auto"
            id="scroll-area"
          >
            {/*             <Header noShowBarMenu />
             */}
            <div className="p-4">
              <Outlet />
              <div className="stats shadow w-full sticky bottom-0 bg-base-100/80 backdrop-blur-sm mt-4">
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <Icon icon="calculator" size="2x" />
                  </div>
                  <div className="stat-title">Total calculado</div>
                  <div className="stat-value text-xl lg:text-4xl">
                    {format.formatDinero(totales.totalEntregar)}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <Icon icon="sack-dollar" size="2x" />
                  </div>
                  <div className="stat-title">Total entregado</div>
                  <div className="stat-value text-xl lg:text-4xl">
                    {format.formatDinero(totales.totalEntregado)}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <Icon icon="minus" size="2x" />
                  </div>
                  <div className="stat-title">Diferencia</div>
                  <div className="stat-value text-xl lg:text-4xl">
                    {format.formatDinero(totales.diferencia)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollToTop>
      </div>
    </ContextPreliq.Provider>
  );
};

const NavButton: FC<{
  to: string;
  icon: string;
  text: string;
  disabled?: boolean;
  end?: boolean;
}> = ({ to, icon, text, disabled, end }) => {
  return (
    <li className={disabled ? "disabled" : ""}>
      <NavLink
        to={to}
        className={`${disabled ? "btn-disabled" : ""} text-center sm:text-left`}
        end={end}
      >
        <Icon icon={icon} />
        <span className="hidden lg:block">{text}</span>
      </NavLink>
    </li>
  );
};
export default LayoutLiquidacion;

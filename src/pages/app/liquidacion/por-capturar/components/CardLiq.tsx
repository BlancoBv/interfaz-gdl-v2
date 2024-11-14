import {
  liquidacionesPendientesInterface,
  reportJsonLiqInterface,
} from "@assets/interfaces";
import Icon from "@components/Icon";
import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../components/socket";
import { useModal } from "@hooks/useModal";

const CardLiq: FC<{
  data: liquidacionesPendientesInterface;
  anteriores: [];
  setRecapValid: any;
}> = ({ data, setRecapValid }) => {
  const credentials: { auth?: { idempleado: number } } = JSON.parse(
    localStorage.getItem("credentials") ?? "null"
  );

  console.log(data);

  const navigate = useNavigate();
  const modalCapturando = useModal("liq-capturando");
  const statusMsg = (): ReactNode => {
    const status: {
      msg: string;
      icon: string;
      color: "warning" | "success" | "error" | "info";
    } = { msg: "", icon: "", color: "warning" };
    if (!data.capturado && !data.lecturas) {
      status.msg = "Sin capturar";
      status.icon = "triangle-exclamation";
    }
    if (data.capturado && !data.lecturas) {
      status.msg = "Capturando";
      status.color = "info";
      status.icon = "loader";
    }
    if (data.capturado && data.lecturas && !data.cancelado) {
      status.msg = "Capturado";
      status.color = "success";
      status.icon = "check-circle";
    }
    if (data.capturado && data.cancelado) {
      status.msg = "Cancelado";
      status.color = "error";
      status.icon = "xmark";
    }
    return (
      <div className={`badge badge-${status.color} gap-2`}>
        {/* <span className="text-xs">{status.msg}</span> */}
        {status.icon !== "loader" && <Icon icon={status.icon} />}
        {status.icon === "loader" && (
          <span className="loading loading-dots loading-xs"></span>
        )}
      </div>
    );
  };

  const handleClick = (): void => {
    handleClick: {
      if (!data.capturado && !data.lecturas) {
        navigate(
          `/app/liquidacion/liquidaciones/capturar/${data.idliquidacion}`
        );
        break handleClick;
      }
      if (data.capturado && data.lecturas) {
        navigate(
          `/app/liquidacion/liquidaciones/detalles/${data.idliquidacion}`
        );
        //   status.msg = "Capturado";
        break handleClick;
      }
      if (data.capturado && !data.lecturas) {
        setRecapValid({
          valid:
            credentials.auth?.idempleado === data.empleado_captura.idempleado,
          idLiquidacion: data.idliquidacion,
        });
        modalCapturando.show();
        //  status.msg = "Capturando";
      }
    }
  };

  return (
    <div
      className="card bg-base-100 w-full shadow-xl group indicator hover:bg-base-200 ease-in duration-150 cursor-pointer"
      onClick={handleClick}
    >
      <div className="card-body group-hover:scale-105 ease-in duration-150 indicator text-wrap w-full">
        <h2 className="card-title">{data.idliquidacion}</h2>
        <p className="flex items-center gap-2 text-sm">
          <span className="text-base-content/60">
            <Icon icon="user" size="2x" />
          </span>
          {`${data.horario.empleado.nombre} ${data.horario.empleado.apellido_paterno} ${data.horario.empleado.apellido_materno}`}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <span className="text-base-content/60">
            <Icon icon="warehouse" size="2x" />
          </span>
          {data.horario.estacion_servicio.nombre}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <span className="text-base-content/60">
            <Icon icon="business-time" size="2x" />
          </span>
          {data.horario.turno.turno}
        </p>

        {data.capturado && !data.lecturas && (
          <p className="flex items-center gap-2 text-sm">
            <span className="text-base-content/60">
              <Icon icon="user-pen" size="2x" />
            </span>
            Capturando: {data.empleado_captura.nombre}
          </p>
        )}
      </div>
      <div className="indicator-item group-hover:scale-105 ease-in duration-150">
        {statusMsg()}
      </div>
    </div>
  );
};
export default CardLiq;

import {
  liquidacionesPendientesInterface,
  reportJsonLiqInterface,
} from "@assets/interfaces";
import Icon from "@components/Icon";
import { FC, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../components/socket";
import { useModal } from "@hooks/useModal";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import { useSendData } from "@hooks/useSendData";
interface preliquidacionExist extends getDataInterface {
  data: { response: null | { [key: string]: any } };
}

const CardLiq: FC<{
  data: liquidacionesPendientesInterface;
  anteriores: [];
  setRecapValid: any;
  totalLiquidaciones: number;
  liquidacionesEnCaptura: number;
}> = ({ data, setRecapValid, totalLiquidaciones, liquidacionesEnCaptura }) => {
  const { sendJsonMessage } = socket();
  const credentials: { auth?: { idempleado: number } } = JSON.parse(
    localStorage.getItem("credentials") ?? "null"
  );

  const navigate = useNavigate();
  const modalCapturando = useModal("liq-capturando");
  const modalNoPreliq = useModal("modal-no-preliq");
  const preliquidacionExist: preliquidacionExist = useGetData(
    `liquidacion/buscar-preliquidacion?idEmpleado=${data.horario.idempleado}&fechaTurno=${data.horario.fechaliquidacion}&idEstacionServicio=${data.horario.estacion_servicio.idestacion_servicio}&idTurno=${data.horario.turno.idturno}`,
    "preliqExistenteData"
  );
  const reservar = useSendData(`liquidacion/reservar/${data.idliquidacion}`);

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

  const handleClick = async (): Promise<void> => {
    const response = await preliquidacionExist.refetch();
    const havePreliq = response.data?.response === null;

    //llama la fución que actualiza el valor de la petición
    handleClick: {
      if (!data.capturado && !data.lecturas) {
        if (havePreliq) {
          modalNoPreliq.show();
          break handleClick;
        }
        const bodyReserva: { total: number; numero: number } = {
          total: totalLiquidaciones,
          numero: liquidacionesEnCaptura + 1,
        };

        await reservar.mutateAsync(bodyReserva);

        sendJsonMessage({
          type: "closeLiquidacion",
          idliquidacion: data.idliquidacion,
          escena: "usuarioCapturaOtraLiquidacion",
          msg: `Un usuario esta capturando una liquidación con folio: ${data.idliquidacion} `,
        });
        localStorage.setItem("liqDatos", JSON.stringify(data));
        localStorage.setItem("hasReinicio", JSON.stringify(false));

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
        if (havePreliq) {
          modalNoPreliq.show();
          break handleClick;
        }
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
      className="card bg-base-100 w-full shadow-xl group indicator hover:bg-base-200 ease-in duration-150 cursor-pointer min-h-64"
      onClick={handleClick}
    >
      <div className="card-body group-hover:scale-105 ease-in duration-150 indicator text-wrap w-full">
        <h2 className="card-title">{data.idliquidacion}</h2>
        <p className="flex items-center gap-2 text-sm">
          <span className="text-base-content/60 w-12 flex items-center justify-center">
            <Icon icon="user" size="2x" />
          </span>
          {`${data.horario.empleado.nombre} ${data.horario.empleado.apellido_paterno} ${data.horario.empleado.apellido_materno}`}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <span className="text-base-content/60 w-12 flex items-center justify-center">
            <Icon icon="warehouse" size="2x" />
          </span>
          {data.horario.estacion_servicio.nombre}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <span className="text-base-content/60 w-12 flex items-center justify-center">
            <Icon icon="business-time" size="2x" />
          </span>
          {data.horario.turno.turno}
        </p>

        {data.capturado && !data.lecturas && (
          <p className="flex items-center gap-2 text-sm">
            <span className="text-base-content/60 w-12 flex items-center justify-center">
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

import format from "@assets/format";
import Button from "@components/Button";
import { InputFecha } from "@components/forms/Input";
import { SelectEstacion } from "@components/forms/Select";
import CintaOpciones from "@components/gui/CintaOpciones";
import SectionTitle from "@components/gui/SectionTitle";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import socket from "../components/socket";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import { liquidacionesPendientesInterface } from "@assets/interfaces";
import CardLiq from "./components/CardLiq";
import NoData from "@components/gui/NoData";
import Icon from "@components/Icon";
import Modal, { ModalConfirmNoMutate } from "@components/gui/Modal";
import { Navigate, useNavigate } from "react-router-dom";
import InputRFID from "../components/InputRFID";
import { useSendData } from "@hooks/useSendData";

interface liquidaciones extends getDataInterface {
  data: {
    response: liquidacionesPendientesInterface[];
    totalLiquidaciones: number;
    anteriores: [];
  };
}

const LiqPorCapturar: FC = () => {
  const date = new Date(Date.now());
  const navigate = useNavigate();
  const cacheLiq = JSON.parse(localStorage.getItem("liqDatos") ?? "null");
  const { sendJsonMessage, lastJsonMessage } = socket();

  const cacheFiltros = sessionStorage.getItem("liqPendFiltros");
  const parsedFiltros = cacheFiltros
    ? JSON.parse(cacheFiltros)
    : {
        fecha: format.formatFechaAsDB(date),
        idEstacion: 1,
      };

  const [filtros, setFiltros] = useState<{
    fecha: string;
    idEstacion: number;
  }>(parsedFiltros);
  const [tarjetaValida, setTarjetaValida] = useState<boolean>(false);
  const [noPreliqData, setNoPreliqData] = useState<
    Partial<liquidacionesPendientesInterface>
  >({});

  const { data, refetch, isError, isPending }: liquidaciones = useGetData(
    `liquidacion/pendientes?fecha=${filtros.fecha}&idEstacion=${
      filtros.idEstacion ?? ""
    }`,
    "liqPendientesData"
  );
  const reservar = useSendData(
    `liquidacion/reservar/${noPreliqData?.idliquidacion}`
  );

  const [recapValid, setRecapValid] = useState<{
    valid: boolean;
    idLiquidacion?: number;
  }>({
    valid: false,
  });

  const continueLiq = async (idLiquidacion: number | undefined) => {
    const bodyReserva: { total: number; numero: number } = {
      total: data.totalLiquidaciones,
      numero: data.response.filter((el) => el.capturado === true).length + 1,
    };

    await reservar.mutateAsync(bodyReserva);

    sendJsonMessage({
      type: "closeLiquidacion",
      idliquidacion: idLiquidacion,
      escena: "usuarioCapturaOtraLiquidacion",
      msg: `Un usuario esta capturando una liquidación con folio: ${idLiquidacion} `,
    });
    localStorage.setItem("liqDatos", JSON.stringify(noPreliqData));
    localStorage.setItem("hasReinicio", JSON.stringify(false));

    navigate(`/app/liquidacion/liquidaciones/capturar/${idLiquidacion}`);
  };

  useEffect(() => {
    if (lastJsonMessage !== null) {
      refetch();
    }
  }, [lastJsonMessage]);

  if (cacheLiq) {
    return (
      <Navigate
        to={`/app/liquidacion/liquidaciones/capturar/${cacheLiq.idliquidacion}`}
        replace
      />
    );
  }

  return (
    <div>
      <Modal
        title="No existe una preliquidación para esta captura"
        id="modal-no-preliq"
        sm
        icon="triangle-exclamation"
      >
        <p>
          Intenta de nuevo más tarde o espera a que el despachador realice su
          respectiva preliquidación.
        </p>
        <div className="divider"></div>
        <p>O Identificate para continuar de todos modos</p>
        <InputRFID setValue={setTarjetaValida} />
        {tarjetaValida && (
          <button onClick={() => continueLiq(noPreliqData.idliquidacion)}>
            Continuar de todos modos
          </button>
        )}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Cerrar</button>
          </form>
        </div>
      </Modal>
      <ModalConfirmNoMutate
        customID="liq-capturando"
        title="Liquidación en captura"
        msg={`Esta liquidación esta siendo capturada por otro usuario${
          recapValid.valid ? ". ¿Deseas continuar donde la dejaste?" : "."
        }`}
        action={() => {
          if (recapValid.valid && recapValid.idLiquidacion) {
            navigate(
              `/app/liquidacion/liquidaciones/capturar/${recapValid.idLiquidacion}`
            );
          } else {
            undefined;
          }
        }}
        closeOnESC
        confirmButtonText={recapValid.valid ? "Continuar captura" : "Aceptar"}
      />
      <SectionTitle
        titulo="Liquidaciones por capturar"
        subtitulo="Liquidación"
      />
      <CintaOpciones
        onSubmit={(ev: SyntheticEvent) => {
          ev.preventDefault();
          sessionStorage.setItem("liqPendFiltros", JSON.stringify(filtros));
          refetch();
        }}
      >
        <InputFecha
          label="Fecha de liquidación"
          name="fecha"
          variable={filtros}
          setVariable={setFiltros}
          required
          todayBtn
        />
        <SelectEstacion
          name="idEstacion"
          label="Estación de servicio"
          variable={filtros}
          setVariable={setFiltros}
        />
        <Button buttonType="submit" text="Filtrar" />
      </CintaOpciones>
      <div>
        <div className="flex justify-evenly gap-4 p-4 overflow-y-auto flex-wrap">
          <div className="badge badge-neutral">
            Liquidaciones totales: {data?.totalLiquidaciones}
          </div>
          <span className="flex gap-2">
            <div className="badge badge-error gap-2">
              <Icon icon="xmark" />
            </div>
            <span className="text-xs">Cancelado</span>
          </span>
          <span className="flex gap-2">
            <div className="badge badge-success gap-2">
              <Icon icon="check-circle" />
            </div>
            <span className="text-xs">Capturado</span>
          </span>
          <span className="flex gap-2">
            <div className="badge badge-info gap-2">
              <span className="loading loading-dots loading-xs"></span>
            </div>
            <span className="text-xs">Capturando</span>
          </span>
          <span className="flex gap-2">
            <div className="badge badge-warning gap-2">
              <Icon icon="warning" />
            </div>
            <span className="text-xs">Sin capturar</span>
          </span>
        </div>
        <span className="divider m-0"></span>
        {!isError && !isPending && data.response?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {data.response.map((el) => (
              <CardLiq
                setNoPreliqData={setNoPreliqData}
                data={el}
                key={el.idliquidacion}
                anteriores={data.anteriores}
                setRecapValid={setRecapValid}
                totalLiquidaciones={data.totalLiquidaciones}
                liquidacionesEnCaptura={
                  data.response.filter((el) => el.capturado === true).length
                }
              />
            ))}
          </div>
        )}
      </div>
      <NoData
        isError={isError}
        isPending={isPending}
        condition={data?.response?.length < 1}
      />
    </div>
  );
};
export default LiqPorCapturar;

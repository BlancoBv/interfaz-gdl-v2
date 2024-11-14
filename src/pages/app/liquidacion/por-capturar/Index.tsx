import format from "@assets/format";
import Button from "@components/Button";
import { InputFecha } from "@components/forms/Input";
import { SelectEstacion } from "@components/forms/Select";
import CintaOpciones from "@components/gui/CintaOpciones";
import SectionTitle from "@components/gui/SectionTitle";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import socket from "../components/socket";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import {
  liquidacionesPendientesInterface,
  reportJsonLiqInterface,
} from "@assets/interfaces";
import CardLiq from "./components/CardLiq";
import NoData from "@components/gui/NoData";
import Icon from "@components/Icon";
import { ModalConfirmNoMutate } from "@components/gui/Modal";
import { useNavigate } from "react-router-dom";

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
  const { lastJsonMessage } = socket();

  const { data, refetch, isError, isPending }: liquidaciones = useGetData(
    `liquidacion/pendientes?fecha=${filtros.fecha}&idEstacion=${
      filtros.idEstacion ?? ""
    }`,
    "liqPendientesData"
  );
  const [recapValid, setRecapValid] = useState<{
    valid: boolean;
    idLiquidacion?: number;
  }>({
    valid: false,
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      refetch();
    }
  }, [lastJsonMessage]);

  return (
    <div>
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
                data={el}
                key={el.idliquidacion}
                anteriores={data.anteriores}
                setRecapValid={setRecapValid}
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

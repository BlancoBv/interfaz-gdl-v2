import format from "@assets/format";
import Button from "@components/Button";
import { InputFecha } from "@components/forms/Input";
import { SelectEstacion } from "@components/forms/Select";
import SectionTitle from "@components/gui/SectionTitle";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import moment from "moment";
import { FC, useMemo, useState } from "react";
import Card from "./components/Card";
import LitrosVendidos from "./components/LitrosVendidos";
import { reportJsonLiqInterface } from "@assets/interfaces";
import agruparArr from "@assets/agruparArr";
import VentasXDespachador from "./components/VentasXDespachador";
import Doughnut from "@components/charts/Doughnut";
import CantidadLiquidaciones from "./components/CantidadLiquidaciones";
import PreciosCombustible from "./components/PreciosCombustible";
import Icon from "@components/Icon";

interface liquidacion extends getDataInterface {
  data: { response: reportJsonLiqInterface[] };
}

const Liquidacion: FC = () => {
  const date = new Date(Date.now());
  const [filtros, setFiltros] = useState<{
    fechaI: string;
    fechaF: string;
    estacionS?: string;
  }>({
    fechaI: format.formatFechaAsDB(moment(date).subtract(7, "days")),
    fechaF: format.formatFechaAsDB(date),
    estacionS: "",
  });
  const { data, isPending, isError, refetch }: liquidacion = useGetData(
    `liquidacion/reporte-dashboard?fechaI=${filtros.fechaI}&fechaF=${
      filtros.fechaF
    }&estacionS=${filtros.estacionS ?? ""}`,
    "dashboardDataLiq"
  );

  const liquidaciones = useMemo(() => {
    const liquidaciones =
      data?.response?.filter(
        (liq) => !liq.cancelado && liq.lecturas && liq.capturado
      ) ?? [];
    return liquidaciones;
  }, [data]);

  const liquidacionXdespachador = useMemo(() => {
    return agruparArr(liquidaciones, (el) => el.horario.empleado.idempleado)
      .single;
  }, [liquidaciones]);

  return (
    <div className="w-full h-full">
      <SectionTitle titulo="Dashboard" subtitulo="Liquidación" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 grid-rows-4 gap-4">
        <Card
          title="Litros vendidos"
          className="md:col-span-2 lg:col-span-4 lg:row-span-2"
          noStaticHeight
        >
          <LitrosVendidos
            data={liquidaciones}
            isError={isError}
            isPending={isPending}
          />
        </Card>
        {/*         <Card
          title="Magna"
          className="lg:col-start-3 lg:row-start-1 text-success lg:col-span-2"
        >
          <LitrosVendidos
            data={liquidaciones}
            isError={isError}
            isPending={isPending}
            variant="M"
          />
        </Card>
        <Card
          title="Premium"
          className="lg:row-start-2 text-error lg:col-span-2"
        >
          <LitrosVendidos
            data={liquidaciones}
            isError={isError}
            isPending={isPending}
            variant="P"
          />
        </Card>
        <Card
          title="Diesel"
          className="lg:row-start-2 text-secondary lg:col-span-2"
        >
          <LitrosVendidos
            data={liquidaciones}
            isError={isError}
            isPending={isPending}
            variant="D"
          />
        </Card> */}

        <Card
          title="Filtrar datos"
          className="md:col-span-2 lg:row-span-1 lg:col-span-8"
          noAnchor
        >
          <form
            className="grid grid-cols-3 gap-4 flex-wrap"
            onSubmit={(ev) => {
              ev.preventDefault();
              refetch();
            }}
          >
            <InputFecha
              label="Fecha inicio"
              variable={filtros}
              setVariable={setFiltros}
              name="fechaI"
              required
            />
            <InputFecha
              label="Fecha fin"
              variable={filtros}
              setVariable={setFiltros}
              name="fechaF"
              required
            />
            <SelectEstacion
              label="Estación de servicio"
              variable={filtros}
              setVariable={setFiltros}
              name="estacionS"
            />
            <Button buttonType="submit" text="Filtrar" />
          </form>
        </Card>
        <Card
          title="Cantidad de liquidaciones"
          className="lg:col-span-4"
          to="cantidad-liquidaciones"
        >
          <CantidadLiquidaciones data={data} />
        </Card>
        <Card
          title="Ventas por despachador"
          className="lg:col-span-4"
          to="ventas-despachador"
        >
          <VentasXDespachador data={liquidacionXdespachador} />
        </Card>
        <Card
          title="Precios vigentes"
          className="lg:row-span-2 lg:col-span-4"
          to="precios"
          noStaticHeight
        >
          <PreciosCombustible />
        </Card>
        <Card title="Ventas por turnos" className="lg:col-span-4 "></Card>
        <Card
          title="Litros combustible por día"
          className="lg:col-span-4"
        ></Card>
        <Card title="Montos faltantes" className="lg:col-span-2"></Card>
        <Card title="Montos sobrantes" className="lg:col-span-2"></Card>
        <Card title="Total en lecturas" className="lg:col-span-2"></Card>
        {/* <Card title="Más opciones" className="lg:col-span-2 group" noAnchor>
          <div className="dropdown dropdown-top lg:dropdown-left">
            <div tabIndex={0} role="button" className="btn m-1">
              Click
            </div>
            <div
              tabIndex={0}
              className="dropdown-content card bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            ></div>
          </div>
          <div className="flex grow items-center justify-center">
            <Icon icon="plus" size="2x" />
          </div>
        </Card> */}
        <div className="dropdown dropdown-hover dropdown-top lg:dropdown-left dropdown-end w-full h-full col-span-2">
          <div
            tabIndex={0}
            role="button"
            className="shadow-xl rounded-box flex items-center justify-center w-full h-full"
          >
            <Icon icon="ellipsis" size="2x" />
          </div>
          <div
            tabIndex={0}
            className="dropdown-content card bg-base-100 rounded-box z-[1] w-96 h-96 p-2 shadow grid grid-cols-2 grid-rows-5 gap-4 overflow-y-auto"
          >
            <Card title="Historial de lecturas" noStaticHeight />
            <Card title="Codigos de uso" noStaticHeight />
            <Card title="Historial de lecturas" noStaticHeight />
            <Card title="Control volumetrico vs BD" noStaticHeight />
            <Card title="Busqueda de liquidación" noStaticHeight />
            <Card title="Historial de lecturas" noStaticHeight />
            <Card title="Resumen diario" noStaticHeight />
            <Card title="Exportar a excel" noStaticHeight />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Liquidacion;

import format from "@assets/format";
import Button from "@components/Button";
import { InputFecha } from "@components/forms/Input";
import { SelectEstacion } from "@components/forms/Select";
import SectionTitle from "@components/gui/SectionTitle";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import moment from "moment";
import { FC, useState } from "react";
import Card from "./components/Card";
import LitrosVendidos from "./components/LitrosVendidos";
import { reportJsonLiqInterface } from "@assets/interfaces";
import agruparArr from "@assets/agruparArr";
import VentasXDespachador from "./components/VentasXDespachador";

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

  const liquidaciones =
    data?.response?.filter(
      (liq) => !liq.cancelado && liq.lecturas && liq.capturado
    ) ?? [];

  const liquidacionXdespachador = agruparArr(
    liquidaciones,
    (el) => el.horario.empleado.idempleado
  ).single;

  console.log(liquidacionXdespachador);

  return (
    <div className="w-full h-full">
      <SectionTitle titulo="Dashboard" subtitulo="Liquidación" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 grid-rows-4 gap-4">
        <Card title="Litros vendidos" className="lg:row-start-1 lg:col-span-2">
          <LitrosVendidos
            data={liquidaciones}
            isError={isError}
            isPending={isPending}
            variant="L"
          />
        </Card>
        <Card
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
        </Card>

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
            />
            <InputFecha
              label="Fecha fin"
              variable={filtros}
              setVariable={setFiltros}
              name="fechaF"
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
        ></Card>
        <Card
          title="Ventas por despachador"
          className="lg:col-span-4"
          to="ventas-despachador"
        >
          <VentasXDespachador data={liquidacionXdespachador} />
        </Card>
        <Card title="Precios" className="lg:col-span-4"></Card>
        <Card title="Ventas por turnos" className="lg:col-span-4 "></Card>
        <Card
          title="Litros combustible por día"
          className="lg:col-span-4"
        ></Card>
        <Card title="Montos faltantes" className="lg:col-start-6"></Card>
        <Card title="Montos sobrantes"></Card>
        <Card title="Total en lecturas"></Card>
        <Card title="..."></Card>
      </div>
    </div>
  );
};
export default Liquidacion;

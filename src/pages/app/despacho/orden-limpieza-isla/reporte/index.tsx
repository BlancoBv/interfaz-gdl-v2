import { reporteOyLInterface } from "@assets/interfaces";
import Button from "@components/Button";
import { Select, SelectMonth, SelectYear } from "@components/forms/Select";
import CintaOpciones from "@components/gui/CintaOpciones";
import Loader from "@components/gui/Loader";
import SectionTitle from "@components/gui/SectionTitle";
import Table from "@components/Table";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import moment from "moment";
import { FC, SyntheticEvent, useState } from "react";

interface registros extends getDataInterface {
  data: { response: reporteOyLInterface[] };
}

const ReporteOyl: FC = () => {
  const date = new Date(Date.now());
  const cacheFiltros = sessionStorage.getItem("reporteOyLFiltros");
  const parsedFiltros = cacheFiltros
    ? JSON.parse(cacheFiltros)
    : {
        mes: moment(date).month() + 1,
        year: moment(date).year(),
        quincena: "all",
      };
  const [filtros, setFiltros] = useState<{
    quincena?: string;
    mes?: number;
    year?: number;
  }>(parsedFiltros);

  const { data, isError, isPending, refetch } = useGetData(
    `ordenLimpieza/${filtros.year}/${filtros.mes}?quincena=${
      filtros.quincena === "all" ? "" : filtros.quincena
    }`,
    "reportOyLGral"
  );

  return (
    <div>
      <SectionTitle titulo="Reportes mensuales" subtitulo="Despacho" />
      <CintaOpciones
        onSubmit={(ev: SyntheticEvent) => {
          ev.preventDefault();
          sessionStorage.setItem("reporteOyLFiltros", JSON.stringify(filtros));
          refetch();
        }}
      >
        <Select
          label="Quincena"
          name="quincena"
          variable={filtros}
          setVariable={setFiltros}
          placeholder="Selecciona una quincena"
          options={[
            { value: "all", label: "Todo el mes" },
            { value: "1", label: "Quincena 1" },
            { value: "2", label: "Quincena 2" },
          ]}
          required
        />
        <SelectMonth
          label="Mes"
          name="mes"
          variable={filtros}
          setVariable={setFiltros}
        />
        <SelectYear
          label="Año"
          name="year"
          variable={filtros}
          setVariable={setFiltros}
        />
        <Button buttonType="submit" text="Filtrar" />
      </CintaOpciones>
      <Loader isPending={isPending} />
      {!isError && !isPending && (
        <Table
          data={data.response}
          columns={[
            {
              name: "Despachador",
              selector: (el: reporteOyLInterface) =>
                `${el.nombre} ${el.apellido_paterno} ${el.apellido_materno}`,
            },
            {
              name: "Puntos acumulados en las evaluaciones",
              selector: (el: reporteOyLInterface) => el.totalPuntos,
            },
          ]}
          hoverable
        />
      )}
    </div>
  );
};
export default ReporteOyl;

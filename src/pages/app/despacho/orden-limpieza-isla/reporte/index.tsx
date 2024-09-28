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
import Line from "@components/charts/Line";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const { data, isError, isPending, refetch }: registros = useGetData(
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
        <>
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
            onClick={(data: reporteOyLInterface) => {
              navigate(`${data.idempleado}`);
            }}
          />
          <Line
            etiquetaX="Despachadores"
            etiquetaY="Puntos acumulados"
            title={`Puntos de orden y limpieza, ${
              filtros.quincena === "all"
                ? "mensual"
                : "quincena " + filtros.quincena
            }`}
            data={{
              datasets: [
                {
                  data: data.response.map((el) => ({
                    x: `${el.idempleado};${el.nombre} ${el.apellido_materno[0]}.`,

                    y: el.totalPuntos,
                  })),
                  borderColor: "green",
                  backgroundColor: "green",
                  label: "Despachadores",
                },
                {
                  data: data.response.map(() =>
                    filtros.quincena === "all" ? 18 : 9
                  ),
                  backgroundColor: "red",
                  borderColor: "red",
                  label: "Puntaje mínimo",
                },
              ],
            }}
            omitDatalabelOnIndex={1}
            legend
          />
        </>
      )}
    </div>
  );
};
export default ReporteOyl;

import { reportePasosDespacharInterface } from "@assets/interfaces";
import Button from "@components/Button";
import ButtonPDF from "@components/ButtonPDF";
import { Select, SelectMonth, SelectYear } from "@components/forms/Select";
import CintaOpciones from "@components/gui/CintaOpciones";
import Loader from "@components/gui/Loader";
import SectionTitle from "@components/gui/SectionTitle";
import PDFReportes from "@components/pdf/PDFReportes";
import Table from "@components/Table";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import moment from "moment";
import { FC, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Line from "@components/charts/Line";
import NoData from "@components/gui/NoData";

interface reporte extends getDataInterface {
  data: { response: reportePasosDespacharInterface[] };
}

const ReportePasosDespacho: FC = () => {
  const date = new Date(Date.now());
  const cacheFiltros = sessionStorage.getItem("reportePasosDespachoFiltros");
  const parsedFiltros = cacheFiltros
    ? JSON.parse(cacheFiltros)
    : {
        mes: moment(date).month() + 1,
        year: moment(date).year(),
        quincena: "all",
      };

  const navigate = useNavigate();

  const [filtros, setFiltros] = useState<{
    quincena?: string;
    mes?: number;
    year?: number;
  }>(parsedFiltros);

  const { data, isPending, isError, refetch }: reporte = useGetData(
    `pasos-despachar/evaluaciones?year=${filtros.year}&month=${
      filtros.mes
    }&quincena=${filtros.quincena === "all" ? "" : filtros.quincena}`,
    "reportePasosDespachoData"
  );
  return (
    <div>
      <SectionTitle
        titulo="Reportes pasos para despachar"
        subtitulo="Despacho"
      />
      <CintaOpciones
        onSubmit={(ev: SyntheticEvent) => {
          ev.preventDefault();
          sessionStorage.setItem(
            "reportePasosDespachoFiltros",
            JSON.stringify(filtros)
          );
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
          required
        />
        <SelectYear
          label="Año"
          name="year"
          variable={filtros}
          setVariable={setFiltros}
          required
        />

        <ButtonPDF
          isPending={isPending}
          disabled={isError}
          doc={
            <PDFReportes
              title="Evaluación uniforme"
              elementos={{
                tablas: ["tablaR"],
                graficas: ["chart-1"],
              }}
            />
          }
        />
        <Button buttonType="submit" text="Filtrar" />
      </CintaOpciones>
      <Loader isPending={isPending} />
      {!isPending && !isError && (
        <>
          <Table
            id="tablaR"
            data={data.response}
            columns={[
              {
                name: "Despachador",
                selector: (el: reportePasosDespacharInterface) => el.nombre,
              },
              {
                name: "Calificación",
                selector: (el: reportePasosDespacharInterface) => el.promedio,
              },
            ]}
            hoverable
            onClick={(data: reportePasosDespacharInterface) =>
              navigate(`${filtros.year}/${filtros.mes}/${data.idempleado}`)
            }
          />
          <Line
            id="chart-1"
            etiquetaX="Despachadores"
            etiquetaY="Promedio"
            title="Promedio mensual pasos para despachar"
            data={{
              datasets: [
                {
                  data: data.response.map((el) => ({
                    x: `${el.idempleado};${el.nombre}`,
                    y: Number(el.promedio),
                  })),
                  label: "Promedio",
                  backgroundColor: "green",
                  borderColor: "green",
                },
                {
                  data: data.response.map((el) => ({
                    x: `${el.idempleado};${el.nombre}`,
                    y: 9,
                  })),
                  label: "Promedio minimo",
                  borderColor: "red",
                  backgroundColor: "red",
                },
              ],
            }}
            omitDatalabelOnIndex={1}
            legend
          />
        </>
      )}
      <NoData isPending={isPending} isError={isError} />
    </div>
  );
};
export default ReportePasosDespacho;

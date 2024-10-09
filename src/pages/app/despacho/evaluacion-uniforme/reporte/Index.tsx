import Button from "@components/Button";
import { SelectMonth, SelectYear } from "@components/forms/Select";
import CintaOpciones from "@components/gui/CintaOpciones";
import SectionTitle from "@components/gui/SectionTitle";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import { FC, SyntheticEvent, useState } from "react";
import { Select } from "@components/forms/Select";
import moment from "moment";
import Loader from "@components/gui/Loader";
import Table from "@components/Table";
import { reporteUniformeInterface } from "@assets/interfaces";
import format from "@assets/format";
import Line from "@components/charts/Line";
import ButtonPDF from "@components/ButtonPDF";
import PDFReportes from "@components/pdf/PDFReportes";

interface reporte extends getDataInterface {
  data: { response: reporteUniformeInterface[] };
}

const ReporteEvUniforme: FC = () => {
  const date = new Date(Date.now());
  const cacheFiltros = sessionStorage.getItem("reporteEvUniformeFiltros");
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

  const { data, isPending, isError, refetch }: reporte = useGetData(
    `evaluacion-uniforme/${filtros.year}/${filtros.mes}?quincena=${
      filtros.quincena === "all" ? "" : filtros.quincena
    }`,
    "reporteEvUniforData"
  );

  return (
    <div>
      <SectionTitle
        titulo="Reportes evaluación de uniforme"
        subtitulo="Despacho"
      />
      <CintaOpciones
        onSubmit={(ev: SyntheticEvent) => {
          ev.preventDefault();
          sessionStorage.setItem(
            "reporteEvUniformeFiltros",
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
          isPending={false}
          doc={
            <PDFReportes
              title="Evaluación uniforme"
              elementos={{
                tablas: ["tablaR"],
                graficas: ["prueba"],
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
                name: "Empleado",
                selector: (el: reporteUniformeInterface) =>
                  `${el.nombre} ${el.apellido_paterno} ${el.apellido_materno}`,
              },
              {
                name: "Promedio mensual de evaluación de uniforme",
                selector: (el: reporteUniformeInterface) =>
                  format.formatDecimal(el.promedio),
              },
            ]}
            hoverable
          />
          <Line
            id="prueba"
            etiquetaX="Despachador"
            etiquetaY="Promedio"
            data={{
              datasets: [
                {
                  data: data.response.map((el) => ({
                    x: `${el.nombre} ${el.apellido_paterno.charAt(
                      0
                    )}. ${el.apellido_materno.charAt(0)}.`,
                    y: Number(format.formatDecimal(el.promedio)),
                  })),
                  label: "Promedios",
                },
                {
                  data: data.response.map((el) => ({
                    x: `${el.nombre} ${el.apellido_paterno.charAt(
                      0
                    )}. ${el.apellido_materno.charAt(0)}.`,
                    y: 8.5,
                  })),
                  backgroundColor: "red",
                  borderColor: "red",
                  label: "Puntaje mínimo",
                },
              ],
            }}
            legend
            omitDatalabelOnIndex={1}
          />
        </>
      )}
    </div>
  );
};
export default ReporteEvUniforme;

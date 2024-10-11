import agruparArr from "@assets/agruparArr";
import format from "@assets/format";
import {
  evaluacionesPasosDespacharInterface,
  reporteDetallePasosDespacharInterface,
} from "@assets/interfaces";
import Button from "@components/Button";
import ButtonPDF from "@components/ButtonPDF";
import { SelectMonth, SelectYear } from "@components/forms/Select";
import CintaOpciones from "@components/gui/CintaOpciones";
import Loader from "@components/gui/Loader";
import SectionTitle from "@components/gui/SectionTitle";
import PDFReportes from "@components/pdf/PDFReportes";
import Table from "@components/Table";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import { FC, SyntheticEvent, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Bar from "@components/charts/Bar";
import NoData from "@components/gui/NoData";

interface detalles extends getDataInterface {
  data: { response: reporteDetallePasosDespacharInterface[] };
}

interface pasos extends getDataInterface {
  data: { response: evaluacionesPasosDespacharInterface[] };
}

const ReporteEmpleadoPasosDespacho: FC = () => {
  const { year, mes, idDespachador } = useParams();

  const [filtros, setFiltros] = useState<{ year: number; mes: number }>({
    year: Number(year),
    mes: Number(mes),
  });

  const { data, isPending, isError, refetch, error }: detalles = useGetData(
    `pasos-despachar/${filtros.year}/${filtros.mes}/${idDespachador}`,
    "detallesEmpleadoPasosDespachoData",
    { fetchInURLChange: true, fetchTrigger: [idDespachador, year, mes] }
  );

  const pasos: pasos = useGetData(
    "pasos-despachar/get-pasos",
    "evalPasosDespacharData"
  );

  const { quincena1, quincena2, promedio } = useMemo(() => {
    if (!isError && !isPending) {
      const { values } = agruparArr(
        data.response,
        (el: reporteDetallePasosDespacharInterface) => el.qna
      );
      const promQna1 = pasos.data.response.map((_el, index) => {
        return (
          ((values as reporteDetallePasosDespacharInterface[][])[0]
            ?.map((el) => (el.data[index].evaluacion ? 1 : 0))
            .reduce((a: number, b: number) => a + b, 0) /
            values[0].length) *
          10
        );
      });
      const promQna2 = pasos.data.response.map((_el, index) => {
        return (
          ((values as reporteDetallePasosDespacharInterface[][])[1]
            ?.map((el) => (el.data[index].evaluacion ? 1 : 0))
            .reduce((a: number, b: number) => a + b, 0) /
            values[1]?.length) *
          10
        );
      });

      const promedioGral = promQna1.map((el, index) => {
        const qna2Value = promQna2[index];
        if (!Number.isNaN(qna2Value)) {
          return format.formatDecimal((el + qna2Value) / 2);
        }
        return format.formatDecimal(el);
      });

      return {
        quincena1: values[0],
        quincena2: values[1],
        promedio: promedioGral,
      };
    }

    return { quincena1: undefined, quincena2: undefined, promedio: undefined };
  }, [data, isPending]);

  if (isError && !error.hasOwnProperty("response")) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div>
      <SectionTitle
        titulo="Detalles reporte pasos para despachar"
        subtitulo="Despacho"
      />
      <CintaOpciones
        onSubmit={(ev: SyntheticEvent) => {
          ev.preventDefault();
          refetch();
        }}
      >
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
          doc={
            <PDFReportes
              elementos={{
                tablas: ["tablaR"],
                graficas: ["chart-1", "chart-2"],
              }}
              title="Detalles evaluación uniforme"
              encabezados={{
                mes: filtros.mes,
                year: filtros.year,
                empleado: idDespachador,
              }}
            />
          }
          isPending={false}
        />
        <Button buttonType="submit" text="Filtrar" />
      </CintaOpciones>
      <Loader isPending={isPending} />
      <NoData isError={isError} isPending={isPending} />

      {!isError && !isPending && !pasos.isPending && !pasos.isError && (
        <>
          <Table
            id="tablaR"
            data={[quincena1, quincena2, promedio]}
            columns={[
              {
                name: "Quincena",
                selector: (
                  el: reporteDetallePasosDespacharInterface[],
                  _col,
                  row
                ) => {
                  if (row && row + 1 === 2) {
                    return "Promedio";
                  }
                  if (el) {
                    return `Quincena ${el[0].qna}`;
                  }

                  return "---";
                },
              },
              ...pasos.data.response.map((el, index) => ({
                name: el.paso,
                selector: (
                  paso: reporteDetallePasosDespacharInterface[],
                  _colIndex?: number,
                  rowIndex?: number
                ) => {
                  if (!paso) {
                    return "---";
                  }

                  if (rowIndex && rowIndex + 1 === 2) {
                    return String(paso[index]);
                  }

                  return format.formatDecimal(
                    (paso
                      .map((result) => (result.data[index].evaluacion ? 1 : 0))
                      .reduce((a: number, b: number) => a + b, 0) /
                      paso.length) *
                      10
                  );
                },
              })),
              {
                name: "Total",
                selector: (
                  el: reporteDetallePasosDespacharInterface[],
                  _col,
                  row
                ) => {
                  if (row && row + 1 === 2 && promedio) {
                    return format.formatDecimal(
                      promedio?.reduce((a, b) => Number(a) + Number(b), 0) /
                        promedio?.length
                    );
                  }
                  if (el) {
                    return format.formatDecimal(el[0].promedio);
                  }

                  return "---";
                },
              },
            ]}
          />

          <Bar
            id="chart-1"
            title="Promedio mensual"
            etiquetaX="Quincena"
            etiquetaY="Promedio"
            data={{
              datasets: [
                {
                  data: [
                    {
                      x: "Qna1",
                      y: format.formatDecimal(
                        quincena1 ? quincena1[0].promedio : 0
                      ),
                    },
                    {
                      x: "Qna2",
                      y: format.formatDecimal(
                        quincena2 ? quincena2[0].promedio : 0
                      ),
                    },
                  ],
                  label: "Quincena 1",
                },
              ],
            }}
          />
          <Bar
            id="chart-2"
            title="Promedio pasos mensual"
            etiquetaX="Evaluaciones"
            etiquetaY="Promedio"
            data={{
              datasets: [
                {
                  data: promedio
                    ? promedio.map((el, index) => ({
                        x: `P (${index + 1}])`,
                        y: el,
                      }))
                    : [],
                },
              ],
            }}
          />
        </>
      )}
    </div>
  );
};
export default ReporteEmpleadoPasosDespacho;

import format from "@assets/format";
import { reporteChecklistInterface } from "@assets/interfaces";
import Button from "@components/Button";
import { SelectMonth, SelectYear } from "@components/forms/Select";
import CintaOpciones from "@components/gui/CintaOpciones";
import Loader from "@components/gui/Loader";
import SectionTitle from "@components/gui/SectionTitle";
import Icon from "@components/Icon";
import Table from "@components/Table";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import moment from "moment";
import { FC, SyntheticEvent, useMemo, useState } from "react";
import Line from "@components/charts/Line";
import { useNavigate } from "react-router-dom";
import ButtonPDF from "@components/ButtonPDF";
import PDFReportes from "@components/pdf/PDFReportes";

interface reporte extends getDataInterface {
  data: { response: reporteChecklistInterface[] };
}

const ReportesChecklist: FC = () => {
  const date = new Date(Date.now());
  const cacheFiltros = sessionStorage.getItem("reporteCheckFiltros");
  const navigate = useNavigate();
  const parsedFiltros = cacheFiltros
    ? JSON.parse(cacheFiltros)
    : {
        year: moment(date).year(),
        mes: moment(date).month() + 1,
      };

  const [filtros, setFiltros] = useState<{ year: number; mes: number }>(
    parsedFiltros
  );
  const { data, isError, isPending, refetch }: reporte = useGetData(
    `bomba-check/${filtros.year}/${filtros.mes}`,
    "reporteCheckData"
  );

  const handleFilter = (ev: SyntheticEvent) => {
    ev.preventDefault();
    sessionStorage.setItem("reporteCheckFiltros", JSON.stringify(filtros));
    refetch();
  };

  const datasets = useMemo(() => {
    if (!isError && !isPending) {
      return [
        {
          data: data.response.map((empleado) => ({
            x: `${empleado.empleado.idempleado};${
              empleado.empleado.nombre
            } ${empleado.empleado.apellido_paterno.charAt(
              0
            )}. ${empleado.empleado.apellido_materno.charAt(0)}.`,
            y: empleado.fechas.reduce((a, b) => {
              if (b.cumple === 1) {
                return a + 1;
              }
              return a;
            }, 0),
          })),
          label: "Puntos correctos",
          backgroundColor: "green",
          borderColor: "green",
        },
        {
          data: data.response.map((empleado) => ({
            x: `${empleado.empleado.idempleado};${
              empleado.empleado.nombre
            } ${empleado.empleado.apellido_paterno.charAt(
              0
            )}. ${empleado.empleado.apellido_materno.charAt(0)}.`,
            y: empleado.fechas.reduce((a, b) => {
              if (b.cumple === 0) {
                return a + 1;
              }
              return a;
            }, 0),
          })),
          label: "Puntos Incorrectos",
          backgroundColor: "red",
          borderColor: "red",
        },
      ];
    }
    return [];
  }, [data]);
  return (
    <div>
      <SectionTitle
        titulo="Reportes mensuales checklist bomba"
        subtitulo="Despacho"
      />
      <CintaOpciones onSubmit={handleFilter}>
        <SelectMonth
          label="Mes de consulta"
          name="mes"
          variable={filtros}
          setVariable={setFiltros}
          required
        />
        <SelectYear
          label="Año de consulta"
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
                graficas: ["chart-1"],
              }}
              title="Detalles evaluación uniforme"
            />
          }
          isPending={isPending}
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
                selector: (
                  el: reporteChecklistInterface
                ) => `${el.empleado.nombre} ${el.empleado.apellido_paterno}  
                ${el.empleado.apellido_materno}`,
                className: "w-48",
              },
              ...data.response[0].fechas.map((fecha) => ({
                name: format.obtenerDiaMes(fecha.fecha).toString(),
                selector: (sel: reporteChecklistInterface, colIndex: any) => {
                  console.log(colIndex);

                  if (sel.fechas[colIndex - 1].cumple === 1) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  if (sel.fechas[colIndex - 1].cumple === 0) {
                    return (
                      <span className="text-error">
                        <Icon icon="xmark" />
                      </span>
                    );
                  }
                  return "";
                },
              })),
            ]}
            hoverable
            onClick={(el: reporteChecklistInterface) => {
              navigate(
                `${filtros.year}/${filtros.mes}/${el.empleado.idempleado}`
              );
            }}
          />
          <Line
            id="chart-1"
            etiquetaX="Despachador"
            etiquetaY="Checklist realizados"
            data={{ datasets }}
            title="Checklist mensuales realizados por empleado"
            legend
          />
        </>
      )}
    </div>
  );
};
export default ReportesChecklist;

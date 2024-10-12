import agruparArr from "@assets/agruparArr";
import calcularTotal from "@assets/calcularTotal";
import format from "@assets/format";
import { reporteUniformeInterface } from "@assets/interfaces";
import SectionTitle from "@components/gui/SectionTitle";
import Icon from "@components/Icon";
import Table from "@components/Table";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import { FC, SyntheticEvent, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Bar from "@components/charts/Bar";
import CintaOpciones from "@components/gui/CintaOpciones";
import Button from "@components/Button";
import ButtonPDF from "@components/ButtonPDF";
import PDFReportes from "@components/pdf/PDFReportes";
import { SelectMonth, SelectYear } from "@components/forms/Select";
import Loader from "@components/gui/Loader";

interface detalles extends getDataInterface {
  data: { response: reporteUniformeInterface[] };
}

const ReporteEmpleadoEvUniforme: FC = () => {
  const { year, mes, idDespachador } = useParams();

  const [filtros, setFiltros] = useState<{ year: number; mes: number }>({
    year: Number(year),
    mes: Number(mes),
  });

  const { data, isPending, isError }: detalles = useGetData(
    `evaluacion-uniforme/${year}/${mes}/${idDespachador}`,
    "detallesEmpleadoEvUniData",
    { fetchInURLChange: true, fetchTrigger: [idDespachador, year, mes] }
  );

  const evaluaciones =
    !isPending && !isError ? data.response[0].evaluaciones : [];

  const catalogarCumplimientos = agruparArr(
    evaluaciones.flat(),
    (el) => el.cumplimiento
  );

  const cumplimientos = catalogarCumplimientos.keys;

  const cumplimientosValor = catalogarCumplimientos.values;

  const fechas = agruparArr(evaluaciones.flat(), (el) => el.fecha).values;

  const puntos = fechas.map(
    (fecha) =>
      agruparArr(fecha.flat(), (el) => el.idcumplimiento_uniforme).values
  );

  const resultados = puntos.map((res) =>
    res.map((arregloEv) => {
      const evaluacionEmpleado = arregloEv.map((el: any) =>
        el.cumple ? 1 : 0
      );
      const totalBuenas = calcularTotal(evaluacionEmpleado);
      const totalMalas = arregloEv.length - totalBuenas;
      return {
        evaluaciones: arregloEv,
        fecha: arregloEv[0].fecha,
        puntosAcumulados: totalBuenas,
        puntosNoAcumulados: totalMalas,
        cumplimiento: arregloEv[0].cumplimiento,
        idcumplimiento: arregloEv[0].idcumplimiento_uniforme,
        nombre: arregloEv[0].nombre,
        apepat: arregloEv[0].apellido_paterno,
        apemat: arregloEv[0].apellido_materno,
      };
    })
  );

  const resultadosCumplimientos = cumplimientosValor.map((arregloEv) => {
    const evaluacionEmpleado = arregloEv.map((el: any) => (el.cumple ? 1 : 0));
    const totalBuenas = calcularTotal(evaluacionEmpleado);
    const totalMalas = arregloEv.length - totalBuenas;

    return {
      cumplimiento: arregloEv[0].cumplimiento,
      arrelgo: arregloEv,
      puntosAcumulados: totalBuenas,
      puntosNoAcumulados: totalMalas,
    };
  });

  if (isError) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div>
      <SectionTitle
        titulo="Detalles reporte evaluación uniforme"
        subtitulo="Despacho"
      />
      <CintaOpciones
        onSubmit={(ev: SyntheticEvent) => {
          ev.preventDefault();
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
            />
          }
          isPending={false}
        />
        <Button buttonType="submit" text="Filtrar" />
      </CintaOpciones>
      <Loader isPending={isPending} />
      {!isPending && !isError && (
        <>
          <div className="stats shadow w-full stats-vertical lg:stats-horizontal mb-4">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <Icon icon="user" size="2x" />
              </div>
              <div className="stat-title">Despachador</div>
              <div className="stat-value text-wrap">{`${data.response[0].nombre} ${data.response[0].apellido_paterno} ${data.response[0].apellido_materno}`}</div>
              <div className="stat-desc">ID: {data.response[0].idempleado}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <Icon icon="list-check" size="2x" />
              </div>
              <div className="stat-title">Evaluaciones capturadas</div>
              <div className="stat-value">{fechas.length}</div>
              {/* <div className="stat-desc"></div> */}
            </div>
          </div>
          <Table
            id="tablaR"
            data={resultados}
            columns={[
              {
                name: "Fecha",
                selector: (el) => format.formatFecha(el[0].fecha),
              },
              ...cumplimientos.map((el) => ({
                name: el,
                selector: (data: any[]) => {
                  const indexOfElement = data.findIndex(
                    (cumplimiento) => cumplimiento.cumplimiento === el
                  );
                  if (indexOfElement >= 0) {
                    return data[indexOfElement].puntosAcumulados;
                  }

                  return "No aplica";
                },
              })),
              {
                name: "Total de puntos",
                selector: (el) =>
                  calcularTotal(el.map((el: any) => el.puntosAcumulados)),
              },
            ]}
          />
          <Bar
            id="chart-1"
            etiquetaX="Evaluaciones"
            etiquetaY="Puntos"
            title="Puntos buenos y malos"
            data={{
              datasets: [
                {
                  data: resultadosCumplimientos.map((el) => ({
                    x: el.cumplimiento,
                    y: el.puntosAcumulados,
                  })),
                  label: "Puntos correctos",
                },
                {
                  data: resultadosCumplimientos.map((el) => ({
                    x: el.cumplimiento,
                    y: el.puntosNoAcumulados,
                  })),
                  label: "Puntos incorrectos",
                },
              ],
            }}
          />
          <Bar
            id="chart-2"
            etiquetaX="Fechas"
            etiquetaY="Puntos"
            title="Puntos buenos y malos"
            data={{
              datasets: [
                {
                  data: resultados.map((el) => ({
                    x: format.formatFecha(el[0].fecha),
                    y: calcularTotal(el.map((evals) => evals.puntosAcumulados)),
                  })),
                  label: "Puntos",
                },
              ],
            }}
          />
        </>
      )}
    </div>
  );
};
export default ReporteEmpleadoEvUniforme;

import format from "@assets/format";
import {
  cumplimientosOyLInterface,
  reporteOyLInterface,
} from "@assets/interfaces";
import Button from "@components/Button";
import { SelectMonth, SelectYear } from "@components/forms/Select";
import CintaOpciones from "@components/gui/CintaOpciones";
import Loader from "@components/gui/Loader";
import SectionTitle from "@components/gui/SectionTitle";
import Icon from "@components/Icon";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import moment from "moment";
import { FC, SyntheticEvent, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Line from "@components/charts/Line";

interface reporteoyl extends getDataInterface {
  data: { response: { empleado: reporteOyLInterface } };
}
interface cumplimientos extends getDataInterface {
  data: { response: cumplimientosOyLInterface[] };
}
const ReporteEmpleadoOyL: FC = () => {
  const date = new Date(Date.now());
  const [filtros, setFiltros] = useState<{ mes?: number; year?: number }>({
    mes: moment(date).month() + 1,
    year: moment(date).year(),
  });
  const { idDespachador } = useParams();
  const { data, isError, isPending, refetch }: reporteoyl = useGetData(
    `ordenLimpieza/${filtros.year}/${filtros.mes}/${idDespachador}`,
    "reportEmpleadoOyL"
  );

  const cumplimientos: cumplimientos = useGetData(
    "ordenLimpieza/cumplimientos",
    "cumplmientosOyLData"
  );

  const evaluaciones =
    !cumplimientos.isError && !cumplimientos.isPending && !isError && !isPending
      ? cumplimientos.data.response.map((cumplimiento) => {
          const grouped = data.response.empleado.evaluaciones.map(
            (_ev, index) =>
              data.response.empleado.evaluaciones[index].filter(
                (el) =>
                  el.idoyl_cumplimiento === cumplimiento.idoyl_cumplimiento
              )[0]
          );

          return {
            cumplimiento: cumplimiento.cumplimiento,
            id: cumplimiento.idoyl_cumplimiento,
            grouped,
          };
        })
      : [];

  if (isError) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div>
      <SectionTitle
        titulo="Detalles de reporte de orden y limpieza"
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
        />
        <SelectYear
          label="Año"
          name="year"
          variable={filtros}
          setVariable={setFiltros}
        />
        <Button buttonType="submit" text="Filtrar" />
      </CintaOpciones>
      <Loader isPending={isPending && cumplimientos.isPending} />
      {!isError && !isPending && (
        <>
          <div className="stats shadow w-full stats-vertical lg:stats-horizontal mb-4">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <Icon icon="user" size="2x" />
              </div>
              <div className="stat-title">Despachador</div>
              <div className="stat-value text-wrap">{`${data.response.empleado.nombre} ${data.response.empleado.apellido_paterno} ${data.response.empleado.apellido_materno}`}</div>
              <div className="stat-desc">
                ID: {data.response.empleado.idchecador}
              </div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <Icon icon="list-check" size="2x" />
              </div>
              <div className="stat-title">Evaluaciones capturadas</div>
              <div className="stat-value">
                {data.response.empleado.evaluaciones.length}
              </div>
              {/* <div className="stat-desc"></div> */}
            </div>
          </div>
          <table className="table table-fixed table-xs lg:table-md">
            <thead>
              <tr>
                <th rowSpan={2}>Evaluación</th>
                {data.response.empleado.evaluaciones.map((el) => (
                  <th key={`${el[0].fecha} quincenas`}>
                    {format.obtenerDiaMes(el[0].fecha) < 16
                      ? "Quincena 1"
                      : "Quincena 2"}
                  </th>
                ))}
              </tr>
              <tr>
                {data.response.empleado.evaluaciones.map((el) => (
                  <th key={`${el[0].fecha} fechas`}>
                    {format.formatFecha(el[0].fecha)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {evaluaciones.map((el) => (
                <tr>
                  <td>{el.cumplimiento}</td>
                  {el.grouped.map((ev) => (
                    <td>
                      {ev ? (
                        ev.cumple ? (
                          <span className="text-success">
                            <Icon icon="check" size="2x" />
                          </span>
                        ) : (
                          <span className="text-error">
                            <Icon icon="xmark" size="2x" />
                          </span>
                        )
                      ) : (
                        <span className="text-success">No aplica</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Line
            etiquetaY="Cantidad de puntos obtenidos"
            etiquetaX="Evaluaciones"
            title={`Resumen de puntos obtenidos de orden y limpieza de ${data.response.empleado.nombre} `}
            data={{
              datasets: [
                {
                  data: evaluaciones.map((el) => ({
                    x: `${el.id};${el.cumplimiento} `,
                    y: el.grouped.reduce((a, b) => {
                      if (b === undefined) {
                        return a + 1;
                      }
                      return b.cumple ? a + 1 : a;
                    }, 0),
                  })),
                  label: "Puntos correctos",
                  backgroundColor: "green",
                  borderColor: "green",
                },
                {
                  data: evaluaciones.map((el) => ({
                    x: `${el.id};${el.cumplimiento} `,
                    y: el.grouped.reduce((a, b) => {
                      if (b && !b.cumple) {
                        return a + 1;
                      }
                      return a;
                    }, 0),
                  })),
                  label: "Puntos incorrectos",
                  backgroundColor: "red",
                  borderColor: "red",
                },
              ],
            }}
            legend
          />
        </>
      )}
    </div>
  );
};
export default ReporteEmpleadoOyL;

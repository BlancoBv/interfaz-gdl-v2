import agruparArr from "@assets/agruparArr";
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
import { getDataInterface, useGetData } from "@hooks/useGetData";
import moment from "moment";
import { FC, SyntheticEvent, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

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
                  <td>{ev ? (ev.cumple ? 1 : 0) : "No aplica"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ReporteEmpleadoOyL;

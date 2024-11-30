import { FC, SyntheticEvent, useMemo, useReducer } from "react";
import moment from "moment";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import { SNC } from "@assets/interfaces";
import CintaOpciones from "@components/gui/CintaOpciones";
import Button from "@components/Button";
import { InputFecha } from "@components/forms/Input";
import reducerFiltersFunctionSNC from "../archivos/assets/ReducerFiltersFunctionSNC.ts";
import SectionTitle from "@components/gui/SectionTitle";
import {
  SelectDepartamentos,
  SelectMonth,
  SelectYear,
} from "@components/forms/Select.tsx";
import TableSNCIyE from "./TableSNCIyE.tsx";
import Bar from "@components/charts/Bar.tsx";
import agruparArr from "@assets/agruparArr.ts";

interface reporte extends getDataInterface {
  data: { response: SNC[] };
}

const GIyE: FC = () => {
  const cacheFiltros = sessionStorage.getItem("reporteSNCFiltros");
  const parsedFiltros = cacheFiltros
    ? JSON.parse(cacheFiltros)
    : {
        year: "",
        month: "",
        idEmpleado: "",
        fechaI: moment().startOf("month").format("YYYY-MM-DD"),
        fechaF: moment().endOf("month").format("YYYY-MM-DD"),
        folio: "",
        etapa: "",
        idIncumplimiento: "",
        idDepartamento: "1",
        filtro: 2,
      };

  const [filtros, setFiltros] = useReducer(
    reducerFiltersFunctionSNC,
    parsedFiltros
  );

  const handleFilter = (ev: SyntheticEvent) => {
    ev.preventDefault();
    sessionStorage.setItem("reporteSNCFiltros", JSON.stringify(filtros));
    refetch();
  };

  const { data, isError, isPending, refetch }: reporte = useGetData(
    `/snc/snc/registros?year=${filtros.year}&month=${
      filtros.month
    }&idEmpleado=${filtros.idEmpleado || ""}&idIncumplimiento=${
      filtros.idIncumplimiento || ""
    }&fechaI=${filtros.fechaI}&fechaF=${filtros.fechaF}&folio=${
      filtros.folio
    }&idDepartamento=${filtros.idDepartamento}`,
    "reporteSNCData"
  );

  const res = useMemo(
    () => (!isError && !isPending ? data.response : []),
    [data, isPending, isError]
  );

  const incumplimientosSnc = agruparArr(
    res,
    (e) => e.incumplimiento.incumplimiento
  ).keysAndValue;

  const empleadosSnc = agruparArr(res, (e) => e.idempleado).keysAndValue;

  const siglasInc = incumplimientosSnc
    .map((inc) =>
      inc.key
        .split(" ")
        .filter((w: string) => w.match(/\b(?!(?:DEL|DE|A)\b)\w{3,}\b/g))
        .map((w: string) => w.charAt(0))
        .join("")
    )
    .map((sigla, i) => ({
      sigla,
      incumplimiento: incumplimientosSnc[i].key,
      cantidad: incumplimientosSnc[i].value.length,
    }));

  return (
    <div>
      <div className="w-full">
        <SectionTitle
          titulo="Gráfica Incumplimientos y Empleados"
          subtitulo="Salidas no conformes"
        />

        <CintaOpciones onSubmit={handleFilter}>
          {filtros.filtro === 1 && (
            <>
              <SelectMonth
                label="Mes de consulta"
                name="month"
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
            </>
          )}
          {(filtros.filtro === 2 || filtros.filtro === 4) && (
            <>
              <InputFecha
                label="Fecha inicial"
                name="fechaI"
                variable={filtros}
                setVariable={setFiltros}
                required
              />
              <InputFecha
                label="Fecha final"
                name="fechaF"
                variable={filtros}
                setVariable={setFiltros}
                required
              />
            </>
          )}
          <SelectDepartamentos
            variable={filtros}
            setVariable={setFiltros}
            name="idDepartamento"
          />

          <Button buttonType="submit" text="Filtrar" />
        </CintaOpciones>
      </div>
      <div>
        <TableSNCIyE
          empleadosSnc={empleadosSnc}
          siglasInc={siglasInc}
          data={res}
        />
      </div>
      <div>
        <Bar
          data={{
            labels: siglasInc.map((inc) => inc.sigla),
            datasets: [
              {
                data: siglasInc.map((inc) => inc.cantidad),
                backgroundColor: "#ef4444",
                label: "Cantidad",
              },
            ],
          }}
          title="Incumplimientos"
          etiquetaX="Cantidad"
          etiquetaY="Empleados"
          omitDatalabelOnIndex={1}
          onClick={(e, r, t, y) => {
            console.log("hola", e, r, t, y);
          }}
          // ticksYCallback={(value) => "$" + value}
        />
      </div>
    </div>
  );
};

export default GIyE;

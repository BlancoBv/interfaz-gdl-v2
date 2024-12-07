import { FC, SyntheticEvent, useMemo, useReducer, useState } from "react";
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
import Line from "@components/charts/Line.tsx";
import agruparArr from "@assets/agruparArr.ts";
import Modal from "@components/gui/Modal.tsx";
import { useModal } from "@hooks/useModal.ts";
import { ColumnDef } from "@tanstack/react-table";
import DinamicTable from "@components/TableClientRendering";
import BtnPdfSnc from "../archivos/components/BtnPdfSnc.tsx";
import { useNavigate } from "react-router-dom";

interface reporte extends getDataInterface {
  data: { response: SNC[]; puntajeMinimo: number };
}

const GIyE: FC = () => {
  const [sncMInformation, setSncMInformation] = useState<SNC[]>([]);
  const modalSNCInc = useModal("modalSNCInc");
  const cacheFiltros = sessionStorage.getItem("reporteSNCFiltrosDataEmpleado");
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

  const navigate = useNavigate();

  const handleFilter = (ev: SyntheticEvent) => {
    ev.preventDefault();
    sessionStorage.setItem(
      "reporteSNCFiltrosDataEmpleado",
      JSON.stringify(filtros)
    );
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
    "reporteSNCDataChart"
  );

  const res = useMemo(
    () => (!isError && !isPending ? data.response : []),
    [data, isPending, isError]
  );

  const PM = useMemo(
    () => (!isError && !isPending ? data.puntajeMinimo : 0),
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
        <Line
          data={{
            labels: siglasInc.map(
              (inc) => `${inc.incumplimiento};${inc.sigla}`
            ),
            datasets: [
              {
                type: "bar",
                data: siglasInc.map((inc) => inc.cantidad),
                metaData: incumplimientosSnc,
                backgroundColor: "#0ea5e9",
                label: "Cantidad",
              },
            ],
          }}
          title="Incumplimientos"
          etiquetaX="Incumplimientos"
          etiquetaY="Cantidad"
          linesHorizontal={[
            {
              y: PM,
              color: "#b91c1c",
              text: `SNC: ${PM}`,
              dashed: true,
            },
          ]}
          onClick={(element: any, index: number) => {
            setSncMInformation(element.metaData[index].value);

            modalSNCInc.show();
          }}
        />
        <Line
          data={{
            labels: empleadosSnc.map(
              (emp) =>
                emp.value[0].empleado.nombre +
                " " +
                emp.value[0].empleado.apellido_paterno.charAt(0) +
                "."
            ),
            datasets: [
              {
                type: "bar",
                data: empleadosSnc.map((emp) => emp.value.length),
                metaData: empleadosSnc.map((emp) => emp.key),
                backgroundColor: "#ef4444",
                label: "Cantidad",
              },
            ],
          }}
          title="Empleados"
          etiquetaX="Empleados"
          etiquetaY="Cantidad"
          onClick={(data, index) => {
            navigate(data.metaData[index]);
          }}
        />
      </div>
      <ModalSnc data={sncMInformation} />
    </div>
  );
};

export const ModalSnc: FC<{ data: SNC[] }> = ({ data }) => {
  console.log(data);

  const columns = useMemo<ColumnDef<SNC>[]>(
    () => [
      {
        accessorFn: (row) => row.idsalida_noconforme,
        id: "folio",
        header: () => <span>Folio</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => moment(row.fecha).format("DD/MM/YYYY"),
        id: "fecha",
        header: () => <span>Fecha</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.empleado.nombre_completo,
        id: "empleado",
        header: () => <span>Empleado</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.incumplimiento.incumplimiento,
        id: "incumplimiento",
        header: () => <span>Incumplimiento</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => <BtnPdfSnc data={row} />,
        id: "pdfsnc",
        header: () => <span>Incumplimiento</span>,
        cell: (info) => info.getValue(),
      },
    ],
    []
  );
  return (
    <Modal id="modalSNCInc" title="Salidas no conformes">
      <DinamicTable columns={columns} data={data} noDataMsg={"Sin SNC"} />
    </Modal>
  );
};

export default GIyE;

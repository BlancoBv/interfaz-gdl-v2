import agruparArr from "@assets/agruparArr";
import { SNC } from "@assets/interfaces";
import Button from "@components/Button";
import { InputFecha } from "@components/forms/Input";
import {
  Select,
  SelectEmpleado,
  SelectMonth,
  SelectYear,
} from "@components/forms/Select";
import CintaOpciones from "@components/gui/CintaOpciones";
import SectionTitle from "@components/gui/SectionTitle";
import DinamicTable from "@components/TableClientRendering";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { SyntheticEvent, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Line from "@components/charts/Line.tsx";
import { meses } from "@assets/misc";
import calcularTotal from "@assets/calcularTotal";
import { useModal } from "@hooks/useModal";
import { ModalSnc } from "./GIyE";

interface reporte extends getDataInterface {
  data: { response: SNC[]; puntajeMinimo: number };
}

interface interfaceFiltros {
  idEmpleado: string | undefined;
  fechaI: string;
  fechaF: string;
  month: string;
  year: string;
  filtro: number;
}

const GIyExID = () => {
  const { idEmpleado } = useParams();
  const filtrosDefault = {
    idEmpleado: idEmpleado,
    fechaI: "",
    fechaF: "",
    month: "",
    year: "",
    filtro: 2,
  };
  const [sncMInformation, setSncMInformation] = useState<SNC[]>([]);
  const modalSNCInc = useModal("modalSNCInc");

  const cacheFiltros = sessionStorage.getItem("reporteSNCFiltrosDataEmpleado");
  const parsedFiltros: interfaceFiltros = cacheFiltros
    ? JSON.parse(cacheFiltros)
    : filtrosDefault;

  const [filtros, setFiltros] = useState<interfaceFiltros>({
    ...parsedFiltros,
    idEmpleado,
  });

  const { data, isError, isPending, refetch }: reporte = useGetData(
    `/snc/snc/registros?year=${filtros.year}&month=${
      filtros.month
    }&idEmpleado=${filtros.idEmpleado || ""}&fechaI=${filtros.fechaI}&fechaF=${
      filtros.fechaF
    }`,
    "reporteSNCDataEmpleado" + idEmpleado
  );

  const res = data ? data.response : [];

  const handleFilter = (ev: SyntheticEvent) => {
    ev.preventDefault();
    sessionStorage.setItem(
      "reporteSNCFiltros",
      JSON.stringify({ ...parsedFiltros, ...filtros, idEmpleado: "" })
    );
    refetch();
  };

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorFn: (row) => row.key,
        id: "incumplimiento",
        header: () => <span>Incumplimiento</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.value.length,
        id: "frecuencia",
        header: () => <span>Frecuencia</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.value.length,
        id: "estatus",
        header: () => <span>Estatus</span>,
        cell: (info) =>
          (info.getValue() as number) > 1 ? "Critico" : "Ordinario",
        meta: {
          classNameCell: (row) => (row > 1 ? "bg-error" : "bg-success"),
        },
      },
    ],
    []
  );

  const frecuencias = agruparArr(
    res,
    (e) => e.incumplimiento.incumplimiento
  ).keysAndValue;

  return (
    <div>
      <div className="w-full print:!hidden">
        <SectionTitle
          titulo="Detalles de empleado"
          subtitulo="Salidas no conformes"
        />

        <CintaOpciones onSubmit={handleFilter}>
          <SelectEmpleado
            name="idEmpleado"
            variable={filtros}
            setVariable={setFiltros}
            departamento="all"
            label="Empleado"
          />
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
          <Select
            label="Fechas"
            variable={filtros}
            setVariable={setFiltros}
            name="filtro"
            placeholder=""
            options={[
              {
                label: "Mensual",
                value: 1,
              },
              {
                label: "Rango fecha",
                value: 2,
              },
            ]}
          />

          <Button buttonType="submit" text="Filtrar" />
        </CintaOpciones>
      </div>
      <div>
        <div className="w-1/2 mx-auto">
          <p className="text-center">
            <span className="font-bold">EMPLEADO:</span>{" "}
            <span className="font-semibold text-error">
              {res.length > 0 ? res[0].empleado.nombre_completo : ""}
            </span>
          </p>
          {filtros.filtro === 2 ? (
            <p className="text-center">
              Del{" "}
              <span className="text-error font-semibold">
                {moment(filtros.fechaI).format("DD/MM/YYYY")}
              </span>{" "}
              al{" "}
              <span className="text-error font-semibold">
                {moment(filtros.fechaF).format("DD/MM/YYYY")}
              </span>
            </p>
          ) : (
            <p className="text-center">
              Mes:{" "}
              <span className="text-error font-semibold">
                {filtros.month && meses[Number(filtros.month)].mes} del{" "}
                {filtros.year}
              </span>
            </p>
          )}
          <div className="bg-neutral p-2 text-white font-semibold text-xl">
            <p className="text-center">General</p>
          </div>
          <DinamicTable
            columns={columns}
            data={frecuencias}
            TfootChildren={
              <tr className="bg-neutral">
                <td className="text-white text-md">Total</td>
                <td className="text-white text-md" colSpan={2}>
                  {calcularTotal(frecuencias.map((f) => f.value.length))}
                </td>
              </tr>
            }
          />
        </div>
      </div>
      <div>
        <div>
          <Line
            logaritmic
            data={{
              labels: frecuencias.map((f) =>
                frecuencias.length > 10 ? f.key : f.key.split(" ")
              ),
              datasets: [
                {
                  type: "bar",
                  label: "Cantidad",
                  backgroundColor: frecuencias.map((f) =>
                    f.value.length > 1 ? "#f4545d" : "#009a64"
                  ),
                  data: frecuencias.map((f) => f.value.length),
                  metaData: frecuencias,
                },
              ],
            }}
            title="Incumplimientos"
            etiquetaX="Incumplimientos"
            etiquetaY="Cantidad"
            linesHorizontal={[
              { y: 2, color: "red", text: "Crítico", dashed: true },
            ]}
            onClick={(element: any, index: number) => {
              setSncMInformation(element.metaData[index].value);

              modalSNCInc.show();
            }}
          />
        </div>
      </div>
      <ModalSnc data={sncMInformation} />
    </div>
  );
};

export default GIyExID;

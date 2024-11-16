import { FC, SyntheticEvent, useMemo, useReducer, useState } from "react";
import {
  Select,
  SelectEmpleado,
  SelectIncumplimientos,
  SelectMonth,
  SelectYear,
} from "@components/forms/Select";
import moment from "moment";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import { SNC } from "@assets/interfaces";
import CintaOpciones from "@components/gui/CintaOpciones";
import Button from "@components/Button";
import TableSNC from "./TableSNC";
import { Input, InputFecha } from "@components/forms/Input";
import reducerFiltersFunctionSNC from "./assets/ReducerFiltersFunctionSNC";
import SectionTitle from "@components/gui/SectionTitle";
import DataSNC from "./components/ProviderSNC";
import ModalEditSnc from "./components/ModalEditSNC";
import { SNCParseToForm } from "../Index.tsx";

interface reporte extends getDataInterface {
  data: { response: SNC[] };
}

const Archivos: FC = () => {
  const [sncSelect, setSncSelect] = useState<SNCParseToForm>(null);
  const cacheFiltros = sessionStorage.getItem("reporteSNCFiltros");
  const parsedFiltros = cacheFiltros
    ? JSON.parse(cacheFiltros)
    : {
        year: moment().year(),
        month: moment().month() + 1,
        idEmpleado: "",
        fechaI: "",
        fechaF: "",
        folio: "",
        etapa: "",
        idIncumplimiento: "",
        filtro: 1,
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
    }&fechaI=${filtros.fechaI}&fechaF=${filtros.fechaF}&folio=${filtros.folio}`,
    "reporteSNCData"
  );

  const res = useMemo(
    () => (!isError && !isPending ? data.response : []),
    [data, isPending, isError]
  );

  return (
    <DataSNC.Provider value={{ sncSelect, setSncSelect }}>
      <div className="w-full">
        <SectionTitle
          titulo="Archivos Salidas No Conformes"
          subtitulo="Salidas no conformes"
        />

        <CintaOpciones onSubmit={handleFilter}>
          {(filtros.filtro === 1 ||
            filtros.filtro === 2 ||
            filtros.filtro === 4) && (
            <SelectEmpleado
              name="idEmpleado"
              setVariable={setFiltros}
              variable={filtros}
              label="Empleado"
              estatus={[]}
              departamento="all"
            />
          )}
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
          {filtros.filtro === 3 && (
            <Input
              label="Folio de la SNC"
              name="folio"
              inputType="number"
              step={1}
              variable={filtros}
              setVariable={setFiltros}
              required={false}
            />
          )}
          {filtros.filtro != 3 && (
            <SelectIncumplimientos
              name="idIncumplimiento"
              variable={filtros}
              setVariable={setFiltros}
              // required
            />
          )}
          <Select
            label="más filtros 🜄"
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
              {
                label: "Folio",
                value: 3,
              },
            ]}
          />

          <Button buttonType="submit" text="Filtrar" />
        </CintaOpciones>

        {isPending ? (
          <h2 className="text-2xl text-center fa-bounce mt-2 w-1/2 mx-auto">
            Cargado ...
          </h2>
        ) : (
          <TableSNC data={res} />
        )}
        <ModalEditSnc refetch={refetch} />
      </div>
    </DataSNC.Provider>
  );
};

export default Archivos;

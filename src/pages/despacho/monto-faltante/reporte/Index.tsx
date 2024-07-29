import { FC, SyntheticEvent, useState } from "react";
import SectionTitle from "../../../../components/gui/SectionTitle";
import CintaOpciones from "../../../../components/gui/CintaOpciones";
import { useGetData } from "../../../../hooks/useGetData";
import { SelectMonth, SelectYear } from "../../../../components/forms/Select";
import Loader from "../../../../components/gui/Loader";
import moment from "moment";

const Index: FC = () => {
  const date = moment(new Date(Date.now()));
  const item = sessionStorage.getItem("reporteMFFilter");
  const parsed = item
    ? JSON.parse(item)
    : {
        month: String(date.date()),
        year: String(date.year()),
      };
  const [body, setBody] = useState<{ month?: string; year?: string }>(parsed);

  const { data, isPending, isFetching, refetch } = useGetData(
    `monto-faltante-despachador/semanas/${body.year}/${body.month}`,
    "reporteMF"
  );

  const filtrar = (ev: SyntheticEvent) => {
    ev.preventDefault();
    refetch();
    sessionStorage.setItem("reporteMFFilter", JSON.stringify(body));
  };

  return (
    <div className="flex flex-col">
      <SectionTitle
        titulo="Reporte de montos faltantes mensual"
        subtitulo="Despacho"
      />
      <CintaOpciones onSubmit={filtrar}>
        <SelectMonth
          name="month"
          variable={body}
          setVariable={setBody}
          label="Mes de consulta"
        />
        <SelectYear
          name="year"
          variable={body}
          setVariable={setBody}
          label="Año de consulta"
        />
        <button className="btn btn-primary" type="submit">
          Filtrar
        </button>
      </CintaOpciones>
      <Loader isPending={isPending} isFetching={isFetching} />
    </div>
  );
};

export default Index;

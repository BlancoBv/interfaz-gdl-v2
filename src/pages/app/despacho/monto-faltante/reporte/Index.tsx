import { FC, SyntheticEvent, useState } from "react";
import SectionTitle from "../../../../../components/gui/SectionTitle";
import CintaOpciones from "../../../../../components/gui/CintaOpciones";
import { useGetData } from "../../../../../hooks/useGetData";
import {
  SelectMonth,
  SelectYear,
} from "../../../../../components/forms/Select";
import Loader from "../../../../../components/gui/Loader";
import moment from "moment";
import format from "../../../../../assets/format";
import Modal from "../../../../../components/gui/Modal";
import Bar from "../../../../../components/charts/Bar";
import NoData from "../../../../../components/gui/NoData";

const Index: FC = () => {
  const date = moment(new Date(Date.now()));
  const item = sessionStorage.getItem("reporteMFFilter");
  const parsed = item
    ? JSON.parse(item)
    : {
        month: String(date.month() + 1),
        year: String(date.year()),
      };
  const [body, setBody] = useState<{ month?: string; year?: string }>(parsed);

  const { data, isPending, isFetching, refetch, isError } = useGetData(
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
      {!isPending && !isFetching && !isError && (
        <Success data={data} filtros={body} />
      )}
      <NoData isError={isError} isFetching={isFetching} isPending={isPending} />
    </div>
  );
};

const Success: FC<{
  data: {
    montoTotalMes: number;
    totalSemanas: number;
    response: {
      nombre_completo: string;
      total: number;
      idempleado: number;
      semanas: {
        cantidad: number;
        diaEmpiezo: string;
        diaTermino: string;
        semana: number;
      }[];
    }[];
  };
  filtros: { month?: string; year?: string };
}> = ({ data, filtros }) => {
  const [relativeData, setRelativeData] = useState<{ idempleado?: number }>({});
  const {
    data: empleadoData,
    isFetching,
    isPending,
    isError,
  } = useGetData(
    `/monto-faltante-despachador/total-mes-empleado/${filtros.year}/${filtros.month}/${relativeData.idempleado}`,
    "detalleMFDesp",
    { fetchInURLChange: true }
  );
  const dataBar = {
    labels: data.response.map((el) => el.nombre_completo.split(" ")[0]),
    datasets: data.response[0].semanas.map((_el, i) => ({
      data: data.response.map((eld) => eld.semanas[i].cantidad),
      nombreC: data.response.map((el) => el.nombre_completo),
      label: `Semana ${i + 1}`,
    })),
  };

  const dataBarDetalles =
    !isPending && !isFetching && !isError
      ? {
          labels: empleadoData.response.map((el: { fecha: string }) =>
            format.obtenerDiaMes(el.fecha)
          ),
          datasets: [
            {
              data: empleadoData.response.map(
                (el: { cantidad: number; fecha: string }) => el.cantidad
              ),
              label: moment(empleadoData.response[0].fecha).format(
                "MMMM YYYY "
              ),
            },
          ],
        }
      : {};

  return (
    <div>
      <Modal id="detallesDesp" title="Detalle monto faltante despachador">
        <Loader isFetching={isFetching} isPending={isPending} />
        {!isPending && !isFetching && !isError && (
          <div>
            <h3>{empleadoData.response[0].nombre_completo}</h3>

            <table className="table table-fixed table-xs lg:table-md mb-4 ">
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Fecha</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {empleadoData.response.map(
                  (el: { fecha: string; cantidad: number }, index: number) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{moment(el.fecha).format("LL")}</td>
                      <td>{format.formatDinero(el.cantidad)}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <Bar
              etiquetaY="Cantidad en pesos"
              etiquetaX="Días del mes"
              data={dataBarDetalles}
              title={empleadoData.response[0].nombre_completo}
              ticksYCallback={(value) => `$${value}`}
            />
          </div>
        )}
      </Modal>
      <table className="table table-fixed table-xs lg:table-md">
        <thead>
          <tr>
            <th className="text-wrap">Nombre</th>
            {data.response[0].semanas.map((el) => (
              <th key={`Semana ${el.semana}`} className="text-wrap">
                <span className="font-bold">Semana {el.semana}</span>
                <br />
                {format.obtenerDiaMes(el.diaEmpiezo)} al{" "}
                {format.obtenerDiaMes(el.diaTermino)} de{" "}
                {format.obtenerMes(el.diaEmpiezo, "largo")}
              </th>
            ))}
            <th className="text-wrap">Monto mensual</th>
          </tr>
        </thead>
        <tbody>
          {data.response.map((el) => (
            <tr
              key={el.idempleado}
              className="hover cursor-pointer"
              onClick={() => {
                setRelativeData((prev) => ({
                  ...prev,
                  idempleado: el.idempleado,
                }));

                (
                  document.getElementById("detallesDesp") as HTMLDialogElement
                ).showModal();
                //refetch();
              }}
            >
              <td>{el.nombre_completo}</td>
              {el.semanas.map((se) => (
                <td key={se.semana}>
                  {se.cantidad > 0 ? format.formatDinero(se.cantidad) : null}{" "}
                </td>
              ))}
              <td>{format.formatDinero(el.total)}</td>
            </tr>
          ))}
          <tr>
            <th colSpan={data.totalSemanas + 1}></th>
            <th className="bg-error font-bold">
              {format.formatDinero(data.montoTotalMes)}
            </th>
          </tr>
        </tbody>
      </table>
      <Bar
        title="Grafica semanal de monto faltante"
        data={dataBar}
        legend
        etiquetaX="Despachadores"
        etiquetaY="Cantidad en pesos"
        ticksYCallback={(value) => `$${value}`}
      />
    </div>
  );
};
export default Index;

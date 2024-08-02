import { FC, SyntheticEvent, useEffect, useState } from "react";
import CintaOpciones from "../../../../components/gui/CintaOpciones";
import {
  SelectMonth,
  Select,
  SelectYear,
} from "../../../../components/forms/Select";
import moment from "moment";
import agruparArr from "../../../../assets/agruparArr";
import calcularTotal from "../../../../assets/calcularTotal";
import Decimal from "decimal.js-light";
import Bar from "../../../../components/charts/Bar";
import { useNavigate } from "react-router-dom";
import { useGetData } from "../../../../hooks/useGetData";
import Loader from "../../../../components/gui/Loader";
import NoData from "../../../../components/gui/NoData";
import SectionTitle from "../../../../components/gui/SectionTitle";

const Index: FC = () => {
  const date = moment(new Date(Date.now()));
  const item = sessionStorage.getItem("boletasData");
  const parsed = item
    ? JSON.parse(item)
    : {
        quincena: date.date() > 15 ? "2" : "1",
        year: String(date.year()),
        month: String(date.month()),
      }; //obtiene el valor guardado en la sesion para el filtro

  const [body, setBody] = useState<{
    month?: string;
    year?: string;
    quincena?: string;
  }>(parsed);

  const { data, isPending, isFetching, refetch } = useGetData(
    `view/boletas/all?year=${body.year}&month=${body.month}&quincena=${body.quincena}`,
    "boletasData"
  );

  const filtrar = async (e: SyntheticEvent) => {
    e.preventDefault();
    refetch();
    sessionStorage.setItem("boletasData", JSON.stringify(body));
  };

  return (
    <div className="flex flex-col">
      <SectionTitle
        titulo="Resumen de boletas de despachador"
        subtitulo="Despacho"
      />
      <CintaOpciones onSubmit={filtrar}>
        <Select
          name="quincena"
          label="Quincena"
          placeholder="Selecciona quincena"
          variable={body}
          setVariable={setBody}
          required
        >
          <option value="1">Primera quincena</option>
          <option value="2">Segunda quincena</option>
        </Select>
        <SelectMonth
          name="month"
          label="Mes de consulta"
          setVariable={setBody}
          variable={body}
          required
        />
        <SelectYear
          name="year"
          label="Año de consulta"
          setVariable={setBody}
          variable={body}
          required
        />
        <button className="btn btn-primary" type="submit">
          Filtrar
        </button>
      </CintaOpciones>
      {!isPending && !isFetching && data.response.ck.length > 0 && (
        <Success data={data.response} filtros={body} />
      )}
      {!isPending && !isFetching && data.response.ck.length === 0 && <NoData />}
      <Loader isFetching={isFetching} isPending={isPending} />
    </div>
  );
};

const Success: FC<{
  data: any;
  filtros: {
    month?: string;
    year?: string;
    quincena?: string;
  };
}> = ({ data, filtros }) => {
  const navigate = useNavigate();
  const { empleados, mf, ck, eu, pd, rd, oyl, snc } = data;

  const buscarIdEmpleado = [...mf, ...ck, ...eu, ...pd, ...rd, ...oyl, ...snc];

  const { keys: idEmpleados } = agruparArr(
    buscarIdEmpleado,
    (e) => e.idempleado
  );

  const rendimiento = idEmpleados
    .map((id) => {
      const empleado = empleados.find(
        (emp: any) => emp.idempleado === Number(id)
      );

      const calcularMF = () => {
        const filtrar = mf.filter((el: any) => el.idempleado === Number(id));
        const cantidad = calcularTotal(filtrar, "cantidad");
        return cantidad > 0 ? 0 : 1;
      };

      const calcularCk = () => {
        const filtrar = ck.filter((el: any) => el.idempleado === Number(id));
        const cantidad = filtrar.length;
        return cantidad >= 12 ? 1 : 0;
      };

      const calcularEv = () => {
        const filtrar = eu.filter((el: any) => el.idempleado === Number(id));
        const totalBuenas = filtrar.filter((el: any) => el.cumple).length;
        const total = filtrar.length;
        const promedio =
          total > 0 ? new Decimal(totalBuenas).div(total).toNumber() : 0;
        return promedio >= 0.8 ? 1 : 0;
      };

      const calcularPd = () => {
        const filtrar = pd.filter((el: any) => el.idempleado === Number(id));
        const totalBuenas = filtrar.filter((el: any) => el.evaluacion).length;
        const total = filtrar.length;
        const promedio =
          total > 0 ? new Decimal(totalBuenas).div(total).toNumber() : 0;
        return promedio >= 0.8 ? 1 : 0;
      };

      const calcularRd = () => {
        const filtrar = rd.filter((el: any) => el.idempleado === Number(id));
        const totalBuenas = filtrar.filter((el: any) => el.evaluacion).length;
        const total = filtrar.length;
        const promedio =
          total > 0 ? new Decimal(totalBuenas).div(total).toNumber() : 0;
        return promedio >= 0.9 ? 1 : 0;
      };

      const calcularOyL = () => {
        const filtrar = oyl.filter((el: any) => el.idempleado === Number(id));
        const totalBuenas = filtrar.filter((el: any) => el.cumple).length;
        const total = filtrar.length;
        const promedio =
          total > 0 ? new Decimal(totalBuenas).div(total).toNumber() : 0;
        return promedio >= 0.9 ? 1 : 0;
      };

      const calcularSNC = () => {
        const filtrar = snc.filter((el: any) => el.idempleado === Number(id));
        return filtrar <= 3 ? 1 : 0;
      };

      const puntosAcumulados =
        calcularMF() +
        calcularCk() +
        calcularEv() +
        calcularPd() +
        calcularRd() +
        calcularOyL() +
        calcularSNC();

      return { empleado, puntosAcumulados };
    })
    .filter((emp) => emp.empleado);

  const dataBar = {
    labels: rendimiento.map((emp) => emp.empleado.nombre.split(" ")[0]),
    datasets: [
      {
        label: "Puntos",
        data: rendimiento.map((emp) => emp.puntosAcumulados),
        empleados: rendimiento,
        minBarLength: 5,
      },
    ],
    /* optionPlugin: {
      tooltip: {
        usePointStyle: true,
        callbacks: {
          title: (context) => {
            const { nombre_completo } =
              context[0].dataset.empleados[context[0].dataIndex].empleado;
            return nombre_completo;
          },
        },
      },
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
      },
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 7,
          title: {
            text: "Puntos",
            display: true,
          },
          ticks: { stepSize: 1 },
        },
        x: {
          title: {
            text: "Despachadores",
            display: true,
          },
        },
      },
    }, */
  };
  const detallesBoleta = (dataset: any, element: any) => {
    const idEmpleado = dataset.empleados[element].empleado.idempleado;
    console.log(idEmpleado);

    navigate(
      `${idEmpleado}?year=${filtros.year}&month=${filtros.month}&quincena=${filtros.quincena}`,
      {
        state: {
          idEmpleado,
        },
      }
    );
  };

  return (
    <div>
      <Bar
        data={dataBar}
        title="Boletas de despachadores"
        onClick={detallesBoleta}
        etiquetaY="Puntos"
        etiquetaX="Despachadores"
      />
    </div>
  );
};

export default Index;

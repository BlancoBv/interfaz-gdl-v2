import { FC, SyntheticEvent, useState } from "react";
import { useGetData } from "../../../hooks/useGetData";
import CintaOpciones from "../../../components/gui/CintaOpciones";
import {
  SelectMonth,
  Select,
  SelectYear,
} from "../../../components/forms/Select";
import moment from "moment";
import agruparArr from "../../../assets/agruparArr";

const Index: FC = () => {
  const date = moment(new Date(Date.now()));
  const [body, setBody] = useState<{
    month?: string;
    year?: string;
    quincena?: string;
  }>({
    quincena: date.day() > 15 ? "2" : "1",
    year: String(date.year()),
    month: String(date.month()),
  });
  const { data, isPending, error, trigger } = useGetData(
    `view/boletas/all?year=${body.year}&month=${body.month}&quincena=${body.quincena}`,
    false
  );

  const filtrar = async (e: SyntheticEvent) => {
    e.preventDefault();
    trigger();
  };

  return (
    <div className="flex flex-col">
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
      {!isPending && !error && <Success data={data?.response} />}
    </div>
  );
};

const Success: FC<{ data: any }> = ({ data }) => {
  const { empleados, mf, ck, eu, pd, rd, oyl, snc } = data;

  const buscarIdEmpleado = [...mf, ...ck, ...eu, ...pd, ...rd, ...oyl, ...snc];

  const { keys: idEmpleados } = agruparArr(
    buscarIdEmpleado,
    (e) => e.idempleado
  );

  console.log(idEmpleados);

  const rendimiento = idEmpleados
    .map((id) => {
      const empleado = empleados.find((emp) => emp.idempleado === Number(id));

      const calcularMF = () => {
        const filtrar = mf.filter((el) => el.idempleado === Number(id));
        const cantidad = calcularTotal(filtrar, "cantidad");
        return cantidad > 0 ? 0 : 1;
      };

      const calcularCk = () => {
        const filtrar = ck.filter((el) => el.idempleado === Number(id));
        const cantidad = filtrar.length;
        return cantidad >= 12 ? 1 : 0;
      };

      const calcularEv = () => {
        const filtrar = eu.filter((el) => el.idempleado === Number(id));
        const totalBuenas = filtrar.filter((el) => el.cumple).length;
        const total = filtrar.length;
        const promedio =
          total > 0 ? new Decimal(totalBuenas).div(total).toNumber() : 0;
        return promedio >= 0.8 ? 1 : 0;
      };

      const calcularPd = () => {
        const filtrar = pd.filter((el) => el.idempleado === Number(id));
        const totalBuenas = filtrar.filter((el) => el.evaluacion).length;
        const total = filtrar.length;
        const promedio =
          total > 0 ? new Decimal(totalBuenas).div(total).toNumber() : 0;
        return promedio >= 0.8 ? 1 : 0;
      };

      const calcularRd = () => {
        const filtrar = rd.filter((el) => el.idempleado === Number(id));
        const totalBuenas = filtrar.filter((el) => el.evaluacion).length;
        const total = filtrar.length;
        const promedio =
          total > 0 ? new Decimal(totalBuenas).div(total).toNumber() : 0;
        return promedio >= 0.9 ? 1 : 0;
      };

      const calcularOyL = () => {
        const filtrar = oyl.filter((el) => el.idempleado === Number(id));
        const totalBuenas = filtrar.filter((el) => el.cumple).length;
        const total = filtrar.length;
        const promedio =
          total > 0 ? new Decimal(totalBuenas).div(total).toNumber() : 0;
        return promedio >= 0.9 ? 1 : 0;
      };

      const calcularSNC = () => {
        const filtrar = snc.filter((el) => el.idempleado === Number(id));
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
    dataset: [
      {
        label: "Puntos",
        data: rendimiento.map((emp) => emp.puntosAcumulados),
        empleados: rendimiento,
        minBarLength: 5,
      },
    ],
    optionPlugin: {
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
    },
  };
  return <div></div>;
};

export default Index;

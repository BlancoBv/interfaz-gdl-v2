import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../../components/gui/SectionTitle";
import Icon from "../../../../components/Icon";
import format from "../../../../assets/format";
import { meses } from "../../../../assets/misc";

const Index: FC = () => {
  const { data, filtros }: any = useLoaderData();

  console.log(data);

  return (
    <div className="flex flex-col">
      <SectionTitle titulo="Boleta de despachador" subtitulo="Despacho" />
      <div className="stats stats-vertical lg:stats-horizontal shadow mb-4">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <Icon icon="user" size="2x" />
          </div>
          <div className="stat-title">Despachador</div>
          <div className="stat-value text-wrap lg:max-w-60">
            {data.empleado.nombre_completo}
          </div>
          <div className="stat-desc">ID: {data.empleado.idempleado}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <Icon icon="briefcase" size="2x" />
          </div>
          <div className="stat-title">Puesto</div>
          <div className="stat-value">
            {data.empleado.departamento.departamento}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <Icon icon="calendar-days" size="2x" />
          </div>
          <div className="stat-title">Quincena</div>
          <div className="stat-value">{filtros.quincena}</div>
          <div className="stat-desc">
            {`${meses[filtros.month].mes} ${filtros.year}`}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center mb-4">
        <span className="text-start text-nowrap">
          <Icon icon="square" className="text-error" /> No conforme
        </span>
        <span className="text-start text-nowrap">
          <Icon icon="square" className="text-success" /> Conforme
        </span>
      </div>

      <table className="table table-xs lg:table-md table-fixed">
        <thead>
          <tr>
            <th className="text-wrap lg:text-nowrap text-center">Reglamento</th>
            <th className="text-wrap lg:text-nowrap text-center">
              Resultado esperado
            </th>
            <th className="text-wrap lg:text-nowrap text-center">
              Resultado obtenido
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Monto Faltante</th>
            <td className="align-middle text-center">
              <i className="fa-solid fa-equals" /> 0 MXN
            </td>
            <td
              className={`align-middle text-center text-white ${
                data.mf > 0 ? "bg-danger" : "bg-success"
              }`}
            >
              {format.formatDinero(data.mf)} MXN
            </td>
          </tr>
          <tr>
            <th>Checklist Bomba</th>
            <td className="align-middle text-center">
              <i className="fa-solid fa-greater-than-equal" /> 12
            </td>
            <td
              className={`align-middle text-center text-white ${
                data.ck === "NO APLICA"
                  ? "bg-secondary"
                  : data.ck >= 12
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {data.ck}
            </td>
          </tr>
          <tr>
            <th>Evaluación de Uniforme</th>
            <td className="align-middle text-center">
              <i className="fa-solid fa-greater-than-equal" /> 8
            </td>
            <td
              className={`align-middle text-center text-white ${
                data.eu === "NO APLICA"
                  ? "bg-secondary"
                  : data.eu >= 8
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {data.eu}
            </td>
          </tr>
          <tr>
            <th>Orden y limpieza de isla</th>
            <td className="align-middle text-center">
              <i className="fa-solid fa-greater-than-equal" /> 9
            </td>
            <td
              className={`align-middle text-center text-white ${
                data.oyl === "NO APLICA"
                  ? "bg-secondary"
                  : data.oyl >= 9
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {data.oyl}
            </td>
          </tr>
          <tr>
            <th>Pasos para despachar</th>
            <td className="align-middle text-center">
              <i className="fa-solid fa-greater-than-equal" /> 8
            </td>
            <td
              className={`align-middle text-center text-white ${
                data.pd === "NO APLICA"
                  ? "bg-secondary"
                  : data.pd >= 8
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {data.pd}
            </td>
          </tr>
          <tr>
            <th>Recursos despachador</th>
            <td className="align-middle text-center">
              <i className="fa-solid fa-greater-than-equal" /> 15
            </td>
            <td
              className={`align-middle text-center text-white ${
                data.rd === "NO APLICA"
                  ? "bg-secondary"
                  : data.rd >= 15
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {data.rd}
            </td>
          </tr>
          <tr>
            <th>SNC</th>
            <td className="align-middle text-center">
              <i className="fa-solid fa-less-than-equal" /> 3
            </td>
            <td
              className={`align-middle text-center text-white ${
                data.snc <= 3 ? "bg-success" : "bg-danger"
              }`}
            >
              {data.snc}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Index;

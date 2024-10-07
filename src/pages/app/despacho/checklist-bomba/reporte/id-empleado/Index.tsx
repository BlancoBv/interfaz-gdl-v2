import format from "@assets/format";
import {
  dataDetallesChecklistInterface,
  reporteChecklistInterface,
  reporteDetalleChecklistInterface,
} from "@assets/interfaces";
import Button from "@components/Button";
import { SelectMonth, SelectYear } from "@components/forms/Select";
import CintaOpciones from "@components/gui/CintaOpciones";
import Loader from "@components/gui/Loader";
import SectionTitle from "@components/gui/SectionTitle";
import Icon from "@components/Icon";
import Table from "@components/Table";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import Line from "@components/charts/Line";
import { FC, SyntheticEvent, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

interface reporteDetalles extends getDataInterface {
  data: {
    response: reporteDetalleChecklistInterface;
  };
}

interface reporte extends getDataInterface {
  data: { response: reporteChecklistInterface[] };
}

const ReporteEmpleadoChecklist: FC = () => {
  const { idDespachador, year, mes } = useParams();

  const [filtros, setFiltros] = useState<{ year: number; mes: number }>({
    year: Number(year),
    mes: Number(mes),
  });

  const { data, isError, isPending, refetch }: reporteDetalles = useGetData(
    `bomba-check/findCheck/${filtros.year}/${filtros.mes}/${idDespachador}`,
    "reporteDetalleChecklistData",
    { fetchInURLChange: true, fetchTrigger: idDespachador }
  );

  const checklistGral: reporte = useGetData(
    `bomba-check/${filtros.year}/${filtros.mes}`,
    "reporteCheckData"
  );

  const handleFilter = (ev: SyntheticEvent) => {
    ev.preventDefault();
    refetch();
  };
  const datasets = useMemo(() => {
    if (
      !isPending &&
      !isError &&
      !checklistGral.isError &&
      !checklistGral.isPending
    ) {
      const indexOfElement = checklistGral.data.response.findIndex(
        (el) => el.empleado.idempleado === data.response.empleado.idempleado
      );

      if (indexOfElement >= 0) {
        return [
          {
            data: checklistGral.data.response[indexOfElement].fechas.map(
              (el) => ({
                x: el.fecha,
                y: el.cumple === 1 ? 1 : 0,
              })
            ),
            label: "Puntos correctos",
          },
        ];
      }
      return [];
    }
    return [];
  }, [isPending, idDespachador, checklistGral.isPending]);

  if (!isPending && isError && !checklistGral.isPending) {
    return <Navigate to={"/404"} replace />;
  }

  return (
    <div>
      <SectionTitle
        titulo="Detalles de reporte mensual checklist bomba"
        subtitulo="Despacho"
      />
      <CintaOpciones onSubmit={handleFilter}>
        <SelectMonth
          label="Mes de consulta"
          name="mes"
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
        <Button buttonType="submit" text="Filtrar" />
      </CintaOpciones>
      <Loader isPending={isPending} />
      {!isPending && !isError && (
        <>
          <div className="stats shadow w-full stats-vertical lg:stats-horizontal mb-4">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <Icon icon="user" size="2x" />
              </div>
              <div className="stat-title">Despachador</div>
              <div className="stat-value text-wrap">{`${data.response.empleado.nombre} ${data.response.empleado.apellido_paterno} ${data.response.empleado.apellido_materno}`}</div>
              <div className="stat-desc">
                ID: {data.response.empleado.idempleado}
              </div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <Icon icon="list-check" size="2x" />
              </div>
              <div className="stat-title">Evaluaciones capturadas</div>
              <div className="stat-value">{data.response.data.length}</div>
              {/* <div className="stat-desc"></div> */}
            </div>
          </div>
          <Table
            data={data.response.data}
            columns={[
              {
                name: "Fecha",
                selector: (el: dataDetallesChecklistInterface) =>
                  format.formatFecha(el.fecha),
              },
              {
                name: "Fecha checklist",
                selector: (el: dataDetallesChecklistInterface) => {
                  if (el.fechac) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  return (
                    <span className="text-error">
                      <Icon icon="xmark" />
                    </span>
                  );
                },
              },
              {
                name: "Estación de servicio",
                selector: (el: dataDetallesChecklistInterface) => {
                  if (el.estacion_servicio) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  return (
                    <span className="text-error">
                      <Icon icon="xmark" />
                    </span>
                  );
                },
              },
              {
                name: "Turno",
                selector: (el: dataDetallesChecklistInterface) => {
                  if (el.turno) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  return (
                    <span className="text-error">
                      <Icon icon="xmark" />
                    </span>
                  );
                },
              },
              {
                name: "Bomba",
                selector: (el: dataDetallesChecklistInterface) => {
                  if (el.bomba) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  return (
                    <span className="text-error">
                      <Icon icon="xmark" />
                    </span>
                  );
                },
              },
              {
                name: "Isla Limpia",
                selector: (el: dataDetallesChecklistInterface) => {
                  if (el.isla_limpia) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  return (
                    <span className="text-error">
                      <Icon icon="xmark" />
                    </span>
                  );
                },
              },
              {
                name: "Aceites completos",
                selector: (el: dataDetallesChecklistInterface) => {
                  if (el.aceites_completos) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  return (
                    <span className="text-error">
                      <Icon icon="xmark" />
                    </span>
                  );
                },
              },
              {
                name: "Incidentes",
                selector: (el: dataDetallesChecklistInterface) =>
                  el.incidentes ? el.incidentes : "---",
              },
              {
                name: "Empleado entrante",
                selector: (el: dataDetallesChecklistInterface) => {
                  if (el.empleado_entrante) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  return (
                    <span className="text-error">
                      <Icon icon="xmark" />
                    </span>
                  );
                },
              },
              {
                name: "Empleado saliente",
                selector: (el: dataDetallesChecklistInterface) => {
                  if (el.empleado_saliente) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  return (
                    <span className="text-error">
                      <Icon icon="xmark" />
                    </span>
                  );
                },
              },
              {
                name: "Nombre empleado saliente",
                selector: (el: dataDetallesChecklistInterface) =>
                  `${el.empSaliente.nombre} ${el.empSaliente.apellido_paterno} ${el.empSaliente.apellido_materno}`,
              },
            ]}
          />
          <Line
            title="Checklist correctos"
            etiquetaX="Fecha"
            etiquetaY="Puntos"
            data={{ datasets }}
          />
        </>
      )}
    </div>
  );
};
export default ReporteEmpleadoChecklist;
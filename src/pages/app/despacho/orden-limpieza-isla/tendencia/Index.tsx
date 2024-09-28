import Button from "@components/Button";
import { Select, SelectEmpleado } from "@components/forms/Select";
import Toggle from "@components/forms/Toggle";
import CintaOpciones from "@components/gui/CintaOpciones";
import SectionTitle from "@components/gui/SectionTitle";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import { FC, SyntheticEvent, useMemo, useState } from "react";
import Line from "@components/charts/Line";
import { tendenciaOyLInterface } from "@assets/interfaces";
import agruparArr from "@assets/agruparArr";
import calcularTotal, {
  CalcularMeses,
  calcularPromedio,
} from "@assets/calcularTotal";
import format from "@assets/format";
import moment from "moment";
interface tendencia extends getDataInterface {
  data: {
    response: tendenciaOyLInterface[];
    puntajeMinimo: { fecha: string; cantidad: string }[];
  };
}

const TendenciaOyL: FC = () => {
  const [filtros, setFiltros] = useState<{
    idEmpleado: string;
    monthBack: string;
    agrupar: boolean;
  }>({
    idEmpleado: "",
    monthBack: "3",
    agrupar: true,
  });
  const { data, isError, isPending, refetch }: tendencia = useGetData(
    `ordenLimpieza/historial?idEmpleado=${
      !filtros.idEmpleado ? "" : filtros.idEmpleado
    }&monthBack=${filtros.monthBack === "all" ? "" : filtros.monthBack}`,
    "tendenciaOyLData"
  );

  const tendencias = useMemo(() => {
    if (!isPending && !isError) {
      const puntajeMinimo = Number(data.puntajeMinimo[0].cantidad);

      const results = data.response.map((el) => {
        const evaluaciones = el.oyls.map((evaluacion) => ({
          ...evaluacion,
          cumple: evaluacion.cumple ? 1 : 0,
        }));

        const { values: agruparXEv } = agruparArr(
          evaluaciones,
          (el) => el.identificador
        );

        const puntos = agruparXEv.map((g) => {
          const totalPunto = calcularTotal(g, "cumple");
          const total = g.length;
          const promedio = calcularPromedio(g, "cumple") * 10;
          return {
            totalPunto,
            total,
            promedio,
            fecha: g[0].fecha,
            tendencia: promedio >= puntajeMinimo ? 1 : 0,
          };
        });

        const { single: agruparXMes } = agruparArr(puntos, (el) =>
          format.obtenerMesyYear(el.fecha)
        );

        const promedioGeneral = calcularPromedio(puntos, "promedio");

        return { empleado: el.nombre, puntos, promedioGeneral, agruparXMes };
      });

      return results;
    }
    return [];
  }, [data]);

  const labels = CalcularMeses(
    filtros.monthBack === "all" ? undefined : filtros.monthBack
  ).strings;

  /* console.log(
    tendencias.map((el) => ({
      data: Object.keys(el.agruparXMes).map((mes) => ({
        x: mes,
        y: calcularPromedio(
          el.agruparXMes[mes] as { promedio: number }[],
          "promedio"
        ),
      })),
      label: el.empleado,
    }))
  ); */

  console.log(tendencias);

  return (
    <div>
      <SectionTitle
        titulo="Tendencias de orden y limpieza"
        subtitulo="Despacho"
      />
      <CintaOpciones
        onSubmit={(ev: SyntheticEvent) => {
          ev.preventDefault();
          refetch();
        }}
      >
        <SelectEmpleado
          label="Despachador"
          name="idEmpleado"
          estatus={[]}
          departamento="1"
          variable={filtros}
          setVariable={setFiltros}
        />
        <Select
          label="Periodo de consulta"
          placeholder="Selecciona un periodo"
          name="monthBack"
          variable={filtros}
          setVariable={setFiltros}
          options={[
            { value: "3", label: "3 meses" },
            { value: "6", label: "6 meses" },
            { value: "9", label: "9 meses" },
            { value: "all", label: "Historico" },
          ]}
        />
        <Toggle
          label="Agrupar"
          name="agrupar"
          variable={filtros}
          setVariable={setFiltros}
        />
        <Button buttonType="submit" text="Filtrar" />
      </CintaOpciones>
      {!isPending && !isError && (
        <Line
          etiquetaX="Rango de tiempo"
          etiquetaY="Promedio"
          title="Tendencias de orden y limpieza"
          data={{
            labels: labels,
            datasets: filtros.agrupar
              ? tendencias.map((emp, index) => {
                  return {
                    label: emp.empleado, //.nombre_completo,
                    data: labels.map((fecha) => {
                      const datos = emp.agruparXMes[fecha];
                      const total = datos
                        ? calcularPromedio(datos, "promedio")
                        : null;
                      return total;
                    }),
                  };
                })
              : [
                  {
                    label: "Promedio mensual",
                    data: labels.map((mes) => {
                      const promedio = calcularPromedio(
                        tendencias
                          .filter((emp) => emp.agruparXMes.hasOwnProperty(mes))
                          .map((emp) =>
                            calcularPromedio(
                              emp.agruparXMes[String(mes)],
                              "promedio"
                            )
                          ),
                        ""
                      );
                      return promedio;
                    }),
                    backgroundColor: "rgb(25,135,80)",
                    borderColor: "rgb(25,135,80)",
                  },
                  {
                    label: "Puntaje Minimo",
                    data: [],
                    backgroundColor: "rgb(237,41,29)",
                    borderColor: "rgb(237,41,29)",
                  },
                ],
          }}
          legend
        />
      )}
    </div>
  );
};
export default TendenciaOyL;

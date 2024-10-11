import agruparArr from "@assets/agruparArr";
import calcularTotal, {
  CalcularMeses,
  calcularPromedio,
} from "@assets/calcularTotal";
import format from "@assets/format";
import Button from "@components/Button";
import { Select, SelectEmpleado } from "@components/forms/Select";
import Toggle from "@components/forms/Toggle";
import CintaOpciones from "@components/gui/CintaOpciones";
import Loader from "@components/gui/Loader";
import SectionTitle from "@components/gui/SectionTitle";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import { FC, SyntheticEvent, useMemo, useState } from "react";
import Line from "@components/charts/Line";
import { tendenciaEvUniformeInterface } from "@assets/interfaces";

interface tendencia extends getDataInterface {
  data: {
    response: tendenciaEvUniformeInterface[];
    puntajeMinimo: { fecha: string; cantidad: string }[];
  };
}

const TendenciaEvUniforme: FC = () => {
  const [filtros, setFiltros] = useState<{
    idEmpleado: { nombre: string; id: number }[];
    monthBack: string;
    agrupar: boolean;
  }>({
    idEmpleado: [],
    monthBack: "3",
    agrupar: true,
  });

  const { data, isError, isPending, refetch }: tendencia = useGetData(
    `evaluacion-uniforme/historial?${
      filtros.idEmpleado.length === 0
        ? "idEmpleado="
        : filtros.idEmpleado.map((el) => `idEmpleado=${el.id}`).join("&")
    }&monthBack=${filtros.monthBack === "all" ? "" : filtros.monthBack}`,
    "tendenciaEvUniformeData"
  );

  const tendencias = useMemo(() => {
    if (!isPending && !isError) {
      const puntajeMinimo = Number(data.puntajeMinimo[0].cantidad);

      const results = data.response.map((el) => {
        const evaluaciones = el.evaluacion_uniformes.map((evaluacion) => ({
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
  }, [data, isPending]);

  const { datasets, labels } = useMemo(() => {
    const labels = CalcularMeses(
      filtros.monthBack === "all" ? undefined : filtros.monthBack
    );
    if (filtros.agrupar) {
      return {
        datasets: [
          {
            label: "Promedio mensual",
            data: labels.strings.map((mes) => {
              const promedio = calcularPromedio(
                tendencias
                  .filter((emp) => emp.agruparXMes.hasOwnProperty(mes))
                  .map((emp) =>
                    calcularPromedio(emp.agruparXMes[String(mes)], "promedio")
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
            data: labels.strings.map(() =>
              !isPending && !isError
                ? Number(data.puntajeMinimo[0].cantidad)
                : 8
            ),
            backgroundColor: "rgb(237,41,29)",
            borderColor: "rgb(237,41,29)",
          },
        ],
        labels: labels.strings,
      };
    }
    return {
      datasets: tendencias.map((emp) => {
        return {
          label: emp.empleado, //.nombre_completo,
          data: labels.strings.map((fecha) => {
            const datos = emp.agruparXMes[fecha];
            const total = datos ? calcularPromedio(datos, "promedio") : null;
            return total;
          }),
        };
      }),
      labels: labels.strings,
    };
  }, [tendencias, filtros.agrupar]);

  return (
    <div>
      <SectionTitle
        titulo="Tendencias de evaluación de uniforme"
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
          multiple
          labelName="nombre"
          valueName="id"
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
          required
        />
        <Toggle
          label="Agrupar"
          name="agrupar"
          variable={filtros}
          setVariable={setFiltros}
          required={false}
        />
        <Button buttonType="submit" text="Filtrar" />
      </CintaOpciones>
      <Loader isPending={isPending} />
      {!isPending && !isError && (
        <Line
          etiquetaX="Rango de tiempo"
          etiquetaY="Promedio"
          title="Tendencias de evaluación uniforme"
          data={{
            labels,
            datasets,
          }}
          legend
        />
      )}
    </div>
  );
};
export default TendenciaEvUniforme;

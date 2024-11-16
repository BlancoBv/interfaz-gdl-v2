import { FC, useMemo } from "react";
import Doughnut from "@components/charts/Doughnut";
import { reportJsonLiqInterface } from "@assets/interfaces";

const CantidadLiquidaciones: FC<{
  data: { response?: reportJsonLiqInterface[] };
}> = ({ data }) => {
  const datasets = useMemo(() => {
    if (data?.response) {
      const capturadas = data.response?.filter(
        (el) => !el.cancelado && el.lecturas
      );
      /*       const porCaptura = data.response.filter(
        (el) => !el.cancelado && !el.lecturas && !el.capturado
      ); */
      const liqXES: { [key: string]: any } = {};
      capturadas.forEach((liq) => {
        const { nombre } = liq.horario.estacion_servicio;
        if (liqXES.hasOwnProperty(nombre)) {
          liqXES[nombre].push(liq);
        } else {
          liqXES[nombre] = [liq];
        }
      });

      return {
        labels: Object.keys(liqXES),
        datasets: [
          {
            data: Object.values(liqXES).map((liq) => liq.length),
            label: "Liquidaciones capturadas",
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          },
        ],
      };
    }
    return { datasets: [{ data: [] }] };
  }, [data]);

  return (
    <>
      {datasets.datasets[0].data.length > 0 && (
        <Doughnut adjustToContainer showTitle={false} legend data={datasets} />
      )}
      {datasets.datasets[0].data.length < 1 && <span>Sin datos.</span>}
    </>
  );
};
export default CantidadLiquidaciones;

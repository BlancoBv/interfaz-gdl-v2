import { ChartsPropsInterface, CustomDataPoint } from "@assets/interfaces";
import { ChartData } from "chart.js";
import { FC, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";

interface bar extends ChartsPropsInterface {
  data?: ChartData<"bar", CustomDataPoint[]>;
  id?: string;
}
const Index: FC<bar> = ({
  data,
  title = "Texto de ejemplo",
  redraw,
  legend = false,
  etiquetaX,
  etiquetaY,
  onClick,
  ticksYCallback,
  id,
}) => {
  const ref = useRef<any>();
  useEffect(() => {
    if (ref.current) {
      if (ref.current?.chart) {
        console.log(ref.current?.chart);
        ref.current.chart?.destroy();
      }
    }
  }, []);

  return (
    <div className="h-96">
      <Bar
        id={id}
        ref={ref}
        data={
          data
            ? data
            : {
                labels: ["Prueba", "Prueba 2", "Prueba 3"],
                datasets: [
                  { data: [1, 2, 3, 4], label: "Grupo de ejemplo" },
                  { data: [1, 2, 3, 4], label: "Grupo de ejemplo 2" },
                ],
              }
        }
        options={{
          onClick: (_event, element, chart) => {
            if (onClick) {
              const dataset = chart.data.datasets[element[0].datasetIndex];
              const indexElement = element[0].index;

              onClick(dataset, indexElement);
            }
          },
          maintainAspectRatio: false,
          scales: {
            y: {
              type: "logarithmic",
              title: { display: true, text: etiquetaY },
              ticks: { callback: ticksYCallback },
            },
            x: {
              title: { display: true, text: etiquetaX },
            },
          },
          plugins: {
            datalabels: {
              labels: {
                title: { color: "#000" },
              },
              display(context) {
                const value = context.dataset.data[
                  context.dataIndex
                ] as CustomDataPoint;

                if (value === 0) {
                  return false;
                }
                if (typeof value === "object" && value?.y === 0) {
                  return false;
                }
                return true;
              },
            },
            title: {
              display: true,
              text: title,
              font: {
                size: 24,
              },
            },
            legend: {
              position: "right",
              display: legend,
            },
            tooltip: {
              usePointStyle: true,
            },
          },
        }}
        redraw={redraw}
      />
    </div>
  );
};

export default Index;

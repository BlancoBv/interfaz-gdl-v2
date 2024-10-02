import { ChartsPropsInterface, type CustomDataPoint } from "@assets/interfaces";
import { ChartData } from "chart.js";
import { FC, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

interface line extends ChartsPropsInterface {
  data?: ChartData<"line", CustomDataPoint[]>;
  logaritmic?: boolean;
  omitDatalabelOnIndex?: number;
}

const Index: FC<line> = ({
  data,
  title = "Texto de ejemplo",
  redraw,
  legend = false,
  etiquetaX,
  etiquetaY,
  onClick,
  ticksYCallback,
  logaritmic,
  omitDatalabelOnIndex,
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

  console.log(data);

  return (
    <div className="h-96">
      <Line
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
              ...(logaritmic && { type: "logarithmic" }),
              title: { display: true, text: etiquetaY },
              ticks: { callback: ticksYCallback },
            },
            x: {
              title: { display: true, text: etiquetaX },
              ticks: {
                callback(value) {
                  const label = this.getLabelForValue(Number(value)).split(";");
                  if (label.length > 1) {
                    return label[1];
                  }

                  return label[0];
                },
              },
            },
          },
          plugins: {
            datalabels: {
              labels: {
                title: {
                  color: "#000",
                },
              },
              display: function (context) {
                const value = context.dataset.data[
                  context.dataIndex
                ] as CustomDataPoint;

                if (
                  (typeof value === "object" && value?.y === 0) ||
                  value === 0
                ) {
                  return false;
                }

                if (
                  omitDatalabelOnIndex === context.datasetIndex &&
                  context.dataset.data.length - 1 !== context.dataIndex
                ) {
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
              position: "bottom",
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

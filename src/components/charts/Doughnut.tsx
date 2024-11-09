import { ChartsPropsInterface } from "@assets/interfaces";
import { Chart, ChartData } from "chart.js";
import Decimal from "decimal.js-light";
import { FC, useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";

interface doughnut
  extends Omit<
    ChartsPropsInterface,
    "etiquetaX" | "etiquetaY" | "ticksYCallback"
  > {
  data?: ChartData<"doughnut">;
  id?: string;
  adjustToContainer?: boolean;
  useDecimalInTotal?: boolean;
}
const Index: FC<doughnut> = ({
  data,
  title = "Texto de ejemplo",
  redraw,
  legend = false,
  onClick,
  id,
  adjustToContainer,
  useDecimalInTotal,
}) => {
  const ref = useRef<any>();
  useEffect(() => {
    if (ref.current) {
      if (ref.current?.chart) {
        ref.current.chart?.destroy();
      }
    }
  }, []);

  const pluginTotal = {
    id: "pluginTotalDoughnut",
    beforeDraw: function (chart: Chart<"doughnut">) {
      const { width, top, bottom } = chart.chartArea;
      const { ctx } = chart;

      const sumar = (a: number, b: number) => {
        const suma = a + b;
        if (!useDecimalInTotal) {
          return suma;
        }
        return new Decimal(suma).toDecimalPlaces(2).toNumber();
      };

      const sumatoria = chart.config.data.datasets[0].data.reduce(sumar, 0);
      ctx.restore();

      const text = `Total: ${sumatoria}`,
        textOffset = text.length * 10;

      ctx.font = `${
        width < 350 ? (width - textOffset) * 0.1 : (350 - textOffset) * 0.1
      }px Arial`;
      ctx.textBaseline = "middle";

      const textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = (bottom + top) / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  };
  return (
    <div className={`${adjustToContainer ? "" : "h-96"}`}>
      <Doughnut
        id={id}
        ref={ref}
        data={
          data
            ? data
            : {
                labels: ["Prueba", "Prueba 2", "Prueba 3"],
                datasets: [
                  { data: [10, 27, 300, 40], label: "Grupo de ejemplo" },
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
          rotation: 0,
          circumference: 360,

          /*  scales: {
            y: {
              type: "logarithmic",
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
          }, */
          plugins: {
            datalabels: {
              clamp: true,
              labels: {
                title: { color: "#000" },
              },
              display: false,
              /* display(context) {
                console.log({ context });

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
              }, */
              formatter(context) {
                return "sdasdasd";
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
        plugins={[pluginTotal]}
      />
    </div>
  );
};

export default Index;

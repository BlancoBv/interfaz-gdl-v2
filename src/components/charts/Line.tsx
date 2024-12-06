import { ChartsPropsInterface, type CustomDataPoint } from "@assets/interfaces";
import { ChartData, ChartType } from "chart.js";
import { FC, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

interface DrawHorizontalLineInterface {
  y?: number;
  color?: string;
  text?: string;
  dashed?: boolean;
}

interface line extends ChartsPropsInterface {
  data?:
    | ChartData<"line", CustomDataPoint[]>
    | ChartData<"bar", CustomDataPoint[]>;
  logaritmic?: boolean;
  omitDatalabelOnIndex?: number;
  linesHorizontal?: DrawHorizontalLineInterface[];
}

const PluginDrawLineHorizontal = {
  id: "drawHorizontalLine",
  afterDraw: (chart, _args, options) => {
    for (let i = 0; i < options.length; i++) {
      const { ctx, scales } = chart;
      const yScale = scales["y"];
      const element = options[i];
      const yValue = yScale.getPixelForValue(element.y || 7);
      ctx.beginPath();
      ctx.lineWidth = 2;
      if (element.dashed) ctx.setLineDash([5, 3]);
      ctx.strokeStyle = element.color || "#b91c1c";
      ctx.moveTo(0, yValue);
      ctx.lineTo(chart.width, yValue);
      ctx.stroke();

      ctx.fillStyle = element.color || "#b91c1c";
      ctx.fillText(element.text || "7 - PM", 0, yValue + 12);
    }
  },
};

declare module "chart.js" {
  interface PluginOptionsByType<TType extends ChartType> {
    drawHorizontalLine?: DrawHorizontalLineInterface[] | boolean;
  }
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
  id,
  linesHorizontal,
}) => {
  const ref = useRef<any>();
  useEffect(() => {
    if (ref.current) {
      if (ref.current?.chart) {
        ref.current.chart?.destroy();
      }
    }
  }, []);

  return (
    <div className="h-96">
      <Line
        plugins={[PluginDrawLineHorizontal]}
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
            drawHorizontalLine: linesHorizontal || false,
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

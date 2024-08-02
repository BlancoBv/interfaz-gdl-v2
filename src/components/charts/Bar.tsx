import { FC, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
/* import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  SubTitle,
  LogarithmicScale,
  Colors,
} from "chart.js";
 */

const Index: FC<{
  data?: any;
  title?: string;
  redraw?: boolean;
  legend?: boolean;
  onClick?: (dataset: any, element: any) => void;
  etiquetaX: string;
  etiquetaY: string;
  ticksYCallback?: (value: any) => string;
}> = ({
  data,
  title = "Texto de ejemplo",
  redraw,
  legend = false,
  etiquetaX,
  etiquetaY,
  onClick,
  ticksYCallback,
}) => {
  const ref = useRef<any>();
  useEffect(() => {
    console.log("Rerendirzado ");
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
              console.log(element);

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
              color: "fffff",
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

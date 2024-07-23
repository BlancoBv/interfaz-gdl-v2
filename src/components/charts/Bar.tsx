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
import "chart.js/auto";

const Index: FC = () => {
  const ref = useRef<any>();
  useEffect(() => {
    console.log(ref);
    if (ref.current) {
      if (ref.current?.chart) {
        console.log(ref.current?.chart);
        ref.current.chart?.destroy();
      }
    }
  }, []);

  const config = {};

  return (
    <Bar
      ref={ref}
      data={{
        labels: ["Prueba", "Prueba 2"],
        datasets: [{ data: [1, 2, 3, 4], label: "XD" }],
      }}
      options={{
        maintainAspectRatio: false,
        scales: {
          y: {
            type: "logarithmic",
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Texto de ejemplo",
            font: {
              size: 24,
            },
          },
          legend: {
            position: "right",
          },
        },
      }}
      redraw
    />
  );
};

export default Index;

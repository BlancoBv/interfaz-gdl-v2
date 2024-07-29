import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "../src/routes/Index";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Chart from "chart.js/auto";
import chartDataLabels from "chartjs-plugin-datalabels";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

Chart;
Chart.register(chartDataLabels);
Chart.defaults.set("plugins.datalabels", {
  anchor: "start",
  align: "end",
  clamp: true,
  labels: {
    title: {
      font: {
        weight: "bold",
      },
      color: "#fff",
    },
  },
  display: (context: { dataIndex: number; dataset: { data: any[] } }) => {
    return context.dataset.data[context.dataIndex] > 0;
  },
});
library.add(fas);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer autoClose={800} closeButton />
        <Routes />
      </QueryClientProvider>
    </>
  );
}

export default App;

import "react-toastify/dist/ReactToastify.css";
import Routes from "../src/routes/Index";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Chart from "chart.js/auto";
import chartDataLabels from "chartjs-plugin-datalabels";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import Axios from "./assets/Axios";
import { AuthContext } from "./hooks/useAuth";
import ToastPortal from "./components/gui/ToastPortal";

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
  // State to hold the authentication token
  const [token, setToken_] = useState<string | null>(
    localStorage.getItem("token")
  );

  // Function to set the authentication token
  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete Axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );
  return (
    <>
      <AuthContext.Provider value={contextValue}>
        <QueryClientProvider client={queryClient}>
          <ToastPortal />
          <Routes />
        </QueryClientProvider>
      </AuthContext.Provider>
    </>
  );
}

export default App;

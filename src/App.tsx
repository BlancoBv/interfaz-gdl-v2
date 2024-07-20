import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "../src/routes/Index";

function App() {
  return (
    <>
      <ToastContainer autoClose={800} closeButton />
      <Routes />
    </>
  );
}

export default App;

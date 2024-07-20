import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "../src/routes/Index";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
function App() {
  return (
    <>
      <ToastContainer autoClose={800} closeButton />
      <Routes />
    </>
  );
}

export default App;

import axios from "axios";

//const BASE_URL = "http://localhost:4000";
const BASE_URL = "https://apigdl.programacion-blanco.com";
export const urlSocket = "ws://localhost:4001";

export default axios.create({
  baseURL: `${BASE_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status: number) => {
    console.log(status);

    if (status === 401 || status === 403) {
      localStorage.removeItem("credentials");
      localStorage.removeItem("token");
      window.location.href = "/";
      return false;
    }
    return true;
  },
});

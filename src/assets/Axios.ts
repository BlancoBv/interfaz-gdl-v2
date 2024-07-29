import axios from "axios";

const BASE_URL = "http://192.168.100.4:4000";
export const urlSocket = "ws://localhost:4001";

export default axios.create({
  baseURL: `${BASE_URL}/api/`,
  headers: { "Content-Type": "application/json" },
  validateStatus: (status: number) => {
    if (status === 401) {
      localStorage.removeItem("Auth");
      window.location.href = "/";
    }
    return true;
  },
});

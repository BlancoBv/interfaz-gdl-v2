import axios from "axios";

const BASE_URL = "http://localhost:4000";
export const urlSocket = "ws://localhost:4001";

const { token }: { token: { token: string | null } } = localStorage.getItem(
  "credentials"
)
  ? JSON.parse(String(localStorage.getItem("credentials")))
  : { token: { token: null } };

export default axios.create({
  baseURL: `${BASE_URL}/api/`,
  headers: { "Content-Type": "application/json", Authorization: token.token },
  validateStatus: (status: number) => {
    console.log(status);

    if (status === 401 || status === 403) {
      localStorage.removeItem("credentials");
      window.location.href = "/";
    }
    return true;
  },
});

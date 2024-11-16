import { urlSocket } from "@assets/Axios";
import useWebSocket from "react-use-websocket";

export default function socket() {
  const { lastJsonMessage, lastMessage } = useWebSocket(urlSocket, {
    onOpen: () => {
      console.log("Conexión con sockets establecida en modulo liquidación");
    },
    onError: (err) => {
      console.log(`Conexion perdida ${err}`);
    },
    share: true,
    filter: (e) => {
      const type = JSON.parse(e.data).type;
      return type === "closeLiquidacion";
    },
    retryOnError: true,
    shouldReconnect: () => true,
  });
  return { lastJsonMessage, lastMessage };
}

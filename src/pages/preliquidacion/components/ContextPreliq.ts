import { createContext } from "react";

export interface islasInterface {
  label: string;
  value: number;
  extra: {
    idgas: string;
    nombre: string;
    mangueras: {
      idmanguera: string;
      tiene: boolean;
      direccion: "dr" | "iz";
      idgas: string;
      idsla: number;
    };
  }[];
}

export const ContextPreliq = createContext<{
  infoGeneral: {
    body: {
      empleado?: number;
      turno?: number;
      estacion?: number;
      islas?: islasInterface[];
    };
    setBody: any;
  };
  precios: {
    body: { M?: string; P?: string; D?: string };
    setBody: any;
  };
}>({
  infoGeneral: { body: {}, setBody: {} },
  precios: { body: {}, setBody: {} },
});

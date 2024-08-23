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

export interface preciosInterface {
  M?: string;
  P?: string;
  D?: string;
}

export interface manguerasInterface {
  idManguera?: string;
  precioUnitario?: string;
  lecturaInicial?: string;
  lecturaFinal?: string;
  litrosVendidos?: string | number;
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
    body: preciosInterface;
    setBody: any;
  };
  mangueras: {
    body: manguerasInterface[];
    setBody: any;
  };
}>({
  infoGeneral: { body: {}, setBody: {} },
  precios: { body: {}, setBody: {} },
  mangueras: { body: [], setBody: {} },
});

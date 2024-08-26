import { createContext, Dispatch, SetStateAction } from "react";

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

export interface infoGeneralInterface {
  empleado?: number;
  turno?: number;
  estacion?: number;
  islas?: islasInterface[];
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

export interface efectivoInterface {
  type: "efectivo";
  cantidad: string[];
}

export const ContextPreliq = createContext<{
  infoGeneral: {
    body: infoGeneralInterface;
    setBody?: Dispatch<SetStateAction<infoGeneralInterface>>;
  };
  precios: {
    body: preciosInterface;
    setBody?: Dispatch<SetStateAction<preciosInterface>>;
  };
  mangueras: {
    body: manguerasInterface[];
    setBody?: Dispatch<SetStateAction<manguerasInterface[]>>;
  };
  efectivo: {
    body: efectivoInterface;
    setBody?: Dispatch<SetStateAction<efectivoInterface>>;
  };
}>({
  infoGeneral: { body: {} },
  precios: { body: {} },
  mangueras: { body: [] },
  efectivo: { body: { type: "efectivo", cantidad: [] } },
});

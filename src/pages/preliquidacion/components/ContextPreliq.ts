import {
  empleadoInterface,
  estacionServicioInterface,
  turnoInterface,
  islasInterface as islasInterfacePet,
} from "@assets/interfaces";
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

export interface valesInterface {
  type: "vales";
  cantidad: string[];
}
interface totalesInterface {
  totalEntregar: number;
  totalVales: number;
  totalEfectivo: number;
  totalEntregado: number;
  diferencia: string;
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
  vales: {
    body: valesInterface;
    setBody?: Dispatch<SetStateAction<valesInterface>>;
  };
  error: { body: boolean; setBody?: Dispatch<SetStateAction<boolean>> };
  otherData: {
    islas: islasInterfacePet[];
    empleado?: empleadoInterface;
    turno?: turnoInterface;
    estacionServicio?: estacionServicioInterface;
    vales?: string[];
    efectivo?: string[];
  };
  totales: {};
}>({
  infoGeneral: { body: {} },
  precios: { body: {} },
  mangueras: { body: [] },
  efectivo: { body: { type: "efectivo", cantidad: [] } },
  vales: { body: { type: "vales", cantidad: [] } },
  error: { body: false },
  otherData: { islas: [] },
  totales: {
    totalEntregar: 0,
    totalVales: 0,
    totalEfectivo: 0,
    totalEntregado: 0,
    diferencia: "0",
  },
});

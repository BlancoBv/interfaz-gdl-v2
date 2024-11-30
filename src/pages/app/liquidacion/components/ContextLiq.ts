import {
  empleadoInterface,
  estacionServicioInterface,
  turnoInterface,
  islasInterface as islasInterfacePet,
  liquidacionesPendientesInterface,
} from "@assets/interfaces";
import { createContext, Dispatch, SetStateAction } from "react";

export interface islasInterface {
  nIsla: string;
  idIsla: number;
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

export interface lecturasInicialesInterface {
  idmanguera: string;
  tiene: boolean;
  direccion: "dr" | "iz";
  idisla: number;
  idgas: string;
  ga: {
    idgas: string;
    nombre: string;
  };
  isla: { idisla: number; nisla: number; habilitada: boolean };
  lecturas_finales: {
    lecturai: number;
    lecturaf: number;
    precio: string;
    importe: string;
    idmanguera: string;
  }[];
}
/* interface totalesInterface {
  totalEntregar: number;
  totalVales: number;
  totalEfectivo: number;
  totalEntregado: number;
  diferencia: string;
} */

export const ContextLiq = createContext<{
  infoGeneral: {
    body: Partial<liquidacionesPendientesInterface>;
    setBody?: Dispatch<
      SetStateAction<Partial<liquidacionesPendientesInterface>>
    >;
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
    lecturasIniciales?: lecturasInicialesInterface[];
  };
  totales: {};
  cleanAll: () => void;
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
  cleanAll: () => {},
});

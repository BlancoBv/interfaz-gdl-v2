import {
  empleadoInterface,
  estacionServicioInterface,
  turnoInterface,
  islasInterface as islasInterfacePet,
  liquidacionesPendientesInterface,
  codigosUsoInterface,
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
  [key: string]: {
    manguera?: string;
    idmangueraGenerico?: string;
    posicion?: number;
    idisla?: number;
    combustible?: string;
    idgas?: string;
    lecturaInicial?: string;
    lecturaFinal?: string;
    precioUnitario?: string;
    litrosVendidos?: string | number;
    importe?: number;
  };
}

export interface efectivoInterface {
  folio?: string;
  monto?: string;
  codigoUso?: string;
}

export interface valesInterface {
  folio?: string;
  monto?: string;
  codigoUso?: string;
  combustible?: string;
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
    body: manguerasInterface;
    setBody?: Dispatch<SetStateAction<manguerasInterface>>;
  };
  efectivo: {
    body: efectivoInterface[];
    setBody?: Dispatch<SetStateAction<efectivoInterface[]>>;
  };
  vales: {
    body: valesInterface[];
    setBody?: Dispatch<SetStateAction<valesInterface[]>>;
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
    codigosUso: codigosUsoInterface[];
  };
  totales: {};
  cleanAll: () => void;
}>({
  infoGeneral: { body: {} },
  precios: { body: {} },
  mangueras: { body: {} },
  efectivo: { body: [] },
  vales: { body: [] },
  error: { body: false },
  otherData: { islas: [], codigosUso: [] },
  totales: {
    totalEntregar: 0,
    totalVales: 0,
    totalEfectivo: 0,
    totalEntregado: 0,
    diferencia: "0",
  },
  cleanAll: () => {},
});

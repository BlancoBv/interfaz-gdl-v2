import { SNC } from "@assets/interfaces";

export type SNCForm = {
  accionesCorregir: string | null;
  concesiones: string | null;
  descripcionFalla: string;
  fecha: string;
  idEmpleadoIncumple: number;
  idIncumplimiento: number;
  idsalida_noconforme?: number;
};

export type SNCParseToForm = Pick<
  SNC,
  | "acciones_corregir"
  | "concesiones"
  | "descripcion_falla"
  | "fecha"
  | "idempleado"
  | "idsalida_noconforme"
  | "idincumplimiento"
> | null;

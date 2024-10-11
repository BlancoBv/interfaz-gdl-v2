import { ChartData, Point } from "chart.js";
export type CustomDataPoint =
  | { x: string; y: number | string }
  | number
  | Point
  | null;
export type Rename<T, K extends keyof T, N extends string> = Pick<
  T,
  Exclude<keyof T, K>
> & { [P in N]: T[K] };

export interface ChartsPropsInterface {
  data?: ChartData<any>;
  title?: string;
  redraw?: boolean;
  legend?: boolean;
  onClick?: (dataset: any, element: any) => void;
  etiquetaX: string;
  etiquetaY: string;
  ticksYCallback?: (value: any) => string;
  xAxeAsCategory?: boolean;
  id?: string;
} // props para las graficas

export interface empleadoInterface {
  nombre_completo: string;
  idempleado: number;
  idchecador: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  iddepartamento: number;
  estatus: string;
  edad: number;
  date_baja: string | null;
  fecha_registro: string;
  update_time: string;
  motivo: string | null;
  color: string | null;
  departamento: {
    iddepartamento: number;
    departamento: string;
  };
}
export interface estacionServicioInterface {
  idestacion_servicio: number;
  nombre: string;
  latitud: number;
  longitud: number;
  imagen: string | null;
}

export interface turnoInterface {
  idturno: number;
  turno: string;
  hora_empiezo: string;
  hora_termino: string;
  hora_anticipo: string;
  mostrar: boolean;
}

interface mangueraInterface {
  idmanguera: string;
  tiene: boolean;
  direccion: string;
  idisla: number;
  idgas: string;
}

interface gasInterface {
  idgas: string;
  nombre: string;
  mangueras: mangueraInterface;
}

export interface islasInterface {
  idisla: number;
  nisla: number;
  idestacion_servicio: number;
  habilitada: boolean;
  gas: gasInterface[];
}

export interface departamentoInterface {
  iddepartamento: number;
  departamento: string;
}

export interface controlDocumentoInterface {
  idchecador: number;
  idempleado: number;
  nombre_completo: string;
  iddepartamento: number;
  estatus: "Contrato" | "Baja";
  num_documentos: number;
}

export interface documentoEmpInterface {
  documento: string;
  iddocumento: number;
  idcontrol_documento: number | null;
  idempleado: number;
}

export interface registrosChecklistInterface {
  idchecklist: number;
  fecha: string;
  empleado_entrante: Omit<empleadoInterface, "departamento">;
  empleado_saliente: Omit<empleadoInterface, "departamento">;
  isla_limpia: boolean;
  aceites_completos: boolean;
  turno: turnoInterface;
  isla: islasInterface;
}

export interface reporteOyLInterface {
  idempleado: number;
  idchecador: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  totalPuntos: number;
  evaluaciones: {
    idoyl: number;
    fecha: string; // ISO string format
    isla: number;
    idestacion_servicio: number;
    idempleado: number;
    idoyl_cumplimiento: number;
    idturno: number;
    identificador: string;
    cumple: boolean;
    incidentes: string | null;
    cumplimiento: string;
    idchecador: number;
    estatus: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    estacion: string;
  }[][];
}

export interface cumplimientosOyLInterface {
  idoyl_cumplimiento: number;
  cumplimiento: string;
  descripcion: string;
  parte: string;
}
export interface tendenciaOyLInterface extends empleadoInterface {
  oyls: {
    idoyl: number;
    identificador: string;
    fecha: string;
    cumple: boolean;
    oyl_cumplimiento: Pick<
      cumplimientosOyLInterface,
      "cumplimiento" | "idoyl_cumplimiento"
    >;
  }[];
}

export interface historialOyLInterface {
  idoyl: number;
  fecha: string; // ISO string format
  isla: number;
  idestacion_servicio: number;
  idempleado: number;
  idoyl_cumplimiento: number;
  idturno: number;
  identificador: string;
  cumple: boolean;
  incidentes: string | null;
  cumplimiento: string;
  idchecador: number;
  estatus: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  estacionServicio: string;
  turno: string;
  total: number;
}

export interface reporteChecklistInterface {
  empleado: empleadoInterface;
  fechas: {
    idchecklist_bomba: number | null;
    idempleado: number;
    fecha: string;
    cumple: 1 | 0 | null;
  }[];
}
export interface dataDetallesChecklistInterface {
  idchecklist_bomba: number;
  fecha: string;
  isla_limpia: boolean;
  aceites_completos: boolean;
  turno: boolean;
  bomba: boolean;
  estacion_servicio: boolean;
  idempleado: number;
  empleado_entrante: boolean;
  idempleado_saliente: number;
  fechac: boolean;
  empleado_saliente: boolean;
  incidentes: string | null;
  empSaliente: Omit<empleadoInterface, "nombre_completo">;
}
export interface reporteDetalleChecklistInterface {
  empleado: Omit<empleadoInterface, "nombre_completo">;
  data: dataDetallesChecklistInterface[];
}

export interface evaluacionesUniformeInterface {
  idcumplimiento_uniforme: number;
  cumplimiento: string;
  vigente: number;
}

export interface historialUniformeInterface {
  idevaluacion_uniforme: number;
  fecha: string;
  idempleado: number;
  idcumplimiento_uniforme: number;
  idpuntaje_minimo: number;
  cumple: boolean;
  identificador: string;
  cumplimiento: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  quincena: number;
  total_evaluacion: number;
  nombre_completo: string;
}

export interface reporteUniformeInterface
  extends Pick<
    empleadoInterface,
    | "apellido_materno"
    | "apellido_paterno"
    | "nombre"
    | "idchecador"
    | "idempleado"
  > {
  evaluaciones: Omit<
    historialUniformeInterface,
    "quincena" | "total_evaluacion" | "nombre_completo"
  >[][];
  cantidad: {
    idcumplimiento_uniforme: number;
    cumplimiento: string;
    totalBuena: number;
    totalMalas: number;
    total: number;
  }[];
  promedio: number;
}

export interface tendenciaEvUniformeInterface extends empleadoInterface {
  evaluacion_uniformes: {
    idevaluacion_uniforme: number;
    identificador: string;
    fecha: string;
    cumple: boolean;
    oyl_cumplimiento: Pick<
      evaluacionesUniformeInterface,
      "cumplimiento" | "idcumplimiento_uniforme"
    >;
  }[];
}

export interface evaluacionesPasosDespacharInterface {
  idpaso_despachar: number;
  paso: string;
}

export interface reportePasosDespacharInterface {
  promedio: string;
  nombre: string;
  idempleado: number;
}

export interface reporteDetallePasosDespacharInterface {
  total: number;
  promedio: number;
  qna: number;
  data: { evaluacion: boolean }[];
}
export interface tendenciaPasosDespacharInterface extends empleadoInterface {
  evaluacion_despachars: {
    idevaluacion_uniforme: number;
    identificador: string;
    fecha: string;
    evaluacion: boolean;
    oyl_cumplimiento: evaluacionesPasosDespacharInterface;
  }[];
}

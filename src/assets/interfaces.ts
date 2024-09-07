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

export interface controDocumentoInterface {
  idchecador: number;
  idempleado: number;
  nombre_completo: string;
  iddepartamento: number;
  estatus: "Contrato" | "Baja";
  num_documentos: number;
}

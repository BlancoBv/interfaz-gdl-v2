import { InputFecha } from "@components/forms/Input";
import {
  SelectEmpleado,
  SelectEstacion,
  SelectIslaSingle,
  SelectTurno,
} from "@components/forms/Select";
import SectionTitle from "@components/gui/SectionTitle";
import { FC, useState } from "react";
import Toggle from "./components/Toggle";
import TextArea from "@components/forms/TextArea";
import Button from "@components/Button";
import { useSendData } from "@hooks/useSendData";

const CapturarOyL: FC = () => {
  const EVALUACIONES: {
    parte1: { idCumplimiento: number; nombre: string }[];
    parte2: { idCumplimiento: number; nombre: string }[];
  } = {
    parte1: [
      {
        idCumplimiento: 1,
        nombre: "Exihibidor de aceite (Productos ordenados).",
      },
      {
        idCumplimiento: 2,
        nombre: "Contenedor limpiaparabrisas (sin roturas).",
      },
      {
        idCumplimiento: 3,
        nombre: "Mangueras de la bomba (enrolladas sin tocar el piso).",
      },
      {
        idCumplimiento: 4,
        nombre:
          "Mangueras de despachadora de agua y aire (enrollada sin tocar el piso).",
      },
      {
        idCumplimiento: 5,
        nombre: "Maseteros, solo aplica a isla 1 y 2 de GDL 1 (sin basura).",
      },
    ],
    parte2: [
      {
        idCumplimiento: 6,
        nombre: "Bomba limpía (sin lodo o polvo).",
      },
      {
        idCumplimiento: 7,
        nombre: "Piso limpío de la isla (sin lodo o polvo).",
      },
      {
        idCumplimiento: 8,
        nombre: "Isla limpia (sin basura).",
      },
      {
        idCumplimiento: 9,
        nombre: "Franja amarilla de la isla (sin lodo o polvo).",
      },
      {
        idCumplimiento: 10,
        nombre:
          "Contenedor de agua para limpiaparabrisas limpío (sin lodo o polvo).",
      },
    ],
  };
  const [body, setBody] = useState<{
    fecha?: string;
    idEmpleado?: number;
    idEstacionServicio?: string;
    idTurno?: string;
    isla?: string;
    evaluaciones: { cumple: 1 | 0; idcumplimiento: number }[];
  }>({ evaluaciones: [] });

  const send = useSendData("ordenLimpieza", {
    method: "post",
    refetchFn: () => {
      setBody({ evaluaciones: [] });
    },
  });

  return (
    <div className="w-full">
      <SectionTitle
        titulo="Capturar evaluación de orden y limpieza de la isla"
        subtitulo="Despacho"
      />
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          send.mutate(body);
        }}
      >
        <div className="flex justify-center flex-wrap gap-4">
          <InputFecha
            variable={body}
            setVariable={setBody}
            name="fecha"
            label="Fecha de evaluación"
            todayBtn
            required
          />
          <SelectEmpleado
            variable={body}
            setVariable={setBody}
            label="Empleado evaluado"
            name="idEmpleado"
            departamento="1"
            estatus={[]}
            required
          />
          <SelectEstacion
            label="Estación de servicio"
            name="idEstacionServicio"
            variable={body}
            setVariable={setBody}
            required
          />
          <SelectIslaSingle
            label="Isla de trabajo"
            name="isla"
            variable={body}
            setVariable={setBody}
            estacionServicio={body.idEstacionServicio}
            required
          />
          <SelectTurno
            label="Turno"
            name="idTurno"
            variable={body}
            setVariable={setBody}
            required
          />
        </div>
        <div className="mt-4">
          <span className="font-bold">Parte I. Elementos de la isla</span>
          {EVALUACIONES.parte1.map((el) => (
            <Toggle
              key={el.idCumplimiento}
              text={el.nombre}
              idCumplimiento={el.idCumplimiento}
              variable={body}
              setVariable={setBody}
              disabled={
                el.idCumplimiento === 5 &&
                (Number(body?.isla ?? 0) === 5 || Number(body?.isla ?? 0) === 8)
              }
            />
          ))}
        </div>
        <span className="divider"></span>
        <div>
          <span className="font-bold">Parte II. Limpieza de la isla</span>
          {EVALUACIONES.parte2.map((el) => (
            <Toggle
              key={el.idCumplimiento}
              text={el.nombre}
              idCumplimiento={el.idCumplimiento}
              variable={body}
              setVariable={setBody}
            />
          ))}
        </div>
        <span className="divider"></span>
        <TextArea
          label="Incidentes durante a evaluación"
          name="incidentes"
          variable={body}
          setVariable={setBody}
        />
        <div className="mt-4">
          <Button
            buttonType="submit"
            text="Enviar"
            block
            isPending={send.isPending}
          />
        </div>
      </form>
    </div>
  );
};
export default CapturarOyL;

import { InputFecha } from "@components/forms/Input";
import {
  SelectEmpleado,
  SelectEstacion,
  SelectIsla,
  SelectTurno,
} from "@components/forms/Select";
import SectionTitle from "@components/gui/SectionTitle";
import { FC, useState } from "react";

const CapturarOyL: FC = () => {
  const [body, setBody] = useState<{ fecha?: string }>({});
  return (
    <div className="w-full">
      <SectionTitle
        titulo="Capturar evaluación de orden y limpieza de la isla"
        subtitulo="Despacho"
      />
      <form>
        <div className="flex justify-center flex-wrap gap-4">
          <InputFecha
            variable={body}
            setVariable={setBody}
            name="fecha"
            label="Fecha de evaluación"
            todayBtn
          />

          <SelectEmpleado
            variable={body}
            setVariable={setBody}
            label="Empleado evaluado"
            name="empleado"
            departamento="1"
            estatus={[]}
          />
          <SelectEstacion
            label="Estación de servicio"
            name="estacion"
            variable={body}
            setVariable={setBody}
          />
          <SelectIsla
            label="Isla de trabajo"
            name="isla"
            variable={body}
            setVariable={setBody}
          />
          <SelectTurno
            label="Turno"
            name="turno"
            variable={body}
            setVariable={setBody}
          />
        </div>
      </form>
    </div>
  );
};
export default CapturarOyL;

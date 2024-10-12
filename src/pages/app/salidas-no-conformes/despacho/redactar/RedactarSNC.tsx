import { FC, useState } from "react";
import EditorTipTap from "./components/EditorTipTap";

const RedactarSNC: FC = () => {
  const [body, setBody] = useState({
    accionesCorregir: "",
    concesiones: "",
    descripcionFalla: "",
    fecha: "",
    idEmpleadoIncumple: null,
    idIncumplimiento: null,
  });

  const onChange = () => {
    setBody({ ...body, accionesCorregir: "" });
  };

  return (
    <div className="w-full max-w-1/2">
      <button onClick={onChange}>aplica</button>
      <div className="rounded mb-2 bg-slate-50 p-2">
        <p className="font-bold text-lg">Descripción de la falla</p>
        <EditorTipTap
          value={body}
          name="descripcionFalla"
          onChange={(e) =>
            setBody({ ...body, [e.target.name]: e.target.value })
          }
          placeholder="Escribe la descripción de la falla o informidad"
        />
      </div>
      <div className="rounded mb-2 bg-slate-50 p-2">
        <p className="font-bold text-lg">
          Acciones aplicadas para corregir la falla
        </p>
        <EditorTipTap
          value={body}
          name="accionesCorregir"
          onChange={(e) =>
            setBody({ ...body, [e.target.name]: e.target.value })
          }
          placeholder="Acciones a corregir (En caso que aplique)"
        />
      </div>
      <div className="rounded mb-2 bg-slate-50 p-2">
        <p className="font-bold text-lg">Concesiones</p>
        <EditorTipTap
          value={body}
          name="concesiones"
          onChange={(e) =>
            setBody({ ...body, [e.target.name]: e.target.value })
          }
          placeholder="Concesiones (En caso que aplique)"
        />
      </div>
    </div>
  );
};

export default RedactarSNC;

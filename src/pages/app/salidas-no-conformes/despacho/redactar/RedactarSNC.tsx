import { FC, useEffect, useRef, useState } from "react";
import EditorTipTap, { RefMethods } from "./components/EditorTipTap";
import {
  SelectEmpleado,
  SelectIncumplimientos,
} from "@components/forms/Select";
import { InputFecha } from "@components/forms/Input";
import Icon from "@components/Icon";
import { useSendData } from "@hooks/useSendData";

const RedactarSNC: FC = () => {
  const editorDescripcion = useRef<RefMethods>(null);
  const editorConcesion = useRef<RefMethods>(null);
  const editorAccion = useRef<RefMethods>(null);

  const initialBody = {
    accionesCorregir: "<p></p>",
    concesiones: "<p></p>",
    descripcionFalla: "<p></p>",
    fecha: "",
    idEmpleadoIncumple: null,
    idIncumplimiento: null,
  };
  const [body, setBody] = useState(initialBody);

  const saveSNC = useSendData("/salida-no-conforme");

  const limpiarCampos = () => {
    editorDescripcion.current?.clean();
    editorConcesion.current?.clean();
    editorAccion.current?.clean();
    setBody(initialBody);
  };

  useEffect(() => {
    const sa = body.accionesCorregir;
    const sc = body.concesiones;
    if (sa == "<p></p>" && sc != "<p></p>") {
      editorAccion.current?.disabled(true);
      editorConcesion.current?.disabled(false);
    } else if (sa != "<p></p>" && sc == "<p></p>") {
      editorAccion.current?.disabled(false);
      editorConcesion.current?.disabled(true);
    } else {
      editorAccion.current?.disabled(false);
      editorConcesion.current?.disabled(false);
    }
  }, [body.concesiones, body.accionesCorregir]);

  return (
    <div className="w-full">
      <form
        className="w-[800px] min-w-[850px] border p-4 rounded border-slate-200 border-2 mx-auto"
        onSubmit={(ev) => {
          ev.preventDefault();
          saveSNC.mutateAsync(body).then(limpiarCampos);
        }}
      >
        <div className="flex gap-2 items-stretch justify-center flex-col sm:flex-row sm:justify-between mb-3">
          <InputFecha
            label="Fecha"
            variable={body}
            setVariable={setBody}
            name="fecha"
            todayBtn
            required
          />
          <div>
            <div className="cursor-pointer hover:text-red-500 hover:drop-shadow-[0_0px_20px_rgb(239,68,68)] ">
              <h3 className="font-bold text-lg">
                SNC <Icon icon="thumbs-down" />{" "}
              </h3>
            </div>
          </div>
        </div>
        <div className="rounded mb-2 bg-base-200 p-2">
          <p className="label-text mb-1">Descripción de la falla</p>
          <EditorTipTap
            ref={editorDescripcion}
            value={body}
            name="descripcionFalla"
            onChange={(e) =>
              setBody({ ...body, [e.target.name]: e.target.value })
            }
            placeholder="Escribe la descripción de la falla o informidad"
          />
        </div>

        <div className="rounded mb-2 bg-base-200 p-2">
          <p className="label-text mb-1">
            Acciones aplicadas para corregir la falla
          </p>
          <EditorTipTap
            ref={editorAccion}
            value={body}
            name="accionesCorregir"
            onChange={(e) =>
              setBody({ ...body, [e.target.name]: e.target.value })
            }
            placeholder="Acciones a corregir (En caso que aplique)"
          />
        </div>

        <div className="rounded mb-2 bg-base-200 p-2">
          <p className="label-text mb-1">Concesiones</p>
          <EditorTipTap
            ref={editorConcesion}
            value={body}
            name="concesiones"
            onChange={(e) =>
              setBody({ ...body, [e.target.name]: e.target.value })
            }
            placeholder="Concesiones (En caso que aplique)"
          />
        </div>
        <hr className="border-zinc-300" />
        <div className="flex gap-2 items-stretch justify-center flex-col sm:flex-row sm:justify-between">
          <SelectEmpleado
            variable={body}
            setVariable={setBody}
            label="Empleado"
            name="idEmpleadoIncumple"
            departamento="all"
            estatus={[]}
            required
          />
          <SelectIncumplimientos
            variable={body}
            setVariable={setBody}
            name="idIncumplimiento"
            required
          />
        </div>
        <div className="mt-3">
          <button className="btn btn-primary w-full" type="submit">
            Guardar SNC
          </button>
        </div>
      </form>
    </div>
  );
};

export default RedactarSNC;

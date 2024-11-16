import { FC, useEffect, useRef, useState } from "react";
import EditorTipTap, { RefMethods } from "./EditorTipTap";
import {
  SelectEmpleado,
  SelectIncumplimientos,
} from "@components/forms/Select";
import { InputFecha } from "@components/forms/Input";
import { useSendData } from "@hooks/useSendData";
import { SNCForm } from "../../Index.tsx";
import { useModal } from "@hooks/useModal.ts";

interface BaseProps {
  body: SNCForm;
  edit?: boolean;
}

interface PropsWithIdSalida extends BaseProps {
  edit: true;
  idsalida_noconforme: number;
}
interface PropsWithoutIdSalida extends BaseProps {
  edit?: false;
  idsalida_noconforme?: number;
}

type Props = PropsWithIdSalida | PropsWithoutIdSalida;

const FormularioSNC: FC<Props> = (props) => {
  const editorDescripcion = useRef<RefMethods>(null);
  const editorConcesion = useRef<RefMethods>(null);
  const editorAccion = useRef<RefMethods>(null);
  const initialBody = props.body;
  const { close } = useModal("idModalEditSnc");
  const [body, setBody] = useState(initialBody);

  const saveSNC = useSendData("/salida-no-conforme", {
    method: "post",
    refetchFn: () => {
      limpiarCampos();
    },
  });

  const editSNC = useSendData(
    `/salida-no-conforme/${props.idsalida_noconforme}`,
    {
      method: "put",
      refetchFn: () => {
        limpiarCampos();
        close();
      },
    }
  );

  const limpiarCampos = () => {
    editorDescripcion.current?.clean();
    editorConcesion.current?.clean();
    editorAccion.current?.clean();
    setBody(initialBody);
  };

  useEffect(() => {
    if (props.edit) {
      editorDescripcion.current?.setContent(props.body.descripcionFalla);
      props.body.accionesCorregir &&
        editorAccion.current?.setContent(props.body.accionesCorregir);
      props.body.concesiones &&
        editorConcesion.current?.setContent(props.body.concesiones);
    }
  }, [props.edit, props.body]);

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
    <form
      className="xl:w-[800px] xl:min-w-[850px] p-4 rounded mx-auto shadow"
      onSubmit={(ev) => {
        ev.preventDefault();
        props.edit
          ? editSNC.mutateAsync(body).then(limpiarCampos)
          : saveSNC.mutateAsync(body).then(limpiarCampos);
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
        <SelectEmpleado
          variable={body}
          setVariable={setBody}
          label="Empleado"
          name="idEmpleadoIncumple"
          departamento="all"
          estatus={props.edit ? "todo" : []}
          required
        />
        <SelectIncumplimientos
          variable={body}
          setVariable={setBody}
          name="idIncumplimiento"
          required
        />
      </div>
      <div className="rounded mb-2 border border-1 border-base-300 rounded">
        <EditorTipTap
          title="Descripción de la falla"
          ref={editorDescripcion}
          value={body}
          name="descripcionFalla"
          onChange={(e) =>
            setBody({ ...body, [e.target.name]: e.target.value })
          }
          placeholder="Escribe la descripción de la falla o informidad"
        />
      </div>

      <div className="rounded mb-2 border border-1 border-base-300 rounded">
        <EditorTipTap
          title="Acciones aplicadas para corregir la falla"
          ref={editorAccion}
          value={body}
          name="accionesCorregir"
          onChange={(e) =>
            setBody({ ...body, [e.target.name]: e.target.value })
          }
          placeholder="Acciones a corregir (En caso que aplique)"
        />
      </div>

      <div className="rounded mb-2 border border-1 border-base-300 rounded">
        <EditorTipTap
          title="Concesiones"
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
      <div className="mt-3">
        <button
          className="btn bg-[#ef4444] hover:bg-[#d93c3c] text-white rounded-lg w-full"
          type="submit"
        >
          {props.edit
            ? "Editar Salida No Conforme"
            : "Guardar Salida No Conforme"}
        </button>
      </div>
    </form>
  );
};

export default FormularioSNC;

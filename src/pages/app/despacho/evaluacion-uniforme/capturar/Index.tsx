import { evaluacionesUniformeInterface } from "@assets/interfaces";
import { InputFecha } from "@components/forms/Input";
import { SelectEmpleado } from "@components/forms/Select";
import SectionTitle from "@components/gui/SectionTitle";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import { FC, useState } from "react";
import Toggle from "./components/Toggle";
import Loader from "@components/gui/Loader";
import Button from "@components/Button";
import { useSendData } from "@hooks/useSendData";

interface evaluaciones extends getDataInterface {
  data: { response: evaluacionesUniformeInterface[] };
}

const CapturarEvUniforme: FC = () => {
  const [body, setBody] = useState<{
    empleado?: number;
    fecha?: string;
    evaluaciones: { cumple: 1 | 0; idCumplimiento: number }[];
  }>({
    evaluaciones: [
      { idCumplimiento: 8, cumple: 1 },
      { idCumplimiento: 2, cumple: 1 },
      { idCumplimiento: 3, cumple: 1 },
      { idCumplimiento: 4, cumple: 1 },
      { idCumplimiento: 5, cumple: 1 },
      { idCumplimiento: 6, cumple: 1 },
      { idCumplimiento: 7, cumple: 1 },
    ],
  });

  const { data, isError, isPending }: evaluaciones = useGetData(
    "/evaluacion-uniforme/get-pasos?vigentes=1",
    "evalUniformeData"
  );

  const addEval = useSendData("evaluacion-uniforme", {
    method: "post",
    refetchFn: () => {
      setBody({
        evaluaciones: [
          { idCumplimiento: 8, cumple: 1 },
          { idCumplimiento: 2, cumple: 1 },
          { idCumplimiento: 3, cumple: 1 },
          { idCumplimiento: 4, cumple: 1 },
          { idCumplimiento: 5, cumple: 1 },
          { idCumplimiento: 6, cumple: 1 },
          { idCumplimiento: 7, cumple: 1 },
        ],
      });
    },
  });
  console.log(body);

  return (
    <div>
      <SectionTitle
        titulo="Capturar evaluación de uniforme"
        subtitulo="Despacho"
      />
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          addEval.mutate(body);
        }}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <InputFecha
            label="Fecha de la evaluación"
            name="fecha"
            variable={body}
            setVariable={setBody}
            todayBtn
            required
          />
          <SelectEmpleado
            label="Empleado a evaluar"
            name="empleado"
            variable={body}
            departamento="1"
            estatus={[]}
            required
            setVariable={setBody}
          />
        </div>
        <Loader isPending={isPending} />

        {!isPending && !isError && (
          <>
            <span className="font-bold">Evaluaciones</span>
            {data.response.map((el) => (
              <Toggle
                text={el.cumplimiento}
                variable={body}
                setVariable={setBody}
                idCumplimiento={el.idcumplimiento_uniforme}
                reset={addEval.isSuccess}
              />
            ))}
          </>
        )}
        <Button buttonType="submit" text="Enviar" block />
      </form>
    </div>
  );
};
export default CapturarEvUniforme;

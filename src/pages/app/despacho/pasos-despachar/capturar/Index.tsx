import { evaluacionesPasosDespacharInterface } from "@assets/interfaces";
import Button from "@components/Button";
import { InputFecha } from "@components/forms/Input";
import { SelectEmpleado } from "@components/forms/Select";
import Loader from "@components/gui/Loader";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import { FC, useState } from "react";
import Toggle from "./components/Toggle";
import SectionTitle from "@components/gui/SectionTitle";
import { useSendData } from "@hooks/useSendData";

interface pasos extends getDataInterface {
  data: { response: evaluacionesPasosDespacharInterface[] };
}

const CapturarPasosDespachar: FC = () => {
  const [body, setBody] = useState<{
    empleado?: number;
    fecha?: string;
    pasos: { evaluacion: 1 | 0; idPaso: number }[];
  }>({
    pasos: [
      {
        evaluacion: 1,
        idPaso: 1,
      },
      {
        evaluacion: 1,
        idPaso: 2,
      },
      {
        evaluacion: 1,
        idPaso: 3,
      },
      {
        evaluacion: 1,
        idPaso: 4,
      },
      {
        evaluacion: 1,
        idPaso: 5,
      },
      {
        evaluacion: 1,
        idPaso: 6,
      },
      {
        evaluacion: 1,
        idPaso: 7,
      },
      {
        evaluacion: 1,
        idPaso: 8,
      },
      {
        evaluacion: 1,
        idPaso: 9,
      },
    ],
  });
  const { data, isPending, isError }: pasos = useGetData(
    "pasos-despachar/get-pasos",
    "evalPasosDespacharData"
  );

  const addEval = useSendData("pasos-despachar", {
    method: "post",
    refetchFn: () => {
      setBody({
        pasos: [
          {
            evaluacion: 1,
            idPaso: 1,
          },
          {
            evaluacion: 1,
            idPaso: 2,
          },
          {
            evaluacion: 1,
            idPaso: 3,
          },
          {
            evaluacion: 1,
            idPaso: 4,
          },
          {
            evaluacion: 1,
            idPaso: 5,
          },
          {
            evaluacion: 1,
            idPaso: 6,
          },
          {
            evaluacion: 1,
            idPaso: 7,
          },
          {
            evaluacion: 1,
            idPaso: 8,
          },
          {
            evaluacion: 1,
            idPaso: 9,
          },
        ],
      });
    },
  });

  console.log(
    !isPending &&
      data.response.map((el) => ({
        evaluacion: 1,
        idPaso: el.idpaso_despachar,
      }))
  );

  return (
    <div>
      <SectionTitle
        titulo="Capturar evaluación pasos para despachar"
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
                text={el.paso}
                variable={body}
                setVariable={setBody}
                idCumplimiento={el.idpaso_despachar}
                reset={addEval.isSuccess}
              />
            ))}
          </>
        )}
        <Button
          buttonType="submit"
          text="Enviar"
          isPending={addEval.isPending}
          block
        />
      </form>
    </div>
  );
};
export default CapturarPasosDespachar;

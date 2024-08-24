import Icon from "../../../../components/Icon";
import { FC, useContext, useRef, ChangeEvent, useMemo, useEffect } from "react";
import format from "../../../../assets/format";
import {
  ContextPreliq,
  manguerasInterface,
  preciosInterface,
} from "../../components/ContextPreliq";
import Input from "./Input";

interface manguera {
  idgas: string;
  nombre: string;
  mangueras: {
    idmanguera: string;
    tiene: boolean;
    direccion: "dr" | "iz";
    idgas: string;
    idsla: number;
  };
}

const InputMangueras: FC<{
  data: manguera;
  label: string;
  setIdManguera: any;
}> = ({ data, label, setIdManguera }) => {
  const { body, setBody } = useContext(ContextPreliq).mangueras;
  const { body: precios } = useContext(ContextPreliq).precios;
  const numIsla = Number(label.split(" ")[1]);
  const ID_MODAL = "modal-confirm-delete-lectura";

  const refInicial = useRef<HTMLInputElement>(null);
  const refFinal = useRef<HTMLInputElement>(null);

  const handle = (
    ev: ChangeEvent<HTMLInputElement>,
    ref: { current: HTMLInputElement }
  ) => {
    const { value, name } = ev.currentTarget;

    const regExpOnlyNumber = new RegExp(/^\d+$/, "g");

    const indexOfValue = body.findIndex(
      (el) => el.idManguera === data.mangueras.idmanguera
    );
    const formatedValue = format.zFill(value);

    if (regExpOnlyNumber.test(value)) {
      //verifica si que quieren agregar caracteres distintos a numeros
      ref.current.classList.remove("input-error");
      const newValue: manguerasInterface = {
        idManguera: data.mangueras.idmanguera,
        [name]: formatedValue,
        precioUnitario: precios[data.idgas as keyof preciosInterface],
      };

      if (indexOfValue < 0) {
        //verifica que existe el valor en el arreglo de las mangueras
        setBody((prev: manguerasInterface[]) => [...prev, newValue]);
      } else {
        const actualValues = body;

        actualValues[indexOfValue][name as keyof manguerasInterface] =
          formatedValue; //cambia los valores en el indice que contenga al elemento

        if (
          body[indexOfValue].hasOwnProperty("lecturaInicial") &&
          body[indexOfValue].hasOwnProperty("lecturaFinal")
        ) {
          refInicial.current?.classList.remove(
            "input-warning",
            "input-success"
          );
          refFinal.current?.classList.remove("input-warning", "input-success");

          const lecturaI = Number(body[indexOfValue].lecturaInicial);
          const lecturaF = Number(body[indexOfValue].lecturaFinal);

          if (lecturaF < lecturaI) {
            refInicial.current?.classList.add("input-warning");
            refFinal.current?.classList.add("input-warning");
          } else {
            refInicial.current?.classList.add("input-success");
            refFinal.current?.classList.add("input-success");
          }

          const litrosVendidos =
            lecturaF >= lecturaI
              ? lecturaF - lecturaI
              : 9999999 - lecturaI + lecturaF + 1;

          actualValues[indexOfValue]["litrosVendidos"] = litrosVendidos;
        } //verifica y realiza el calculo de litros vendidos

        setBody([...actualValues]);
      }
    } else {
      if (name === "lecturaInicial") {
        refInicial.current?.classList.add("input-error");
      } else {
        refFinal.current?.classList.add("input-error");
      }
    }
  };

  const { inicial, final } = useMemo(() => {
    const indexOfValue = body.findIndex(
      (el) => el.idManguera === data.mangueras.idmanguera
    );

    if (indexOfValue >= 0) {
      if (
        body[indexOfValue].hasOwnProperty("lecturaInicial") &&
        !body[indexOfValue].hasOwnProperty("lecturaFinal")
      ) {
        return {
          inicial: body[indexOfValue].lecturaInicial,
          final: "",
        } as const;
      }

      if (
        body[indexOfValue].hasOwnProperty("lecturaFinal") &&
        !body[indexOfValue].hasOwnProperty("lecturaInicial")
      ) {
        return {
          inicial: "",
          final: body[indexOfValue].lecturaFinal,
        } as const;
      }

      return {
        inicial: body[indexOfValue].lecturaInicial,
        final: body[indexOfValue].lecturaFinal,
      } as const;
    }
    return { inicial: "", final: "" } as const;
  }, [body]); //retorna los valores de cada input automaticamente

  useEffect(() => {
    localStorage.setItem("manguerasPreliq", JSON.stringify(body));
  }, [body]);

  return (
    <>
      <div className="flex flex-col">
        <p className="text-center">
          {data.mangueras.idmanguera}{" "}
          {`${data.idgas}${
            data.mangueras.direccion === "dr" ? numIsla * 2 : numIsla * 2 - 1
          }`}
        </p>
        <div className="flex items-center gap-4 justify-evenly lg:justify-normal">
          <Input
            label="Lectura inicial"
            name="lecturaInicial"
            handleFn={handle}
            value={inicial}
            ref={refInicial}
          />
          <Input
            label="Lectura final"
            name="lecturaFinal"
            handleFn={handle}
            value={final}
            ref={refFinal}
          />
          <button
            className={`btn btn-error ${
              inicial !== "" || final !== "" ? "" : "btn-disabled"
            }`}
            onClick={() => {
              setIdManguera({
                idManguera: data.mangueras.idmanguera,
                refs: { final: refFinal, inicial: refInicial },
              });
              (
                document.getElementById(ID_MODAL) as HTMLDialogElement
              ).showModal();
            }}
          >
            <Icon icon="trash" />
          </button>
        </div>
      </div>
    </>
  );
};
export default InputMangueras;

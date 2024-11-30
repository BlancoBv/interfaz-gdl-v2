import Icon from "@components/Icon";
import { FC, useContext, useRef, ChangeEvent, useMemo, useEffect } from "react";
import format from "@assets/format";
import {
  ContextLiq,
  manguerasInterface,
  preciosInterface,
} from "../../components/ContextLiq";
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
  const { body, setBody } = useContext(ContextLiq).mangueras;
  const { body: precios } = useContext(ContextLiq).precios;
  const { setBody: setError } = useContext(ContextLiq).error;
  const { lecturasIniciales } = useContext(ContextLiq).otherData;
  const numIsla = Number(label.split(" ")[1]);
  const posicion =
    data.mangueras.direccion === "dr" ? numIsla * 2 : numIsla * 2 - 1;
  const idManguera = data.mangueras.idmanguera;

  const idMangueraGenerico = `${data.idgas}${posicion}`;

  const ID_MODAL = "modal-confirm-delete-lectura";
  const lecturaInicial =
    lecturasIniciales?.find((el) => el.idmanguera === idManguera)
      ?.lecturas_finales[0]?.lecturaf ?? 0;

  const refInicial = useRef<HTMLInputElement>(null);
  const refFinal = useRef<HTMLInputElement>(null);

  const handle = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = ev.currentTarget;

    const regExpOnlyNumber = new RegExp(/^\d+$/, "g");

    const indexOfValue = body.findIndex((el) => el.idManguera === idManguera);
    const formatedValue = format.zFill(value);

    if (regExpOnlyNumber.test(value)) {
      //verifica si que quieren agregar caracteres distintos a numeros
      refFinal.current?.classList.remove("input-sucess", "input-error");
      refInicial.current?.classList.remove("input-sucess", "input-error");

      const newValue: manguerasInterface = {
        idManguera: idManguera,
        [name]: formatedValue,
        precioUnitario:
          "22" /* precios[data.idgas as keyof preciosInterface] ?? "1" */,
      };

      if (indexOfValue < 0) {
        //verifica que existe el valor en el arreglo de las mangueras
        setBody?.((prev: manguerasInterface[]) => [...prev, newValue]);
      } else {
        const actualValues = body;

        actualValues[indexOfValue][name as keyof manguerasInterface] =
          formatedValue; //cambia los valores en el indice que contenga al elemento

        if (body[indexOfValue].hasOwnProperty("lecturaFinal")) {
          refInicial.current?.classList.remove(
            "input-warning",
            "input-success"
          );
          refFinal.current?.classList.remove("input-warning", "input-success");

          const lecturaI = Number(lecturaInicial);
          const lecturaF = Number(body[indexOfValue].lecturaFinal);

          if (lecturaF < lecturaI) {
            //refInicial.current?.classList.add("input-warning");
            refFinal.current?.classList.add("input-warning");
            setError?.(true);
          } else {
            //refInicial.current?.classList.add("input-success");
            refFinal.current?.classList.add("input-success");
            setError?.(false);
          }

          const litrosVendidos =
            lecturaF >= lecturaI
              ? lecturaF - lecturaI
              : 9999999 - lecturaI + lecturaF + 1;

          actualValues[indexOfValue]["litrosVendidos"] = litrosVendidos;
          actualValues[indexOfValue]["lecturaInicial"] = lecturaInicial;
          actualValues[indexOfValue]["idmangueraGenerico"] = idMangueraGenerico;
          actualValues[indexOfValue]["manguera"] = idManguera;

          actualValues[indexOfValue]["posicion"] = posicion;
          actualValues[indexOfValue]["idisla"] = data.mangueras.idsla;
          actualValues[indexOfValue]["combustible"] = data.nombre;
        } //verifica y realiza el calculo de litros vendidos

        setBody?.([...actualValues]);
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
    const indexOfValue = body.findIndex((el) => el.idManguera === idManguera);

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

  console.log(precios, data);

  useEffect(() => {
    const indexOfValue = body.findIndex(
      (el) => el.idManguera === data.mangueras.idmanguera
    );

    if (indexOfValue >= 0) {
      if (
        body[indexOfValue].hasOwnProperty("lecturaInicial") &&
        !body[indexOfValue].hasOwnProperty("lecturaFinal")
      ) {
        refFinal.current?.classList.add("input-error");
        refInicial.current?.classList.add("input-error");
      }

      if (
        body[indexOfValue].hasOwnProperty("lecturaFinal") &&
        body[indexOfValue].hasOwnProperty("lecturaInicial")
      ) {
        refFinal.current?.classList.add("input-success");
        refInicial.current?.classList.add("input-success");
      }
    }
    return () => {
      refFinal.current?.classList.remove("input-sucess", "input-error");
      refInicial.current?.classList.remove("input-sucess", "input-error");
    };
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <p className="text-center">
          <span className="flex gap-4 items-center justify-center">
            {idMangueraGenerico}
            <span className="text-xs">{format.zFill(lecturaInicial)}</span>
          </span>
        </p>
        <div className="flex items-center gap-4 justify-evenly lg:justify-normal">
          <Input
            label="Lectura final"
            name="lecturaFinal"
            handleFn={handle}
            value={final}
            ref={refFinal}
          />
        </div>
      </div>
    </>
  );
};
export default InputMangueras;

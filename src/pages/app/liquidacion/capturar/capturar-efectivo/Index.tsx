import { FC, useContext, useEffect, useState } from "react";
import SectionTitle from "@components/gui/SectionTitle";
import Input from "./components/Input";
import TablaEV from "./components/Table";
import { ContextLiq } from "../../components/ContextLiq";
import { toast } from "react-toastify";

const CapturarEfectivo: FC = () => {
  const { body, setBody } = useContext(ContextLiq).efectivo;
  const [relativeData, setRelativeData] = useState<{
    value?: string;
    index?: number;
  }>({});

  const deleteElement = (index: number | undefined) => {
    if (index !== undefined) {
      const fGroup = body.slice(0, index);
      const lGroup = body.slice(index + 1);
      setBody?.(() => [...fGroup, ...lGroup]);
      toast.success("Eliminado correctamente", { containerId: "global" });
    }
  };

  useEffect(() => {
    localStorage.setItem("efectivoLiq", JSON.stringify(body));
  }, [body]);

  return (
    <div className="w-full">
      <SectionTitle titulo="Capturar efectivo" subtitulo="Liquidación" />
      <div className="flex flex-col items-center">
        <Input label="Monto" setVariable={setBody} />
        <TablaEV
          data={body.map?.((el, index) => ({
            monto: el.monto ?? "",
            index: index,
          }))}
          deleteElement={deleteElement}
          relativeData={relativeData}
          setRelativeData={setRelativeData}
          variable={body}
          setVariable={setBody}
        />
      </div>
    </div>
  );
};
export default CapturarEfectivo;

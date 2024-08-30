import { FC, useContext, useEffect, useState } from "react";
import SectionTitle from "@components/gui/SectionTitle";
import Input from "../capturar-efectivo/components/Input";
import TablaEV from "../capturar-efectivo/components/Table";
import { ContextPreliq } from "../components/ContextPreliq";
import { toast } from "react-toastify";

const CapturarVales: FC = () => {
  const { body, setBody } = useContext(ContextPreliq).vales;
  const [relativeData, setRelativeData] = useState<{
    value?: string;
    index?: number;
  }>({});

  const deleteElement = (index: number | undefined) => {
    if (index !== undefined) {
      const fGroup = body.cantidad.slice(0, index);
      const lGroup = body.cantidad.slice(index + 1);
      setBody?.((prev) => ({ ...prev, cantidad: [...fGroup, ...lGroup] }));
      toast.success("Eliminado correctamente", { containerId: "global" });
    }
  };

  useEffect(() => {
    localStorage.setItem("valesPreliq", JSON.stringify(body));
  }, [body]);

  return (
    <div className="w-full">
      <SectionTitle titulo="Capturar vales" subtitulo="Preliquidación" />

      <Input label="Monto" setVariable={setBody} />
      <TablaEV
        data={body.cantidad.map((el, index) => ({ value: el, index }))}
        deleteElement={deleteElement}
        relativeData={relativeData}
        setRelativeData={setRelativeData}
        variable={body.cantidad}
        setVariable={setBody}
      />
    </div>
  );
};
export default CapturarVales;

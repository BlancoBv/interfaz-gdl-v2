import { FC, useContext, useEffect } from "react";
import SectionTitle from "@components/gui/SectionTitle";
import Input from "../capturar-efectivo/components/Input";
import TablaEV from "../capturar-efectivo/components/Table";
import { ContextPreliq } from "../components/ContextPreliq";

const CapturarVales: FC = () => {
  const { body, setBody } = useContext(ContextPreliq).efectivo;
  useEffect(() => {
    localStorage.setItem("efectivoPreliq", JSON.stringify(body));
  }, [body]);

  return (
    <div className="w-full h-full">
      <SectionTitle titulo="Capturar vales" subtitulo="Preliquidación" />
      <div className="flex flex-col items-center">
        <Input label="Monto" variable={body} setVariable={setBody} />
        <TablaEV data={body.cantidad} />
      </div>
    </div>
  );
};
export default CapturarVales;

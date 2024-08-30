import { FC, useContext, useEffect, useState } from "react";
import SectionTitle from "@components/gui/SectionTitle";
import Input from "./components/Input";
import TablaEV from "./components/Table";
import { ContextPreliq } from "../components/ContextPreliq";
import { toast } from "react-toastify";

const CapturarEfectivo: FC = () => {
  const { body, setBody } = useContext(ContextPreliq).efectivo;
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
    localStorage.setItem("efectivoPreliq", JSON.stringify(body));
  }, [body]);

  return (
    <div className="w-full">
      <SectionTitle titulo="Capturar efectivo" subtitulo="Preliquidación" />
      <div className="flex flex-col items-center">
        <Input label="Monto" setVariable={setBody} />
        <TablaEV
          data={body.cantidad.map((el, index) => ({ value: el, index }))}
          deleteElement={deleteElement}
          relativeData={relativeData}
          setRelativeData={setRelativeData}
          variable={body.cantidad}
          setVariable={setBody}
        />
        {/* <Table
          data={body.cantidad.map((el, index) => ({ value: el, index }))}
          columns={[
            { name: "Monto", selector: (el) => format.formatDinero(el.value) },
          ]}
          setRelativeData={setRelativeData}
          contextualMenuItems={[
            {
              name: "Editar",
              elementType: "item",
              icon: "pen-to-square",
              onClick: () => {
                (
                  document.getElementById("edit-monto") as HTMLDialogElement
                ).showModal();
              },
            },
            { elementType: "separator" },
            {
              name: "Eliminar",
              elementType: "item",
              icon: "trash",
              color: "error",
              onClick: () => deleteElement(relativeData.index),
            },
          ]}
          hoverable
          noDataMsg="Ingresa algunos montos"
        /> */}
      </div>
    </div>
  );
};
export default CapturarEfectivo;

import { FC, useContext, useEffect, useState } from "react";
import SectionTitle from "@components/gui/SectionTitle";
import Input, { InputEdit } from "./components/Input";
import TablaEV from "./components/Table";
import { ContextPreliq } from "../components/ContextPreliq";
import Table from "@components/Table";
import format from "@assets/format";
import { toast } from "react-toastify";
import Modal from "@components/gui/Modal";

const CapturarEfectivo: FC = () => {
  const { body, setBody } = useContext(ContextPreliq).efectivo;
  const [relativeData, setRelativeData] = useState<{
    value?: string;
    index?: number;
  }>({});
  const [showModal, setShowModal] = useState<boolean>(false);

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
    <div className="w-full h-full">
      <Modal id="edit-monto" title="Editar monto" sm>
        <InputEdit
          label="Monto"
          setVariable={setRelativeData}
          initialValue={String(relativeData.value)}
        />
      </Modal>
      <SectionTitle titulo="Capturar efectivo" subtitulo="Preliquidación" />
      <div className="flex flex-col items-center">
        <Input label="Monto" setVariable={setBody} />
        {/* <TablaEV data={body.cantidad} /> */}
        <Table
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
        />
      </div>
    </div>
  );
};
export default CapturarEfectivo;

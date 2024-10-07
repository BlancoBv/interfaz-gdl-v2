import format from "@assets/format";
import Modal from "@components/gui/Modal";
import Table from "@components/Table";
import { FC } from "react";
import { InputEdit } from "./Input";

const TablaEV: FC<{
  data: { value: string; index: number }[];
  deleteElement: (index: number) => void;
  setRelativeData: any;
  relativeData: any;
  variable: string[];
  setVariable: any;
}> = ({
  data,
  setRelativeData,
  deleteElement,
  relativeData,
  variable,
  setVariable,
}) => {
  return (
    <>
      <Modal id="edit-monto" title="Editar monto" sm>
        <InputEdit
          label="Monto"
          setVariable={setVariable}
          initialValue={String(relativeData.value)}
          variable={variable}
          elementIndex={relativeData.index}
        />
      </Modal>
      <Table
        data={data}
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
            show: true,
          },
          { elementType: "separator", show: true },
          {
            name: "Eliminar",
            elementType: "item",
            icon: "trash",
            color: "error",
            show: true,
            onClick: () => deleteElement(relativeData.index),
          },
        ]}
        hoverable
        noDataMsg="Ingresa algunos montos"
      />
    </>
  );
};
export default TablaEV;

import CintaOpciones from "@components/gui/CintaOpciones";
import SectionTitle from "@components/gui/SectionTitle";
import Icon from "@components/Icon";
import { useGetData } from "@hooks/useGetData";
import { FC, useState } from "react";
import { departamentoInterface } from "@assets/interfaces";
import { getDataInterface } from "@hooks/useGetData";
import Table from "@components/Table";
import Modal, { ModalConfirmNoMutate } from "@components/gui/Modal";
import { Input } from "@components/forms/Input";
import Button from "@components/Button";
import { useSendData } from "@hooks/useSendData";

interface data extends getDataInterface {
  data: { response: departamentoInterface[] };
}

const Departamentos: FC = () => {
  const [relativeData, setRelativeData] = useState<
    Partial<departamentoInterface>
  >({});
  const [body, setBody] = useState<{ departamento?: string }>({});
  const { data, isError, isPending, refetch }: data = useGetData(
    "departamento",
    "departamentoData"
  );

  const editDepart = useSendData(
    `departamento/${relativeData.iddepartamento}`,
    {
      method: "put",
      refetchFn: () => {
        (document.getElementById("editDepart") as HTMLDialogElement).close();
        refetch();
      },
    }
  );

  const deleteDepart = useSendData(
    `departamento/${relativeData.iddepartamento}`,
    { method: "delete", refetchFn: refetch }
  );
  const addDepart = useSendData("departamento", {
    method: "post",
    containerID: "global",
    refetchFn: () => {
      (document.getElementById("addDepart") as HTMLDialogElement).close();
      setBody({});
      refetch();
    },
  });

  return (
    <div>
      <ModalConfirmNoMutate
        action={() => deleteDepart.mutate({})}
        msg="¿Desea eliminar este elemento?"
      />

      <Modal id="editDepart" title="Editar departamento" sm>
        <form
          className="flex flex-col justify-center items-center w-full gap-4"
          onSubmit={(ev) => {
            ev.preventDefault();
            editDepart.mutate({ departamento: relativeData.departamento });
          }}
        >
          <Input
            label="Nombre del departamento"
            name="departamento"
            variable={relativeData}
            setVariable={setRelativeData}
          />
          <Button
            text="Actualizar"
            buttonType="submit"
            isPending={editDepart.isPending}
          />
        </form>
      </Modal>
      <Modal id="addDepart" title="Añadir nuevo departamento" sm>
        <form
          className="flex flex-col justify-center items-center w-full gap-4"
          onSubmit={(ev) => {
            ev.preventDefault();
            addDepart.mutate({ departamento: body.departamento });
          }}
        >
          <Input
            label="Nombre del departamento"
            name="departamento"
            variable={body}
            setVariable={setBody}
          />
          <Button
            text="Actualizar"
            buttonType="submit"
            isPending={addDepart.isPending}
          />
        </form>
      </Modal>
      <SectionTitle titulo="Departamentos" subtitulo="Recursos humanos" />
      <CintaOpciones>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            (
              document.getElementById("addDepart") as HTMLDialogElement
            ).showModal();
          }}
        >
          <Icon icon="plus" size="2x" /> Añadir departamento
        </button>
      </CintaOpciones>
      {!isError && !isPending && (
        <Table
          data={data.response}
          columns={[
            {
              name: "ID",
              selector: (el: departamentoInterface) => el.iddepartamento,
            },
            {
              name: "Departamento",
              selector: (el: departamentoInterface) => el.departamento,
            },
          ]}
          contextualMenuItems={[
            {
              name: "Editar",
              icon: "pen-to-square",
              elementType: "item",
              onClick: () => {
                (
                  document.getElementById("editDepart") as HTMLDialogElement
                ).showModal();
              },
            },
            {
              name: "Eliminar",
              icon: "trash",
              elementType: "item",
              color: "error",
              onClick: () => {
                (
                  document.getElementById(
                    "modal-confirm-no-mutate"
                  ) as HTMLDialogElement
                ).showModal();
              },
            },
          ]}
          setRelativeData={setRelativeData}
        />
      )}
    </div>
  );
};

export default Departamentos;

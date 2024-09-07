import SectionTitle from "@components/gui/SectionTitle";
import { useGetData } from "@hooks/useGetData";
import { FC, useState } from "react";
import { getDataInterface } from "@hooks/useGetData";
import { controlDocumentoInterface } from "@assets/interfaces";
import Table from "@components/Table";
import Modal from "@components/gui/Modal";

interface getDocumentos extends getDataInterface {
  data: { response: controlDocumentoInterface[] };
}
const Documentos: FC = () => {
  const [relativeData, setRelativeData] = useState<
    Partial<controlDocumentoInterface>
  >({});
  const { data, isError, isPending, refetch }: getDocumentos = useGetData(
    "control-documento",
    "listaEmpDocData"
  );
  return (
    <div>
      <Modal
        id="edit-docs"
        title={`Editar documentos de ${relativeData.nombre_completo}`}
      ></Modal>
      <SectionTitle titulo="Documentos" subtitulo="Recursos humanos" />
      {!isError && !isPending && (
        <Table
          data={data.response}
          columns={[
            {
              name: "ID",
              selector: (el: controlDocumentoInterface) => el.idchecador,
            },
            {
              name: "Empleado",
              selector: (el: controlDocumentoInterface) => el.nombre_completo,
            },
            {
              name: "Núm. de documentos",
              selector: (el: controlDocumentoInterface) => el.num_documentos,
            },
          ]}
          contextualMenuItems={[
            {
              name: "Editar",
              icon: "pen-to-square",
              elementType: "item",
              onClick: () => {
                (
                  document.getElementById("edit-docs") as HTMLDialogElement
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

export default Documentos;

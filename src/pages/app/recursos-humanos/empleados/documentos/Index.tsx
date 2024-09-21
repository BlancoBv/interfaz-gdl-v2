import SectionTitle from "@components/gui/SectionTitle";
import { useGetData } from "@hooks/useGetData";
import { FC, useState } from "react";
import { getDataInterface } from "@hooks/useGetData";
import {
  controlDocumentoInterface,
  documentoEmpInterface,
} from "@assets/interfaces";
import Table from "@components/Table";
import Modal from "@components/gui/Modal";
import Loader from "@components/gui/Loader";
import AsyncToggle from "./components/AsyncToggle";

interface getDocumentos extends getDataInterface {
  data: { response: controlDocumentoInterface[] };
}

interface documento extends getDataInterface {
  data: { response: documentoEmpInterface[] };
}
const Documentos: FC = () => {
  const [relativeData, setRelativeData] = useState<
    Partial<controlDocumentoInterface>
  >({});
  const { data, isError, isPending, refetch }: getDocumentos = useGetData(
    "control-documento",
    "listaEmpDocData"
  );

  const documentos: documento = useGetData(
    `control-documento/${relativeData.idempleado}`,
    "documentosEmpData",
    {
      fetchInURLChange: true,
    }
  );

  console.log(relativeData, documentos);

  return (
    <div>
      <Modal
        id="edit-docs"
        title={`Editar documentos de ${relativeData.nombre_completo}`}
      >
        <div className="flex flex-col">
          {!documentos.isError &&
            !documentos.isPending &&
            documentos.data.response.map((el) => (
              <AsyncToggle
                key={`${el.idempleado} ${el.iddocumento}`}
                documento={el.documento}
                idControl={el.idcontrol_documento}
                iddocumento={el.iddocumento}
                idempleado={el.idempleado}
                refetch={refetch}
              />
            ))}
        </div>
        <Loader isPending={documentos.isPending} />
      </Modal>
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
            {
              name: "Estatus",
              selector: (el: controlDocumentoInterface) =>
                el.num_documentos > 10 ? "Cumple" : "No cumple",
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
              show: true,
            },
          ]}
          setRelativeData={setRelativeData}
          hoverable
        />
      )}
    </div>
  );
};

export default Documentos;

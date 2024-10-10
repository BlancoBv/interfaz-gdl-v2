import format from "@assets/format";
import { historialUniformeInterface } from "@assets/interfaces";
import Button from "@components/Button";
import { SelectEmpleado } from "@components/forms/Select";
import CintaOpciones from "@components/gui/CintaOpciones";
import Loader from "@components/gui/Loader";
import Modal, { ModalConfirmNoMutate } from "@components/gui/Modal";
import SectionTitle from "@components/gui/SectionTitle";
import Table from "@components/Table";
import { useModal } from "@hooks/useModal";
import { sendDataInterface, useSendData } from "@hooks/useSendData";
import { FC, SyntheticEvent, useState } from "react";
import Line from "@components/charts/Line";
import { useGetData } from "@hooks/useGetData";
import Toggle from "./components/Toggle";
import Icon from "@components/Icon";

interface historial extends sendDataInterface {
  data: {
    response: historialUniformeInterface[];
  };
}
const HistorialEvUniforme: FC = () => {
  const [filtros, setFiltros] = useState<{ despachador?: number }>({});
  const [relativeData, setRelativeData] = useState<
    Partial<historialUniformeInterface>
  >({});
  const [bodyUpdate, setBodyUpdate] = useState<{
    evaluaciones: { cumple: 1 | 0; idEvaluacionUniforme: number }[];
    empleado?: number;
  }>({ evaluaciones: [] });

  const modalConfirm = useModal("confirmDelEv");
  const modalEdit = useModal("modalEditEv");

  const { data, isPending, mutate, isSuccess }: historial = useSendData(
    `evaluacion-uniforme/buscar`
  );
  const singleEv = useGetData(
    `evaluacion-uniforme/buscar/${relativeData.identificador}`,
    "singleEvUniformeData",
    { fetchInURLChange: true }
  );

  const deleteEv = useSendData(
    `evaluacion-uniforme/eliminar/${relativeData.identificador}`,
    {
      method: "delete",
      refetchFn: () => {
        mutate({ idEmpleado: filtros.despachador });
      },
    }
  );
  const updateEv = useSendData("evaluacion-uniforme", {
    method: "put",
    refetchFn: () => {
      modalEdit.close();
      mutate({ idEmpleado: filtros.despachador });
      singleEv.refetch();
    },
  });

  return (
    <div>
      <SectionTitle
        titulo="Historial de evaluaciones de uniforme"
        subtitulo="Despacho"
      />
      <CintaOpciones
        onSubmit={(ev: SyntheticEvent) => {
          ev.preventDefault();
          mutate({ idEmpleado: filtros.despachador });
        }}
      >
        <SelectEmpleado
          label="Despachador"
          name="despachador"
          departamento="1"
          estatus={[]}
          variable={filtros}
          setVariable={setFiltros}
          required
        />
        <Button buttonType="submit" text="Buscar" />
      </CintaOpciones>
      <Loader isPending={isPending} />
      {!isPending && isSuccess && (
        <>
          <Modal
            id="modalEditEv"
            title="Editar registro"
            sm
            onClose={() => setBodyUpdate({ evaluaciones: [] })}
          >
            <form
              className="flex flex-col gap-4"
              onSubmit={(ev) => {
                ev.preventDefault();
                updateEv.mutate(bodyUpdate);
              }}
            >
              <Loader isPending={singleEv.isPending} />
              {!singleEv.isPending && !singleEv.isError && (
                <>
                  <span>
                    Fecha{" "}
                    {format.formatFecha(
                      (singleEv.data.response as historialUniformeInterface)
                        .fecha
                    )}
                  </span>
                  {singleEv.data.response.map(
                    (el: historialUniformeInterface) => (
                      <Toggle
                        key={el.idcumplimiento_uniforme}
                        label={el.cumplimiento}
                        name={el.idevaluacion_uniforme}
                        isChecked={el.cumple}
                        variable={bodyUpdate}
                        setVariable={setBodyUpdate}
                      />
                    )
                  )}
                </>
              )}
              <Button buttonType="submit" text="Enviar" block />
            </form>
          </Modal>
          <ModalConfirmNoMutate
            customID="confirmDelEv"
            action={() => deleteEv.mutate({})}
          />
          <div className="stats shadow w-full stats-vertical lg:stats-horizontal mb-4">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <Icon icon="user" size="2x" />
              </div>
              <div className="stat-title">Despachador</div>
              <div className="stat-value text-wrap">{`${data.response[0].nombre_completo}`}</div>
              <div className="stat-desc">ID: {data.response[0].idempleado}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <Icon icon="list-check" size="2x" />
              </div>
              <div className="stat-title">Evaluaciones capturadas</div>
              <div className="stat-value">{data.response.length}</div>
              {/* <div className="stat-desc"></div> */}
            </div>
          </div>
          <Table
            data={data.response}
            columns={[
              {
                name: "Fecha",
                selector: (el: historialUniformeInterface) =>
                  format.formatFecha(el.fecha),
              },
              {
                name: "Quincena",
                selector: (el: historialUniformeInterface) => el.quincena,
              },
              {
                name: "Puntos Obtenidos",
                selector: (el: historialUniformeInterface) =>
                  el.total_evaluacion,
              },
            ]}
            hoverable
            contextualMenuItems={[
              {
                name: "Editar",
                show: true,
                icon: "pen-to-square",
                elementType: "item",
                onClick: () => {
                  setBodyUpdate((prev) => ({
                    ...prev,
                    empleado: relativeData.idempleado,
                  }));
                  modalEdit.show();
                },
              },
              {
                name: "Eliminar",
                color: "error",
                icon: "trash",
                show: true,
                elementType: "item",
                onClick: () => modalConfirm.show(),
              },
            ]}
            setRelativeData={setRelativeData}
          />
          <Line
            etiquetaX="Quincenas"
            etiquetaY="Puntos"
            title={`Evaluaciones de ${data.response[0].nombre_completo}`}
            data={{
              datasets: [
                {
                  data: data.response.map((el) => ({
                    x: `${
                      el.quincena === 1 ? "1ra" : "2da"
                    } Qna. ${format.obtenerMesyYear(el.fecha)}`,
                    y: el.total_evaluacion,
                  })),
                  label: "Puntos",
                },
              ],
            }}
          />
        </>
      )}
    </div>
  );
};
export default HistorialEvUniforme;

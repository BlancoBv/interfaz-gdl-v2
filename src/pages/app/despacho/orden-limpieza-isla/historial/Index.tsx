import format from "@assets/format";
import { historialOyLInterface } from "@assets/interfaces";
import Button from "@components/Button";
import { SelectEmpleado } from "@components/forms/Select";
import CintaOpciones from "@components/gui/CintaOpciones";
import Loader from "@components/gui/Loader";
import SectionTitle from "@components/gui/SectionTitle";
import Icon from "@components/Icon";
import Table from "@components/Table";
import { sendDataInterface, useSendData } from "@hooks/useSendData";
import { FC, SyntheticEvent, useMemo, useState } from "react";
import Line from "@components/charts/Line";
import Modal, { ModalConfirmNoMutate } from "@components/gui/Modal";
import { useModal } from "@hooks/useModal";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import Toggle from "./components/Toggle";
import { Per } from "@assets/auth";

interface historial extends sendDataInterface {
  data: { response: historialOyLInterface[] };
}
interface registro extends getDataInterface {
  data: { response: historialOyLInterface[] };
}

const HistorialOyL: FC = () => {
  const [filtros, setFiltros] = useState<{ despachador?: number }>({});
  const [relativeData, setRelativeData] = useState<
    Partial<historialOyLInterface>
  >({});
  const [bodyUpdate, setBodyUpdate] = useState<{
    evaluaciones: { cumple: 1 | 0; idoyl: number }[];
    idEmpleado?: number;
  }>({ evaluaciones: [] });

  const modalEdit = useModal("editOyL");
  const modalConfirm = useModal("confirmDelOyL");

  const { data, isPending, mutate, isSuccess }: historial = useSendData(
    `ordenLimpieza/historial/${filtros.despachador}`
  );
  const editOyL = useSendData("ordenLimpieza", {
    method: "put",
    refetchFn: () => {
      modalEdit.close();
      setBodyUpdate({ evaluaciones: [] });
      mutate({});
    },
  });
  const deleteOyL = useSendData(
    `ordenLimpieza/identificador/${relativeData.identificador}`,
    {
      method: "delete",
      refetchFn: () => {
        mutate({});
      },
    }
  );

  const registroOyL: registro = useGetData(
    `ordenLimpieza/identificador/${relativeData.identificador}`,
    "singleOyLData",
    { fetchInURLChange: true, fetchTrigger: editOyL.isSuccess }
  );

  const dataChart = useMemo(() => {
    if (!isPending && isSuccess) {
      return [
        {
          data: data.response.map((el) => ({
            x: format.formatFecha(el.fecha),
            y: el.total,
          })),
          label: "Puntos obtenidos",
        },
      ];
    }
    return [];
  }, [data]);

  console.log(bodyUpdate);

  return (
    <div>
      <SectionTitle
        titulo="Historial de orden y limpieza"
        subtitulo="Despacho"
      />
      <CintaOpciones
        onSubmit={(ev: SyntheticEvent) => {
          ev.preventDefault();
          mutate({});
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
          <ModalConfirmNoMutate
            customID="confirmDelOyL"
            msg="¿Desea eliminar este elemento?"
            action={() => deleteOyL.mutateAsync({})}
          />
          <Modal
            id="editOyL"
            title="Editar registro"
            sm
            onClose={() => setBodyUpdate({ evaluaciones: [] })}
          >
            <form
              className="flex flex-col gap-4"
              onSubmit={(ev: SyntheticEvent) => {
                ev.preventDefault();
                editOyL.mutate(bodyUpdate);
              }}
            >
              <span>Fecha {relativeData.fecha}</span>
              <span>Estación {relativeData.estacionServicio}</span>Isla{" "}
              {relativeData.isla}
              <span>Turno {relativeData.turno}</span>
              <Loader isPending={registroOyL.isPending} />
              {!data && <span>Seleccione un empleado.</span>}
              {!registroOyL.isError && !registroOyL.isPending && (
                <>
                  {registroOyL.data.response.map((el) => (
                    <Toggle
                      label={el.cumplimiento}
                      variable={bodyUpdate}
                      setVariable={setBodyUpdate}
                      name={el.idoyl}
                      isChecked={el.cumple}
                    />
                  ))}
                </>
              )}
              <Button buttonType="submit" text="Enviar" />
            </form>
          </Modal>
          <div className="stats shadow w-full stats-vertical lg:stats-horizontal mb-4">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <Icon icon="user" size="2x" />
              </div>
              <div className="stat-title">Despachador</div>
              <div className="stat-value text-wrap">{`${data.response[0].nombre} ${data.response[0].apellido_paterno} ${data.response[0].apellido_materno}`}</div>
              <div className="stat-desc">ID: {data.response[0].idchecador}</div>
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
                selector: (el: historialOyLInterface) =>
                  format.formatFecha(el.fecha),
              },
              {
                name: "Estación de servicio",
                selector: (el: historialOyLInterface) => el.estacionServicio,
              },
              {
                name: "Isla",
                selector: (el: historialOyLInterface) => el.isla,
              },
              {
                name: "Turno",
                selector: (el: historialOyLInterface) => el.turno,
              },
              {
                name: "Puntos obtenidos",
                selector: (el: historialOyLInterface) => el.total,
              },
              {
                name: "Incidentes",
                selector: (el: historialOyLInterface) =>
                  el.incidentes ? el.incidentes : "---",
              },
            ]}
            hoverable
            contextualMenuItems={[
              {
                name: "Editar",
                elementType: "item",
                show: Per(18),
                icon: "pen-to-square",
                onClick: () => {
                  setBodyUpdate((prev) => ({
                    ...prev,
                    evaluaciones:
                      !registroOyL.isPending && !registroOyL.isError
                        ? registroOyL.data.response.map((el) => ({
                            cumple: el.cumple ? 1 : 0,
                            idoyl: el.idoyl,
                          }))
                        : [],
                    idEmpleado: relativeData.idempleado,
                  }));
                  modalEdit.show();
                },
              },
              {
                name: "Eliminar",
                show: Per(19),
                elementType: "item",
                icon: "trash",
                color: "error",
                onClick: () => {
                  modalConfirm.show();
                },
              },
            ]}
            setRelativeData={setRelativeData}
          />
          <Line
            etiquetaX="Fecha"
            etiquetaY="Puntos"
            data={{ datasets: dataChart }}
            title="Historial de puntos obtenidos"
          />
        </>
      )}
    </div>
  );
};
export default HistorialOyL;

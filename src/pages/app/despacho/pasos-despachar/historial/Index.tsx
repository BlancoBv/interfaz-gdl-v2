import format from "@assets/format";
import Button from "@components/Button";
import ButtonPDF from "@components/ButtonPDF";
import { InputFecha } from "@components/forms/Input";
import { SelectEmpleado } from "@components/forms/Select";
import CintaOpciones from "@components/gui/CintaOpciones";
import SectionTitle from "@components/gui/SectionTitle";
import Icon from "@components/Icon";
import PDFReportes from "@components/pdf/PDFReportes";
import Table from "@components/Table";
import { sendDataInterface, useSendData } from "@hooks/useSendData";
import { FC, SyntheticEvent, useMemo, useState } from "react";
import Line from "@components/charts/Line";
import { historialPasosDespacharInterface } from "@assets/interfaces";
import Modal, { ModalConfirmNoMutate } from "@components/gui/Modal";
import { useModal } from "@hooks/useModal";
import Toggle from "./components/Toggle";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import { Per } from "@assets/auth";

interface historial extends sendDataInterface {
  data: { response: historialPasosDespacharInterface[][] };
}

interface single extends getDataInterface {
  data: {
    response: {
      idevaluacion_despachar: number;
      evaluacion: boolean;
      paso: string;
    }[];
  };
}

const HistorialPasosDespachar: FC = () => {
  const [filtros, setFiltros] = useState<{
    idEmpleado: { nombre: string; id: number }[];
    fechaInicio: string;
    fechaFinal: string;
  }>({
    idEmpleado: [],
    fechaInicio: "",
    fechaFinal: "",
  });

  const [relativeData, setRelativeData] = useState<
    historialPasosDespacharInterface[]
  >([]);

  const [bodyUpdate, setBodyUpdate] = useState<{
    evaluaciones: { evaluacion: 1 | 0; idEvaluacionPaso: number }[];
    idEmpleado?: number;
  }>({ evaluaciones: [] });

  const modalDel = useModal("confirmDelEv");
  const modalEdit = useModal("modalEditEv");

  const { data, isSuccess, isPending, mutate }: historial = useSendData(
    "pasos-despachar/buscar"
  );

  const singleEv: single = useGetData(
    `pasos-despachar/${relativeData[0]?.identificador}`,
    "singlePasosDespacharData",
    { fetchInURLChange: true }
  );

  const deleteEv = useSendData(
    `pasos-despachar/eliminar/${relativeData[0]?.identificador}`,
    {
      method: "delete",
      refetchFn: () => {
        mutate(filtros);
      },
    }
  );

  const updateEv = useSendData("pasos-despachar", {
    method: "put",
    refetchFn: () => {
      modalEdit.close();
      mutate(filtros);
      singleEv.refetch();
    },
  });

  const promedio = useMemo(() => {
    if (!isPending && isSuccess) {
      //const promedio: number[] = [];
      const results = data.response.map((el) =>
        el.map((res) => (res.evaluacion ? 1 : 0))
      );
      const pasos = data.response[0].map((el) => el.paso);

      const promedio = pasos.map((el, index) => ({
        paso: el,
        promedio:
          (results
            .map((val) => val[index])
            .reduce((a: number, b: number) => a + b, 0) /
            results.length) *
          10,
      }));

      return promedio;
    }
    return [];
  }, [data, isPending]);

  return (
    <div>
      <SectionTitle
        titulo="Historial de pasos para despachar"
        subtitulo="Despacho"
      />
      <CintaOpciones
        onSubmit={(ev: SyntheticEvent) => {
          ev.preventDefault();
          mutate({ ...filtros });
        }}
      >
        <SelectEmpleado
          label="Despachador"
          name="idEmpleado"
          estatus={[]}
          departamento="1"
          variable={filtros}
          setVariable={setFiltros}
          required
        />
        <InputFecha
          label="Fecha Inicio"
          name="fechaInicio"
          variable={filtros}
          setVariable={setFiltros}
          required
        />
        <InputFecha
          label="Fecha Inicio"
          name="fechaFinal"
          variable={filtros}
          setVariable={setFiltros}
          todayBtn
          required
        />
        <ButtonPDF
          doc={
            <PDFReportes
              elementos={{
                tablas: ["tablaR"],
                graficas: ["chart-1"],
              }}
              title="Detalles evaluación uniforme"
            />
          }
          isPending={false}
        />
        <Button buttonType="submit" text="Filtrar" />
      </CintaOpciones>

      {!isPending && isSuccess && (
        <>
          <ModalConfirmNoMutate
            customID="confirmDelEv"
            action={() => deleteEv.mutate({})}
          />
          <Modal
            id="modalEditEv"
            title="Editar evaluación"
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
              {!singleEv.isPending && !singleEv.isError && (
                <>
                  <span>
                    Fecha {format.formatFecha(relativeData[0]?.fecha || "")}
                  </span>
                  {singleEv.data.response.map((el) => (
                    <Toggle
                      label={el.paso}
                      name={el.idevaluacion_despachar}
                      variable={bodyUpdate}
                      setVariable={setBodyUpdate}
                      isChecked={el.evaluacion}
                    />
                  ))}
                </>
              )}
              <Button buttonType="submit" text="Enviar" block />
            </form>
          </Modal>
          <div className="stats shadow w-full stats-vertical lg:stats-horizontal mb-4">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <Icon icon="user" size="2x" />
              </div>
              <div className="stat-title">Despachador</div>
              <div className="stat-value text-wrap">
                {data.response[0][0]?.nombre_completo}
              </div>
              <div className="stat-desc">
                ID: {data.response[0][0]?.idempleado}
              </div>
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
            id="tablaR"
            data={data.response}
            columns={[
              {
                name: "No. evaluación",
                selector: (_data, _col, row) =>
                  row !== undefined ? row + 1 : "",
              },
              {
                name: "Fecha",
                selector: (el) => format.formatFecha(el[0].fecha),
              },
              {
                name: "Jalar y saludar",
                selector: (el) => {
                  if (el[0].evaluacion) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  return (
                    <span className="text-error">
                      <Icon icon="xmark" />
                    </span>
                  );
                },
              },
              {
                name: "Que combustible desea",
                selector: (el) => {
                  if (el[1].evaluacion) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  return (
                    <span className="text-error">
                      <Icon icon="xmark" />
                    </span>
                  );
                },
              },
              {
                name: "Cuanto combustible requiere",
                selector: (el) => {
                  if (el[2].evaluacion) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  return (
                    <span className="text-error">
                      <Icon icon="xmark" />
                    </span>
                  );
                },
              },
              {
                name: "Su forma de pago",
                selector: (el) => {
                  if (el[3].evaluacion) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  return (
                    <span className="text-error">
                      <Icon icon="xmark" />
                    </span>
                  );
                },
              },
              {
                name: "Pantalla en ceros",
                selector: (el) => {
                  if (el[4].evaluacion) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  return (
                    <span className="text-error">
                      <Icon icon="xmark" />
                    </span>
                  );
                },
              },
              {
                name: "Ofrecer lubricante",
                selector: (el) => {
                  if (el[5].evaluacion) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  return (
                    <span className="text-error">
                      <Icon icon="xmark" />
                    </span>
                  );
                },
              },
              {
                name: "Colocar tapon",
                selector: (el) => {
                  if (el[6].evaluacion) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  return (
                    <span className="text-error">
                      <Icon icon="xmark" />
                    </span>
                  );
                },
              },
              {
                name: "Cobrar y preguntar si quiere ticket",
                selector: (el) => {
                  if (el[7].evaluacion) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  return (
                    <span className="text-error">
                      <Icon icon="xmark" />
                    </span>
                  );
                },
              },
              {
                name: "Agradecer al cliente",
                selector: (el) => {
                  if (el[8].evaluacion) {
                    return (
                      <span className="text-success">
                        <Icon icon="check" />
                      </span>
                    );
                  }
                  return (
                    <span className="text-error">
                      <Icon icon="xmark" />
                    </span>
                  );
                },
              },
            ]}
            hoverable
            setRelativeData={setRelativeData}
            contextualMenuItems={[
              {
                name: "Editar",
                icon: "pen-to-square",
                elementType: "item",
                show: Per(15),
                onClick: () => {
                  setBodyUpdate((prev) => ({
                    ...prev,
                    ...(!singleEv.isPending &&
                      !singleEv.isError && {
                        evaluaciones: singleEv.data.response.map((el) => ({
                          evaluacion: el.evaluacion ? 1 : 0,
                          idEvaluacionPaso: el.idevaluacion_despachar,
                        })),
                      }),
                    idEmpleado: relativeData[0]?.idempleado,
                  }));
                  modalEdit.show();
                },
              },
              {
                name: "Eliminar",
                icon: "trash",
                elementType: "item",
                show: Per(16),
                color: "error",
                onClick: () => modalDel.show(),
              },
            ]}
          />
          <Line
            id="chart-1"
            etiquetaX="Evaluaciones"
            etiquetaY="Promedio"
            title="Promedio por pasos"
            data={{
              datasets: [
                {
                  data: promedio.map((el) => ({
                    x: el?.paso,
                    y: format.formatDecimal(el?.promedio),
                  })),
                },
              ],
            }}
          />
        </>
      )}
    </div>
  );
};
export default HistorialPasosDespachar;

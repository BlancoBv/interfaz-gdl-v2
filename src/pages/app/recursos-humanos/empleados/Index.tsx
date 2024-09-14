import format from "@assets/format";
import { empleadoInterface } from "@assets/interfaces";
import Button from "@components/Button";
import { Input, InputFecha } from "@components/forms/Input";
import CintaOpciones from "@components/gui/CintaOpciones";
import Loader from "@components/gui/Loader";
import Modal from "@components/gui/Modal";
import SectionTitle from "@components/gui/SectionTitle";
import ListaEmpleados from "@components/pdf/recursos-humanos/ListaEmpleados";
import Table from "@components/Table";
import Tabs from "@components/Tabs";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import { FC, SyntheticEvent, useState } from "react";
import SelectStatus from "../components/SelecStatus";
import { SelectDepartamentos } from "@components/forms/Select";
import { useSendData } from "@hooks/useSendData";
import TextArea from "@components/forms/TextArea";
import { toast } from "react-toastify";

type empleadoMod = Omit<
  empleadoInterface,
  "nombre_completo" | "departamento"
> & { departamento: string; update_time_imss: string | null };

interface getEmpleado extends getDataInterface {
  data: { response: empleadoMod[] };
}

const Empleados: FC = () => {
  const [body, setBody] = useState<{ status: number }>({ status: 1 });
  const [relativeData, setRelativeData] = useState<Partial<empleadoMod>>({});
  const { data, isError, isPending, refetch }: getEmpleado = useGetData(
    `/solicitudes/estatus/${body.status}`,
    "solicitudesData"
  );
  const [editEmpleado, setEditEmpleado] = useState<{
    nombre?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    idChecador?: number;
    estatus?: string;
    idDepartamento?: number;
  }>({});

  const [editBaja, setEditBaja] = useState<{
    motivo?: string;
    idChecador?: string;
  }>({});
  const [editFecha, setEditFecha] = useState<{ fecha?: string }>({});

  const updateEmpleado = useSendData(`empleado/${relativeData.idempleado}`, {
    method: "put",
    refetchFn: () => {
      refetch();
    },
    containerID: "fromModal",
  });
  const updateFechaReg = useSendData(
    `empleado/updateRegistro/${relativeData.idempleado}`,
    {
      method: "put",
      refetchFn: () => {
        refetch();
      },
      containerID: "global",
    }
  );

  const altaBajaEmpleado = useSendData(
    `solicitudes/control/${relativeData.idempleado}`,
    {
      method: "put",
      refetchFn: () => {
        refetch();
        if (editBaja.hasOwnProperty("idChecador")) {
          document.getElementById("modal-motivo-reincorporar");
        } else {
          (
            document.getElementById("modal-motivo-baja") as HTMLDialogElement
          ).close();
        }
        setEditBaja({});
      },
    }
  );
  console.log(editFecha);

  return (
    <div>
      <Modal
        title={`Motivo de baja de ${relativeData.nombre} ${relativeData.apellido_paterno} ${relativeData.apellido_materno}`}
        id="modal-motivo-baja"
        sm
      >
        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={(ev) => {
            ev.preventDefault();
            altaBajaEmpleado.mutate({
              estatus: 3,
              motivo: editBaja.motivo,
              idChecador: relativeData.idchecador,
            });
          }}
        >
          <TextArea
            label="Motivo"
            variable={editBaja}
            setVariable={setEditBaja}
            name={"motivo"}
            required
          />
          <Button
            text="Enviar"
            buttonType="submit"
            isPending={altaBajaEmpleado.isPending}
            block
          />
        </form>
      </Modal>
      <Modal
        title={`Reincorporar a ${relativeData.nombre} ${relativeData.apellido_paterno} ${relativeData.apellido_materno}`}
        id="modal-motivo-reincorporar"
        sm
      >
        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={(ev) => {
            ev.preventDefault();
            altaBajaEmpleado.mutate({
              estatus: 1,
              motivo: editBaja.motivo,
              idChecador: editBaja.idChecador,
            });
          }}
        >
          <Input
            label="ID checador"
            variable={editBaja}
            setVariable={setEditBaja}
            name="idChecador"
            required
            inputType="number"
            step={1}
          />
          <TextArea
            label="Motivo"
            variable={editBaja}
            setVariable={setEditBaja}
            name={"motivo"}
            required
          />
          <Button
            text="Enviar"
            buttonType="submit"
            isPending={altaBajaEmpleado.isPending}
            block
          />
        </form>
      </Modal>
      <Modal
        title={`Modificar empleado ${relativeData.nombre} ${relativeData.apellido_paterno} ${relativeData.apellido_materno}`}
        id="mod-empleado"
      >
        <Tabs
          tabs={[
            {
              tabName: "Datos del empleado",
              show: true,
              content: (
                <form
                  className="w-full"
                  onSubmit={(ev) => {
                    ev.preventDefault();
                    updateEmpleado.mutateAsync(editEmpleado);
                  }}
                >
                  <div className="flex justify-center gap-4 w-full flex-wrap mb-4">
                    <Input
                      label="Nombre"
                      variable={editEmpleado}
                      setVariable={setEditEmpleado}
                      name="nombre"
                      required
                    />
                    <Input
                      label="Apellido paterno"
                      variable={editEmpleado}
                      setVariable={setEditEmpleado}
                      name="apellidoPaterno"
                      required
                    />
                    <Input
                      label="Apellido Materno"
                      variable={editEmpleado}
                      setVariable={setEditEmpleado}
                      name="apellidoMaterno"
                      required
                    />
                    <Input
                      label="ID"
                      variable={editEmpleado}
                      setVariable={setEditEmpleado}
                      name="idChecador"
                      inputType="number"
                      step={1}
                      required
                    />
                    <SelectStatus
                      variable={editEmpleado}
                      setVariable={setEditEmpleado}
                      name="estatus"
                      options={[
                        { value: "Contrato", label: "Contratado" },
                        { value: "Practica", label: "Practicantes" },
                        { value: "Pendiente", label: "Pendiente" },
                        { value: "Rechazado", label: "Rechazados" },
                      ]}
                    />{" "}
                    <SelectDepartamentos
                      variable={editEmpleado}
                      setVariable={setEditEmpleado}
                      name="idDepartamento"
                    />
                  </div>
                  <Button
                    text="Enviar"
                    buttonType="submit"
                    isPending={updateEmpleado.isPending}
                    block
                  />
                </form>
              ),
              id: 1,
            },
            {
              tabName: "Fecha de inicio de labores",
              show: relativeData.estatus === "Contrato",
              content: (
                <form
                  className="flex flex-col gap-4 items-center"
                  onSubmit={(ev) => {
                    ev.preventDefault();
                    updateFechaReg.mutate({ fecha: editFecha.fecha });
                    toast.success("ola");
                  }}
                >
                  <InputFecha
                    label="Fecha"
                    name="fecha"
                    variable={editFecha}
                    setVariable={setEditFecha}
                    todayBtn
                  />
                  <Button
                    text="Enviar"
                    buttonType="submit"
                    block
                    isPending={updateFechaReg.isPending}
                  />
                </form>
              ),
              id: 2,
            },
            {
              tabName: "Fecha de inscripción al IMSS",
              show: relativeData.estatus === "Contrato",
              content: <form></form>,
              id: 3,
            },
          ]}
        />
      </Modal>
      <SectionTitle
        titulo="Control de empleados"
        subtitulo="Recursos humanos"
      />
      <CintaOpciones
        onSubmit={(ev: SyntheticEvent) => {
          ev.preventDefault();
          refetch();
        }}
      >
        <SelectStatus variable={body} setVariable={setBody} />
        <Button text="Filtrar" buttonType="submit" />
        <ListaEmpleados
          data={data}
          title="Empleados"
          dataIsPending={isPending}
        />
      </CintaOpciones>
      <Loader isPending={isPending} />
      {!isError && !isPending && (
        <Table
          columns={[
            {
              name: "ID",
              selector: (el: empleadoInterface) => el.idchecador,
            },
            {
              name: "Empleado",
              selector: (el: empleadoMod) =>
                `${el.nombre} ${el.apellido_paterno} ${el.apellido_materno}`,
            },
            {
              name: "Estatus",
              selector: (el: empleadoMod) => el.estatus,
            },
            {
              name: "Departamento",
              selector: (el: empleadoMod) => el.departamento,
            },
            {
              name: "Fecha de inicio de labores",
              selector: (el: empleadoMod) =>
                format.formatFecha(el.fecha_registro),
            },
            {
              name: "Ultima actualización",
              selector: (el: empleadoMod) => format.formatFecha(el.update_time),
            },
            {
              name: "Fecha de alta en IMSS",
              selector: (el: empleadoMod) =>
                el.update_time_imss
                  ? format.formatFecha(el.update_time_imss)
                  : "---",
            },
          ]}
          data={data.response}
          contextualMenuItems={[
            {
              name: "Modificar",
              elementType: "item",
              icon: "pen-to-square",
              show: relativeData.estatus === "Contrato",
              onClick: () => {
                const {
                  idchecador: idChecador,
                  nombre,
                  apellido_materno: apellidoMaterno,
                  apellido_paterno: apellidoPaterno,
                  estatus,
                  iddepartamento: idDepartamento,
                } = relativeData;
                setEditEmpleado({
                  apellidoPaterno,
                  nombre,
                  idChecador,
                  apellidoMaterno,
                  estatus,
                  idDepartamento,
                });
                setEditFecha({
                  fecha: relativeData.fecha_registro
                    ? format.formatFechaAsDB(relativeData.fecha_registro)
                    : "",
                });

                (
                  document.getElementById("mod-empleado") as HTMLDialogElement
                ).show();
              },
            },
            { elementType: "separator", show: true },
            {
              name: "Dar de baja",
              elementType: "item",
              color: "error",
              icon: "arrow-down",
              show:
                relativeData.estatus === "Practica" ||
                relativeData.estatus === "Contrato",
              onClick: () => {
                (
                  document.getElementById(
                    "modal-motivo-baja"
                  ) as HTMLDialogElement
                ).showModal();
              },
            },
            {
              name: "Reincorporar",
              elementType: "item",
              color: "warning",
              icon: "arrow-up",
              show: relativeData.estatus === "Despido",
              onClick: () => {
                (
                  document.getElementById(
                    "modal-motivo-reincorporar"
                  ) as HTMLDialogElement
                ).showModal();
              },
            },
          ]}
          setRelativeData={setRelativeData}
          hoverable
        />
      )}
    </div>
  );
};

export default Empleados;

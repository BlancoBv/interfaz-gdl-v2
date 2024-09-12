import format from "@assets/format";
import { empleadoInterface } from "@assets/interfaces";
import Button from "@components/Button";
import { Input } from "@components/forms/Input";
import { Select } from "@components/forms/Select";
import CintaOpciones from "@components/gui/CintaOpciones";
import Loader from "@components/gui/Loader";
import Modal from "@components/gui/Modal";
import SectionTitle from "@components/gui/SectionTitle";
import ListaEmpleados from "@components/pdf/recursos-humanos/ListaEmpleados";
import Table from "@components/Table";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import moment from "moment";
import { FC, SyntheticEvent, useState } from "react";

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
    apellido_materno?: string;
    apellido_paterno?: string;
  }>({});
  console.log({ body, isPending });

  return (
    <div>
      <Modal
        title={`Modificar empleado ${relativeData.nombre} ${relativeData.apellido_paterno} ${relativeData.apellido_materno}`}
        id="mod-empleado"
      >
        <div role="tablist" className="tabs tabs-bordered w-full">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab flex-auto"
            aria-label="Datos  del empleado"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content p-10">
            <form className="w-full ">
              <div className="flex justify-center gap-4 w-full flex-wrap mb-4">
                <Input
                  label="Nombre"
                  variable={editEmpleado}
                  setVariable={setEditEmpleado}
                  name="nombre"
                />
                <Input
                  label="Apellido paterno"
                  variable={editEmpleado}
                  setVariable={setEditEmpleado}
                  name="apellido_paterno"
                />
                <Input
                  label="Apellido Materno"
                  variable={editEmpleado}
                  setVariable={setEditEmpleado}
                  name="apellido_materno"
                />
                <Input
                  label="ID"
                  variable={editEmpleado}
                  setVariable={setEditEmpleado}
                  name="id"
                />
              </div>
              <Button text="Enviar" buttonType="submit" />
            </form>
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab min-h-10"
            aria-label="Fecha de inicio de labores"
          />
          <div role="tabpanel" className="tab-content p-10">
            Tab content 2
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab min-h-10"
            aria-label="Fecha de inscripción al imss"
          />
          <div role="tabpanel" className="tab-content p-10">
            Tab content 3
          </div>
        </div>
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
        <Select
          name="status"
          variable={body}
          setVariable={setBody}
          placeholder="Selecciona un estatus"
          label="Tipo de solicitud o estatus"
          options={[
            { value: 1, label: "Contratado" },
            { value: 2, label: "Practicantes" },
            { value: 5, label: "Pendiente" },
            { value: 3, label: "Inactivos" },
            { value: 4, label: "Rechazados" },
          ]}
        />
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
              onClick: () => {
                (
                  document.getElementById("mod-empleado") as HTMLDialogElement
                ).showModal();
              },
            },
            { elementType: "separator" },
            {
              name: "Dar de baja",
              elementType: "item",
              color: "error",
              icon: "arrow-down",
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

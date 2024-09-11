import format from "@assets/format";
import { empleadoInterface } from "@assets/interfaces";
import Button from "@components/Button";
import { Select } from "@components/forms/Select";
import CintaOpciones from "@components/gui/CintaOpciones";
import Loader from "@components/gui/Loader";
import SectionTitle from "@components/gui/SectionTitle";
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
  console.log({ body, isPending });

  return (
    <div>
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
            { name: "Modificar", elementType: "item", icon: "pen-to-square" },
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

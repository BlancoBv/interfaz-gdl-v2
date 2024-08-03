import { FC, useCallback, useState } from "react";
import { useGetData } from "../../../../hooks/useGetData";
import Loader from "../../../../components/gui/Loader";
import SectionTitle from "../../../../components/gui/SectionTitle";
import { TriggerEvent, useContextMenu } from "react-contexify";
import ContextualMenu, {
  DEFAULT_ID,
} from "../../../../components/gui/ContextualMenu";
import CintaOpciones from "../../../../components/gui/CintaOpciones";
import { Input } from "../../../../components/forms/Input";
import Toggle from "../../../../components/forms/Toggle";
import Modal from "../../../../components/gui/Modal";

const Usuarios: FC = () => {
  const [body, setBody] = useState<{ user?: string; onlyAlta?: boolean }>({
    user: "",
    onlyAlta: true,
  });

  const selectFn = useCallback(
    (data: any) => {
      const filtered = data.response.filter(
        (el: { idchecador: null | number }) =>
          body.onlyAlta ? el.idchecador : true
      );
      const exp = new RegExp(`${body.user}`, "i");
      const response = filtered.filter(
        (el: {
          nombre: string;
          apellido_paterno: string;
          apellido_materno: string;
        }) => {
          const { nombre, apellido_paterno, apellido_materno } = el;
          return exp.test(`${nombre} ${apellido_paterno} ${apellido_materno}`);
        }
      );
      //const filtered = data.response.filter((el) => el.idchecador === true);
      return { ...data, response };
    },
    [body]
  );
  const { data, isError, isFetching, isPending } = useGetData(
    "auth/usuarios",
    "usersData",
    { selectFn: selectFn }
  );

  console.log(body);

  return (
    <div>
      <SectionTitle titulo="Gestión de usuarios" subtitulo="Administrativo" />
      <CintaOpciones>
        <Input
          label="Buscar usuario por nombre"
          name="user"
          variable={body}
          setVariable={setBody}
          inputType="text"
          icon="magnifying-glass"
        />
        <Toggle
          label="Mostrar solo usuarios en alta"
          name="onlyAlta"
          variable={body}
          setVariable={setBody}
        />
      </CintaOpciones>
      <Loader isFetching={isFetching} isPending={isPending} />
      {!isPending && !isFetching && !isError && (
        <Success data={data.response} />
      )}
    </div>
  );
};

const Success: FC<{
  data: {
    idempleado: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    departamento: string;
    username: null | string;
    idchecador: number | null;
  }[];
}> = ({ data }) => {
  const [relativeData, setRelativeData] = useState<{ idempleado?: number }>({});
  const { show } = useContextMenu({ id: DEFAULT_ID });
  console.log(data);

  const displayContextMenu = (event: TriggerEvent, element: any) => {
    setRelativeData(element);
    show({ event });
  };

  const permisos = useGetData(
    `auth/usuarios/${relativeData.idempleado}`,
    "detallesPerm",
    {
      fetchInURLChange: true,
    }
  );
  return (
    <div>
      <ContextualMenu
        items={[
          {
            elementType: "item",
            name: "Crear usuario",
            icon: "plus",
            onClick: () => {
              console.log("ola");
            },
          },
          {
            elementType: "item",
            name: "Administrar permisos",
            icon: "gear",
            onClick: () => {
              (
                document.getElementById("detallePerm") as HTMLDialogElement
              ).showModal();
            },
          },
        ]}
      />
      <Modal id="detallePerm" title="Administrar permisos">
        <div>{}</div>
      </Modal>
      <table className="table table-fixed table-xs lg:table-md">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Departamento</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => (
            <tr
              onContextMenu={(event) => displayContextMenu(event, el)}
              className="hover"
            >
              <td>{el.idchecador ? el.idchecador : "Sin ID"}</td>
              <td>{`${el.nombre} ${el.apellido_paterno} ${el.apellido_materno}`}</td>
              <td>{el.departamento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Usuarios;

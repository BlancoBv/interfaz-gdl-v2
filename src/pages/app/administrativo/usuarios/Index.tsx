import { FC, Fragment, useCallback, useState } from "react";
import { useGetData } from "@hooks/useGetData";
import Loader from "@components/gui/Loader";
import SectionTitle from "@components/gui/SectionTitle";
import { TriggerEvent, useContextMenu } from "react-contexify";
import ContextualMenu, { DEFAULT_ID } from "@components/gui/ContextualMenu";
import CintaOpciones from "@components/gui/CintaOpciones";
import { Input } from "@components/forms/Input";
import Toggle from "@components/forms/Toggle";
import Modal, { ModalConfirm } from "@components/gui/Modal";
import agruparArr from "@assets/agruparArr";
import { useSendData } from "@hooks/useSendData";
import AsyncToggle from "./components/AsyncToggle";

const Usuarios: FC = () => {
  const [body, setBody] = useState<{
    user?: string;
    onlyAlta?: boolean;
    onlyWUser?: boolean;
  }>({
    user: "",
    onlyAlta: true,
    onlyWUser: true,
  });

  const selectFn = useCallback(
    (data: any) => {
      const filtered = data.response.filter(
        (el: { idchecador: null | number; username: null | string }) => {
          if (body.onlyAlta && body.onlyWUser) {
            return el.idchecador && el.username;
          }
          if (body.onlyAlta) {
            return el.idchecador;
          }
          if (body.onlyWUser) {
            return el.username;
          }

          return true;
        }
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
  const { data, isError, isPending, refetch } = useGetData(
    "auth/usuarios",
    "usersData",
    { selectFn }
  );

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
        <Toggle
          label="Mostrar solo empleados que tengan usuario"
          name="onlyWUser"
          variable={body}
          setVariable={setBody}
        />
      </CintaOpciones>
      <Loader isPending={isPending} />
      {!isPending && !isError && (
        <Success data={data.response} refetch={refetch} />
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
  refetch: any;
}> = ({ data, refetch }) => {
  const [relativeData, setRelativeData] = useState<{
    idempleado?: number;
    username?: null | string;
    idchecador?: number;
  }>({});
  const [body, setBody] = useState<{
    password?: string;
    user?: string;
    newPassword?: string;
  }>({});
  const { show } = useContextMenu({ id: DEFAULT_ID });

  const displayContextMenu = (event: TriggerEvent, element: any) => {
    setRelativeData(element);
    show({ event });
  };

  const permisos = useGetData(
    `auth/permisos/${relativeData.idempleado}}`,
    "detallesPermAdmin",
    { fetchInURLChange: true }
  );
  const { values } =
    !permisos.isPending && !permisos.isError
      ? agruparArr(permisos.data.response, (el: { area: string }) => el.area)
      : { values: [] };

  const deleteUser = useSendData(
    `auth/eliminar?username=${relativeData.username}`,
    {
      method: "delete",
      refetchFn: () => {},
    }
  );

  const changePassword = useSendData("auth/changePassa", {
    method: "put",
    containerID: "fromModal",
    refetchFn: () => {},
  });

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
            show: true,
          },
          {
            elementType: "item",
            name: "Administrar permisos",
            icon: "gear",
            disabled: relativeData.username ? false : true,
            onClick: () => {
              (
                document.getElementById("detallePerm") as HTMLDialogElement
              ).showModal();
            },
            show: true,
          },
          {
            elementType: "item",
            name: "Eliminar usuario",
            icon: "trash",
            disabled: relativeData.username ? false : true,
            color: "error",
            onClick: () => {
              (
                document.getElementById("modal-confirm") as HTMLDialogElement
              ).showModal();
            },
            show: true,
          },
        ]}
      />
      <ModalConfirm mutateVariable={deleteUser} refetch={refetch} />
      <Modal
        id="detallePerm"
        title={`Administrar usuario ${relativeData.username}`}
      >
        <div>
          {!permisos.isPending && !permisos.isError && (
            <div
              role="tablist"
              className="tabs tabs-bordered tabs-xs lg:tabs-sm"
            >
              {values.map((el) => {
                const { values } = agruparArr(
                  el,
                  (el: { peticion: string }) => el.peticion
                );

                return (
                  <Fragment key={el[0].area}>
                    {/* Fragment evita error de unique key */}
                    <input
                      type="radio"
                      name="my_tabs_1"
                      role="tab"
                      className="tab min-h-10"
                      aria-label={el[0].area}
                      defaultChecked={el[0].area === "Despacho"}
                    />
                    <div
                      role="tabpanel"
                      className="tab-content w-full p-10 h-96 overflow-y-auto"
                    >
                      {values.map(
                        (
                          peticion: {
                            peticion: string;
                            permiso: string;
                            idpermiso: number;
                            user: null | string;
                          }[]
                        ) => (
                          <div key={peticion[0].peticion}>
                            <h3 className="font-bold">
                              {peticion[0].peticion}
                            </h3>
                            <div className="divider" />
                            {peticion.map((perm) => (
                              <AsyncToggle
                                perm={perm}
                                user={{
                                  username: relativeData.username,
                                }}
                                key={perm.idpermiso}
                              />
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  </Fragment>
                );
              })}
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab min-h-10"
                aria-label="Cambiar contraseña"
              />
              <div
                role="tabpanel"
                className="tab-content w-full p-10 h-96 overflow-y-auto"
              >
                <form
                  className="flex flex-col gap-4 justify-center items-center"
                  onSubmit={(ev) => {
                    ev.preventDefault();
                    changePassword.mutate({
                      newPassword: body.newPassword,
                      user: relativeData.username,
                    });
                    setBody({});
                  }}
                >
                  <Input
                    label="Nueva contraseña"
                    variable={body}
                    setVariable={setBody}
                    name="newPassword"
                  />
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={changePassword.isPending}
                  >
                    {changePassword.isPending ? (
                      <span className="loading loading-bars loading-md" />
                    ) : (
                      "Enviar"
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </Modal>

      <table className="table table-fixed table-xs lg:table-md">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => (
            <tr
              onContextMenu={(event) => displayContextMenu(event, el)}
              className="hover"
              key={el.idempleado}
            >
              <td>{el.idchecador ? el.idchecador : "Sin ID"}</td>
              <td>{`${el.nombre} ${el.apellido_paterno} ${el.apellido_materno}`}</td>
              <td>{el.departamento}</td>
              <td>{el.username ? el.username : "Sin usuario"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Usuarios;

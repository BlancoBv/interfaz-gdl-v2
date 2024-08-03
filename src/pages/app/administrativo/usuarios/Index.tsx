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
import agruparArr from "../../../../assets/agruparArr";
import { useSendData } from "../../../../hooks/useSendData";
import AsyncToggle from "./components/AsyncToggle";

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

  const displayContextMenu = (event: TriggerEvent, element: any) => {
    setRelativeData(element);
    show({ event });
  };

  const user = useGetData(
    `auth/usuarios/${relativeData.idempleado}`,
    "detallesUserAdmin",
    {
      fetchInURLChange: true,
    }
  );

  const permisos = useGetData(
    `auth/permisos/${relativeData.idempleado}}`,
    "detallesPermAdmin",
    { fetchInURLChange: true }
  );
  const { values } =
    !permisos.isPending && !permisos.isFetching && !permisos.error
      ? agruparArr(permisos.data.response, (el: { area: string }) => el.area)
      : { values: [] };

  const addPerm = useSendData("auth/registrar/permiso", {
    method: "post",
    containerID: "fromModal",
  });
  const delPerm = useSendData("auth/quitar/permiso", {
    method: "put",
    containerID: "fromModal",
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
        <div>
          {!user.isPending &&
            !user.isFetching &&
            !user.isError &&
            user.data.response &&
            !permisos.isPending &&
            !permisos.isFetching &&
            !permisos.isError && (
              <>
                <span>
                  {`${user.data.response.nombre} 
                  ${user.data.response.apellido_materno} 
                  ${user.data.response.apellido_materno}`}
                </span>
                <div
                  role="tablist"
                  className="tabs tabs-bordered tabs-xs lg:tabs-md"
                >
                  {values.map((el) => {
                    const { values } = agruparArr(
                      el,
                      (el: { peticion: string }) => el.peticion
                    );

                    return (
                      <>
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
                              el: {
                                peticion: string;
                                permiso: string;
                                idpermiso: number;
                                user: null | string;
                              }[]
                            ) => (
                              <div>
                                <h3 className="font-bold">{el[0].peticion}</h3>
                                <div className="divider" />
                                {el.map((perm) => (
                                  <>
                                    <AsyncToggle
                                      perm={perm}
                                      user={{
                                        username: user.data.response.username,
                                      }}
                                      addMutate={addPerm}
                                      delMutate={delPerm}
                                    />

                                    {/* <div className="form-control">
                                      <label className="label cursor-pointer">
                                        <span className="label-text me-2">
                                          {perm.permiso}
                                        </span>
                                        <input
                                          type="checkbox"
                                          className="toggle"
                                          onChange={(ev) => {
                                            const { checked } =
                                              ev.currentTarget;
                                            console.log(checked);

                                            delPerm.mutate({
                                              user: user.data.response.username,
                                              permiso: [perm.idpermiso],
                                            });
                                          }}
                                        />
                                      </label>
                                    </div> */}
                                  </>
                                ))}
                              </div>
                            )
                          )}
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            )}
        </div>
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

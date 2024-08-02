import { FC, useState } from "react";
import { useGetData } from "../../../../hooks/useGetData";
import Loader from "../../../../components/gui/Loader";
import SectionTitle from "../../../../components/gui/SectionTitle";
import { TriggerEvent, useContextMenu } from "react-contexify";
import ContextualMenu, {
  DEFAULT_ID,
} from "../../../../components/gui/ContextualMenu";

const Usuarios: FC = () => {
  const { data, isError, isFetching, isPending } = useGetData(
    "auth/usuarios",
    "usersData"
  );
  return (
    <div>
      <SectionTitle titulo="Gestión de usuarios" subtitulo="Administrativo" />
      <Loader isFetching={isFetching} isPending={isPending} />
      {!isPending && !isFetching && <Success data={data.response} />}
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
  0;
  return (
    <div>
      <ContextualMenu />
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
            <tr onContextMenu={(event) => displayContextMenu(event, el)}>
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

import { FC, useCallback, useContext, useMemo } from "react";
import { SNC } from "@assets/interfaces";
import moment from "moment";
import DinamicTable from "@components/TableClientRendering";
import { ColumnDef } from "@tanstack/react-table";
import Icon from "@components/Icon";
import { useModal } from "@hooks/useModal";
import BtnPdfSnc from "./components/BtnPdfSnc";
import DataSNC from "./components/ProviderSNC";
import BtnEliminar from "@components/forms/BtnEliminar";

const TableSNC: FC<{
  data: SNC[];
  noDataMsg?: string;
}> = ({ noDataMsg, data }) => {
  const { setSncSelect } = useContext(DataSNC);
  const { show } = useModal("idModalEditSnc");

  const editSnc = useCallback(
    (snc: SNC) => {
      const {
        descripcion_falla,
        acciones_corregir,
        concesiones,
        idincumplimiento,
        idempleado,
        fecha,
        idsalida_noconforme,
      } = snc;
      setSncSelect({
        descripcion_falla: descripcion_falla,
        acciones_corregir: acciones_corregir,
        concesiones,
        idincumplimiento: idincumplimiento,
        idempleado: idempleado,
        fecha,
        idsalida_noconforme,
      });

      show();
    },
    [show, setSncSelect]
  );

  const columns = useMemo<ColumnDef<SNC>[]>(
    () => [
      {
        accessorFn: (row) => row.idsalida_noconforme,
        id: "idsalida_noconforme",
        header: () => <span>Folio </span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.concesiones || row.acciones_corregir,
        header: () => <span>Estatus </span>,
        id: "estatus",
        cell: (info) =>
          info.getValue() ? (
            <div className="rounded bg-green-500 text-white p-2">
              <p className="text-center">Resuelto</p>
            </div>
          ) : (
            <div className="rounded bg-red-500 text-white p-2">
              <p className="text-center">Sin resolver</p>
            </div>
          ),
      },
      {
        // accessorFn: (row) => row.fecha,
        accessorFn: (row) => moment(row.fecha).format("DD/MM/YYYY"),
        id: "fecha",
        header: () => <span>Fecha </span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.empleado.nombre_completo,
        id: "empleado",
        header: () => <span>Nombre del empleado </span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.incumplimiento.incumplimiento,
        id: "incumplimiento",
        header: () => <span>Incumplimiento </span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => (
          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-warning"
              onClick={() => editSnc(row)}
            >
              <Icon icon="pencil" />
            </button>
            <BtnEliminar onClick={() => console.log("Eliminando elemento")} />
            <BtnPdfSnc data={row} />
          </div>
        ),
        id: "acciones",
        header: () => <span> </span>,
        cell: (info) => info.getValue(),
      },
    ],
    [editSnc]
  );

  return (
    <div>
      <DinamicTable
        stickyHeaderNumber={56}
        columns={columns}
        data={data}
        noDataMsg={noDataMsg}
      />
    </div>
  );
};
export default TableSNC;

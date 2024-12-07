import { FC, useMemo } from "react";
import { SNC } from "@assets/interfaces";
import DinamicTable from "@components/TableClientRendering";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

interface columnsEmp {
  key: string;
  value: SNC[];
}

const TableSNCIyE: FC<{
  siglasInc: any[];
  empleadosSnc: any[];
  data: SNC[];
  noDataMsg?: string;
}> = ({ noDataMsg, siglasInc, empleadosSnc, data }) => {
  const navigate = useNavigate();
  const contador = (data: columnsEmp, incumplimiento: string) => {
    return data.value.filter(
      (s) => s.incumplimiento.incumplimiento == incumplimiento
    ).length;
  };

  const columns = useMemo<ColumnDef<columnsEmp>[]>(
    () => [
      {
        accessorFn: (row) => (
          <span onClick={() => navigate(row.key)} className="cursor-pointer">
            {row.value[0].empleado.nombre_completo}
          </span>
        ),
        id: "empleado",
        header: () => <span>Empleado</span>,
        cell: (info) => info.getValue(),
        meta: {
          classNameCell: () => "text-nowrap",
        },
      },
      ...siglasInc.map((el) => ({
        accessorFn: (row: columnsEmp) => contador(row, el.incumplimiento),
        id: el.incumplimiento,
        header: () => <span>{el.sigla}</span>,
        cell: (info: any) => info.getValue(),
        meta: {
          classNameCell: (value: any) =>
            value > 7 ? "bg-red-500 text-white fw-bold text-center" : "",
          titleHead: `${el.incumplimiento} - ${el.sigla}`,
        },
      })),
      {
        accessorFn: (row) => row.value.length,
        id: "cantidad",
        header: () => <span>Cantidad</span>,
        cell: (info) => info.getValue(),
        meta: {
          classNameHead: "bg-red-400 text-white",
          classNameCell: () => "text-center  bg-slate-300",
        },
      },
    ],
    [siglasInc]
  );

  return (
    <div>
      <DinamicTable
        columns={columns}
        data={empleadosSnc}
        noDataMsg={noDataMsg}
        TfootChildren={
          <tr>
            <th className="bg-red-400 text-white text-center">Cantidad</th>
            {siglasInc.map((inc) => (
              <th key={inc.sigla} className="bg-slate-300">
                {
                  data.filter(
                    (el) =>
                      el.incumplimiento.incumplimiento === inc.incumplimiento
                  ).length
                }
              </th>
            ))}
            <th className="bg-red-400 text-white text-center">{data.length}</th>
          </tr>
        }
      />
    </div>
  );
};
export default TableSNCIyE;

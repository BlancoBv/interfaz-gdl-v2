import { FC, useState } from "react";
import {
  getCoreRowModel,
  ColumnDef,
  useReactTable,
  flexRender,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import { VariedObject } from "@assets/interfaces";
import Icon from "./Icon";

interface Props {
  data: any[];
  stickyHeaderNumber?: number;
  noDataMsg?: string;
  columns: ColumnDef<any>[];
  condicionalRowStyle?: VariedObject;
}

//TableClientRendering es para datos que el servidor manda al cliente, y el cliente tiene que procesarlos
const TableClientRendering: FC<Props> = ({
  columns,
  data,
  noDataMsg,
  stickyHeaderNumber,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      sorting,
    },
  });

  const paginationInit =
    table.getState().pagination.pageIndex *
      table.getState().pagination.pageSize +
    1;

  const paginationFinish =
    (table.getState().pagination.pageIndex + 1) *
    table.getState().pagination.pageSize;

  return (
    <div>
      {data.length > 0 ? (
        <div>
          <div className="overflow-x-auto">
            <table
              className="table table-fixekd table-xs table-pdin-rows tdable-pin-cols w-full lg:table-md"
              // id={id}
            >
              <thead
                className={
                  stickyHeaderNumber
                    ? `sticky top-${stickyHeaderNumber} bg-white`
                    : ""
                }
              >
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              onClick={header.column.getToggleSortingHandler()}
                              {...{
                                className: header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : "",
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: <Icon icon="arrow-up" />,
                                desc: <Icon icon="arrow-down" />,
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          </>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
          </div>
          <div className="flex gap-1 justify-end items-center mt-1">
            <div className="flex gap-2 text-sm text-slate-700">
              <label htmlFor="filaTable">Filas por página</label>
              <select
                id="filaTable"
                className="form form-select"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  if (e.target.value === "Todo") {
                    table.setPageSize(table.getRowCount());
                  } else {
                    table.setPageSize(Number(e.target.value));
                  }
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize, index) => (
                  <option
                    key={index}
                    value={pageSize ? pageSize : pageSize?.toLocaleString()}
                  >
                    {pageSize ? pageSize : "Todo"}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-none text-sm text-slate-700">
              <p>
                {paginationInit}-
                {paginationFinish < table.getRowCount()
                  ? paginationFinish
                  : table.getRowCount()}{" "}
                de {table.getRowCount()}
                {/* -{table.getPageCount().toLocaleString()} de {table.getRowCount()} */}
              </p>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <Icon icon="backward" />
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <Icon icon="caret-left" />
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <Icon icon="caret-right" />
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              <Icon icon="forward" />
            </button>
          </div>
        </div>
      ) : (
        <h3 className="text-2xl text-red-500 text-center">
          {noDataMsg || "Sin datos"}
        </h3>
      )}
    </div>
  );
};
export default TableClientRendering;

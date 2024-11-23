import {
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import ContextualMenu, {
  contextItems,
  DEFAULT_ID,
} from "@components/gui/ContextualMenu";
import { TriggerEvent, useContextMenu } from "react-contexify";

const Table: FC<{
  id?: string;
  data: any[];
  columns: {
    name: string;
    selector: (
      prop: any,
      colIndex?: number,
      rowIndex?: number
    ) => string | number | ReactNode;
    className?: string;
    sortableValue?: any;
  }[];
  setRelativeData?: any;
  contextualMenuItems?: contextItems[];
  hoverable?: boolean;
  noDataMsg?: string;
  onClick?: (data?: any) => void;
  paginated?: boolean;
}> = ({
  id,
  data,
  columns,
  setRelativeData,
  contextualMenuItems,
  hoverable,
  noDataMsg,
  onClick,
  paginated,
}) => {
  const { show } = useContextMenu({ id: DEFAULT_ID });

  const displayContextMenu = (event: TriggerEvent, element: any) => {
    setRelativeData(element);
    show({ event });
  };

  const [currentPage, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<number>(data.length);
  const [copyOfData, setCopyOfData] = useState<any[]>(data);
  //const clickNumber = useState<number>(1);

  const totalPages = Math.ceil(data.length / pagination);

  const paginatedData = useMemo(() => {
    if (!paginated) {
      return copyOfData;
    }
    return copyOfData.slice(
      currentPage === 1 ? 0 : (currentPage - 1) * pagination,
      currentPage * pagination
    );
  }, [currentPage, pagination, copyOfData]);

  return (
    <>
      <ContextualMenu items={contextualMenuItems} />
      <table
        className="table table-fixed table-xs lg:table-md not-prose"
        id={id}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                className={`text-wrap text-center ${
                  col.className ? col.className : ""
                }`}
                key={`col ${col.name}`}
                onClick={() => {
                  const a = copyOfData.sort(col?.sortableValue);

                  console.log(copyOfData, a, data);

                  if (copyOfData === a) {
                    setCopyOfData([...data]);
                  } else {
                    setCopyOfData([...a]);
                  }
                }}
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            paginatedData.map((row: any, rowIndex: number) => (
              <tr
                className={`text-wrap text-center ${hoverable ? "hover" : ""} ${
                  onClick ? "cursor-pointer" : ""
                }`}
                key={`row ${rowIndex}`}
                onContextMenu={
                  contextualMenuItems
                    ? (ev) => displayContextMenu(ev, row)
                    : undefined
                }
                onClick={onClick ? () => onClick(row) : undefined}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={`col-data ${rowIndex}${colIndex}`}
                    className={col.className ?? ""}
                  >
                    {col.selector(row, colIndex, rowIndex)}
                  </td>
                ))}
              </tr>
            ))}
          {data.length <= 0 && (
            <tr className="text-wrap text-center font-bold">
              <td colSpan={columns.length}>
                {noDataMsg ? noDataMsg : "Sin datos"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {paginated && (
        <div className="flex justify-end gap-4">
          <label className="form-control w-full max-w-min">
            <div className="label">
              <span className="label-text text-xs">Elementos por página</span>
            </div>
            <select
              className="select select-bordered select-xs"
              value={pagination}
              onChange={(ev) => {
                const { value } = ev.currentTarget;
                setPagination(Number(value));
              }}
            >
              <option value={data.length}>Todos</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </label>
          <div className="join">
            <button
              className="join-item btn"
              onClick={() =>
                setPage((prev) => {
                  if (prev === 1) {
                    return prev;
                  }
                  return prev - 1;
                })
              }
            >
              «
            </button>
            <button className="join-item btn cursor-default">
              {currentPage} de {totalPages}
            </button>
            <button
              className="join-item btn"
              onClick={() =>
                setPage((prev) => {
                  if (prev === totalPages) {
                    return prev;
                  }
                  return prev + 1;
                })
              }
            >
              »
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Table;

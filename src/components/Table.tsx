import { FC, ReactNode } from "react";
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
  }[];
  setRelativeData?: any;
  contextualMenuItems?: contextItems[];
  hoverable?: boolean;
  noDataMsg?: string;
  onClick?: (data?: any) => void;
}> = ({
  id,
  data,
  columns,
  setRelativeData,
  contextualMenuItems,
  hoverable,
  noDataMsg,
  onClick,
}) => {
  const { show } = useContextMenu({ id: DEFAULT_ID });

  const displayContextMenu = (event: TriggerEvent, element: any) => {
    setRelativeData(element);
    show({ event });
  };

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
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((row: any, rowIndex: number) => (
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
                  <td key={`col-data ${rowIndex}${colIndex}`}>
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
    </>
  );
};
export default Table;

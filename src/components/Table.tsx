import { FC } from "react";
import ContextualMenu, {
  contextItems,
  DEFAULT_ID,
} from "@components/gui/ContextualMenu";
import { TriggerEvent, useContextMenu } from "react-contexify";

const Table: FC<{
  data: any[];
  columns: { name: string; selector: (prop: any) => string | number }[];
  setRelativeData?: any;
  contextualMenuItems?: contextItems[];
  hoverable?: boolean;
  noDataMsg?: string;
}> = ({
  data,
  columns,
  setRelativeData,
  contextualMenuItems,
  hoverable,
  noDataMsg,
}) => {
  const { show } = useContextMenu({ id: DEFAULT_ID });

  const displayContextMenu = (event: TriggerEvent, element: any) => {
    setRelativeData({ ...element });
    show({ event });
  };

  return (
    <>
      <ContextualMenu items={contextualMenuItems} />
      <table className="table table-fixed table-xs lg:table-md not-prose">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                className="text-wrap lg:text-nowrap text-center"
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
                className={`text-wrap text-center ${hoverable ? "hover" : ""}`}
                key={`row ${rowIndex}`}
                onContextMenu={
                  contextualMenuItems
                    ? (ev) => displayContextMenu(ev, row)
                    : undefined
                }
              >
                {columns.map((col, colIndex) => (
                  <td key={`col-data ${rowIndex}${colIndex}`}>
                    {col.selector(row)}
                  </td>
                ))}
              </tr>
            ))}
          {data.length <= 0 && (
            <tr className="text-wrap text-center ">
              <td>{noDataMsg ? noDataMsg : "Sin datos"}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default Table;

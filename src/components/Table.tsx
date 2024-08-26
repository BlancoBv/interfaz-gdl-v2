import { FC } from "react";
import ContextualMenu, {
  contextItems,
  DEFAULT_ID,
} from "@components/gui/ContextualMenu";
import { TriggerEvent, useContextMenu } from "react-contexify";

const Table: FC<{
  data: any;
  columns: { name: string; selector: (prop: any) => string }[];
  setRelativeData: any;
  contextualMenuItems: contextItems[];
  hoverable?: boolean;
}> = ({ data, columns, setRelativeData, contextualMenuItems, hoverable }) => {
  const { show } = useContextMenu({ id: DEFAULT_ID });

  const displayContextMenu = (event: TriggerEvent, element: any) => {
    setRelativeData(element);
    show({ event });
  };

  return (
    <>
      <ContextualMenu items={contextualMenuItems} />
      <table className="table table-fixed table-xs lg:table-md">
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
          {data.map((row: any, rowIndex: number) => (
            <tr
              className={`text-wrap text-center ${hoverable ? "hover" : ""}`}
              key={`row ${rowIndex}`}
              onContextMenu={(ev) => displayContextMenu(ev, row)}
            >
              {columns.map((col, colIndex) => (
                <td key={`col-data ${rowIndex}${colIndex}`}>
                  {col.selector(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Table;

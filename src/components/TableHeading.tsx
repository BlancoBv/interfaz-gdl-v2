import { FC, ReactNode } from "react";

const TableHeading: FC<{
  col: {
    name: string;
    selector: (
      prop: any,
      colIndex?: number,
      rowIndex?: number
    ) => string | number | ReactNode;
    className?: string;
    sortableValue?: any;
  };
}> = ({ col }) => {
  return (
    <th
      className={`text-wrap text-center ${col.className ? col.className : ""}`}
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
  );
};

export default TableHeading;

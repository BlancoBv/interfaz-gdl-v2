import format from "@assets/format";
import { FC } from "react";

const TablaEV: FC<{ data: string[] }> = ({ data }) => {
  return (
    <table className="table table-fixed max-w-xs">
      <thead>
        <tr>
          <th className="text-wrap lg:text-nowrap text-center">Monto</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((el, index) => (
            <tr className="text-wrap text-center">
              <td key={index}>{format.formatDinero(el)}</td>
            </tr>
          ))
        ) : (
          <tr className="text-wrap text-center">
            <td>Ingresa algunos montos</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
export default TablaEV;

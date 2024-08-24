import { FC } from "react";

const TablaEV: FC<{ data: string[] }> = ({ data }) => {
  return (
    <table className="table table-fixed">
      <thead>
        <tr>
          <th className="text-wrap lg:text-nowrap text-center">Monto</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((el, index) => (
            <tr className="text-wrap text-center">
              <th key={index}>{el}</th>
            </tr>
          ))
        ) : (
          <tr className="text-wrap text-center">
            <th>Ingresa algunos montos</th>
          </tr>
        )}
      </tbody>
    </table>
  );
};
export default TablaEV;

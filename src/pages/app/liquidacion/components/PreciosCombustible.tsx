import format from "@assets/format";
import { preciosLiquidacionInterface } from "@assets/interfaces";
import Loader from "@components/gui/Loader";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import { FC } from "react";

interface precios extends getDataInterface {
  data: { response: preciosLiquidacionInterface[] };
}
interface colors {
  M: string;
  P: string;
  D: string;
}
const PreciosCombustible: FC = () => {
  const { data, isPending, isError }: precios = useGetData(
    "liquidacion/preciosCombustible",
    "preciosCombustibleData"
  );

  const colors: colors = {
    M: "text-success",
    P: "text-error",
    D: "text-secondary",
  };
  return (
    <div>
      <Loader isPending={isPending} size="sm" />
      <div className="stats bg-transparent w-full h-full stats-horizontal lg:stats-vertical">
        {!isError &&
          !isPending &&
          data.response.map((el) => (
            <div className="stat" key={el.idprecio}>
              <div className="stat-figure text-secondary"></div>
              <div className="stat-title">{el.ga.nombre}</div>
              <div
                className={`stat-value text-wrap ${
                  colors[el.idgas as keyof colors]
                }`}
              >
                {format.formatDinero(el.precio)}
              </div>
              <div className="stat-desc">{format.formatFecha(el.fecha)}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default PreciosCombustible;

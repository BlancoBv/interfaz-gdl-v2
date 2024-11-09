import calcularTotal from "@assets/calcularTotal";
import format from "@assets/format";
import { reportJsonLiqInterface } from "@assets/interfaces";
import Loader from "@components/gui/Loader";
import Icon from "@components/Icon";
import { FC, useMemo } from "react";

interface colors {
  M: string;
  P: string;
  D: string;
}

const LitrosVendidos: FC<{
  data: reportJsonLiqInterface[];
  isPending: boolean;
  isError: boolean;
}> = ({ data, isError, isPending }) => {
  const mf = (arrIn: any[]) => {
    const tempArr: any[] = [];
    arrIn.forEach((liq) => {
      const temp: {
        totalV?: number;
        totalE?: number;
        totalL?: number;
        dataLecturas?: number;
        liquidacion?: any;
      } = {};
      const { vales_entregado, efectivo_entregado, calculados, diferencia } =
        liq;
      const lecturas = JSON.parse(liq.lecturas);
      const totalV = vales_entregado;
      const totalE = efectivo_entregado;
      const totalL = calculados.pesos.total;
      const dataLecturas = lecturas;
      temp.totalV = totalV;
      temp.totalE = totalE;
      temp.totalL = totalL;
      temp.dataLecturas = dataLecturas;
      temp.liquidacion = liq;
      if (diferencia < 0) {
        tempArr.push({ ...temp, MF: 0, MS: Math.abs(diferencia) });
      } else {
        tempArr.push({ ...temp, MF: Math.abs(diferencia), MS: 0 });
      }
    });
    return tempArr;
  };

  const getTotalByVariant = (variant: string) => {
    const allLecturas = mf(data)
      .map((liq) => liq.dataLecturas)
      .flat();

    if (!(variant === "L")) {
      const filtrar = allLecturas.filter((lec) => lec.idgas === variant);
      return calcularTotal(filtrar, "litrosVendidos");
    }
    return calcularTotal(allLecturas, "litrosVendidos");
  };
  const colors: colors = {
    M: "text-success",
    P: "text-error",
    D: "text-secondary",
  };

  const total = useMemo(() => {
    const defaultValue = {
      litros: { variante: "Total general", total: 0 },
      magna: { variante: "Magna", total: 0 },
      premium: { variante: "Premium", total: 0 },
      diesel: { variante: "Diesel", total: 0 },
    };
    if (!isError && !isPending) {
      defaultValue.litros.total = getTotalByVariant("L");
      defaultValue.magna.total = getTotalByVariant("M");
      defaultValue.premium.total = getTotalByVariant("P");
      defaultValue.diesel.total = getTotalByVariant("D");

      return defaultValue;
    }
    return defaultValue;
  }, [isPending, data]);

  console.log(total);

  return (
    <div>
      <Loader isPending={isPending} />
      {!isPending && !isError && (
        <div className="stats bg-transparent w-full h-full stats-horizontal lg:stats-vertical lg:overflow-hidden">
          {Object.values(total).map((el) => (
            <div className="stat" key={el.variante}>
              <div
                className={`stat-figure ${
                  colors[el.variante.charAt(0) as keyof colors]
                }`}
              >
                <Icon icon="gas-pump" size="2x" />
              </div>
              <div className="stat-title">{el.variante}</div>
              <div
                className={`stat-value text-wrap text-3xl ${
                  colors[el.variante.charAt(0) as keyof colors]
                }`}
              >
                {format.formatDecimal(el.total)}L
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default LitrosVendidos;

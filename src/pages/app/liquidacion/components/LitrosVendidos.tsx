import calcularTotal from "@assets/calcularTotal";
import { reportJsonLiqInterface } from "@assets/interfaces";
import Loader from "@components/gui/Loader";
import Icon from "@components/Icon";
import { FC, useMemo } from "react";

const LitrosVendidos: FC<{
  data: reportJsonLiqInterface[];
  isPending: boolean;
  isError: boolean;
  variant: "L" | "M" | "P" | "D";
}> = ({ data, isError, isPending, variant }) => {
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

  const total = useMemo(() => {
    if (!isError && !isPending) {
      const allLecturas = mf(data)
        .map((liq) => liq.dataLecturas)
        .flat();

      if (variant !== "L") {
        const filtrar = allLecturas.filter((lec) => lec.idgas === variant);
        return calcularTotal(filtrar, "litrosVendidos");
      }
      return calcularTotal(allLecturas, "litrosVendidos");
    }
    return 0;
  }, [isPending, data]);

  return (
    <div>
      <Loader isPending={isPending} />
      {!isPending && total}
      <Icon icon="gas-pump" />
    </div>
  );
};
export default LitrosVendidos;

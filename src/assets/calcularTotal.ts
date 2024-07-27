import Decimal from "decimal.js-light";
import moment from "moment";
const calcularTotal = (datos: any[], propiedad: string) => {
  if (typeof propiedad === "function") {
    const cantidad =
      datos.length > 0
        ? datos
            .map(propiedad)
            .reduce(
              (a: any, b: any) => new Decimal(a).add(new Decimal(b).toNumber()),
              0
            )
        : 0;
    return Number(cantidad);
  } else {
    const cantidad =
      datos.length > 0
        ? datos
            .map((el) => (propiedad ? el[propiedad] : el))
            .reduce(
              (a: any, b: any) => new Decimal(a).add(new Decimal(b).toNumber()),
              0
            )
        : 0;
    return Number(cantidad);
  }
};

export const calcularPromedio = (datos: any, propiedad: string) => {
  const suma = calcularTotal(datos, propiedad);
  const total = datos.length;
  const promedio =
    datos.length > 0 ? Number(new Decimal(suma).div(total).toFixed(2)) : 0;
  return promedio;
};

export const CalcularMeses = (n: number) => {
  const fechasAnteriores = [];
  const fechasAnterioresTime = [];
  const fechaActual = new Date();
  const fechaInicial = new Date("2023-03-01 00:00:00"); // Fecha de inicio del sistema GDL

  if (n) {
    for (let i = 0; i < n; i++) {
      const fecha = new Date(fechaActual);
      fecha.setMonth(fecha.getMonth() - i);
      fechasAnteriores.push(moment);
      fechasAnterioresTime.push(fecha.getTime());
    }
  } else {
    const cantidadMeses =
      (fechaActual.getFullYear() - fechaInicial.getFullYear()) * 12 +
      (fechaActual.getMonth() - fechaInicial.getMonth());
    for (let i = 0; i <= cantidadMeses; i++) {
      const fecha = new Date(fechaActual);
      fecha.setMonth(fecha.getMonth() - i);
      fechasAnteriores.push(moment(fecha).format("YYY-MM"));
      fechasAnterioresTime.push(fecha.getTime());
    }
  }

  return {
    strings: fechasAnteriores.reverse(),
    times: fechasAnterioresTime,
  };
};
export default calcularTotal;

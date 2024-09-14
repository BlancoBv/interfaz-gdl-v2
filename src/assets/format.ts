//import agruparArr from "./agrupar";

import moment from "moment";

const format = {
  /* formatFechaLocale: (date) =>
    new Date(new Date(date).getTime() + new Date().getTimezoneOffset() * 60000),

  formatFecha: (date) =>
    new Intl.DateTimeFormat("es-MX", {
      day: "numeric",
      month: "long",
    }).format(
      new Date(
        new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
      )
    ), */

  obtenerDiaMes: (fecha: string) => {
    const date = moment(fecha);
    return date.date();
  },
  obtenerMes: (fecha: string, formatoMes: "largo" | "corto" = "corto") => {
    const formato = { largo: "MMMM", corto: "MM" };
    const date = moment(fecha);
    return date.format(formato[formatoMes]);
  },

  formatDinero: (monto: string | number) =>
    Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(Number(monto)),
  zFill: (cantidad: string) => {
    // const longitud = [0, 0, 0, 0, 0, 0];
    // const textoArr = String(cantidad).split("");
    // const textoCrudo = [...longitud, ...textoArr];
    // textoCrudo.reverse();
    // textoCrudo.splice(7);
    // const textFinal = textoCrudo.reverse().join("");
    // return textFinal;

    const a = pad(Number(cantidad), 7);
    const b = a.split("").slice(0, 7).join("");
    return b;
  },

  formatFecha: (fecha: string) => {
    return moment(fecha).format("L");
  },
  formatFechaAsDB: (fecha: string) => {
    return moment(fecha).format("YYYY-MM-DD");
  },
  /* 
  formatMes: (date, type, convert = true) =>
    new Intl.DateTimeFormat("es-MX", {
      month: type ? type : "long",
    }).format(
      new Date(
        convert
          ? new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
          : date
      )
    ),
  formatYear: (date) =>
    new Intl.DateTimeFormat("es-MX", {
      year: "numeric",
    }).format(
      new Date(
        new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
      )
    ),

  obtenerDiaMes: (date) =>
    new Date(
      new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
    ).getDate(),

  formatTextoMayusPrimeraLetra: (string) => {
    string = string.toLocaleLowerCase();
    let primeraLetra = string.charAt(0).toLocaleUpperCase();
    let textoEntero = string
      .replace(/\s\w|[á,é,ó,í,ú,ñ]/g, (math) => math.toLocaleUpperCase())
      .slice(1);
    return primeraLetra + textoEntero;
  },

  formatFechaComplete: (date, convert = true) =>
    new Intl.DateTimeFormat("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(
      new Date(
        convert
          ? new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
          : date
      )
    ),
  formatHourMinute: (date, convert = true) =>
    new Intl.DateTimeFormat("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(
      new Date(
        convert
          ? new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
          : date
      )
    ),
  formatHours: (date, convert = true) =>
    new Intl.DateTimeFormat("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      // hour12: true,
      hourCycle: "h12",
    }).format(
      new Date(
        convert
          ? new Date(date).getTime() + new Date().getTimezoneOffset() * 60000
          : date
      )
    ),

  formatFechaDB: (date, local) => {
    date = new Date(date);
    if (local) {
      date.setTime(date.getTime() - new Date().getTimezoneOffset() * 60000);
    }
    const now = new Date(date).toISOString().split("T")[0];
    return now;
  },

  formatMesAno: (date) => {
    return `${format.formatMes(date)} ${new Date(date)
      .getFullYear()
      .toString()}`;
  },

   formatYear: (date, convert = true) => {
    date.setTime(date.getTime() - new Date().getTimezoneOffset() * 60000);
    return new Date(date).getFullYear();
  }, 

  formatFechaPractica: (date) =>
    new Date(date).getTime() + new Date().getTimezoneOffset() * 60000,

  
  orderMangueras: (arraIn, props) => {
    const property = props ? props.property || null : null;
    const arraOut = [];
    if (arraIn.length === 0) return { array: arraOut, object: () => {} };

    const mangueras = arraIn.map((el) => (property ? el[property] : el));

    const convertMayus = mangueras.map((manguera) => manguera.toUpperCase());
    const posiciones = convertMayus.map((manguera) => ({
      posicion: Number(manguera.replace(/\w/, "")),
      manguera: manguera.charAt(),
    }));

    const totalPosiciones = agruparArr(posiciones, (el) => el.posicion)
      .keys()
      .map((el) => Number(el))
      .sort();

    const findM = (data, property, Gas) =>
      data.find((el) =>
        property
          ? el[property] === `${Gas.manguera}${Gas.posicion}`
          : el === `${Gas.manguera}${Gas.posicion}`
      );

    totalPosiciones.forEach((p) => {
      const manguera = posiciones.filter((el) => el.posicion === p);
      const D = manguera.find((el) => el.manguera === "D");
      const M = manguera.find((el) => el.manguera === "M");
      const P = manguera.find((el) => el.manguera === "P");
      if (D) arraOut.push(findM(arraIn, property, D));
      if (M) arraOut.push(findM(arraIn, property, M));
      if (P) arraOut.push(findM(arraIn, property, P));
    });

    const convertToObject = () =>
      arraOut.map((el) => ({
        [el[property] || el]: arraIn.find((manguera) =>
          property
            ? manguera[property] === el[property]
            : manguera[property] === el
        ),
      }));

    return { array: arraOut, object: convertToObject };
  },

  fechasSemanales: (fecha) => {
    // Convertir la cadena de fecha en un objeto de fecha
    fecha = new Date(fecha);

    // Obtener el día de la semana (0 para domingo, 1 para lunes, ..., 6 para sábado)
    var diaSemana = fecha.getDay();

    // Calcular la diferencia de días para retroceder al sábado anterior
    var diasParaRetroceder = diaSemana + (diaSemana === 0 ? -6 : 1);

    // Retroceder al sábado anterior
    var sabadoAnterior = new Date(fecha);
    sabadoAnterior.setDate(fecha.getDate() - diasParaRetroceder);

    // Avanzar al viernes siguiente
    var viernesSiguiente = new Date(sabadoAnterior);
    viernesSiguiente.setDate(sabadoAnterior.getDate() + 6);

    // Formatear las fechas como cadenas en el formato 'YYYY-MM-DD'
    var sabadoAnteriorStr = sabadoAnterior.toISOString().split("T")[0];
    var viernesSiguienteStr = viernesSiguiente.toISOString().split("T")[0];

    //return [sabadoAnteriorStr, viernesSiguienteStr];
    return (
      format.formatFechaComplete(sabadoAnteriorStr) +
      "-" +
      format.formatFechaComplete(viernesSiguienteStr)
    );
  },

  numeroSemanaMes: (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);

    // Find the day of the week of the first day of the month (0: Sunday, 1: Monday, ..., 6: Saturday)
    let firstDayOfWeek = firstDayOfMonth.getDay();

    // If the first day of the month is not Sunday (0), find the next Sunday
    if (firstDayOfWeek !== 0) {
      firstDayOfWeek = 7 - firstDayOfWeek;
    }

    // Calculate the number of weeks from the first Sunday to the given date
    const diffInDays = Math.floor(
      (date - firstDayOfMonth) / (1000 * 60 * 60 * 24)
    );
    const numberOfWeeks = Math.ceil((firstDayOfWeek + diffInDays) / 7);

    return numberOfWeeks;
  },

  historialTendencia: (n, elemento, lista) => {
    //Es para el historial de tendencias de las gráficas de tendencias, lo que hace es que ordena cada punto en la fecha correspondiente
    const longitud = lista.length;

    if (longitud === 0) return 0;

    if (n >= longitud) {
      return lista[longitud - 1].cantidad;
    }
    const fechaPM = new Date(lista[n].fecha),
      fechaElement = new Date(elemento);

    if (fechaElement > fechaPM) {
      return lista[n].cantidad;
    }

    return format.historialTendencia(n + 1, elemento, lista);
  }, */
};

function pad(n: string | number, width: number, z?: any) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export default format;

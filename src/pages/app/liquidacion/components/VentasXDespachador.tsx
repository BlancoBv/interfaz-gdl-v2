import { FC, useMemo } from "react";
import Bar from "@components/charts/Bar";

const VentasXDespachador: FC<{ data: any }> = ({ data }) => {
  const datasets = useMemo(() => {
    const litros: any[] = [];

    Object.values(data).forEach((emp: any) => {
      const temp: any = { totalLitros: 0 };
      emp.forEach((liq: any) => {
        const { idempleado, nombre, apellido_paterno, apellido_materno } =
          liq.horario.empleado;
        const lecturas = JSON.parse(liq.lecturas);
        const totalLitros = lecturas.reduce(
          (a: number, b: { litrosVendidos: number }) => a + b.litrosVendidos,
          0
        );

        temp.idempleado = idempleado;
        temp.nombre = nombre;
        temp.apellidoP = apellido_paterno;
        temp.apellidoM = apellido_materno;
        temp.totalLitros = temp.totalLitros + totalLitros;
      });

      litros.push(temp);
    });
    if (litros.length > 0) {
      return [
        {
          data: litros
            .map((el) => ({
              x: `${el.idempleado};${el.nombre.split(" ")[0]}`,
              y: el.totalLitros,
            }))
            .slice(0, 5),
        },
      ];
    }
    return [];
  }, [data]);

  return (
    <div>
      {datasets.length > 0 && (
        <Bar
          etiquetaX="Despachador"
          etiquetaY="Litros"
          adjustToContainer
          data={{ datasets }}
          title=""
        />
      )}
      {datasets.length < 1 && <span>Sin datos.</span>}
    </div>
  );
};
export default VentasXDespachador;

import format from "@assets/format";
import Button from "@components/Button";
import { InputFecha } from "@components/forms/Input";
import { SelectEstacion } from "@components/forms/Select";
import SectionTitle from "@components/gui/SectionTitle";
import moment from "moment";
import { FC, useState } from "react";

const Liquidacion: FC = () => {
  const date = new Date(Date.now());
  const [body, setBody] = useState<{ fechaI: string; fechaF: string }>({
    fechaI: format.formatFechaAsDB(moment(date).subtract(7, "days")),
    fechaF: format.formatFechaAsDB(date),
  });
  return (
    <div className="w-full h-full">
      <SectionTitle titulo="Dashboard" subtitulo="Liquidación" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 grid-rows-4 gap-4">
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden lg:row-start-1">
          <div className="card-body">
            <h2 className="card-title">Litros vendidos</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden lg:row-start-2">
          <div className="card-body">
            <h2 className="card-title">Magna</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden lg:col-start-2 row-start-2">
          <div className="card-body">
            <h2 className="card-title">Premium</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden ">
          <div className="card-body">
            <h2 className="card-title">Diesel</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden md:col-span-2 lg:row-span-1 lg:col-span-7">
          <div className="card-body">
            <h2 className="card-title">Filtros</h2>
            <form className="flex gap-4">
              <InputFecha
                label="Fecha inicio"
                variable={body}
                setVariable={setBody}
                name="fechaI"
              />
              <InputFecha
                label="Fecha fin"
                variable={body}
                setVariable={setBody}
                name="fechaF"
              />
              <SelectEstacion
                label="Estación de servicio"
                variable={body}
                setVariable={setBody}
                name="estacionS"
              />
              <Button buttonType="submit" text="Filtrar" />
            </form>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden lg:row-span-2 lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Cantidad de liquidaciones</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden lg:row-span-2 lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Ventas de despachador</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden lg:row-span-2 lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Precios</h2>
            <p>0</p>
          </div>
        </div>

        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden lg:col-span-3 lg:row-span-2">
          <div className="card-body">
            <h2 className="card-title">Ventas por turnos</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden lg:col-span-4">
          <div className="card-body">
            <h2 className="card-title">Litros combustible por dia</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden lg:col-start-6">
          <div className="card-body">
            <h2 className="card-title">Montos faltantes</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden">
          <div className="card-body">
            <h2 className="card-title">Montos sobrantes</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden">
          <div className="card-body">
            <h2 className="card-title">Total en lecturas</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden">
          <div className="card-body">
            <h2 className="card-title">...</h2>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Liquidacion;

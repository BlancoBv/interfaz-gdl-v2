import SectionTitle from "@components/gui/SectionTitle";
import { FC } from "react";

const Liquidacion: FC = () => {
  return (
    <div className="w-full h-full">
      <SectionTitle titulo="Dashboard" subtitulo="Liquidación" />
      <div className="grid grid-cols-1 lg:grid-cols-7 grid-rows-4 gap-4">
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
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden lg:row-start-3">
          <div className="card-body">
            <h2 className="card-title">Premium</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden lg:row-start-4">
          <div className="card-body">
            <h2 className="card-title">Diesel</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden lg:row-span-2 lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Litros vendidos</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden lg:row-span-2 lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Litros vendidos</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden lg:row-span-2 lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Litros vendidos</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden lg:row-span-2 lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title">Litros vendidos</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden lg:col-span-3">
          <div className="card-body">
            <h2 className="card-title">Litros vendidos</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden">
          <div className="card-body">
            <h2 className="card-title">Litros vendidos</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden">
          <div className="card-body">
            <h2 className="card-title">Litros vendidos</h2>
            <p>0</p>
          </div>
        </div>
        <div className="card bg-base-100 w-full min-w-24 shadow-xl overflow-hidden">
          <div className="card-body">
            <h2 className="card-title">Litros vendidos</h2>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Liquidacion;

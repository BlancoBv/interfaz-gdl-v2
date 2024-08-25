import { FC } from "react";
import Icon from "@components/Icon";
import { islasInterface } from "../../components/ContextPreliq";
import agruparArr from "@assets/agruparArr";

import InputMangueras from "./InputMangueras";

interface single {
  iz: {
    idgas: string;
    nombre: string;
    mangueras: {
      idmanguera: string;
      tiene: boolean;
      direccion: "dr" | "iz";
      idgas: string;
      idsla: number;
    };
  }[];
  dr: {
    idgas: string;
    nombre: string;
    mangueras: {
      idmanguera: string;
      tiene: boolean;
      direccion: "dr" | "iz";
      idgas: string;
      idsla: number;
    };
  }[];
}

const CardIslas: FC<{
  data: islasInterface[];
  estacionServicio: number;
  setIdManguera: any;
}> = ({ data, estacionServicio, setIdManguera }) => {
  return (
    <>
      {data.map((isla) => {
        const {
          single,
        }: {
          single: single;
        } = agruparArr(isla.extra, (pos) => pos.mangueras.direccion);
        return (
          <div className="stats shadow w-full lg:h-96 mb-4" key={isla.value}>
            <div className="stat">
              {single.iz.map((manguera) => (
                <InputMangueras
                  data={manguera}
                  label={isla.label}
                  key={`izq ${manguera.idgas}`}
                  setIdManguera={setIdManguera}
                />
              ))}
            </div>

            <div className="stat flex flex-col justify-center items-center gap-4">
              <div className="stat-title">{isla.label}</div>
              <div className="stat-value">
                <Icon icon="gas-pump" size="2x" />
              </div>
              <div className="stat-desc text-secondary">
                GDL {estacionServicio}
              </div>
            </div>

            <div className="stat">
              {single.dr.map((manguera) => (
                <InputMangueras
                  data={manguera}
                  label={isla.label}
                  key={`dr ${manguera.idgas}`}
                  setIdManguera={setIdManguera}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CardIslas;

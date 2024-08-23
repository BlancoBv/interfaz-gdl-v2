import { FC, useContext, useState } from "react";
import SectionTitle from "../../../components/gui/SectionTitle";
import Icon from "../../../components/Icon";
import { Input } from "../../../components/forms/Input";
import { ContextPreliq } from "../components/ContextPreliq";
import agruparArr from "../../../assets/agruparArr";
import CardIslas from "./components/CardIslas";
import { ModalConfirmNoMutate } from "../../../components/gui/Modal";

const CapturarLecturas: FC = () => {
  const { body } = useContext(ContextPreliq).infoGeneral;
  const { body: mangueras, setBody: setMangueras } =
    useContext(ContextPreliq).mangueras;

  const [idManguera, setIdManguera] = useState<{
    idManguera: string;
    refs?: {
      inicial: { current: HTMLInputElement };
      final: { current: HTMLInputElement };
    };
  }>({ idManguera: "" });
  const ID_MODAL = "modal-confirm-delete-lectura";

  const deleteElement = () => {
    const indexOfValue = mangueras.findIndex(
      (el) => el.idManguera === idManguera.idManguera
    );

    if (indexOfValue >= 0) {
      const fGroup = mangueras.slice(0, indexOfValue);
      const lGroup = mangueras.splice(indexOfValue + 1);
      idManguera.refs?.inicial.current.classList.remove(
        "input-success",
        "input-warning",
        "input-error"
      );
      idManguera.refs?.final.current.classList.remove(
        "input-success",
        "input-warning",
        "input-error"
      );

      setMangueras([...fGroup, ...lGroup]);
    }
  };

  return (
    <div className="w-full h-full">
      <ModalConfirmNoMutate
        action={deleteElement}
        msg={`¿Desea eliminar las lecturas de la manguera seleccionada?`}
        customID={ID_MODAL}
        closeOnESC
      />
      <SectionTitle titulo="Captura de lecturas" subtitulo="Preliquidación" />
      {/* {body.islas?.map((el) => {
        const {
          single,
        }: {
          single: {
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
          };
        } = agruparArr(el.extra, (pos) => pos.mangueras.direccion);

        return (
          <div
            className="stats shadow w-full lg:h-96 stats-vertical lg:stats-horizontal mb-4"
            key={el.value}
          >
            {single.iz.map((manguera) => (
              <div className="stat">
                <div className="flex flex-col">
                  <p className="text-center">{manguera.mangueras.idmanguera}</p>
                  <div className="flex items-center gap-4 justify-evenly lg:justify-normal">
                    <Input
                      label="Lectura inicial"
                      name="XD"
                      variable={{}}
                      setVariable={() => {}}
                    />
                    <Input
                      label="Lectura inicial"
                      name="XD"
                      variable={{}}
                      setVariable={() => {}}
                    />
                    <button className="btn btn-error">
                      <Icon icon="trash" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="stat place-items-center">
              <div className="stat-title">{el.label}</div>
              <div className="stat-value">
                <Icon icon="gas-pump" size="3x" />
              </div>
            </div>

            <div className="stat">
              <div className="flex flex-col">
                <p className="text-center">M2</p>
                <div className="flex items-center gap-4 justify-evenly lg:justify-normal">
                  <Input
                    label="Lectura inicial"
                    name="XD"
                    variable={{}}
                    setVariable={() => {}}
                  />
                  <Input
                    label="Lectura inicial"
                    name="XD"
                    variable={{}}
                    setVariable={() => {}}
                  />
                  <button className="btn btn-error">
                    <Icon icon="trash" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })} */}
      {body.islas && body.estacion && (
        <CardIslas
          data={body.islas}
          estacionServicio={body.estacion}
          setIdManguera={setIdManguera}
        />
      )}
      {/*  <div className="stats shadow w-full lg:h-96 stats-vertical lg:stats-horizontal">
        <div className="stat">
          <div className="flex flex-col">
            <p className="text-center">M2</p>
            <div className="flex items-center gap-4 justify-evenly lg:justify-normal">
              <Input
                label="Lectura inicial"
                name="XD"
                variable={{}}
                setVariable={() => {}}
              />
              <Input
                label="Lectura inicial"
                name="XD"
                variable={{}}
                setVariable={() => {}}
              />
              <button className="btn btn-error">
                <Icon icon="trash" />
              </button>
            </div>
          </div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Isla</div>
          <div className="stat-value">
            <Icon icon="gas-pump" size="3x" />
          </div>
          <div className="stat-desc">No. 2</div>
        </div>

        <div className="stat">
          <div className="flex flex-col">
            <p className="text-center">M2</p>
            <div className="flex items-center gap-4 justify-evenly lg:justify-normal">
              <Input
                label="Lectura inicial"
                name="XD"
                variable={{}}
                setVariable={() => {}}
              />
              <Input
                label="Lectura inicial"
                name="XD"
                variable={{}}
                setVariable={() => {}}
              />
              <button className="btn btn-error">
                <Icon icon="trash" />
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default CapturarLecturas;

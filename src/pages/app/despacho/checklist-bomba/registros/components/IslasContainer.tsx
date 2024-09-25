import { islasInterface } from "@assets/interfaces";
import Icon from "@components/Icon";
import { useModal } from "@hooks/useModal";
import { FC } from "react";

const IslasContainer: FC<{ data: islasInterface[]; setRelativeData: any }> = ({
  data,
  setRelativeData,
}) => {
  const modalRegistros = useModal("modal-registros");

  return (
    <div className="flex flex-col mb-4">
      <h1 className="text-2xl font-bold">
        Estación GDL {data[0].idestacion_servicio}
      </h1>
      <span className="divider"></span>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${data.length} auto-cols-max gap-4`}
      >
        {data.map((bomba) => (
          <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
              <Icon icon="gas-pump" size="3x" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Bomba {bomba.nisla}</h2>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setRelativeData(bomba);
                    modalRegistros.show();
                  }}
                >
                  Ver registros
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default IslasContainer;

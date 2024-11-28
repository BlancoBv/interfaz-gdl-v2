import Icon from "@components/Icon";
import { FC, useRef } from "react";

interface Props {
  contenido?: string;
  onClick: () => void;
}

const BtnEliminar: FC<Props> = (props) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const modal = () => {
    if (!modalRef.current) {
      return { show: () => {}, close: () => {} };
    }

    return {
      show: () => modalRef.current?.show(),
      close: () => modalRef.current?.close(),
    };
  };

  return (
    <div>
      <button
        className="swap-on btn btn-sm btn-error"
        onClick={() => modal().show()}
      >
        <Icon icon="eraser" />
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box flex flex-col">
          <div>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg flex gap-2 items-center">
              <span>Confirmación</span>
            </h3>
            <div className="divider mt-0" />
          </div>
          <div className="flex-grow overflow-y-auto">
            <p>{props.contenido || "¿Deseas eliminar este elemento?"}</p>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => modal().close()}
              >
                Cancelar
              </button>
              <button
                className="btn btn-error"
                onClick={() => {
                  props.onClick();
                  modal().close();
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
        <form
          method="dialog"
          className="modal-backdrop"
          style={{ backgroundColor: "#0006" }}
        >
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default BtnEliminar;

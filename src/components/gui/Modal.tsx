import { FC, ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import Icon from "@components/Icon";

const Modal: FC<{
  id: string;
  title?: string;
  children?: ReactNode;
  sm?: boolean;
  onClose?: () => void;
  icon?: string;
}> = ({ id, title = "Titulo de ejemplo", children, sm, onClose, icon }) => {
  return (
    <dialog id={id} className="modal" onClose={onClose}>
      <div
        className={`modal-box ${sm ? "" : "w-11/12 max-w-5xl"} flex flex-col`}
      >
        <div>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg flex gap-2 items-center">
            {icon && <Icon icon={icon} size="2x" />}
            <span>{title}</span>
          </h3>
          <div className="divider mt-0" />
        </div>
        <div className="flex-grow overflow-y-auto"> {children}</div>
      </div>
      <form
        method="dialog"
        className="modal-backdrop"
        style={{ backgroundColor: "#0006" }}
      >
        <button>close</button>
      </form>
      <ToastContainer autoClose={800} closeButton containerId="fromModal" />
    </dialog>
  );
};

export const ModalConfirm: FC<{
  refetch: any;
  mutateVariable: any;
  closeModalID?: string;
  closeOnESC?: boolean;
}> = ({ refetch, mutateVariable, closeOnESC }) => {
  return (
    <dialog
      id="modal-confirm"
      className="modal"
      onCancel={closeOnESC ? undefined : (ev) => ev.preventDefault()}
    >
      <div className="modal-box flex flex-col max-w-xs">
        <div>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Confirmar acción</h3>
          <div className="divider mt-0" />
        </div>
        <p>¿Desea continuar?</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-4 items-center">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Cerrar</button>
            <button
              className="btn btn-primary"
              onClick={async () => {
                await mutateVariable.mutateAsync({});

                refetch();
                /*  if (closeModalID) {
                  (
                    document.getElementById(closeModalID) as HTMLDialogElement
                  ).close();
                } */
              }}
            >
              Aceptar
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export const ModalConfirmNoMutate: FC<{
  action: any;
  closeModalID?: string;
  msg?: string;
  title?: string;
  closeOnESC?: boolean;
  customID?: string;
  actionOnCloseButton?: boolean;
  confirmButtonText?: string;
  closeButtonText?: string;
}> = ({
  action,
  msg,
  title,
  closeOnESC,
  customID,
  actionOnCloseButton,
  confirmButtonText,
  closeButtonText,
}) => {
  return (
    <dialog
      id={customID ? customID : "modal-confirm-no-mutate"}
      className="modal"
      onCancel={closeOnESC ? undefined : (ev) => ev.preventDefault()}
    >
      <div className="modal-box flex flex-col max-w-xs">
        <div>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">
            {title ? title : "Confirmar acción"}
          </h3>
          <div className="divider mt-0" />
        </div>
        <p>{msg ? msg : "Confirmar acción"}</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-4 items-center">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn"
              onClick={actionOnCloseButton ? action : undefined}
            >
              {closeButtonText ? closeButtonText : "Cerrar"}
            </button>
            <button
              className="btn btn-primary"
              onClick={actionOnCloseButton ? undefined : action}
            >
              {confirmButtonText ? confirmButtonText : "Aceptar"}
            </button>
          </form>
        </div>
      </div>
      {/* <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form> */}
    </dialog>
  );
};

export default Modal;

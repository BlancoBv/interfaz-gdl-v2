import { FC, ReactNode } from "react";
import { ToastContainer } from "react-toastify";

const Modal: FC<{ id: string; title?: string; children?: ReactNode }> = ({
  id,
  title = "Titulo de ejemplo",
  children,
}) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box  w-11/12 max-w-5xl flex flex-col">
        <div>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="divider mt-0" />
        </div>
        <div className="flex-grow overflow-y-auto"> {children}</div>
      </div>
      <form method="dialog" className="modal-backdrop">
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
}> = ({ action, msg, title, closeOnESC, customID }) => {
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
            <button className="btn">Cerrar</button>
            <button className="btn btn-primary" onClick={action}>
              Aceptar
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

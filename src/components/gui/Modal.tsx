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

export default Modal;

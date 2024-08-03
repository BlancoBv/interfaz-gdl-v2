import { FC } from "react";
import { createPortal } from "react-dom";
import { ToastContainer } from "react-toastify";

const toastRoot = document.getElementById("toast-root") as HTMLElement;

const ToastPortal: FC = () => {
  return createPortal(
    <ToastContainer autoClose={800} closeButton containerId="global" />,
    toastRoot
  );
};
export default ToastPortal;

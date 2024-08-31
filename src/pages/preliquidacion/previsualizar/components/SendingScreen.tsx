import { FC } from "react";
import { createPortal } from "react-dom";

const SendingScreen: FC<{ isPending: boolean }> = ({ isPending }) => {
  return createPortal(
    isPending && (
      <div className="fixed w-screen h-screen backdrop-blur-sm bg-base-100/80 z-50 top-0 prose max-w-full flex items-center justify-center flex-col">
        <h1 className="text-center">Guardando preliquidación</h1>
        <span className="loading loading-spinner size-20 mt-4"></span>
      </div>
    ),
    document.body
  );
};
export default SendingScreen;

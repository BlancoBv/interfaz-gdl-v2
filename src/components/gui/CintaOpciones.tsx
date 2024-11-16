import { FC, ReactNode } from "react";

const CintaOpciones: FC<{
  children?: ReactNode;
  onSubmit?: any;
  zeroTop?: boolean;
}> = ({ children, onSubmit, zeroTop }) => {
  return (
    <div
      className={`flex flex-col sm:sticky ${
        zeroTop ? "top-0" : "top-28"
      } bg-base-100/80 backdrop-blur-sm z-30 w-full`}
    >
      <form
        className="flex gap-4 items-center flex-wrap justify-center lg:justify-evenly lg:flex-nowrap"
        onSubmit={onSubmit}
      >
        {children}
      </form>
      <div className="divider mb-0" />
    </div>
  );
};

export default CintaOpciones;

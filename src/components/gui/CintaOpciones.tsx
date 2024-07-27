import { FC, ReactNode } from "react";

const CintaOpciones: FC<{ children?: ReactNode; onSubmit?: any }> = ({
  children,
  onSubmit,
}) => {
  return (
    <div className="flex flex-col pt-4">
      <form
        className="flex gap-4 items-center flex-wrap justify-center lg:justify-normal lg:flex-nowrap"
        onSubmit={onSubmit}
      >
        {children}
      </form>
      <div className="divider" />
    </div>
  );
};

export default CintaOpciones;

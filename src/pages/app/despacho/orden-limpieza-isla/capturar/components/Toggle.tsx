import { ChangeEvent, FC, useEffect, useRef, useState } from "react";

const Toggle: FC<{
  text: string;
  idCumplimiento: number;
  setVariable: any;
  variable: any;
}> = ({ text, idCumplimiento, setVariable, variable }) => {
  const [value, setValue] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const handle = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = ev.currentTarget;
    const cumplimientosContainer = variable.evaluaciones as {
      idcumplimiento: number;
      cumple: 1 | 0;
    }[];
    ref.current?.classList.remove("bg-green-500", "bg-red-500");
    if (checked) {
      setVariable((prev: any) => ({
        ...prev,
        evaluaciones: [
          ...prev.evaluaciones,
          { idcumplimiento: Number(name), cumple: 1 },
        ],
      }));
      ref.current?.classList.add("toggle-success");
      setValue(true);
    } else {
      const indexOfValue = cumplimientosContainer.findIndex(
        (el) => el.idcumplimiento === Number(name)
      );
      if (indexOfValue >= 0) {
        const newValues = cumplimientosContainer;
        newValues[indexOfValue] = { ...newValues[indexOfValue], cumple: 0 };
        setVariable((prev: any) => ({ ...prev, evaluaciones: [...newValues] }));
        ref.current?.classList.add("bg-red-500");
        setValue(false);
      }
    }
  };
  useEffect(() => {
    if ((variable.evaluaciones as []).length === 0) {
      setValue(false);
    }
  }, [variable]);
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">{text}</span>
        <input
          type="checkbox"
          className="toggle toggle-lg"
          name={String(idCumplimiento)}
          checked={value}
          onChange={handle}
          ref={ref}
        />
      </label>
    </div>
  );
};

export default Toggle;

import { ChangeEvent, FC, useEffect, useRef, useState } from "react";

const Toggle: FC<{
  text: string;
  idCumplimiento: number;
  setVariable: any;
  variable: { pasos: { evaluacion: 1 | 0; idPaso: number }[] };
  reset: boolean;
}> = ({ text, idCumplimiento, setVariable, variable, reset }) => {
  const indexOfElement = variable.pasos.findIndex(
    (el) => el.idPaso === idCumplimiento
  );
  const defaultValue =
    variable.pasos[indexOfElement].evaluacion === 1 ? true : false;

  const [value, setValue] = useState<boolean>(defaultValue);

  const ref = useRef<HTMLInputElement>(null);

  const handle = (ev: ChangeEvent<HTMLInputElement>) => {
    const { checked } = ev.currentTarget;
    const newValues = [...variable.pasos];

    ref.current?.classList.remove("bg-green-500", "bg-red-500");
    if (checked) {
      newValues[indexOfElement].evaluacion = 1;
      setVariable((prev: any) => ({ ...prev, pasos: [...newValues] }));
      ref.current?.classList.add("toggle-success");
      setValue(true);
    } else {
      newValues[indexOfElement].evaluacion = 0;
      setVariable((prev: any) => ({ ...prev, pasos: [...newValues] }));
      setValue(false);
      ref.current?.classList.add("bg-red-500");
    }
  };
  useEffect(() => {
    if (defaultValue) {
      ref.current?.classList.add("toggle-success");
    }
  }, [defaultValue]);

  useEffect(() => {
    if (reset) {
      setValue(variable.pasos[indexOfElement].evaluacion === 1 ? true : false);
    }
  }, [reset]);

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

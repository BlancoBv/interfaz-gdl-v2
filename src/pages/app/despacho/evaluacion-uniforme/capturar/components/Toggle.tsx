import { ChangeEvent, FC, useEffect, useRef, useState } from "react";

const Toggle: FC<{
  text: string;
  idCumplimiento: number;
  setVariable: any;
  variable: { evaluaciones: { cumple: 1 | 0; idCumplimiento: number }[] };
  reset: boolean;
}> = ({ text, idCumplimiento, setVariable, variable, reset }) => {
  const indexOfElement = variable.evaluaciones.findIndex(
    (el) => el.idCumplimiento === idCumplimiento
  );

  const defaultValue =
    variable.evaluaciones[indexOfElement].cumple === 1 ? true : false;

  const [value, setValue] = useState<boolean>(defaultValue);

  const ref = useRef<HTMLInputElement>(null);

  const handle = (ev: ChangeEvent<HTMLInputElement>) => {
    const { checked } = ev.currentTarget;

    const newValues = [...variable.evaluaciones];

    ref.current?.classList.remove("bg-green-500", "bg-red-500");
    if (checked) {
      newValues[indexOfElement].cumple = 1;
      setVariable((prev: any) => ({ ...prev, evaluaciones: [...newValues] }));
      ref.current?.classList.add("toggle-success");
      setValue(true);
    } else {
      newValues[indexOfElement].cumple = 0;
      setVariable((prev: any) => ({ ...prev, evaluaciones: [...newValues] }));
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
      setValue(
        variable.evaluaciones[indexOfElement].cumple === 1 ? true : false
      );
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

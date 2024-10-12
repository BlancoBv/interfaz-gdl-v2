import { FC, useMemo, useState } from "react";

const Toggle: FC<{
  label: string;
  variable: {
    evaluaciones: { cumple: 1 | 0; idEvaluacionUniforme: number }[];
    empleado?: number;
  };
  setVariable: any;
  name: number;
  isChecked: boolean;
}> = ({ label, variable, setVariable, name, isChecked }) => {
  //const [checked, setChecked] = useState<boolean>(isChecked);

  const value = useMemo(() => {
    const indexOfElement = variable.evaluaciones.findIndex(
      (el) => el.idEvaluacionUniforme === name
    );

    if (indexOfElement >= 0) {
      return variable.evaluaciones[indexOfElement].cumple === 1 ? true : false;
    }
    return isChecked;
  }, [variable]);
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text me-2">{label}</span>
        <input
          type="checkbox"
          className="toggle"
          name={String(name)}
          onChange={(ev) => {
            const { checked, name } = ev.currentTarget;
            if (checked) {
              const indexOfElement = variable.evaluaciones.findIndex(
                (el) => Number(el.idEvaluacionUniforme) === Number(name)
              );

              if (indexOfElement >= 0) {
                const newValues = [...variable.evaluaciones];
                newValues[indexOfElement].cumple = 1;
                setVariable((prev: any) => ({
                  ...prev,
                  evaluaciones: [...newValues],
                }));
              }

              //setChecked(true);
            } else {
              const indexOfElement = variable.evaluaciones.findIndex(
                (el) => Number(el.idEvaluacionUniforme) === Number(name)
              );

              if (indexOfElement >= 0) {
                const newValues = [...variable.evaluaciones];
                newValues[indexOfElement].cumple = 0;
                setVariable((prev: any) => ({
                  ...prev,
                  evaluaciones: [...newValues],
                }));
              }

              //setChecked(false);
            }
            //setVariable((prev: any) => ({ ...prev, [name]: checked }));
          }}
          checked={value}
        />
      </label>
    </div>
  );
};
export default Toggle;

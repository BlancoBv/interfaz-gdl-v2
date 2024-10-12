import { FC, useMemo } from "react";

const Toggle: FC<{
  label: string;
  variable: {
    evaluaciones: { evaluacion: 1 | 0; idEvaluacionPaso: number }[];
    idEmpleado?: number;
  };
  setVariable: any;
  name: number;
  isChecked: boolean;
}> = ({ label, variable, setVariable, name, isChecked }) => {
  const value = useMemo(() => {
    const indexOfElement = variable.evaluaciones.findIndex(
      (el) => el.idEvaluacionPaso === name
    );

    if (indexOfElement >= 0) {
      return variable.evaluaciones[indexOfElement].evaluacion === 1
        ? true
        : false;
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
                (el) => Number(el.idEvaluacionPaso) === Number(name)
              );

              if (indexOfElement >= 0) {
                const newValues = [...variable.evaluaciones];
                newValues[indexOfElement].evaluacion = 1;

                setVariable((prev: any) => ({
                  ...prev,
                  evaluaciones: [...newValues],
                }));
              }
            } else {
              const indexOfElement = variable.evaluaciones.findIndex(
                (el) => Number(el.idEvaluacionPaso) === Number(name)
              );

              if (indexOfElement >= 0) {
                const newValues = [...variable.evaluaciones];
                newValues[indexOfElement].evaluacion = 0;

                setVariable((prev: any) => ({
                  ...prev,
                  evaluaciones: [...newValues],
                }));
              }
            }
          }}
          checked={value}
        />
      </label>
    </div>
  );
};
export default Toggle;

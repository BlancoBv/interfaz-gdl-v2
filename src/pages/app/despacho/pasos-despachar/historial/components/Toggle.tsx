import { FC, useState } from "react";

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
  const [checked, setChecked] = useState<boolean>(isChecked);
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
              } else {
                setVariable((prev: any) => ({
                  ...prev,
                  evaluaciones: [
                    ...prev.evaluaciones,
                    { evaluacion: 1, idEvaluacionPaso: Number(name) },
                  ],
                }));
              }
              setChecked(true);
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
              } else {
                setVariable((prev: any) => ({
                  ...prev,
                  evaluaciones: [
                    ...prev.evaluaciones,
                    { evaluacion: 0, idEvaluacionPaso: Number(name) },
                  ],
                }));
              }
              setChecked(false);
            }
            //setVariable((prev: any) => ({ ...prev, [name]: checked }));
          }}
          checked={checked}
        />
      </label>
    </div>
  );
};
export default Toggle;

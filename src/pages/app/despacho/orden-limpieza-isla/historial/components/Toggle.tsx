import { FC, useState } from "react";

const Toggle: FC<{
  label: string;
  variable: {
    evaluaciones: { cumple: 1 | 0; idoyl: number }[];
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
              setVariable((prev: any) => ({
                ...prev,
                evaluaciones: [
                  ...prev.evaluaciones,
                  { cumple: 1, idoyl: Number(name) },
                ],
              }));
              setChecked(true);
            } else {
              const indexOfElement = variable.evaluaciones.findIndex(
                (el) => Number(el.idoyl) === Number(name)
              );

              if (indexOfElement >= 0) {
                const fGroup = variable.evaluaciones.slice(0, indexOfElement);
                const lGroup = variable.evaluaciones.slice(indexOfElement + 1);
                setVariable((prev: any) => ({
                  ...prev,
                  evaluaciones: [
                    ...fGroup,
                    { cumple: 0, idoyl: Number(name) },
                    ...lGroup,
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

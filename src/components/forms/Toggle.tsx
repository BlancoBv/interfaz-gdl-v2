import { FC } from "react";

const Toggle: FC<{
  label: string;
  name: string;
  variable: any;
  setVariable: any;
  required?: boolean;
  disabled?: boolean;
}> = ({
  label,
  name,
  variable,
  setVariable,
  disabled = false,
  required = true,
}) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text me-2">{label}</span>
        <input
          type="checkbox"
          className="toggle"
          name={name}
          required={required}
          disabled={disabled}
          onChange={(ev) => {
            const { checked, name } = ev.currentTarget;
            setVariable((prev: any) => ({ ...prev, [name]: checked }));
          }}
          checked={variable.hasOwnProperty(name) ? variable[name] : false}
        />
      </label>
    </div>
  );
};

export default Toggle;

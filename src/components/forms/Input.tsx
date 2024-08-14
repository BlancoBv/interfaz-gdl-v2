import { FC } from "react";

export const Input: FC<{
  label: string;
  name: string;
  variable: any;
  setVariable: any;
  inputType?: "text" | "number";
  required?: boolean;
  disabled?: boolean;
  icon?: string;
}> = ({
  label,
  name,
  variable,
  setVariable,
  inputType = "text",
  disabled = false,
  required = true,
}) => {
  return (
    <label className="form-control w-full max-w-40 lg:max-w-xs ">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        className="input input-bordered w-full"
        type={inputType}
        name={name}
        required={required}
        disabled={disabled}
        onChange={(ev) => {
          const { name, value } = ev.currentTarget;
          setVariable((prev: any) => ({ ...prev, [name]: value }));
        }}
        value={variable.hasOwnProperty(name) ? variable[name] : ""}
      />
    </label>
  );
};

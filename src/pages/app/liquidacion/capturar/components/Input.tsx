import { forwardRef } from "react";

interface props {
  label: string;
  name: "lecturaInicial" | "lecturaFinal";
  required?: boolean;
  disabled?: boolean;
  icon?: string;
  autoFocus?: boolean;
  handleFn: any;
  value: any;
}
type ref = HTMLInputElement;

const InputPreliq = forwardRef<ref, props>(
  (
    {
      label,
      name,
      disabled = false,
      required = true,
      autoFocus,
      handleFn,
      value,
    },
    ref
  ) => {
    return (
      <label className="form-control w-full max-w-40 lg:max-w-xs ">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          ref={ref}
          className="input input-bordered w-full"
          type="text"
          name={name}
          required={required}
          disabled={disabled}
          onChange={(ev) => handleFn(ev, ref)}
          autoFocus={autoFocus}
          //value={value && value.hasOwnProperty(name) ? value[name] : ""}
          value={value}
          min={0}
          //max={inputType === "number" && max ? max : undefined}
        />
      </label>
    );
  }
);

export default InputPreliq;

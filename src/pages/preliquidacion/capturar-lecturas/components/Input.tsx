import { forwardRef } from "react";

/* const InputPreliq: FC<{
  label: string;
  name: "lecturaInicial" | "lecturaFinal";
  required?: boolean;
  disabled?: boolean;
  icon?: string;
  autoFocus?: boolean;
  max?: number;
  handleFn: any;
  value: any;
}> = ({
  label,
  name,
  disabled = false,
  required = true,
  autoFocus,
  max,
  handleFn,
  value,
}) => {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <label className="form-control w-full max-w-40 lg:max-w-xs ">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        ref={ref}
        className="input input-bordered w-full"
        type="number"
        name={name}
        required={required}
        disabled={disabled}
        onChange={(ev) => handleFn(ev, ref)}
        autoFocus={autoFocus}
        //value={value && value.hasOwnProperty(name) ? value[name] : ""}
        value={value}
        step={1}
        min={0}
        //max={inputType === "number" && max ? max : undefined}
      />
    </label>
  );
}; */

interface props {
  label: string;
  name: "lecturaInicial" | "lecturaFinal";
  required?: boolean;
  disabled?: boolean;
  icon?: string;
  autoFocus?: boolean;
  max?: number;
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
      max,
      handleFn,
      value,
    },
    ref
  ) => {
    console.log({ value });

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

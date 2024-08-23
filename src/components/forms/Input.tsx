import { ChangeEvent, FC, useRef } from "react";

export const Input: FC<{
  label: string;
  name: string;
  variable: any;
  setVariable: any;
  inputType?: "text" | "number";
  required?: boolean;
  disabled?: boolean;
  icon?: string;
  autoFocus?: boolean;
  max?: number;
}> = ({
  label,
  name,
  variable,
  setVariable,
  inputType = "text",
  disabled = false,
  required = true,
  autoFocus,
  max,
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const handle = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.currentTarget;

    const regExpNoWhiteSpace = new RegExp(/^\s+$/, "g");
    const regExpOnlyNumber = new RegExp(/^\d+$|^\d+\.\d*$/, "g");

    if (!regExpNoWhiteSpace.test(value)) {
      ref.current?.classList.remove("input-error");
      setVariable((prev: any) => ({ ...prev, [name]: value }));
    } else {
      ref.current?.classList.add("input-error");
    }

    if (inputType === "number") {
      if (regExpOnlyNumber.test(value)) {
        ref.current?.classList.remove("input-error");
        setVariable((prev: any) => ({ ...prev, [name]: value }));
      } else {
        ref.current?.classList.add("input-error");
      }
    }
  };
  return (
    <label className="form-control w-full max-w-40 lg:max-w-xs ">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        ref={ref}
        className="input input-bordered w-full"
        type={inputType}
        name={name}
        required={required}
        disabled={disabled}
        onChange={handle}
        value={variable.hasOwnProperty(name) ? variable[name] : ""}
        autoFocus={autoFocus}
        step={inputType === "number" ? 0.01 : undefined}
        min={inputType === "number" ? 0 : undefined}
        max={inputType === "number" && max ? max : undefined}
      />
    </label>
  );
};

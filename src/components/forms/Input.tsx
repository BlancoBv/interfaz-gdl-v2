import moment from "moment";
import { ChangeEvent, FC, useRef } from "react";
import { toast } from "react-toastify";

interface input {
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
  step?: number;
}

export const Input: FC<input> = ({
  label,
  name,
  variable,
  setVariable,
  inputType = "text",
  disabled = false,
  required = true,
  autoFocus,
  max,
  step,
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
        step={inputType === "number" ? (step ? step : 0.01) : undefined}
        min={inputType === "number" ? 0 : undefined}
        max={inputType === "number" && max ? max : undefined}
      />
    </label>
  );
};

type fecha = Pick<
  input,
  "label" | "name" | "variable" | "setVariable" | "required"
> & { todayBtn?: boolean };
export const InputFecha: FC<fecha> = ({
  label,
  name,
  variable,
  setVariable,
  required,
  todayBtn,
}) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const handle = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.currentTarget;

    const regExpNoWhiteSpace = new RegExp(/^\s+$/, "g");

    if (!regExpNoWhiteSpace.test(value)) {
      ref.current?.classList.remove("input-error");
      setVariable((prev: any) => ({ ...prev, [name]: value }));
    } else {
      ref.current?.classList.add("input-error");
    }
  };

  const setTodayDate = () => {
    const date = new Date(Date.now());
    setVariable((prev: any) => ({
      ...prev,
      [name]: moment(date).format("YYYY-MM-DD"),
    }));
  };

  console.log(variable);

  return (
    <label className="form-control w-full max-w-40 lg:max-w-xs ">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <div className="join">
        <input
          ref={ref}
          className="input input-bordered w-full"
          type="date"
          name={name}
          required={required}
          onChange={handle}
          value={variable.hasOwnProperty(name) ? variable[name] : ""}
        />
        {todayBtn && (
          <button
            className="btn join-item"
            type="button"
            onClick={setTodayDate}
          >
            Hoy
          </button>
        )}
      </div>
    </label>
  );
};

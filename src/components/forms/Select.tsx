import moment from "moment";
import { FC, ReactNode, useState } from "react";
import { meses } from "../../assets/misc";

export const Select: FC<{
  name: string;
  label: string;
  variable: any;
  placeholder: string;
  setVariable: any;
  required?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}> = ({
  name,
  label,
  variable,
  setVariable,
  placeholder,
  disabled,
  required,
  children,
}) => {
  return (
    <label className="form-control w-full max-w-40 lg:max-w-xs">
      {label}
      <select
        className="select select-bordered"
        name={name}
        onChange={(ev) => {
          const { name, value } = ev.currentTarget;
          setVariable((prev: any) => ({ ...prev, [name]: value }));
        }}
        value={variable.hasOwnProperty(name) ? variable[name] : ""}
        disabled={disabled}
        required={required}
      >
        <option disabled value="">
          {placeholder}
        </option>
        {children}
      </select>
    </label>
  );
};

export const SelectMonth: FC<{
  name: string;
  label: string;
  variable: any;
  setVariable: any;
  required?: boolean;
  disabled?: boolean;
}> = ({ name, label, variable, setVariable, disabled, required }) => {
  return (
    <label className="form-control w-full max-w-40 lg:max-w-xs">
      {label}
      <select
        className="select select-bordered"
        name={name}
        onChange={(ev) => {
          const { name, value } = ev.currentTarget;
          setVariable((prev: any) => ({ ...prev, [name]: value }));
        }}
        value={variable.hasOwnProperty(name) ? variable[name] : ""}
        disabled={disabled}
        required={required}
      >
        <option disabled value="">
          Selecciona un mes
        </option>
        {meses.map((mes) => (
          <option value={mes.id} key={mes.id}>
            {mes.mes}
          </option>
        ))}
      </select>
    </label>
  );
};

export const SelectYear: FC<{
  name: string;
  label: string;
  variable: any;
  setVariable: any;
  required?: boolean;
  disabled?: boolean;
}> = ({ name, label, variable, setVariable, disabled, required }) => {
  const date = moment(new Date(Date.now()));
  const [actualValue, setActualValue] = useState<number>(date.year());

  return (
    <label className="form-control w-full max-w-40 lg:max-w-xs">
      {label}
      <select
        className="select select-bordered"
        name={name}
        onChange={(ev) => {
          const { name, value } = ev.currentTarget;
          setActualValue(Number(value));
          setVariable((prev: any) => ({ ...prev, [name]: value }));
        }}
        value={variable.hasOwnProperty(name) ? variable[name] : ""}
        disabled={disabled}
        required={required}
      >
        <option disabled value="">
          Selecciona un año
        </option>
        <option>{actualValue - 1}</option>
        <option>{actualValue}</option>
        <option>{actualValue + 1}</option>
      </select>
    </label>
  );
};

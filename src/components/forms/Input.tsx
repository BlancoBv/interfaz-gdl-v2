import { Dispatch, FC, SetStateAction } from "react";

export const Input: FC = () => {
  return <input />;
};

export const SelectMonth: FC<{
  name: string;
  label: string;
  variable: any;
  placeholder: string;
  setVariable: (value: string, name: string) => void;
  required?: boolean;
  disabled?: boolean;
}> = ({
  name,
  label,
  variable,
  setVariable,
  placeholder,
  disabled,
  required,
}) => {
  const meses = [
    {
      id: 1,
      mes: "Enero",
    },
    {
      id: 2,
      mes: "Febrero",
    },
    {
      id: 3,
      mes: "Marzo",
    },
    {
      id: 4,
      mes: "Abril",
    },
    {
      id: 5,
      mes: "Mayo",
    },
    {
      id: 6,
      mes: "Junio",
    },
    {
      id: 7,
      mes: "Julio",
    },
    {
      id: 8,
      mes: "Agosto",
    },
    {
      id: 9,
      mes: "Septiembre",
    },
    {
      id: 10,
      mes: "Octubre",
    },
    {
      id: 11,
      mes: "Noviembre",
    },
    {
      id: 12,
      mes: "Diciembre",
    },
  ];
  return (
    <label className="form-control w-full max-w-xs">
      {label}
      <select
        className="select select-bordered"
        name={name}
        onChange={(ev) => {
          const { name, value } = ev.currentTarget;
          setVariable(value, name);
        }}
        value={variable.hasOwnProperty(name) ? variable[name] : ""}
        disabled={disabled}
        required={required}
      >
        <option disabled value="">
          {placeholder}
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

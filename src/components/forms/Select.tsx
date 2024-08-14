import moment from "moment";
import { FC, ReactNode, useMemo, useState } from "react";
import { meses } from "../../assets/misc";
import { useGetData } from "../../hooks/useGetData";
import RSelect from "react-select";

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
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
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
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
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
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
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

//http://localhost:4000/api/empleado?departamento=1&auth=false&estatus=1&estatus=6

export const SelectEmpleado: FC<{
  name: string;
  label: string;
  variable: any;
  setVariable: any;
  required?: boolean;
  disabled?: boolean;
  estatus: string[];
  departamento:
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12";
}> = ({
  name,
  label,
  variable,
  setVariable,
  disabled,
  required,
  estatus,
  departamento,
}) => {
  const { data, isPending, isFetching, isError } = useGetData(
    `empleado?departamento=${
      departamento ? departamento : "1"
    }&auth=false&estatus=${estatus ? estatus.join("&estatus=") : ""}`,
    "empledoSelectData"
  );

  return (
    <label className="form-control w-full max-w-40 lg:max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
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
          Selecciona un empleado
        </option>
        {!isPending &&
          !isFetching &&
          !isError &&
          data.response.map(
            (el: { nombre_completo: string; idempleado: number }) => (
              <option value={el.idempleado} key={el.idempleado}>
                {el.nombre_completo}
              </option>
            )
          )}
      </select>
    </label>
  );
};

export const ReactSelect: FC = () => {
  return (
    <label className="form-control w-full max-w-40 lg:max-w-xs">
      <div className="label">
        <span className="label-text">Etiqueta de ejemplo</span>
      </div>
      <RSelect
        classNames={{
          control: (state) =>
            `bg-base-100 rounded-btn border-base-content/20 border h-12 min-h-12 w-full ps-4 pe-10 text-sm ${
              state.isFocused
                ? "outline outline-2 outline-base-content/20 outline-offset-2"
                : ""
            }`,
          menu: () => `bg-base-200 mt-2 z-50`,
        }}
        unstyled
        styles={{
          control: (baseStyles) => {
            const { outline, ...base } = baseStyles;
            return { ...base };
          },
        }}
        noOptionsMessage={() => "Sin opciones"}
      />
    </label>
  );
};

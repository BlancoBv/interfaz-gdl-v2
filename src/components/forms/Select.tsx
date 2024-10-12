import moment from "moment";
import { FC, ReactNode, useMemo, useState } from "react";
import { meses } from "@assets/misc";
import { getDataInterface, useGetData } from "@hooks/useGetData";
import RSelect from "react-select";
import {
  departamentoInterface,
  incumplimientoInterface,
  islasInterface,
} from "@assets/interfaces";

export const Select: FC<{
  name: string;
  label: string;
  variable: any;
  placeholder: string;
  setVariable: any;
  required?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  options: { label: string; value: any }[];
}> = ({
  name,
  label,
  variable,
  setVariable,
  placeholder,
  disabled,
  required,
  options,
  children,
}) => {
  return (
    <label className="form-control w-full lg:max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      {/* <select
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
      </select> */}
      <ReactSelect
        options={options}
        placeholder={placeholder}
        variable={variable}
        setVariable={setVariable}
        name={name}
        required={required}
      />
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
    <Select
      name={name}
      label={label}
      variable={variable}
      setVariable={setVariable}
      placeholder="Selecciona un mes"
      options={meses.map((mes) => ({ value: mes.id, label: mes.mes }))}
      disabled={disabled}
      required={required}
    />
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
  const value: number = variable.hasOwnProperty(name)
    ? variable[name]
    : date.year();

  return (
    <Select
      name={name}
      label={label}
      variable={variable}
      setVariable={setVariable}
      placeholder="Selecciona un año"
      options={[
        { value: value - 1, label: String(value - 1) },
        { value, label: String(value) },
        { value: value + 1, label: String(value + 1) },
      ]}
      disabled={disabled}
      required={required}
    />
  );
};

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
    | "12"
    | "all";
  multiple?: boolean;
  labelName?: string;
  valueName?: string;
}> = ({
  name,
  label,
  variable,
  setVariable,
  disabled,
  required,
  estatus,
  departamento,
  multiple,
  labelName,
  valueName,
}) => {
  const { data, isPending, isError } = useGetData(
    `empleado?departamento=${
      departamento === "all" ? "" : departamento
    }&auth=false&estatus=${estatus ? estatus.join("&estatus=") : ""}`,
    "empledoSelectData",
    { fetchInURLChange: true, fetchTrigger: departamento }
  );

  return (
    <label className="form-control w-full lg:max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <ReactSelect
        placeholder="Selecciona un empleado"
        options={
          !isPending && !isError
            ? data.response.map(
                (el: { nombre_completo: string; idempleado: number }) => ({
                  value: el.idempleado,
                  label: el.nombre_completo,
                })
              )
            : []
        }
        isLoading={isPending}
        setVariable={setVariable}
        name={name}
        variable={variable}
        disabled={disabled}
        required={required}
        multiple={multiple}
        labelName={labelName ? labelName : ""}
        valueName={valueName ? valueName : ""}
      />
    </label>
  );
};

export const SelectTurno: FC<{
  name: string;
  label: string;
  variable: any;
  setVariable: any;
  required?: boolean;
  disabled?: boolean;
}> = ({ name, label, variable, setVariable, disabled, required }) => {
  const { data, isPending, isError } = useGetData(
    "administrativo/turnos/buscartodo",
    "turnoSelectData"
  );

  return (
    <label className="form-control w-full max-w-40 lg:max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <ReactSelect
        placeholder="Selecciona un turno"
        options={
          !isPending && !isError
            ? data.response.map(
                (el: {
                  turno: string;
                  idturno: number;
                  hora_empiezo: string;
                }) => ({
                  value: el.idturno,
                  label: `${el.turno} (${el.hora_empiezo})`,
                })
              )
            : []
        }
        isLoading={isPending}
        setVariable={setVariable}
        name={name}
        variable={variable}
        disabled={disabled}
        required={required}
      />
    </label>
  );
};

export const SelectEstacion: FC<{
  name: string;
  label: string;
  variable: any;
  setVariable: any;
  required?: boolean;
  disabled?: boolean;
}> = ({ name, label, variable, setVariable, disabled, required }) => {
  const { data, isPending, isError } = useGetData(
    "estaciones-servicio",
    "estacionSelectData"
  );

  return (
    <label className="form-control w-full max-w-40 lg:max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <ReactSelect
        placeholder="Selecciona un turno"
        options={
          !isPending && !isError
            ? data.response.map(
                (el: { nombre: string; idestacion_servicio: number }) => ({
                  value: el.idestacion_servicio,
                  label: el.nombre,
                })
              )
            : []
        }
        isLoading={isPending}
        setVariable={setVariable}
        name={name}
        variable={variable}
        disabled={disabled}
        required={required}
      />
    </label>
  );
};

export const SelectIsla: FC<{
  name: string;
  label: string;
  variable: any;
  setVariable: any;
  required?: boolean;
  disabled?: boolean;
  estacionServicio?: number | string;
}> = ({
  name,
  label,
  variable,
  setVariable,
  disabled,
  required,
  estacionServicio,
}) => {
  const { data, isPending, isError } = useGetData(
    `liquidacion/islas/${estacionServicio}`,
    "islaSelectData",
    { fetchInURLChange: true }
  );

  return (
    <label className="form-control w-full max-w-40 lg:max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <ReactSelect
        placeholder="Selecciona una o más islas"
        options={
          !isPending && !isError
            ? data.response.map(
                (el: {
                  idisla: number;
                  nisla: number;
                  gas: {
                    idgas: string;
                    nombre: string;
                    mangueras: {
                      idmanguera: string;
                      tiene: boolean;
                      direccion: "dr" | "iz";
                      idgas: string;
                      idsla: number;
                    }[];
                  };
                }) => ({
                  value: el.idisla,
                  label: `Isla ${el.nisla}`,
                  extra: el.gas,
                })
              )
            : []
        }
        isLoading={isPending}
        setVariable={setVariable}
        name={name}
        variable={variable}
        disabled={disabled}
        required={required}
        multiple
        valueName="idIsla"
        labelName="nIsla"
      />
    </label>
  );
};
export const SelectIslaSingle: FC<{
  name: string;
  label: string;
  variable: any;
  setVariable: any;
  required?: boolean;
  disabled?: boolean;
  estacionServicio?: number | string;
  targetValue?: "idisla" | "nisla";
}> = ({
  name,
  label,
  variable,
  setVariable,
  disabled,
  required,
  estacionServicio,
  targetValue,
}) => {
  const { data, isPending, isError } = useGetData(
    `liquidacion/islas/${estacionServicio}`,
    "islaSelectSingleData",
    { fetchInURLChange: true }
  );

  return (
    <label className="form-control w-full max-w-40 lg:max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <ReactSelect
        placeholder="Selecciona una o más islas"
        options={
          !isPending && !isError
            ? data.response.map((el: islasInterface) => ({
                value: targetValue
                  ? el[targetValue as keyof islasInterface]
                  : el.idisla,
                label: `Isla ${el.nisla}`,
              }))
            : []
        }
        isLoading={isPending}
        setVariable={setVariable}
        name={name}
        variable={variable}
        disabled={disabled}
        required={required}
      />
    </label>
  );
};

type departamento = Pick<rSelectInterface, "name" | "variable" | "setVariable">;
interface departamentoData extends getDataInterface {
  data: { response: departamentoInterface[] };
}
export const SelectDepartamentos: FC<departamento> = ({
  name,
  variable,
  setVariable,
}) => {
  const { data, isError, isPending }: departamentoData = useGetData(
    "departamento",
    "departamentoData"
  );

  return (
    <Select
      label="Departamento"
      placeholder="Selecciona departamento"
      name={name}
      variable={variable}
      setVariable={setVariable}
      options={
        !isError && !isPending
          ? data.response.map((el) => ({
              value: el.iddepartamento,
              label: el.departamento,
            }))
          : []
      }
    />
  );
};

type incumplimiento = Pick<
  rSelectInterface,
  "name" | "variable" | "setVariable" | "required"
>;
interface incumplimientoData extends getDataInterface {
  data: { response: incumplimientoInterface[] };
}
export const SelectIncumplimientos: FC<incumplimiento> = ({
  name,
  variable,
  setVariable,
  required,
}) => {
  const { data, isError, isPending }: incumplimientoData = useGetData(
    "incumplimiento",
    "departamentoData"
  );

  return (
    <Select
      label="Incumplimiento"
      placeholder="Selecciona incumplimiento"
      name={name}
      variable={variable}
      setVariable={setVariable}
      options={
        !isError && !isPending
          ? data.response.map((el) => ({
              value: el.idincumplimiento,
              label: el.incumplimiento,
            }))
          : []
      }
      required={required}
    />
  );
};

interface rSelectBase {
  options: { value: string | number; label: string }[];
  placeholder: string;
  isLoading?: boolean;
  required?: boolean;
  disabled?: boolean;
  variable: any;
  name: string;
  setVariable: any;
  tabIndex?: number;
}
interface rSelectSingle extends rSelectBase {
  multiple?: false;
}

interface rSelectMultiple extends rSelectBase {
  multiple: true;
  valueName: string;
  labelName: string;
}

type rSelectInterface = rSelectMultiple | rSelectSingle;

const ReactSelect: FC<rSelectInterface> = (props) => {
  const {
    options,
    placeholder,
    isLoading,
    required,
    disabled,
    variable,
    setVariable,
    name,
    tabIndex,
    multiple,
  } = props;
  const value = useMemo(() => {
    if (variable[name] && options) {
      const indexOfValue = options.findIndex((el) => {
        if (typeof el.value === "string") {
          return el.value === variable[name];
        }
        return Number(el.value) === Number(variable[name]);
      });

      if (multiple) {
        return variable[name].map((el: any) => ({
          label: el[props.labelName],
          value: el[props.valueName],
        }));
      }
      if (!options) {
        variable[name];
      }
      return options[indexOfValue];
    }
    return null;
  }, [variable, options]);

  return (
    <RSelect
      classNames={{
        control: (state) =>
          `${
            state.isDisabled
              ? "bg-base-200 text-base-content/40 border-base-200"
              : "bg-base-100 border-base-content/20"
          } rounded-btn border h-12 w-full text-sm ${
            state.isFocused
              ? "outline outline-2 outline-base-content/20 outline-offset-2"
              : ""
          }`,
        valueContainer: () => `ps-4 pe-10`,
        menu: () => `menu bg-base-200 mt-2 p-2 rounded-btn shadow-sm`,
        option: (status) =>
          `rounded-btn p-2 text-left min-h-9 ${
            status.isSelected ? "bg-primary" : "hover:bg-primary/40"
          }`,
        placeholder: () => `overflow-clip text-nowrap me-22`,
        clearIndicator: () => "cursor-pointer hover:text-error",
      }}
      unstyled
      styles={{
        control: (baseStyles) => {
          const { outline, ...base } = baseStyles;
          return { ...base };
        },
      }}
      isLoading={isLoading}
      noOptionsMessage={() => "Sin opciones"}
      placeholder={placeholder ? placeholder : "Selecciona un elemento"}
      options={options}
      loadingMessage={() => "Cargando..."}
      required={required}
      isDisabled={disabled}
      isClearable
      onChange={(ev) => {
        if (multiple) {
          const values = ev.map((el: { value: string; label: string }) => ({
            [props.labelName]: el.label,
            [props.valueName]: el.value,
          }));
          setVariable((prev: any) => ({
            ...prev,
            [name]: values,
          }));
        } else {
          setVariable((prev: any) => ({
            ...prev,
            [name]: ev ? ev.value : null,
          }));
        }
      }}
      value={value}
      tabIndex={tabIndex}
      isMulti={multiple}
    />
  );
};

import { Select } from "@components/forms/Select";
import { FC } from "react";

const SelectStatus: FC<{
  variable: any;
  setVariable: any;
  name?: string;
  options?: { value: string; label: string }[];
}> = ({ variable, setVariable, name, options }) => {
  return (
    <Select
      name={name ? name : "status"}
      variable={variable}
      setVariable={setVariable}
      placeholder="Selecciona un estatus"
      label="Estatus"
      options={
        options
          ? options
          : [
              { value: 1, label: "Contratado" },
              { value: 2, label: "Practicantes" },
              { value: 5, label: "Pendiente" },
              { value: 3, label: "Inactivos" },
              { value: 4, label: "Rechazados" },
            ]
      }
      required
    />
  );
};
export default SelectStatus;

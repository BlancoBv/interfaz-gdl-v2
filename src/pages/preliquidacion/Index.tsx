import { FC, useState } from "react";
import SectionTitle from "../../components/gui/SectionTitle";
import CardInfoGral from "./components/CardInfoGral";
import { SelectEmpleado } from "../../components/forms/Select";
import { NavLink } from "react-router-dom";

const Preliquidacion: FC = () => {
  const [body, setBody] = useState<{ empleado?: "string" }>({});
  return (
    <div className="w-full h-full flex flex-col">
      <SectionTitle titulo="Información general" subtitulo="Preliquidación" />
      <div className="w-full grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardInfoGral titulo="Empleado" icon="user">
          <SelectEmpleado
            name="empleado"
            label="Selecciona un empleado"
            variable={body}
            setVariable={setBody}
            estatus={["1", "6"]}
            departamento="1"
          />
        </CardInfoGral>
        <CardInfoGral titulo="Turno" icon="business-time">
          <SelectEmpleado
            name="empleado"
            label="Selecciona un turno"
            variable={body}
            setVariable={setBody}
            estatus={["1", "6"]}
            departamento="1"
          />
        </CardInfoGral>
        <CardInfoGral titulo="Estación de servicio" icon="tent">
          <SelectEmpleado
            name="empleado"
            label="Selecciona una estación de servicio"
            variable={body}
            setVariable={setBody}
            estatus={["1", "6"]}
            departamento="1"
          />
        </CardInfoGral>
        <CardInfoGral titulo="Isla(s) de trabajo" icon="gas-pump">
          <SelectEmpleado
            name="empleado"
            label="Selecciona una isla de trabajo"
            variable={body}
            setVariable={setBody}
            estatus={["1", "6"]}
            departamento="1"
          />
        </CardInfoGral>
      </div>
      <NavLink
        to="/preliquidacion/configurar-precios"
        className="btn btn-primary btn-block mt-4"
      >
        Siguiente
      </NavLink>
    </div>
  );
};

export default Preliquidacion;

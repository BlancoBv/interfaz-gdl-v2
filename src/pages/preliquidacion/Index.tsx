import { FC, useContext, useEffect } from "react";
import SectionTitle from "../../components/gui/SectionTitle";
import CardInfoGral from "./components/CardInfoGral";
import {
  SelectEmpleado,
  SelectEstacion,
  SelectIsla,
  SelectTurno,
} from "../../components/forms/Select";
import { useNavigate } from "react-router-dom";
import ButtonNext from "./components/ButtonNext";
import { ContextPreliq } from "./components/ContextPreliq";

const Preliquidacion: FC = () => {
  const { body, setBody } = useContext(ContextPreliq)?.infoGeneral;

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("infoGeneralPreliq", JSON.stringify(body));
  }, [body]);

  return (
    <div className="w-full h-full flex flex-col">
      <SectionTitle titulo="Información general" subtitulo="Preliquidación" />
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          navigate("/preliquidacion/configurar-precios");
        }}
      >
        <div className="w-full grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardInfoGral titulo="Empleado" icon="user">
            <SelectEmpleado
              name="empleado"
              label="Empleado"
              variable={body}
              setVariable={setBody}
              estatus={["1", "6"]}
              departamento="1"
              required
            />
          </CardInfoGral>
          <CardInfoGral titulo="Turno" icon="business-time">
            <SelectTurno
              name="turno"
              label="Turno"
              variable={body}
              setVariable={setBody}
              disabled={
                body.hasOwnProperty("empleado")
                  ? body.empleado === null
                    ? true
                    : false
                  : true
              }
              required
            />
          </CardInfoGral>
          <CardInfoGral titulo="Estación de servicio" icon="tent">
            <SelectEstacion
              name="estacion"
              label="Estación de servicio"
              variable={body}
              setVariable={setBody}
              disabled={
                body.hasOwnProperty("empleado") || body.hasOwnProperty("turno")
                  ? body.empleado === null || body.turno === null
                    ? true
                    : false
                  : true
              }
              required
            />
          </CardInfoGral>
          <CardInfoGral titulo="Isla(s) de trabajo" icon="gas-pump">
            <SelectIsla
              name="islas"
              label="Isla(s) de trabajo"
              variable={body}
              setVariable={setBody}
              estacionServicio={body.estacion}
              multiple
              required
            />
          </CardInfoGral>
        </div>
        <ButtonNext />
        {/*         <NavLink
          to="/preliquidacion/configurar-precios"
          className="btn btn-primary btn-block mt-4"
        >
          Siguiente
        </NavLink> */}
      </form>
    </div>
  );
};

export default Preliquidacion;

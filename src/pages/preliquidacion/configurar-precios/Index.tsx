import { FC, useState } from "react";
import SectionTitle from "../../../components/gui/SectionTitle";
import CardInfoGral from "../components/CardInfoGral";
import { SelectEmpleado } from "../../../components/forms/Select";

const ConfigurarPrecios: FC = () => {
  const [body, setBody] = useState<{}>({});
  return (
    <div className="w-full h-full flex flex-col">
      <SectionTitle
        titulo="Configuración de precios"
        subtitulo="Preliquidación"
      />
      <div className="w-full grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardInfoGral
          titulo="Magna"
          icon="gas-pump"
          iconClassName="text-success"
        >
          <SelectEmpleado
            name="empleado"
            label="Selecciona un empleado"
            variable={body}
            setVariable={setBody}
            estatus={["1", "6"]}
            departamento="1"
          />
        </CardInfoGral>
        <CardInfoGral
          titulo="Premium"
          icon="gas-pump"
          iconClassName="text-error"
        >
          <SelectEmpleado
            name="empleado"
            label="Selecciona un empleado"
            variable={body}
            setVariable={setBody}
            estatus={["1", "6"]}
            departamento="1"
          />
        </CardInfoGral>
        <CardInfoGral
          titulo="Diesel"
          icon="gas-pump"
          iconClassName="text-black"
        >
          <SelectEmpleado
            name="empleado"
            label="Selecciona un empleado"
            variable={body}
            setVariable={setBody}
            estatus={["1", "6"]}
            departamento="1"
          />
        </CardInfoGral>
      </div>
      <button
        className="btn btn-primary btn-block mt-4"
        onClick={() => {
          console.log("dsadasd");

          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        Siguiente
      </button>
    </div>
  );
};
export default ConfigurarPrecios;

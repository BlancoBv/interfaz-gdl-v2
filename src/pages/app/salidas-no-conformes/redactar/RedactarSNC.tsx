import { FC } from "react";
import SectionTitle from "@components/gui/SectionTitle";
import FormularioSNC from "./components/FormularioSNC";

const RedactarSNC: FC = () => {
  const initialBody = {
    accionesCorregir: "<p></p>",
    concesiones: "<p></p>",
    descripcionFalla: "<p></p>",
    fecha: "",
    idEmpleadoIncumple: null,
    idIncumplimiento: null,
  };

  return (
    <div>
      <SectionTitle
        titulo="Redactar Salidas No Conformes"
        subtitulo="Salidas no conformes"
      />
      <FormularioSNC body={initialBody} />
    </div>
  );
};

export default RedactarSNC;

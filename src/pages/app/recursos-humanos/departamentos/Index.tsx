import CintaOpciones from "@components/gui/CintaOpciones";
import SectionTitle from "@components/gui/SectionTitle";
import Icon from "@components/Icon";
import { FC } from "react";

const Departamentos: FC = () => {
  return (
    <div>
      <SectionTitle titulo="Departamentos" subtitulo="Recursos humanos" />
      <CintaOpciones>
        <button className="btn btn-primary" type="button">
          <Icon icon="plus" size="2x" /> Añadir departamento
        </button>
      </CintaOpciones>
    </div>
  );
};

export default Departamentos;

import Modal from "@components/gui/Modal";
import { FC, useContext, useMemo } from "react";
import FormularioSNC from "../../redactar/components/FormularioSNC";
import DataSNC from "./ProviderSNC";
import { SNCForm } from "../../Index.tsx";

interface Props {
  refetch: () => void;
}

const ModalEditSnc: FC<Props> = (props) => {
  const { sncSelect, setSncSelect } = useContext(DataSNC);
  const bodyParse: SNCForm | null = useMemo(() => {
    if (sncSelect) {
      return {
        descripcionFalla: sncSelect.descripcion_falla,
        concesiones: sncSelect.concesiones,
        accionesCorregir: sncSelect.acciones_corregir,
        idEmpleadoIncumple: sncSelect.idempleado,
        idIncumplimiento: sncSelect.idincumplimiento,
        fecha: sncSelect.fecha,
      };
    }
    return null;
  }, [sncSelect]);
  return (
    <Modal
      id="idModalEditSnc"
      title="Editar SNC"
      onClose={() => {
        setSncSelect(null);
        props.refetch();
      }}
    >
      {sncSelect && bodyParse && (
        <FormularioSNC
          body={bodyParse}
          idsalida_noconforme={sncSelect.idsalida_noconforme}
          edit
        />
      )}
    </Modal>
  );
};

export default ModalEditSnc;

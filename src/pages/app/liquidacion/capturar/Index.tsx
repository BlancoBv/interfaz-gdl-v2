import { FC, useContext, useEffect, useState } from "react";
import SectionTitle from "@components/gui/SectionTitle";
import { ContextLiq } from "../components/ContextLiq";
import CardIslas from "./components/CardIslas";
import { ModalConfirmNoMutate } from "@components/gui/Modal";
import { useNavigate } from "react-router-dom";

const CapturarLecturas: FC = () => {
  const { body } = useContext(ContextLiq).infoGeneral;
  const { body: mangueras, setBody: setMangueras } =
    useContext(ContextLiq).mangueras;
  const { islas } = useContext(ContextLiq).otherData;

  const navigate = useNavigate();

  const [idManguera, setIdManguera] = useState<{
    idManguera: string;
    refs?: {
      inicial: { current: HTMLInputElement };
      final: { current: HTMLInputElement };
    };
  }>({ idManguera: "" });

  const ID_MODAL = "modal-confirm-delete-lectura";

  /*   const deleteElement = () => {
    const indexOfValue = mangueras.findIndex(
      (el) => el.idManguera === idManguera.idManguera
    );

    if (indexOfValue >= 0) {
      const fGroup = mangueras.slice(0, indexOfValue);
      const lGroup = mangueras.splice(indexOfValue + 1);
      idManguera.refs?.inicial.current.classList.remove(
        "input-success",
        "input-warning",
        "input-error"
      );
      idManguera.refs?.final.current.classList.remove(
        "input-success",
        "input-warning",
        "input-error"
      );

      setMangueras?.([...fGroup, ...lGroup]);
    }
  }; */

  useEffect(() => {
    localStorage.setItem("manguerasLiq", JSON.stringify(mangueras));
  }, [mangueras]);

  return (
    <div className="w-full">
      {/* <ModalConfirmNoMutate
        action={deleteElement}
        msg={`¿Desea eliminar las lecturas de la manguera seleccionada?`}
        customID={ID_MODAL}
        closeOnESC
      /> */}
      {/* // esto va aqui debido a como maneja daisyui los modales */}
      <SectionTitle
        titulo="Captura de lecturas"
        subtitulo="Liquidación"
        noBackButton
      />
      <CardIslas
        data={islas}
        estacionServicio={body.horario!.estacion_servicio.idestacion_servicio}
        setIdManguera={setIdManguera}
      />
    </div>
  );
};
export default CapturarLecturas;

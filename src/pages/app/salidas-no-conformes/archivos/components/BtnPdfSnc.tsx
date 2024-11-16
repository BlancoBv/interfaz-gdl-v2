import { usePDFToBlob } from "@hooks/usePDFToBlob";
import moment from "moment";
import PdfSNC from "../assets/PdfSNC";
import { SNC } from "@assets/interfaces";

const BtnPdfSnc = ({ data }: { data: SNC }) => {
  const { pending, getBlob } = usePDFToBlob(
    <PdfSNC
      title={`Salida no conforme - Folio ${data.idsalida_noconforme}`}
      fecha={moment(data.fecha).format("DD/MM/YYYY")}
      inconformidad={data.descripcion_falla}
      corregir={data.acciones_corregir}
      concesiones={data.concesiones}
      folio={data.idsalida_noconforme}
    />
  );

  return (
    <button
      className="btn btn-sm bg-[#ef4444] hover:bg-[#d93c3c] active:text-white"
      onClick={getBlob}
    >
      {pending ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        "PDF"
      )}
    </button>
  );
};

export default BtnPdfSnc;

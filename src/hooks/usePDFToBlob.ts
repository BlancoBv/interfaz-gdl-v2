import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { toast } from "react-toastify";

export function usePDFToBlob(doc: any) {
  const [pending, setPending] = useState<boolean>(false);
  const pdfDoc = pdf(doc);

  const getBlob = () => {
    setPending(true);
    pdfDoc
      .toBlob()
      .then((res) => {
        toast.success("Pdf generado correctamente.", { containerId: "global" });
        const url = URL.createObjectURL(res);
        window.open(url, "_blank");
      })
      .catch((err) => {
        console.log(err);

        toast.error("Error al generar pdf.", { containerId: "global" });
      })
      .finally(() => setPending(false));
  };
  return { pending, getBlob } as const;
}

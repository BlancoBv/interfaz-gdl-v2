import { usePDFToBlob } from "@hooks/usePDFToBlob";
import { FC, useState } from "react";

const BlobProvider: FC<{ doc: any; dataIsPending: boolean }> = ({
  doc,
  dataIsPending,
}) => {
  const { pending, getBlob } = usePDFToBlob(doc);
  return (
    <button
      className="btn "
      type="button"
      onClick={getBlob}
      disabled={dataIsPending}
    >
      {pending ? "cargando" : "PDF"}
    </button>
  );
};

export default BlobProvider;

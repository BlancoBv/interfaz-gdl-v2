import { FC, ReactNode } from "react";
import Button from "./Button";
import Icon from "./Icon";
import { usePDFToBlob } from "@hooks/usePDFToBlob";

const ButtonPDF: FC<{ doc?: any; isPending: boolean }> = ({
  doc,
  isPending,
}) => {
  const { pending, getBlob } = usePDFToBlob(doc);

  return (
    <Button
      buttonType="button"
      text={<Icon icon="file-pdf" />}
      variant="error"
      onClick={getBlob}
      isPending={pending || isPending}
      disabled={isPending}
    />
  );
};
export default ButtonPDF;

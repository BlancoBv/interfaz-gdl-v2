import { FC } from "react";
import Button from "./Button";
import Icon from "./Icon";
import { usePDFToBlob } from "@hooks/usePDFToBlob";

const ButtonPDF: FC<{ doc?: any; isPending?: boolean; disabled?: boolean }> = ({
  doc,
  isPending,
  disabled,
}) => {
  const { pending, getBlob } = usePDFToBlob(doc);

  return (
    <Button
      buttonType="button"
      text={<Icon icon="file-pdf" />}
      variant="error"
      onClick={() => {
        getBlob();
      }}
      isPending={pending || isPending}
      disabled={pending || disabled || isPending}
    />
  );
};
export default ButtonPDF;

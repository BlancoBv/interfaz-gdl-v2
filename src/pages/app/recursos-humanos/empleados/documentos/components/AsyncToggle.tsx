import { FC, useRef, useState } from "react";
import { useSendData } from "@hooks/useSendData";

const AsyncToggle: FC<{
  iddocumento: number;
  idempleado: number;
  documento: string;
  idControl: number | null;
  refetch: any;
}> = ({ iddocumento, idempleado, documento, idControl, refetch }) => {
  const addDoc = useSendData("control-documento", {
    method: "post",
    containerID: "fromModal",
    refetchFn: refetch,
  });
  const delPerm = useSendData("control-documento", {
    method: "put",
    containerID: "fromModal",
    refetchFn: refetch,
  });
  const [checked, setChecked] = useState<boolean>(
    idControl !== null ? true : false
  );

  const ref = useRef<null | HTMLInputElement>(null);

  return (
    <div className="form-control">
      <label
        className={`label ${
          delPerm.isPending || addDoc.isPending
            ? "cursor-wait"
            : "cursor-pointer"
        }`}
      >
        <span className="label-text me-2">{documento}</span>
        <input
          type="checkbox"
          className="toggle"
          ref={ref}
          onChange={(ev) => {
            const { checked } = ev.currentTarget;
            if (checked) {
              addDoc.mutate({
                iddocumento,
                idempleado,
              });
              setChecked(true);
            } else {
              delPerm.mutate({
                iddocumento,
                idempleado,
              });
              setChecked(false);
            }
          }}
          checked={checked}
          disabled={addDoc.isPending || delPerm.isPending}
        />
      </label>
    </div>
  );
};

export default AsyncToggle;

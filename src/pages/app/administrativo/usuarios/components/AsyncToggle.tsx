import { FC, useRef, useState } from "react";
import { useSendData } from "@hooks/useSendData";

const AsyncToggle: FC<{
  perm: { permiso: string; idpermiso: number; user: string | null };
  user: { username: string | null | undefined };
}> = ({ perm, user }) => {
  const addPerm = useSendData("auth/registrar/permiso", {
    method: "post",
    containerID: "fromModal",
  });
  const delPerm = useSendData("auth/quitar/permiso", {
    method: "put",
    containerID: "fromModal",
  });
  const [checked, setChecked] = useState<boolean>(perm.user ? true : false);

  const ref = useRef<null | HTMLInputElement>(null);

  return (
    <div className="form-control">
      <label
        className={`label ${
          delPerm.isPending || addPerm.isPending
            ? "cursor-wait"
            : "cursor-pointer"
        }`}
      >
        <span className="label-text me-2">{perm.permiso}</span>
        <input
          type="checkbox"
          className="toggle"
          ref={ref}
          onChange={(ev) => {
            const { checked } = ev.currentTarget;
            if (checked) {
              addPerm.mutate({
                user: user.username,
                permiso: [perm.idpermiso],
              });
              setChecked(true);
            } else {
              delPerm.mutate({
                user: user.username,
                permiso: [perm.idpermiso],
              });
              setChecked(false);
            }
          }}
          checked={checked}
          disabled={addPerm.isPending || delPerm.isPending}
        />
      </label>
    </div>
  );
};

export default AsyncToggle;

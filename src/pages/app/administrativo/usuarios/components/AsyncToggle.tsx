import { FC, useState } from "react";
import { toast } from "react-toastify";

const AsyncToggle: FC<{
  perm: { permiso: string; idpermiso: number; user: string | null };
  user: { username: string };
  addMutate: any;
  delMutate: any;
}> = ({ perm, user, addMutate, delMutate }) => {
  const [checked, setChecked] = useState<boolean>(perm.user ? true : false);
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text me-2">{perm.permiso}</span>
        <input
          type="checkbox"
          className="toggle"
          onChange={(ev) => {
            const { checked } = ev.currentTarget;
            console.log(checked);
            if (checked) {
              addMutate.mutate({
                user: user.username,
                permiso: [perm.idpermiso],
              });
              setChecked(true);
              toast.success("sdadsadsadsadasd");
            } else {
              delMutate.mutate({
                user: user.username,
                permiso: [perm.idpermiso],
              });
              setChecked(false);
            }
          }}
          checked={checked}
          disabled={addMutate.isPending || delMutate.isPending}
        />
      </label>
    </div>
  );
};

export default AsyncToggle;

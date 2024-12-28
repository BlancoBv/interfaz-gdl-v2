import { useSendData } from "@hooks/useSendData";
import { FC, SyntheticEvent, useState } from "react";

const InputRFID: FC<{ setValue: any }> = ({ setValue }) => {
  const validate = useSendData("auth/accessKey");
  const [key, setKey] = useState<string>("");
  const handleSubmit = async (ev: SyntheticEvent) => {
    handleSubmit: {
      ev.preventDefault();
      const res: { success: boolean } = await validate.mutateAsync({ key });
      if (res.success) {
        setValue(true);
      }
      setValue(true);
      break handleSubmit;
    }
  };
  return (
    <form
      className="px-4 flex flex-col items-center justify-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Acerca la tarjeta"
        className="input input-bordered w-full max-w-xs"
        autoFocus
        minLength={10}
        maxLength={10}
        autoComplete="off"
        onChange={(ev) => {
          const { value } = ev.target as HTMLInputElement;
          setKey(value);
        }}
        value={key}
        required
      />
      {/*       {!validate.isPending && validate.isSuccess && (
        <p className="text-success font-bold">Autorizado correctamente</p>
      )}
      {!validate.isPending && !validate.isSuccess && (
        <p className="text-error font-bold">No autorizado</p>
      )} */}
    </form>
  );
};
export default InputRFID;

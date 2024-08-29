import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import CintaOpciones from "@components/gui/CintaOpciones";

const Input: FC<{
  label: string;
  disabled?: boolean;
  icon?: string;
  setVariable: any;
}> = ({ label, disabled, setVariable }) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const [value, setValue] = useState<string>("");
  const handle = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.currentTarget;

    const regExpNoWhiteSpace = new RegExp(/^\s+$/, "g");
    const regExpOnlyNumber = new RegExp(/^\d*$/);

    if (!regExpNoWhiteSpace.test(value)) {
      ref.current?.classList.remove("input-error");

      if (regExpOnlyNumber.test(value)) setValue(value);
    } else {
      ref.current?.classList.add("input-error");
    }
  };
  return (
    <CintaOpciones
      onSubmit={(ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        setVariable((prev: any) => ({
          ...prev,
          cantidad: [value, ...prev.cantidad],
        }));
        setValue("");
      }}
    >
      <label className="form-control w-full max-w-40 lg:max-w-xs ">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          ref={ref}
          className="input input-bordered w-full"
          type="text"
          required
          disabled={disabled}
          onChange={handle}
          value={value}
          autoFocus
        />
      </label>
      <button type="submit" className="btn btn-primary">
        Añadir
      </button>
    </CintaOpciones>
  );
};

export const InputEdit: FC<{
  label: string;
  disabled?: boolean;
  icon?: string;
  setVariable: any;
  initialValue: string;
}> = ({ label, disabled, setVariable, initialValue }) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const [value, setValue] = useState<string>("");

  const handle = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.currentTarget;

    const regExpNoWhiteSpace = new RegExp(/^\s+$/, "g");
    const regExpOnlyNumber = new RegExp(/^\d*$/);

    if (!regExpNoWhiteSpace.test(value)) {
      ref.current?.classList.remove("input-error");

      if (regExpOnlyNumber.test(value)) setValue(value);
    } else {
      ref.current?.classList.add("input-error");
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  console.log(value);

  return (
    <form
      onSubmit={(ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        setVariable((prev: any) => ({
          ...prev,
          value,
        }));
        setValue("");
        (document.getElementById("edit-monto") as HTMLDialogElement).close();
      }}
      className="flex items-center justify-evenly flex-wrap"
    >
      <label className="form-control w-full max-w-40 lg:max-w-xs ">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          ref={ref}
          className="input input-bordered w-full"
          type="text"
          required
          disabled={disabled}
          onChange={handle}
          value={value}
          autoFocus
        />
      </label>
      <button type="submit" className="btn btn-primary">
        Editar
      </button>
    </form>
  );
};
export default Input;

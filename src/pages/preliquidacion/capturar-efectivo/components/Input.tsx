import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import CintaOpciones from "../../../../components/gui/CintaOpciones";

interface montos {
  type: "efectivo";
  cantidad: string[];
}

const Input: FC<{
  label: string;
  disabled?: boolean;
  icon?: string;
  variable: montos;
  setVariable: any;
}> = ({ label, disabled, variable, setVariable }) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const [value, setValue] = useState<string>("");
  const handle = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.currentTarget;

    const regExpNoWhiteSpace = new RegExp(/^\s+$/, "g");
    const regExpOnlyNumber = new RegExp(/^\d*$/);

    if (!regExpNoWhiteSpace.test(value)) {
      ref.current?.classList.remove("input-error");

      if (regExpOnlyNumber.test(value)) setValue((prev) => (prev = value));
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
        setValue((prev) => (prev = ""));
        console.log(variable.cantidad);
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
export default Input;

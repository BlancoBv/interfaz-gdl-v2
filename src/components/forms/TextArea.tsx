import { ChangeEvent, FC, useRef } from "react";

const TextArea: FC<{
  label: string;
  variable: any;
  setVariable: any;
  name: string;
  required?: boolean;
}> = ({ label, variable, setVariable, name, required }) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    handleChange: {
      const { name, value } = ev.currentTarget;
      const regExpNoWhiteSpace = new RegExp(/^\s+$/, "g");
      ref.current?.classList.remove("textarea-error");
      if (regExpNoWhiteSpace.test(value)) {
        ref.current?.classList.add("textarea-error");
        break handleChange;
      }
      setVariable((prev: any) => ({ ...prev, [name]: value }));
    }
  };
  return (
    <label className="form-control w-full max-w-40 lg:max-w-xs ">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <textarea
        ref={ref}
        className="textarea textarea-bordered h-24"
        onChange={handleChange}
        name={name}
        value={variable.hasOwnProperty(name) ? variable[name] : ""}
        required={required}
      />
    </label>
  );
};
export default TextArea;

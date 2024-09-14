import { FC } from "react";

const Button: FC<{
  text: string;
  buttonType: "submit" | "button";
  isPending?: boolean;
  block?: boolean;
}> = ({ text, buttonType, isPending, block }) => {
  return (
    <button
      type={buttonType}
      className={`btn btn-primary ${block ? "btn-block" : ""}`}
    >
      {isPending ? <span className="loading loading-spinner"></span> : text}
    </button>
  );
};
export default Button;

import { FC } from "react";

const Button: FC<{
  text: string;
  buttonType: "submit" | "button";
  isPending?: boolean;
}> = ({ text, buttonType, isPending }) => {
  return (
    <button type={buttonType} className="btn btn-primary">
      {isPending ? <span className="loading loading-spinner"></span> : text}
    </button>
  );
};
export default Button;

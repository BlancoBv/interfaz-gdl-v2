import { FC, ReactNode } from "react";

interface variantsInterface {
  error: string;
  primary: string;
}

const Button: FC<{
  text: string | ReactNode;
  buttonType: "submit" | "button";
  isPending?: boolean;
  block?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "error";
  disabled?: boolean;
}> = ({ text, buttonType, isPending, block, onClick, variant, disabled }) => {
  const variants: variantsInterface = {
    error: "btn-error",
    primary: "btn-primary",
  };
  return (
    <button
      type={buttonType}
      className={`btn ${
        variant
          ? variants[variant as keyof variantsInterface]
          : variants.primary
      } ${block ? "btn-block" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isPending ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        text
      )}
    </button>
  );
};
export default Button;

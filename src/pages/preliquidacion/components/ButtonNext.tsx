import { FC } from "react";

const ButtonNext: FC<{ text?: string }> = ({ text }) => {
  return (
    <button type="submit" className="btn btn-primary btn-block mt-4">
      {text ? text : "Siguiente"}
    </button>
  );
};
export default ButtonNext;

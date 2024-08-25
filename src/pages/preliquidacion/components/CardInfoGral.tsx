import { FC, ReactNode } from "react";
import Icon from "@components/Icon";

const CardInfoGral: FC<{
  children?: ReactNode;
  titulo: string;
  icon: string;
  iconClassName?: string;
}> = ({ children, titulo, icon, iconClassName }) => {
  return (
    <div className="card bg-base-100 max-w-xs w-full shadow-xl">
      <figure className={`px-10 pt-10 ${iconClassName ? iconClassName : ""}`}>
        <Icon icon={icon} size="5x" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{titulo}</h2>
        {children}
        {/* <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div> */}
      </div>
    </div>
  );
};

export default CardInfoGral;

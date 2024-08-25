import { FC } from "react";
import { NavLink } from "react-router-dom";
import Icon from "@components/Icon";

const SectionCard: FC<{
  icon: string;

  name: string;
  to: string;
}> = ({ icon, name, to }) => {
  return (
    <div className="card image-full w-80 shadow-xl mb-4">
      <figure>
        <Icon icon={icon} size="4x" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        {/*  <p>If a dog chews shoes whose shoes does he choose?</p> */}
        <div className="card-actions justify-end">
          <NavLink to={to} title={name} className="btn btn-primary">
            <Icon icon="angle-right" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;

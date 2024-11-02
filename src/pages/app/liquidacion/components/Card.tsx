import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";

const Card: FC<{
  title: string;
  children?: ReactNode;
  className?: string;
  to?: string;
  noAnchor?: boolean;
}> = ({ title, children, className, to, noAnchor }) => {
  return noAnchor ? (
    <div
      className={`card bg-base-100 w-full min-w-24 h-60 shadow-xl ${className} group`}
    >
      <div className="card-body">
        <h2 className="card-title text-sm">{title}</h2>
        {children}
      </div>
    </div>
  ) : (
    <NavLink
      to={to ?? "#"}
      className={`card bg-base-100 w-full min-w-24 h-60 shadow-xl overflow-hidden ${className} group ${
        to
          ? "cursor-pointer hover:bg-base-200 ease-in duration-150"
          : "cursor-default"
      }`}
    >
      <div
        className={`card-body ${
          to ? "group-hover:scale-105 ease-in duration-150" : ""
        }`}
      >
        <h2 className="card-title text-sm">{title}</h2>
        {children}
      </div>
    </NavLink>
  );
};
export default Card;

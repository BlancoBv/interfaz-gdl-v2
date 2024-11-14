import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const Icon: FC<{
  icon: string;
  size?: "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x";
  className?: string;
  spin?: boolean;
}> = ({ icon, size, className, spin }) => {
  // @ts-ignore
  const myIcon: IconProp = `fa-solid fa-${icon}`;
  return (
    <FontAwesomeIcon
      icon={myIcon}
      size={size}
      className={className}
      spin={spin}
    />
  );
};

export default Icon;

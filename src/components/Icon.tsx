import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

const Icon: FC<{
  icon: string;
  size?: "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x";
}> = ({ icon, size }) => {
  // @ts-ignore
  const myIcon: IconProp = `fa-solid fa-${icon}`;
  return <FontAwesomeIcon icon={myIcon} size={size} />;
};

export default Icon;

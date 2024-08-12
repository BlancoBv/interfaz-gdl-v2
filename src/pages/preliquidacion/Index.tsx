import { FC } from "react";

const Preliquidacion: FC = () => {
  return (
    <div className="h-screen w-screen">
      <ul className="menu bg-base-200 rounded-box w-56 h-full">
        <li>
          <a>Información general</a>
        </li>
        <li>
          <a>Configuración de precios</a>
        </li>
        <li>
          <a>Captura de lecturas</a>
        </li>
      </ul>
    </div>
  );
};

export default Preliquidacion;

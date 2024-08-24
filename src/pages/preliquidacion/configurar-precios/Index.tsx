import { FC, useContext, useEffect } from "react";
import SectionTitle from "../../../components/gui/SectionTitle";
import CardInfoGral from "../components/CardInfoGral";
import ButtonNext from "../components/ButtonNext";
import { Input } from "../../../components/forms/Input";
import {
  ContextPreliq,
  manguerasInterface,
  preciosInterface,
} from "../components/ContextPreliq";
import { useNavigate } from "react-router-dom";

const ConfigurarPrecios: FC = () => {
  const { body, setBody } = useContext(ContextPreliq).precios;
  const { body: mangueras, setBody: setMangueras } =
    useContext(ContextPreliq).mangueras;
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("preciosPreliq", JSON.stringify(body));
  }, [body]);
  return (
    <div className="w-full h-full flex flex-col">
      <SectionTitle
        titulo="Configuración de precios"
        subtitulo="Preliquidación"
      />
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          const newArray: manguerasInterface[] = [];

          mangueras.forEach((element) => {
            const gas = element.idManguera?.split("")[0];
            element.precioUnitario = body[gas as keyof preciosInterface];
            newArray.push(element);
          }); //itera y cambia los precios

          setMangueras([...newArray]);

          navigate("/preliquidacion/capturar-lecturas");
        }}
      >
        <div className="w-full grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardInfoGral
            titulo="Magna"
            icon="gas-pump"
            iconClassName="text-success"
          >
            <Input
              label="Magna"
              variable={body}
              setVariable={setBody}
              name="M"
              autoFocus
              inputType="number"
            />
          </CardInfoGral>
          <CardInfoGral
            titulo="Premium"
            icon="gas-pump"
            iconClassName="text-error"
          >
            <Input
              label="Premium"
              variable={body}
              setVariable={setBody}
              name="P"
              inputType="number"
            />
          </CardInfoGral>
          <CardInfoGral
            titulo="Diesel"
            icon="gas-pump"
            iconClassName="text-black"
          >
            <Input
              label="Diesel"
              variable={body}
              setVariable={setBody}
              name="D"
              inputType="number"
            />
          </CardInfoGral>
        </div>
        <ButtonNext
          text={mangueras.length > 0 ? "Actualizar precios" : undefined}
        />
      </form>
    </div>
  );
};
export default ConfigurarPrecios;

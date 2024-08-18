import { FC, useEffect, useState } from "react";
import SectionTitle from "../../../components/gui/SectionTitle";
import CardInfoGral from "../components/CardInfoGral";
import ButtonNext from "../components/ButtonNext";
import { Input } from "../../../components/forms/Input";

const ConfigurarPrecios: FC = () => {
  const CACHE_PRECIOS = localStorage.getItem("preciosPreliq");
  const PARSED_CACHE = CACHE_PRECIOS ? JSON.parse(CACHE_PRECIOS) : {};
  const [body, setBody] = useState<{ M?: string; P?: string; D?: string }>(
    PARSED_CACHE
  );
  const islasActivas = useState<string[]>([]);

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
        <ButtonNext />
      </form>
    </div>
  );
};
export default ConfigurarPrecios;

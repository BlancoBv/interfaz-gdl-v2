import { FC } from "react";
import SectionCard from "./components/SectionCard";

const Index: FC = () => {
  const items: { icon: string; name: string; to: string }[] = [
    { icon: "gas-pump", name: "Despacho", to: "despacho" },
    {
      icon: "thumbs-down",
      name: "Salidas no conformes",
      to: "salidas-no-conformes",
    },
    { icon: "screwdriver-wrench", name: "Mantenimiento", to: "mantenimiento" },
    /*   { icon: "box", name: "Almacen", to: "/almacen" }, */
    { icon: "people-group", name: "Recursos humanos", to: "recursos-humanos" },
    { icon: "rectangle-list", name: "Administrativo", to: "administrativo" },
    { icon: "clipboard-check", name: "Liquidación", to: "liquidacion" },
    { icon: "shop", name: "Tienda", to: "tienda" },
    /* { icon: "shield", name: "Seguridad", to: "/despacho" }, */
    { icon: "money-check-dollar", name: "Pagarés", to: "pagares" },
    /*  { icon: "file", name: "Documentos SGC don lalo", to: "/despacho" }, */
  ];
  return (
    <div className="w-full h-full grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((el) => (
        <SectionCard icon={el.icon} name={el.name} to={el.to} key={el.name} />
      ))}
    </div>
  );
};
export default Index;

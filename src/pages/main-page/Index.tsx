import { FC } from "react";
import SectionCard from "./components/SectionCard";

const Index: FC = () => {
  const items: { icon: string; name: string; to: string }[] = [
    { icon: "gas-pump", name: "Despacho", to: "despacho" },
    { icon: "thumbs-down", name: "Salidas no conformes", to: "/despacho" },
    { icon: "screwdriver-wrench", name: "Mantenimiento", to: "/despacho" },
    { icon: "box", name: "Almacen", to: "/despacho" },
    { icon: "people-group", name: "Recursos humanos", to: "/despacho" },
    { icon: "rectangle-list", name: "Administrativo", to: "/despacho" },
    { icon: "clipboard-check", name: "Liquidación", to: "/despacho" },
    { icon: "shop", name: "Tienda", to: "/despacho" },
    { icon: "shield", name: "Seguridad", to: "/despacho" },
    { icon: "money-check-dollar", name: "Pagarés", to: "/despacho" },
    { icon: "file", name: "Documentos SGC don lalo", to: "/despacho" },
  ];
  return (
    <div className="w-full h-full flex justify-evenly flex-wrap">
      {items.map((el) => (
        <SectionCard icon={el.icon} name={el.name} to={el.to} key={el.name} />
      ))}
    </div>
  );
};
export default Index;

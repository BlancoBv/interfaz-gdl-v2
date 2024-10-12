import { AuthContext } from "@hooks/useAuth";
import { useContext } from "react";

const permisos: { permisos: number[][] } = JSON.parse(
  localStorage.getItem("credentials") ?? "{}"
);

export function Per(id: number) {
  const indexOfElement = permisos.permisos.findIndex(
    (el) => el[0] === id || el[0] === 1
  );

  if (indexOfElement < 0) {
    return false;
  }

  return true;

  //return datos[0].permisos.some((el) => el[0] === 1 || el[0] === id);
}

export function Dep(id: number) {
  const indexOfElement = permisos.permisos.findIndex(
    (el) => el[1] === id || el[1] === 1
  );

  if (indexOfElement < 0) {
    return false;
  }

  return true;
}

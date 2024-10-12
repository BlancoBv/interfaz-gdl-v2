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

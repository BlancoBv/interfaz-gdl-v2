import moment from "moment";

interface filtrosData {
  year: number | string;
  month: number | string;
  idEmpleado: string;
  fechaI: string;
  fechaF: string;
  folio: string;
  etapa: string;
  idIncumplimiento: number | string;
  filtro: 1 | 2 | 3 | 4;
}

type Reducer<S, A> = (prevState: S, action: A) => S;
type Action = () => { [key: string]: string | number };

const reducerFiltersFunctionSNC: Reducer<filtrosData, Action> = (
  state: filtrosData,
  action: Action
) => {
  const a = action();
  const newState = { ...state, ...a };
  const name = Object.keys(a)[0];
  //Si el cambio viene del input year o month, elimina el valor de la propiedades fechaI y fechaF
  if (name == "year" || name == "month") {
    newState.fechaF = "";
    newState.fechaI = "";
    newState.folio = "";
    if (name == "month" && !newState.year) {
      newState.year = moment().year();
    }
  }
  //Si el cambio viene del input fechaI, elimina el valor de la propiedades month y year, si no viene definida la propiedad fechaF se establece con el valor de la propiedad fechaI
  if (name == "fechaI") {
    newState.month = "";
    newState.year = "";
    newState.folio = "";
    if (!newState.fechaF) {
      newState.fechaF = a.fechaI as string;
    }
  }
  //Si el cambio viene del input fechaF, elimina el valor de la propiedades month y year,
  if (name == "fechaF") {
    newState.month = "";
    newState.year = "";
    newState.folio = "";
    if (!newState.fechaI) {
      newState.fechaI = a.fechaF as string;
    }
  }
  //Si el cambio viene del input folio, entonces establece a las demas propiedades con valor ""
  if (name == "folio") {
    newState.year = "";
    newState.month = "";
    newState.idEmpleado = "";
    newState.fechaI = "";
    newState.fechaF = "";
    newState.etapa = "";
    newState.idIncumplimiento = "";
  }
  return newState;
};

export default reducerFiltersFunctionSNC;

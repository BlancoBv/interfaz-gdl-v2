import { createContext, Dispatch, SetStateAction } from "react";
import { SNCParseToForm } from "../../Index.tsx";

interface ContextSnc {
  sncSelect: SNCParseToForm;
  setSncSelect: Dispatch<SetStateAction<SNCParseToForm>>;
}

const DataSNC = createContext<ContextSnc>({
  sncSelect: null,
  setSncSelect: () => {},
});

export default DataSNC;

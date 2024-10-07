import { FC } from "react";
import EditorTipTap from "./components/EditorTipTap";

const RedactarSNC: FC = () => {
  return (
    <div className="w-full">
      Redaccion de SNC
      <div className="">
        {/* <h3>Editor</h3> */}
        <EditorTipTap />
      </div>
    </div>
  );
};

export default RedactarSNC;

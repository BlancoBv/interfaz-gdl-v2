import { FC } from "react";
import Bar from "../../../components/charts/Bar";

const Index: FC = () => {
  return (
    <div className="flex flex-col">
      <div className="h-screen">
        <Bar />
      </div>
    </div>
  );
};

export default Index;

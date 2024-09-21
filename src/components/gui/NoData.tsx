import { FC } from "react";

const NoData: FC<{
  isPending: boolean;
  isError: boolean;
}> = ({ isError, isPending }) => {
  return <>{isError && !isPending && <div className="h-96">Sin datos</div>}</>;
};
export default NoData;

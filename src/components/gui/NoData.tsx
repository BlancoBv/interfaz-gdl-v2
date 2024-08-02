import { FC } from "react";

const NoData: FC<{
  isPending: boolean;
  isFetching: boolean;
  isError: boolean;
}> = ({ isError, isFetching, isPending }) => {
  return (
    <>
      {isError && !isFetching && !isPending && (
        <div className="h-96">Sin datos</div>
      )}
    </>
  );
};
export default NoData;

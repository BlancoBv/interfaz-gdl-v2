import { FC } from "react";

const Loader: FC<{ isPending: boolean; isFetching: boolean }> = ({
  isPending,
  isFetching,
}) => {
  return (
    <>
      {(isPending || isFetching) && (
        <div className="w-100 h-96 flex justify-center items-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}
    </>
  );
};
export default Loader;

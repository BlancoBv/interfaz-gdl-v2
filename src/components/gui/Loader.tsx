import { FC } from "react";

const Loader: FC<{ isPending: boolean }> = ({ isPending }) => {
  return (
    <>
      {isPending && (
        <div className="w-100 h-96 flex justify-center items-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}
    </>
  );
};
export default Loader;

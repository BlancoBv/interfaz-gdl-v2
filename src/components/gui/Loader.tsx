import { FC } from "react";

const Loader: FC<{ isPending: boolean; size?: "sm" | "lg" }> = ({
  isPending,
  size,
}) => {
  return (
    <>
      {isPending && (
        <div className="flex justify-center items-center">
          <span className={`loading loading-spinner loading-${size ?? "lg"}`} />
        </div>
      )}
    </>
  );
};
export default Loader;

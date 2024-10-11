import Icon from "@components/Icon";
import { FC } from "react";

const NoData: FC<{
  isPending: boolean;
  isError: boolean;
}> = ({ isError, isPending }) => {
  return (
    <>
      {isError && !isPending && (
        <div className="h-96 flex flex-col items-center justify-center">
          <div className="flex items-center relative">
            <div className="text-warning">
              <Icon icon="file-circle-exclamation" size="6x" />
            </div>
            <div className="absolute animate-bounce left-20 top-16 text-black/80">
              <Icon icon="magnifying-glass" size="5x" />
            </div>
          </div>
          <span className="mt-4 font-bold text-5xl text-center text-primary-content">
            Sin resultados
          </span>
          <span className="text-secondary">Intenta de nuevo</span>
        </div>
      )}
    </>
  );
};
export default NoData;

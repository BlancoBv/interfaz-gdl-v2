import Icon from "@components/Icon";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const SectionTitle: FC<{
  titulo: string;
  subtitulo: string;
  noBackButton?: boolean;
}> = ({ titulo, subtitulo, noBackButton }) => {
  const navigate = useNavigate();
  return (
    <>
      {!noBackButton && (
        <div className="flex items-center sticky top-16 bg-base-100/80 backdrop-blur-sm z-30">
          <button
            className="btn btn-ghost me-4"
            onClick={() => navigate(-1)}
            title="Atras"
          >
            <Icon icon="arrow-left" />
          </button>
          <span className="text-base-content">{subtitulo}</span>
        </div>
      )}
      <div className="bg-base-100/80 backdrop-blur-sm prose max-w-full z-30 relative">
        <h1 className="mb-0">{titulo}</h1>
        <div className="divider mt-0" />
      </div>
    </>
  );
};

export default SectionTitle;

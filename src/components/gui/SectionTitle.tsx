import Icon from "@components/Icon";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const SectionTitle: FC<{ titulo: string; subtitulo: string }> = ({
  titulo,
  subtitulo,
}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-base-100/80 backdrop-blur-sm prose max-w-full z-30">
      <button
        className="btn btn-ghost me-4"
        onClick={() => navigate(-1)}
        title="Atras"
      >
        <Icon icon="arrow-left" />
      </button>
      <span className="text-base-content">{subtitulo}</span>
      <h1 className="mb-0">{titulo}</h1>
      <div className="divider mt-0" />
    </div>
  );
};

export default SectionTitle;

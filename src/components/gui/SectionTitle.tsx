import { FC } from "react";

const SectionTitle: FC<{ titulo: string; subtitulo: string }> = ({
  titulo,
  subtitulo,
}) => {
  return (
    <div className="bg-neutral/80 backdrop-blur-sm prose max-w-full pt-4 z-30">
      <span className="text-base-content">{subtitulo}</span>
      <h1 className="mb-0">{titulo}</h1>
      <div className="divider mt-0" />
    </div>
  );
};

export default SectionTitle;

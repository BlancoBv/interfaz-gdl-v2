import { FC } from "react";

const SectionTitle: FC<{ titulo: string }> = ({ titulo }) => {
  return (
    <div className="bg-neutral sticky top-20 prose max-w-full py-4">
      <h1>{titulo}</h1>
      <div className="divider" />
    </div>
  );
};

export default SectionTitle;

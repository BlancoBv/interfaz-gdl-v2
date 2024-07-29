import { FC } from "react";

const SectionTitle: FC<{ titulo: string }> = ({ titulo }) => {
  return (
    <div className="bg-neutral/80 backdrop-blur-sm sticky top-16 prose max-w-full py-4 z-30">
      <h1>{titulo}</h1>
      <div className="divider m-0" />
    </div>
  );
};

export default SectionTitle;

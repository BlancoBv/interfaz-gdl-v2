import FontSizeSvg from "../assets/img/font-size.svg";
import { Editor } from "@tiptap/core";
import { ChangeEvent, FC } from "react";

interface Props {
  editor: Editor | null;
}

const SelectFontSize: FC<Props> = ({ editor }: Props) => {
  const changeFontSize = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      editor?.chain().focus().unsetFontSize().run();
    } else {
      editor?.chain().focus().setFontSize(e.target.value).run();
    }
  };
  return (
    <div className="flex items-center rounded bg-zinc-200 pl-2">
      <img
        src={FontSizeSvg}
        alt="fontSizeIcon"
        className="svg-inline--fa grow"
      />
      <select
        className="select select-ghost bg-zinc-200 font-semibold select-sm focus:outline-0 focus:border-0 pl-2 grow text-slate-900"
        onChange={changeFontSize}
      >
        <option value="">Normal</option>
        <option value="8pt">8pt</option>
        <option value="10pt">10pt</option>
        <option value="12pt">12pt</option>
        <option value="14pt">14pt</option>
        <option value="16pt">16pt</option>
        <option value="20pt">20pt</option>
        <option value="24pt">24pt</option>
      </select>
    </div>
  );
};

export default SelectFontSize;

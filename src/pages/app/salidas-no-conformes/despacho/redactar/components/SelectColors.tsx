import { Editor } from "@tiptap/core";
import { FC, useState } from "react";

interface Props {
  editor: Editor | null;
}
const SelectColors: FC<Props> = ({ editor }: Props) => {
  const [color, setColor] = useState<string>("#dc2626");

  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const setColorBtn = (color: string) => {
    editor?.chain().focus().setColor(color).run();
  };

  return (
    <div className="dropdown dropdown-down">
      <button
        tabIndex={0}
        role="button"
        className="btn btn-sm bg-zinc-200 h-auto m-0 rounded font-bold underline underline-offset-2"
      >
        A
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow z-2"
      >
        <div className="flex flex-wrap gap-2 mb-3">
          <li>
            <button
              className="bg-[#000] hover:bg-[#000] hover:outline hover:outline-neutral w-1 aspect-square"
              onClick={() => setColorBtn("black")}
            ></button>
          </li>
          <li>
            <button
              className="bg-slate-100 hover:bg-slate-100 hover:outline hover:outline-neutral w-1 aspect-square"
              onClick={() => setColorBtn("white")}
            ></button>
          </li>
          <li>
            <button
              className="bg-red-600 hover:bg-red-600 hover:outline hover:outline-neutral w-1 aspect-square"
              onClick={() => setColorBtn("#dc2626")}
            ></button>
          </li>
          <li>
            <button
              className="bg-blue-600 hover:bg-blue-600 hover:outline hover:outline-neutral w-1 aspect-square"
              onClick={() => setColorBtn("#2563eb")}
            ></button>
          </li>
          <li>
            <button
              className="bg-green-700 hover:bg-green-700 hover:outline hover:outline-neutral w-1 aspect-square"
              onClick={() => setColorBtn("#15803d")}
            ></button>
          </li>
        </div>
        <li>
          <label htmlFor="hs-color-input" className="block text-sm font-medium">
            Color personalizado
          </label>
          <input
            type="color"
            id="hs-color-input"
            className="p-1 h-10 w-full block bg-white border border-gray-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            onInput={handleColor}
            onBlur={(e) =>
              editor?.chain().focus().setColor(e.target.value).run()
            }
            value={color}
            title="Choose your color"
          />
        </li>
      </ul>
    </div>
  );
};

export default SelectColors;

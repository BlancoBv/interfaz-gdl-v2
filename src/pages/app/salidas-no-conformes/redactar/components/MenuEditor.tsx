import Icon from "@components/Icon";
import { Editor } from "@tiptap/react";
import { FC } from "react";
import SelectFontSize from "./SelectFontSize";
import SelectColors from "./SelectColors";

interface Props {
  value?: string;
  editor: Editor | null;
}

const MenuEditor: FC<Props> = (props: Props) => {
  const { editor } = props;

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group mb-1 w-full overflow-x-autooverflow-y-hidden bg-blur">
      <div className="flex gap-1 flex-wrap">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "btn btn-sm btn-neutral p-1 text-base-100"
              : "btn btn-sm rounded p-1 btn-light"
          }
        >
          Negrita
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "btn btn-sm btn-neutral p-1 text-base-100"
              : "btn btn-sm rounded p-1 btn-light"
          }
        >
          Cursiva
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "btn btn-sm btn-neutral p-1 text-base-100"
              : "btn btn-sm rounded p-1 btn-light"
          }
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "btn btn-sm btn-neutral p-1 text-base-100"
              : "btn btn-sm rounded p-1 btn-light"
          }
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "btn btn-sm btn-neutral p-1 text-base-100"
              : "btn btn-sm rounded p-1 btn-light"
          }
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "btn btn-sm btn-neutral p-1 text-base-100"
              : "btn btn-sm rounded p-1 btn-light"
          }
        >
          <Icon icon="list-ul" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "btn btn-sm btn-neutral p-1 text-base-100"
              : "btn btn-sm rounded p-1 btn-light"
          }
        >
          <Icon icon="list-ol" />
        </button>
        <div className="min-w-max">
          <SelectFontSize editor={editor} />
        </div>

        <div className="min-w-max">
          <SelectColors editor={editor} />
        </div>
      </div>
    </div>
  );
};

export const MenuBubble: FC<Props> = (props: Props) => {
  const { editor } = props;

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group mb-1 w-full overflow-x-autooverflow-y-hidden bg-zinc-900 p-1 rounded">
      <div className="flex gap-1 flex-wrap">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "btn btn-sm btn-neutral p-1 text-base-100"
              : "btn btn-sm rounded p-1 btn-light"
          }
        >
          Negrita
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "btn btn-sm btn-neutral p-1 text-base-100"
              : "btn btn-sm rounded p-1 btn-light"
          }
        >
          Cursiva
        </button>

        <div className="min-w-max">
          <SelectFontSize editor={editor} />
        </div>

        <div className="min-w-max">
          <SelectColors editor={editor} />
        </div>
      </div>
    </div>
  );
};

export const MenuFloating: FC<Props> = (props: Props) => {
  const { editor } = props;

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group mb-1 w-full overflow-x-autooverflow-y-hidden bg-slate-50 h-[10px]">
      <div className="flex gap-1 flex-wrap">
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "btn btn-sm btn-neutral p-1 text-base-100"
              : "btn btn-sm rounded p-1 btn-light"
          }
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "btn btn-sm btn-neutral p-1 text-base-100"
              : "btn btn-sm rounded p-1 btn-light"
          }
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "btn btn-sm btn-neutral p-1 text-base-100"
              : "btn btn-sm rounded p-1 btn-light"
          }
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "btn btn-sm btn-neutral p-1 text-base-100"
              : "btn btn-sm rounded p-1 btn-light"
          }
        >
          <Icon icon="list-ul" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "btn btn-sm btn-neutral p-1 text-base-100"
              : "btn btn-sm rounded p-1 btn-light"
          }
        >
          <Icon icon="list-ol" />
        </button>
      </div>
    </div>
  );
};

export default MenuEditor;

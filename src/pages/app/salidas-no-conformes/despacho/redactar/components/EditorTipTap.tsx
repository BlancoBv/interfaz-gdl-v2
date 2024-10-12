import "../assets/styles/styles.scss";
import { FC, useMemo } from "react";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { FontSize } from "../assets/extension/FontSize";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import MenuEditor from "./MenuEditor";

export interface TypeEventChange {
  target: {
    name: string;
    value: string;
  };
}

interface Props {
  disabled?: boolean;
  value: Record<string, string | number | boolean | null | undefined>;
  name: string;
  placeholder?: string;
  onChange: (event: TypeEventChange) => void;
}

const EditorTipTap: FC<Props> = ({ disabled, ...props }: Props) => {
  const extensions = useMemo(() => {
    return [
      FontSize,
      TextStyle,
      Color.configure({ types: [TextStyle.name] }),
      Heading.configure({}),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Placeholder.configure({ placeholder: props.placeholder || "Escribe" }),
    ];
  }, [props.placeholder]);

  const editor = useEditor({
    extensions,
    content: props.value[props.name] as string,
    onUpdate: ({ editor }) => {
      //Guardar la informacion del
      const html = editor.getHTML();
      console.log(html);
      props.onChange({ target: { value: html, name: props.name } });
    },
  });

  return (
    <div className="relative">
      {disabled && (
        <div className="absolute inset-0 bg-slate-100 z-10 bg-opacity-50"></div>
      )}
      <MenuEditor editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorTipTap;

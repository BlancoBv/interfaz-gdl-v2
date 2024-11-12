import "../assets/styles/styles.scss";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { FontSize } from "../assets/extension/FontSize";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import { MenuBubble } from "./MenuEditor";

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
  title: string;
  onChange: (event: TypeEventChange) => void;
}

export interface RefMethods {
  clean: () => void;
  setContent: (content: string) => void;
  disabled: (t: boolean) => void;
  editable: (t: boolean) => void;
}

const EditorTipTap = forwardRef<RefMethods, Props>((props: Props, ref) => {
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
      props.onChange({ target: { value: html, name: props.name } });
    },
  });

  useImperativeHandle(ref, () => ({
    clean() {
      editor?.commands.setContent("<p></p>");
    },
    setContent(content) {
      editor?.commands.setContent(content);
    },
    disabled(t) {
      editor?.setEditable(!t);
    },
    editable(t) {
      editor?.setEditable(t);
    },
  }));

  return (
    <div>
      <div className="label bg-zinc-100 text-white py-2 px-2 rounded rounded-b-none flex gap-2 flex-wrap">
        <p className="label-text">{props.title}</p>
        <div className="overflow-x-autos overflow-y-hiddens sm:overflow-hiddens">
          <MenuBubble editor={editor} />
        </div>
      </div>
      {/* {disabled && (
        <div className="absolute inset-0 bg-slate-100 z-10 bg-opacity-50"></div>
      )} */}
      {/* {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <MenuBubble editor={editor} />
        </BubbleMenu>
      )} */}
      {/*  {editor && (
          <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <MenuFloating editor={editor} />
          </FloatingMenu>
        )} */}
      {/* <MenuEditor editor={editor} /> */}
      <EditorContent editor={editor} />
    </div>
  );
});

export default EditorTipTap;

"use client";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { mergeAttributes } from "@tiptap/core";
import BulletList from "@tiptap/extension-bullet-list";
import Heading, { Level } from "@tiptap/extension-heading";
import {
  ChainedCommands,
  Editor,
  EditorContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  StrikethroughIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  value: string;
  onChange?: (value: string) => void;
  className?: string;
  editable?: boolean;
};

export const TextEditor = ({
  value,
  onChange = () => {},
  className,
  editable = true,
}: Props) => {
  const editor = useEditor({
    editable,
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
      }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }).extend({
        renderHTML({ node, HTMLAttributes }) {
          const hasLevel = this.options.levels.includes(node.attrs.level);
          const level: Level = hasLevel
            ? node.attrs.level
            : this.options.levels[0];

          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "pl-8 list-disc",
        },
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) {
      return undefined;
    }
    if (editable) {
      editor.setOptions({
        editable,
        editorProps: {
          attributes: {
            class: cn(
              "rounded-md border min-h-[150px] border-input bg-background px-3 py-2",
              className
            ),
          },
        },
      });
    }
  }, [editable, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col justify-stretch space-y-2">
      {editable && <TextEditorToolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export type TextEditorToolbarProps = {
  editor: Editor | null;
};

function TextEditorToolbar({ editor }: TextEditorToolbarProps) {
  const [heading, setHeading] = useState<string>("");

  if (!editor) return null;

  const toggleHeading = (value: string) => {
    if (!value) {
      editor.chain().focus().setHeading({ level: 6 }).run();
    } else {
      editor
        .chain()
        .focus()
        .setHeading({ level: Number(value) as Level })
        .run();
    }
    editor.view.dom.focus();
    setHeading(value);
  };

  const toggle = (callback: ChainedCommands) => {
    callback.run();
    editor.view.dom.focus();
  };

  return (
    <Menubar>
      <MenubarMenu>
        <Toggle
          onPressedChange={() => toggle(editor.chain().toggleBold())}
          pressed={editor.isActive("bold")}
        >
          <BoldIcon className="h-4 w-4" />
        </Toggle>
        <Toggle
          onPressedChange={() => toggle(editor.chain().toggleItalic())}
          pressed={editor.isActive("italic")}
        >
          <ItalicIcon className="h-4 w-4" />
        </Toggle>
        <Toggle
          onPressedChange={() => toggle(editor.chain().toggleStrike())}
          pressed={editor.isActive("strike")}
        >
          <StrikethroughIcon className="h-4 w-4" />
        </Toggle>
        <Toggle
          onPressedChange={() => toggle(editor.chain().toggleBulletList())}
          pressed={editor.isActive("bulletList")}
        >
          <ListIcon className="h-4 w-4" />
        </Toggle>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger
          className={cn("hover:bg-muted cursor-pointer", heading && "bg-muted")}
        >
          {heading ? `Heading ${heading}` : "Heading"}
        </MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup
            value={heading}
            onValueChange={(e) => toggleHeading(e)}
          >
            <MenubarRadioItem value="6">Heading 6</MenubarRadioItem>
            <MenubarRadioItem value="5">Heading 5</MenubarRadioItem>
            <MenubarRadioItem value="4">Heading 4</MenubarRadioItem>
            <MenubarRadioItem value="3">Heading 3</MenubarRadioItem>
            <MenubarRadioItem value="2">Heading 2</MenubarRadioItem>
            <MenubarRadioItem value="1">Heading 1</MenubarRadioItem>
            <MenubarRadioItem value="">Heading</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

const classes: Record<Level, string> = {
  1: "text-4xl font-bold",
  2: "text-3xl font-bold",
  3: "text-2xl font-semibold",
  4: "text-xl font-semibold",
  5: "text-lg font-medium",
  6: "text-base",
};

import { useState } from "react";
import {
  BtnBold,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
  BtnNumberedList,
  BtnBulletList,
} from "react-simple-wysiwyg";

export default function RichTextEditor({ onTextEditing, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const onChange = (e) => {
    setValue(e.target.value);
    onTextEditing(e);
  };

  return (
    <>
      <div>
        <EditorProvider>
          <Editor value={value} onChange={onChange}>
            <Toolbar>
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <BtnStrikeThrough />
              <Separator />
              <BtnNumberedList />
              <BtnBulletList />
              <Separator />
              <BtnLink />
            </Toolbar>
          </Editor>
        </EditorProvider>
      </div>
    </>
  );
}

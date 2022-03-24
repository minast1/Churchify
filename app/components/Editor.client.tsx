import * as React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

// Formats objects for setting up the Quill editor
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];
// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);

const imageHandler = () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  input.onchange = () => console.log(input.files && input.files[0]);
};
// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      image: imageHandler,
    },
  },
  history: {
    delay: 500,
    // maxStack: 100,
    userOnly: true,
  },
};

// Quill Toolbar component
const QuillToolbar = () => (
  <div id="toolbar" style={{ border: "1px solid lightgray" }}>
    <span className="ql-formats">
      <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
      </select>
      <select className="ql-size" defaultValue="medium">
        <option value="extra-small">Size 1</option>
        <option value="small">Size 2</option>
        <option value="medium">Size 3</option>
        <option value="large">Size 4</option>
      </select>
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>
    <span className="ql-formats">
      <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" />
      <button className="ql-blockquote" />
      <button className="ql-direction" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </span>
    <span className="ql-formats">
      <button className="ql-formula" />
      <button className="ql-code-block" />
      <button className="ql-clean" />
    </span>
  </div>
);

const CustomEditor = () => {
  const [value, setValue] = React.useState("");

  const reactQuill = React.useRef<ReactQuill>(null);
  const onChangeText = () => {
    const editor = reactQuill.current?.getEditor();
    //const unprivilegedEditor = Quill.makeUnprivilegedEditor(editor);
    // You may now use the unprivilegedEditor proxy methods
    // const content = editor?.getContents().ops;
    // console.log("unprivilegedEditor.getContent()", content);
    // on submit, you can set state with that text binded in this.inpText
    // setValue({text: this.inputText}
  };

  return (
    <div className="text-editor">
      <QuillToolbar />
      <ReactQuill
        theme="snow"
        ref={reactQuill}
        value={value}
        onChange={onChangeText}
        modules={modules}
        formats={formats}
        placeholder="Start typing here....."
      />
    </div>
  );
};
export default CustomEditor;

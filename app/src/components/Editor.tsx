import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIRichTextEditor from "mui-rte";
import { ClientOnly } from "remix-utils";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { convertToRaw, EditorState } from "draft-js";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        backgroundColor: "#ebebeb",
      },
      container: {
        display: "flex",
        flexDirection: "column",
        border: "1px solid lightgray",
      },
      editor: {
        backgroundColor: "#ebebeb",
        padding: "10px",
        height: "200px",
        maxHeight: "200px",
        overflow: "auto",
      },
      toolbar: {
        borderBottom: "1px solid gray",
        backgroundColor: "#ebebeb",
      },
      placeHolder: {
        backgroundColor: "#ebebeb",
        paddingLeft: 20,
        width: "inherit",
      },
      anchorLink: {
        color: "#333333",
        textDecoration: "underline",
      },
    },
  },
});

const save = (data: string) => {
  console.log(data);
};
export default function MyEditor() {
  const [value, setValue] = React.useState("");

  const onEditorChange = (event: EditorState) => {
    // const plainText = event.getCurrentContent().getPlainText(); // for plain text
    const rteContent = convertToRaw(event.getCurrentContent()); // for rte content with text formating
    rteContent && setValue(JSON.stringify(rteContent.blocks.at(0)?.text));
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <ClientOnly
        fallback={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={50} />
          </Box>
        }
      >
        {() => (
          <MUIRichTextEditor
            label="Start typing..."
            onSave={save}
            onChange={onEditorChange}
          />
        )}
      </ClientOnly>
    </ThemeProvider>
  );
}

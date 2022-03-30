import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  //border: "1px solid lightgray",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "85%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 2, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "110%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const BottomAppBar = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <StyledInputBase />
        <Box sx={{ flexGrow: 1 }} />
        <Fab size="small" color="secondary" aria-label="add">
          <SendIcon fontSize="small" />
        </Fab>
      </Toolbar>
    </AppBar>
  );
};

export default BottomAppBar;

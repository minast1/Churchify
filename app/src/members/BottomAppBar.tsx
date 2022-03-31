import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useFetcher, useOutletContext } from "remix";
import { User } from "@prisma/client";
import NoSsr from "@mui/material/NoSsr";

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
  const [message, setMessage] = React.useState("");
  const user = useOutletContext<Omit<User, "password">>();
  const fetcher = useFetcher();
  React.useEffect(() => {
    fetcher.state === "submitting" && setMessage("");
  }, [fetcher.state === "submitting"]);

  //console.log(user);
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <StyledInputBase
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Box sx={{ flexGrow: 1 }} />
        <NoSsr>
          <Fab
            size="small"
            color="secondary"
            aria-label="add"
            disabled={message.length ? false : true}
            onClick={() => {
              const formData = new FormData();
              formData.append("message", message);
              formData.append("userId", user.id);
              formData.append("denomination", user.denomination);
              fetcher.submit(formData, { method: "post" });
            }}
          >
            <SendIcon fontSize="small" />
          </Fab>
        </NoSsr>
      </Toolbar>
    </AppBar>
  );
};

export default BottomAppBar;

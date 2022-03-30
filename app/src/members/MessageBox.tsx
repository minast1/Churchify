import React from "react";
//import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { format } from "date-fns";

type AppType = {
  time: Date | string;
  message: string;
  name: string;
};
const MessageBox = ({ name, message, time }: AppType) => {
  return (
    <Box
      sx={{
        py: 1,
        px: 2,
        borderRadius: 11,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 5,
        backgroundColor: "#1f232a",
      }}
      width="fit-content"
      display="flex"
      flexDirection="column"
    >
      {/*messageFile && (*/}
      <Box alignSelf="flex-end">
        <Typography sx={{ fontSize: 14, color: "gray", fontWeight: 500 }}>
          {name}
        </Typography>
      </Box>

      <Box display="flex">
        <Typography sx={{ fontSize: 15, fontWeight: 400, color: "lightgray" }}>
          {message}
        </Typography>
      </Box>
      <Box alignSelf="flex-end">
        <Typography sx={{ fontSize: 13, color: "lightgray", pt: "10px" }}>
          {format(new Date(time), "p")}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageBox;

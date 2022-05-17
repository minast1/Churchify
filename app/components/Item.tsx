import Paper from "@mui/material/Paper";
import { NoSsr, useMediaQuery, useTheme } from "@mui/material";

import React from "react";

type ItemType = {
  name: string;
  description: string;
  image: string;
};

export function Item({ name, description, image }: ItemType) {
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <NoSsr>
      <Paper
        square
        sx={{
          backgroundImage: `url(${image})`,
          height: mobileScreen ? 200 : 500,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 120%",
        }}
      >
        <h2>{name}</h2>
        <p>{description}</p>
      </Paper>
    </NoSsr>
  );
}

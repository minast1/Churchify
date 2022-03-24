import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";

const PageHeader = ({ title }: { title: string }) => {
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Card
      elevation={5}
      square
      sx={{
        //mb: 3,
        color: "white",
        background: `linear-gradient( rgba(0, 0, 0, 0.8) 100%, rgba(0, 0, 0, 0.7) 100%), url("/example2.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: mobileScreen ? 200 : 380,
      }}
    >
      <CardHeader
        title={
          <Typography
            sx={{ pt: 5, pl: 5 }}
            variant={mobileScreen ? "subtitle2" : "h4"}
          >
            Welcome to the Professional Christian Union (PCU) Dashboard
          </Typography>
        }
        subheader={
          <Typography
            variant={mobileScreen ? "subtitle2" : "h5"}
            sx={{ color: "darkgray", pl: 5 }}
          >
            {title}
          </Typography>
        }
      />
    </Card>
  );
};

export default PageHeader;

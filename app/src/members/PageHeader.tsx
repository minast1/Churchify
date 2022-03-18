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
      sx={{
        mb: 3,
        color: "white",
        background: `linear-gradient( rgba(0, 0, 0, 0.8) 100%, rgba(0, 0, 0, 0.7) 100%), url("/example2.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: mobileScreen ? 150 : 180,
      }}
    >
      <CardHeader
        title={
          <Typography
            sx={{ fontWeight: "bold" }}
            variant={mobileScreen ? "subtitle2" : "h6"}
          >
            Welcome to the Professional Christian Union (PCU) Dashboard
          </Typography>
        }
        subheader={
          <Typography
            variant={mobileScreen ? "subtitle2" : "body1"}
            sx={{ color: "darkgray" }}
          >
            {title}
          </Typography>
        }
      />
    </Card>
  );
};

export default PageHeader;

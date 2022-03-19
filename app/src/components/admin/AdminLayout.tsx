import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import AdminAppBar from "./AdminAppBar";

//import { useMediaQuery, useTheme } from "@mui/material";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //const theme = useTheme();
  //const mobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <React.Fragment>
      <CssBaseline />
      <AdminAppBar />
      <Toolbar id="back-to-top-anchor" />
      <Container maxWidth={false} disableGutters>
        <Box
          component="main"
          sx={{
            backgroundColor: "#cfd8dc",
            pt: 4,
            minHeight: "100vh",
            //overflow: "inherit",
          }}
        >
          {children}
        </Box>
      </Container>
    </React.Fragment>
  );
}

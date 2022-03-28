import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AdminAppBar from "./AdminAppBar";
import Copyright from "~/src/Copyright";

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

      <Container maxWidth={false} disableGutters>
        <Box
          component="main"
          sx={{
            backgroundColor: "#cfd8dc",
            pt: 4,
            minHeight: "100vh",
            overflow: "inherit",
          }}
        >
          {children}
          <Box>
            <Copyright />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

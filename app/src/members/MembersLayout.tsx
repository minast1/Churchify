import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import MembersAppBar from "./MembersAppBar";

export default function MembersDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <CssBaseline />
      <MembersAppBar />

      <Box
        component="main"
        sx={{
          backgroundColor: "#cfd8dc",
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />

        <Container component="main" maxWidth={false} sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}

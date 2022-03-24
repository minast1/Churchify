import React from "react";
import { Outlet } from "remix";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const AdminLayoutRout = () => {
  return (
    <React.Fragment>
      <CssBaseline />

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
          <Outlet />
          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Footer Area
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default AdminLayoutRout;

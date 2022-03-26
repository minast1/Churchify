import React from "react";
import { Outlet } from "remix";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useMediaQuery, useTheme } from "@mui/material";

const AdminLayoutRout = () => {
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <React.Fragment>
      <CssBaseline />

      <Container maxWidth={false} disableGutters sx={{ height: "100vh" }}>
        <Box
          component="main"
          sx={{
            backgroundColor: "#63639a",
            //pt: 1,
            // minHeight: "50vh",
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
          ></Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default AdminLayoutRout;

import React from "react";
import AnnouncementCard from "~/src/components/AnnouncementCard";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";

import List from "@mui/material/List";
import PageHeader from "~/src/members/PageHeader";
import PaginationComponent from "~/src/components/Pagination";
import { ActionFunction, LoaderFunction } from "remix";
import { authenticator } from "~/lib/auth.server";

const Index = () => {
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container
      maxWidth={mobileScreen ? false : "lg"}
      disableGutters={mobileScreen ? true : false}
    >
      <PageHeader title="General Announcement Area" />

      <List sx={{ width: "100%", bgcolor: "white", boxShadow: 8 }}>
        <AnnouncementCard
          postedBy="GUBS"
          view={mobileScreen}
          created="29-06-2022"
          image="/example1.jpg"
          description="This impressive paella is a perfect party dish and a fun meal to cook 
          together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
        />
        <AnnouncementCard
          view={mobileScreen}
          postedBy="PaxRomana"
          created="01-03-2022"
          description="This impressive paella is a perfect party dish and a fun meal to cook 
          together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
        />
        <AnnouncementCard
          view={mobileScreen}
          postedBy="PENSA"
          created="01-03-2022"
          image="/example2.jpg"
          description="This impressive paella is a perfect party dish and a fun meal to cook 
          together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
        />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "100%",
            // backgroundColor: "white",
          }}
        >
          <PaginationComponent total={30} />
        </Box>
      </List>
    </Container>
  );
};

export default Index;

export const loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
  console.log(user);
  return user;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("button");
  if (actionType === "logout") {
    return await authenticator.logout(request, { redirectTo: "/" });
  }
  return null;
};

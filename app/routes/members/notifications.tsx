import React from "react";
import AnnouncementCard from "~/src/components/AnnouncementCard";
import Container from "@mui/material/Container";
import { useMediaQuery, useTheme } from "@mui/material";
import List from "@mui/material/List";
import PageHeader from "~/src/members/PageHeader";

const Notifications = () => {
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container maxWidth={mobileScreen ? false : "md"}>
      <PageHeader title=" Denomination Notification Area" />

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <AnnouncementCard
          view={mobileScreen}
          postedBy="GUPS"
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
          postedBy="PaxRomana"
          created="01-03-2022"
          image="/example2.jpg"
          description="This impressive paella is a perfect party dish and a fun meal to cook 
          together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
        />
      </List>
    </Container>
  );
};

export default Notifications;

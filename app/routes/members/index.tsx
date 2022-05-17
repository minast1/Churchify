import { Item } from "./../../components/Item";
import React from "react";
import AnnouncementCard from "~/src/components/AnnouncementCard";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import { format } from "date-fns";
import List from "@mui/material/List";
//import PageHeader from "~/src/members/PageHeader";
import PaginationComponent from "~/src/components/Pagination";
import { ActionFunction, json, LoaderFunction, useLoaderData } from "remix";
import { authenticator } from "~/lib/auth.server";
import {
  PaginatedAnnouncements,
  paginatedAnnouncements,
} from "~/controllers/announcementController";
//import { Announcement, User } from "@prisma/client";
import { getSession } from "~/lib/session.server";
import Carousel from "react-material-ui-carousel";

const Index = () => {
  const theme = useTheme();

  const loaderData = useLoaderData<PaginatedAnnouncements>();
  const { data, count } = loaderData;
  const items = [
    {
      name: "",
      description: "",
      image: "/main/img3.jpeg",
    },

    {
      name: "",
      description: "",
      image: "/main/img7.jpeg",
    },
  ];
  const mobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container
      maxWidth={mobileScreen ? false : "lg"}
      disableGutters={mobileScreen ? true : false}
    >
      <Carousel
        sx={{ mb: 1 }}
        navButtonsAlwaysVisible={true}
        indicators={false}
      >
        {items.map((item, i) => (
          <Item
            key={i}
            name={item.name}
            description={item.description}
            image={item.image}
          />
        ))}
      </Carousel>
      <List
        sx={{
          width: "100%",
          //boxShadow: 8,
          backgroundColor: "background.paper",
        }}
      >
        {data.length &&
          data.map((item) => (
            <AnnouncementCard
              key={item.id}
              postedBy={item.creator.name}
              denomination={item.creator.denomination}
              view={mobileScreen}
              created={format(new Date(item.createdAt), "PPPP")}
              avatar={item.creator.avatar}
              image={item.image as string}
              description={item.body}
            />
          ))}

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "100%",
            // backgroundColor: "white",
          }}
        >
          <PaginationComponent total={count ? count : 1} />
        </Box>
      </List>
    </Container>
  );
};

export default Index;

export const loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");

  if (user) {
    const url = new URL(request.url);
    const page: string | null = url.searchParams.get("page");

    const announcements = await paginatedAnnouncements(page);
    return json({ ...announcements });
  }
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("button");
  if (actionType === "logout") {
    return await authenticator.logout(request, { redirectTo: "/" });
  }
  return null;
};

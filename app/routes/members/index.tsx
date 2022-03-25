import React from "react";
import AnnouncementCard from "~/src/components/AnnouncementCard";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import { format } from "date-fns";
import List from "@mui/material/List";
import PageHeader from "~/src/members/PageHeader";
import PaginationComponent from "~/src/components/Pagination";
import { ActionFunction, json, LoaderFunction, useLoaderData } from "remix";
import { authenticator } from "~/lib/auth.server";
import {
  PaginatedAnnouncements,
  paginatedAnnouncements,
} from "~/controllers/announcementController";
import { User } from "@prisma/client";

export type loaderType = {
  announcements: PaginatedAnnouncements;
};
const Index = () => {
  const theme = useTheme();

  const loaderData = useLoaderData<loaderType>();

  ///console.log(loaderData.announcements.count);
  const mobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container
      maxWidth={mobileScreen ? false : "lg"}
      disableGutters={mobileScreen ? true : false}
    >
      <PageHeader title="General Announcement Area" />

      <List
        sx={{
          width: "100%",
          boxShadow: 8,
          backgroundColor: "background.paper",
        }}
      >
        {loaderData.announcements.data.map((item) => (
          <AnnouncementCard
            key={item.id}
            postedBy={item.creator.name}
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
          <PaginationComponent total={loaderData.announcements.count} />
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
  if (user) {
    const url = new URL(request.url);
    const page: string | null = url.searchParams.get("page");

    const announcements = await paginatedAnnouncements(page);
    return json({ user, announcements });
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

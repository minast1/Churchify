import React from "react";
import AnnouncementCard from "~/src/components/AnnouncementCard";
import Container from "@mui/material/Container";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { format } from "date-fns";
import List from "@mui/material/List";
import PageHeader from "~/src/members/PageHeader";
import {
  ActionFunction,
  json,
  LoaderFunction,
  useLoaderData,
  useOutletContext,
} from "remix";
import {
  PaginatedNotifications,
  paginatedNotifications,
} from "~/controllers/announcementController";
import PaginationComponent from "~/src/components/Pagination";
import { getSession } from "~/lib/session.server";
import { User } from "@prisma/client";

const Notifications = () => {
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const loaderData = useLoaderData<PaginatedNotifications>();
  const user = useOutletContext<Omit<User, "password">>();

  const { data, count } = loaderData;

  return (
    <Container
      maxWidth={mobileScreen ? false : "lg"}
      disableGutters={mobileScreen ? true : false}
    >
      <PageHeader title={`${user.denomination} Notifications Area`} />

      <List
        sx={{
          width: "100%",
          boxShadow: 8,
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

export default Notifications;

export const loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");

  if (user) {
    const url = new URL(request.url);
    const page: string | null = url.searchParams.get("page");

    const announcements = await paginatedNotifications(page, user.denomination);
    return json({ ...announcements });
  }
};

export const action: ActionFunction = async ({ request }) => {
  return null;
};

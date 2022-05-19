import React from "react";
import AnnouncementCard from "~/src/components/AnnouncementCard";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { format } from "date-fns";
import List from "@mui/material/List";
//import PageHeader from "~/src/members/PageHeader";
import PaginationComponent from "~/src/components/Pagination";
import type { ActionFunction, LinksFunction, LoaderFunction } from "remix";
import { json } from "remix";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/lib/auth.server";
import {
  PaginatedAnnouncements,
  paginatedAnnouncements,
} from "~/controllers/announcementController";
//import { Announcement, User } from "@prisma/client";
import { getSession } from "~/lib/session.server";
import { Carousel } from "react-responsive-carousel";
import carouselStyle from "~/styles/carousel.min.css";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Index = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const loaderData = useLoaderData<PaginatedAnnouncements>();
  const { data, count } = loaderData;

  const mobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container
      maxWidth={mobileScreen ? false : "lg"}
      disableGutters={mobileScreen ? true : false}
      sx={{ pt: 1 }}
    >
      <Carousel infiniteLoop autoPlay showThumbs={false}>
        <div>
          <img
            src="/main/img7.jpeg"
            alt=""
            style={{ height: isMobile ? 250 : 450, objectFit: "cover" }}
          />
        </div>

        <div>
          <img
            src="/main/img3.jpeg"
            alt=""
            style={{ height: isMobile ? 250 : 450, objectFit: "cover" }}
          />
        </div>
      </Carousel>
      <Paper sx={{ my: 2, p: 2 }}>
        <Alert severity="info">
          <AlertTitle>Overview of PCU</AlertTitle>
          <Typography>
            We the people of God united as one body under the Professional
            Christain Union at the University of Professional Studies, Accra
            (UPSA), for the purpose of furthering the work of our Lord Jesus
            Christ do hereby come up with this constitution for the purposes of
            • Bringing under the umbrella of the union all registered
            denominations on campus • Securing and preserving the principles of
            the Christian faith • Providing for the orderly conduct of internal
            affairs of members in the union in order to enhance interactions
            among them.
          </Typography>
        </Alert>
      </Paper>
      <List
        sx={{
          width: "100%",
          boxShadow: 8,
          backgroundColor: "background.paper",
        }}
      >
        <Typography align="center" variant="h6">
          Announcements Board
        </Typography>
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

export const links: LinksFunction = () => {
  // `links` returns an array of objects whose
  // properties map to the `<link />` component props
  return [{ rel: "stylesheet", href: carouselStyle }];
};

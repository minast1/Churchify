import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const AboutPage = () => {
  return (
    <Container maxWidth="lg" sx={{ pt: 5 }}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="GESAM"
            secondary={
              <React.Fragment>
                <Box my={2}>
                  <ImageList
                    sx={{ width: "100%", height: 400 }}
                    cols={3}
                    rowHeight={200}
                  >
                    <ImageListItem>
                      <img src="/GESAM/img1.jpeg" alt="" loading="lazy" />
                    </ImageListItem>
                    <ImageListItem>
                      <img src="/GESAM/img2.jpeg" alt="" loading="lazy" />
                    </ImageListItem>
                    <ImageListItem>
                      <img src="/GESAM/img3.jpeg" alt="" loading="lazy" />
                    </ImageListItem>
                    <ImageListItem>
                      <img src="/GESAM/img4.jpeg" alt="" loading="lazy" />
                    </ImageListItem>
                    <ImageListItem>
                      <img src="/GESAM/img5.jpeg" alt="" loading="lazy" />
                    </ImageListItem>
                    <ImageListItem>
                      <img src="/GESAM/img6.jpeg" alt="" loading="lazy" />
                    </ImageListItem>
                  </ImageList>
                </Box>
                {
                  <Typography sx={{ fontWeight: "bold" }}>
                    The Global Evangelical Students and Associates’ Ministry
                    (GESAM) is the extension of the Global Evangelical Church in
                    the respective tertiary institutions and the second cycle
                    institution. GESAM UPSA was established in 2007 to provide a
                    church and a family for members of the Global Evangelical
                    Church (GEC) in UPSA then IPS. The campus ministry has been
                    through thick and thin but by the grace of God we are
                    15years. The slogan of the ministry is; GESAM…………... Arise
                    and build with Commitment GESAM UPSA…………. Soaring high for
                    Christ The campus ministry has Bible studies on Monday,
                    Discipleship class on Tuesday, Prayers of Friday and our
                    Divine Service on Sunday mornings. We meet beside the UPSA
                    clinic on Mondays and Tuesdays. We also meet at either the
                    forecourt of the new auditorium or at the Prince of Peace
                    Park for our prayers on Friday and right in front of the
                    school clinic for our Sunday service. The ministry also
                    undertakes various evangelism programs on and around campus
                    and our major evangelism program dubbed Students in
                    Community Evangelism (SICE). This is a one-week evangelism
                    program to reach the unreached with the gospel of Christ.
                  </Typography>
                }
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Sandra Adams
                </Typography>
                {" — Do you have Paris recommendations? Have you ever…"}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Container>
  );
};

export default AboutPage;
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
];

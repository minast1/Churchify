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
            <Avatar alt="Remy Sharp" src="/GESAM/logo.jpg" />
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
                <Typography component="span">
                  The Global Evangelical Students and Associates’ Ministry
                  (GESAM) is the extension of the Global Evangelical Church in
                  the respective tertiary institutions and the second cycle
                  institution. GESAM UPSA was established in 2007 to provide a
                  church and a family for members of the Global Evangelical
                  Church (GEC) in UPSA then IPS. The campus ministry has been
                  through thick and thin but by the grace of God we are 15years.
                  The slogan of the ministry is; GESAM…………... Arise and build
                  with Commitment GESAM UPSA…………. Soaring high for Christ The
                  campus ministry has Bible studies on Monday, Discipleship
                  class on Tuesday, Prayers of Friday and our Divine Service on
                  Sunday mornings. We meet beside the UPSA clinic on Mondays and
                  Tuesdays. We also meet at either the forecourt of the new
                  auditorium or at the Prince of Peace Park for our prayers on
                  Friday and right in front of the school clinic for our Sunday
                  service. The ministry also undertakes various evangelism
                  programs on and around campus and our major evangelism program
                  dubbed Students in Community Evangelism (SICE). This is a
                  one-week evangelism program to reach the unreached with the
                  gospel of Christ.
                </Typography>
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
            primary="Royalhouse Students Association"
            secondary={
              <React.Fragment>
                <Typography
                  //sx={{ display: "inline" }}
                  component="span"
                  //variant="body2"
                  //color="text.primary"
                >
                  Royalhouse Students and Associates (ROSA-UPSA) is the
                  denomination's name,which is the Student fellowship for Royal
                  House Chapel International under the ministry of the Apostle
                  General Rev.Sam Korankye Ankra and His wife Lady Rev.Rita
                  Korankye Ankra. ROSA UPSA has a campus pastor, by name Pastor
                  Sedem Tordzro and three coordinators to assist us power our
                  fathers vision. ROSA UPSA have been registered on campus and
                  partake in all activities that goes on, on campus. Place of
                  worship : We fellowship at the Hacienda City Mall, Opposite
                  UPSA. Activities We Undertake : We have Word Explosion on
                  Tuesdays at the fountain,where we meet to discuss the word of
                  God. Hour of Travail (HOT) on Fridays at the Prince of Peace
                  field,where we meet to pray . ROAR on Sundays which is also a
                  revival prayer meeting open to all. Choristers meet for
                  rehearsals,we go for evangelism as well and the likes.
                  Relevant Things to know : The Vision of the Church 1. Bring
                  people into God's presence through worship, praise & prayer.
                  2. Preaching messages of hope, relevant to the needs of
                  humankind. 3. Bringing comfort to the people of God and
                  providing a place in an atmosphere of love, caring and
                  fellowship for them. Mission Statement Touching Our Generation
                  with the Power of God. ROSA...Power the vision.
                </Typography>
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

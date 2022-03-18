import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

type AppProps = {
  description: string;
  created: string;
  postedBy: string;
  image?: string;
  view: Boolean;
};
const AnnouncementCard = ({
  description,
  created,
  postedBy,
  image,
  view,
}: AppProps) => {
  return (
    <Card elevation={0}>
      <CardHeader
        avatar={
          <Avatar
            // sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={
              postedBy === "PaxRomana"
                ? "/paxRomana.jpg"
                : postedBy === "GUBS"
                ? "/gubs.jpeg"
                : postedBy === "AGCM"
                ? "/agcm.jpeg"
                : postedBy === "NUPS"
                ? "/nups.jpeg"
                : "/pensa.jpeg"
            }
          >
            R
          </Avatar>
        }
        title={
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {`Posted By ${postedBy}`}
          </Typography>
        }
        subheader={created}
      />
      {image && (
        <CardMedia
          component="img"
          height={view ? 160 : 190}
          image={image}
          alt="Paella dish"
        />
      )}

      <CardContent
        sx={{ borderTop: image ? "1px solid lightgray" : 0, pt: image ? 1 : 0 }}
      >
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Divider variant="fullWidth" sx={{ py: 1 }} />
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;

import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import { Denomination } from "@prisma/client";

type AppProps = {
  description: string;
  created: string | Date;
  postedBy: string;
  denomination: Denomination;
  image?: string;
  avatar: string | null;
  view: Boolean;
};
const AnnouncementCard = ({
  description,
  created,
  postedBy,
  image,
  view,
  denomination,
  avatar,
}: AppProps) => {
  return (
    <Card elevation={0} square>
      <CardHeader
        avatar={
          <Avatar
            // sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={avatar ? avatar : "/avatar-1.jpg"}
          >
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
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
          height={view ? 190 : 300}
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

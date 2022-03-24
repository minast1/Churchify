import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useMediaQuery, useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Denomination } from "@prisma/client";
import { categories } from "~/src/constants";
import { ActionFunction, Form, LoaderFunction, useSubmit } from "remix";
import { db } from "~/lib/db.server";
import AnnouncementTable from "~/src/components/admin/AnnouncementTable";
import { ClientOnly } from "remix-utils";
import CircularProgress from "@mui/material/CircularProgress";
import Fileupload from "~/components/Fileupload.client";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useStore } from "~/lib/store";

const AdminIndexRoute = () => {
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [category, setCategory] = React.useState<Denomination>("GENERAL");
  const [announcement, setAnnouncement] = React.useState<string>("");
  const Image = useStore((state) => state.file);
  const submit = useSubmit();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value as Denomination);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 4 }}>
      <Card
        sx={{ mb: 5 /*height: mobileScreen ? 670 : 590 */ }}
        // component={Form}
        //method="post"
        //encType="multipart/form-data"
      >
        <CardHeader title="Create New Announcement" />
        <CardContent
          sx={{
            borderTop: "1px solid lightgray",
            borderBottom: "1px solid lightgray",
          }}
        >
          Admin Login area
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminIndexRoute;

export const loader: LoaderFunction = async () => {
  /*const data = await db.announcement.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      creator: {
        select: {
          name: true,
        },
      },
    },
  });
  const formattedData = data.map((item) => {
    return {
      id: item.id,
      name: item.creator.name,
      category: item.category,
      createdAt: item.createdAt,
    };
  });

  return formattedData;*/
  return null;
};

export const action: ActionFunction = async () => {
  //const formData = await request.formData();
  console.log("Yayyyaaaa");
  return null;
};

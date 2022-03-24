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
import { ActionFunction, LoaderFunction, useFetcher } from "remix";
//import AnnouncementTable from "~/src/components/admin/AnnouncementTable";
import { ClientOnly } from "remix-utils";
import CircularProgress from "@mui/material/CircularProgress";
import { useStore } from "~/lib/store";
import FileUpload from "react-material-file-upload";
import { uploadImage } from "~/lib/handler.server";

const DashboardIndex = () => {
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [category, setCategory] = React.useState<Denomination>("GENERAL");
  const [announcement, setAnnouncement] = React.useState<string>("");
  const fetcher = useFetcher();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value as Denomination);
  };
  const setFile = useStore((state: any) => state.setFile);
  const file = useStore((state: any) => state.file);

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
          <TextField
            aria-label="empty textarea"
            placeholder="Empty"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            name="announcement"
            style={{
              width: "100%",
              marginBottom: "30px",
              border: "none",
              fontSize: 15,
            }}
            multiline
          />
          <ClientOnly
            fallback={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress sx={{ color: "#2196f3" }} />
              </Box>
            }
          >
            {() => (
              <FileUpload
                value={file}
                onChange={(e) => setFile(e)}
                sx={{ border: "n", backgroundColor: "#2196f3" }}
              />
            )}
          </ClientOnly>

          <Box sx={{ mt: 3 }}>
            <TextField
              id="outlined-select-currency"
              select
              name="category"
              size="small"
              label="Category"
              value={category}
              onChange={handleChange}
              helperText="Please select Announcement Category"
            >
              {categories.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 1, backgroundColor: "#2196f3" }}
            onClick={() => {
              //save image to firebase
              const formData = new FormData();

              formData.set("title", announcement);
              formData.set("image", file[0]);
              formData.set("category", category);
              fetcher.submit(formData, {
                method: "post",
                action: "/admin/dashboard/?index",
                encType: "multipart/form-data",
              });
            }}
          >
            Submit Announcement
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ mb: 10 }}>
        <CardHeader
          title={
            <Box display="flex" alignItems="center">
              <Typography variant="h5" sx={{ mt: 2, mr: 1 }}>
                Student Attendance Statistics
              </Typography>
            </Box>
          }
          subheader="Lectures Conducted 67"
        />

        <CardContent sx={{ borderTop: "1px solid lightgray" }}></CardContent>
      </Card>
    </Container>
  );
};

export default DashboardIndex;

export const action: ActionFunction = async ({ request }) => {
  const url = (await uploadImage(request)) as File;
  const formData = await request.formData();

  //save announcement into the database with the url;
  //const announcement = await db.ann;
  return null;
};

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

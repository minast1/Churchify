import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useMediaQuery, useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Announcement, Denomination, User } from "@prisma/client";
import { categories } from "~/src/constants";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  useActionData,
  useFetcher,
  useOutletContext,
} from "remix";
//import AnnouncementTable from "~/src/components/admin/AnnouncementTable";
import { ClientOnly } from "remix-utils";
import CircularProgress from "@mui/material/CircularProgress";
import { useStore } from "~/lib/store";
import FileUpload from "react-material-file-upload";
import { uploadImage } from "~/lib/handler.server";
import { getAllAnnouncements } from "~/controllers/announcementController";
import toast, { Toaster } from "react-hot-toast";
import { Alert } from "~/src/components/CustomAlert";

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

  const user = useOutletContext<Omit<User, "password">>();
  const data = useActionData<Announcement>();

  React.useEffect(() => {
    fetcher.state === "loading" &&
      toast.custom(
        <Alert severity="success">
          {`New announcement added successfully`}{" "}
        </Alert>,
        {
          position: "bottom-right",
        }
      );
  }, [fetcher.state, data]);

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 4 }}>
      <Card
        sx={{ mb: 5 /*height: mobileScreen ? 670 : 590 */ }}
        //component={Form}
        // method="post"
        // encType="multipart/form-data"
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

              formData.set("body", announcement);
              formData.set("creatorId", user.id);
              formData.set("image", file[0]);
              formData.set("category", category);
              fetcher.submit(formData, {
                method: "post",
                action: "/admin/dashboard/?index",
                encType: "multipart/form-data",
              });
            }}
          >
            {fetcher.state === "submitting" ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Submit Announcement"
            )}
          </Button>
        </CardActions>
      </Card>
      <Toaster />
    </Container>
  );
};

export default DashboardIndex;

export const action: ActionFunction = async ({ request }) => {
  const data = await uploadImage(request);

  return data;
};

export const loader: LoaderFunction = async () => {
  return await getAllAnnouncements();
};

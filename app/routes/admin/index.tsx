import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import MyEditor from "~/src/components/Editor";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useMediaQuery, useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Denomination } from "@prisma/client";
import { categories } from "~/src/constants";
import { LoaderFunction } from "remix";
import { db } from "~/lib/db.server";
import AnnouncementTable from "~/src/components/admin/AnnouncementTable";

const AdminIndexRoute = () => {
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [category, setCategory] = React.useState<Denomination>("GENERAL");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value as Denomination);
  };

  const ariaLabel = { "aria-label": "description" };
  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 4 }}>
      <Card sx={{ mb: 5, height: mobileScreen ? 670 : 590 }}>
        <CardHeader title="Create New Announcement" />
        <CardContent
          sx={{
            borderTop: "1px solid lightgray",
            borderBottom: "1px solid lightgray",
          }}
        >
          <MyEditor />
          <Box sx={{ mt: 3 }}>
            <TextField
              id="outlined-select-currency"
              select
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
          <Box sx={{ mt: 2 }}>
            <Input
              type="file"
              inputProps={ariaLabel}
              placeholder="Add Image to Announcement"
            />
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
            //size="small"
            color="warning"
            sx={{ mt: 1 }}
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

        <CardContent sx={{ borderTop: "1px solid lightgray" }}>
          <AnnouncementTable />
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminIndexRoute;

export const loader: LoaderFunction = async () => {
  const data = await db.announcement.findMany({
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

  return formattedData;
};

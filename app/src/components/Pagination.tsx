import React from "react";
import Pagination from "@mui/material/Pagination";
import { Link, useLocation, useLoaderData } from "remix";
import PaginationItem from "@mui/material/PaginationItem";
import { useMediaQuery, useTheme } from "@mui/material";
import { PaginatedAnnouncements } from "~/controllers/announcementController";

type loaderType = {
  announcements: PaginatedAnnouncements;
};

const PaginationComponent = ({ total }: { total: number }) => {
  const location = useLocation();
  // const loaderData = useLoaderData<loaderType>();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Pagination
      variant="outlined"
      color="primary"
      siblingCount={mobileScreen ? 0 : undefined}
      size="small"
      page={page}
      count={Math.round(total / 5)}
      renderItem={(item) => (
        <PaginationItem
          sx={{ m: 1 }}
          component={Link}
          to={`/members${item.page === 1 ? "" : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
};

export default PaginationComponent;

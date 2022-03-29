import React from "react";
import Pagination from "@mui/material/Pagination";
import { Link, useLocation } from "remix";
import PaginationItem from "@mui/material/PaginationItem";
import { useMediaQuery, useTheme } from "@mui/material";
//import { PaginatedAnnouncements } from "~/controllers/announcementController";

const PaginationComponent = ({ total }: { total: number }) => {
  const location = useLocation();
  // const loaderData = useLoaderData<loaderType>();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  //console.log(location);
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
          prefetch="intent"
          to={`${location.pathname}${
            item.page === 1 ? "" : `?page=${item.page}`
          }`}
          {...item}
        />
      )}
    />
  );
};

export default PaginationComponent;

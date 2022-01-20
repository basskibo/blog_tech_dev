import React, { useState, useEffect } from "react";
import Paginations from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles(() => ({
//   ul: {
//     "& .MuiPaginationItem-root": {
//       color: "#fff",
//     },
//   },
// }));
const theme = createTheme({
  components: {
    // Name of the component
    MuiPaginationItem: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          color: "#FFFF",
        },
      },
    },
  },
});

export default function Pagination({
  numberOfPosts,
  pageNumber,
  numberOfPages,
}) {
  // const classes = useStyles();

  return (
    <div>
      {numberOfPosts > 0 ? (
        <div className="bg-white shadow-lg dark:bg-slate-900 rounded-lg p-8  mb-8 ">
          {/* <div className="border-b border-slate-100 text-white mb-4 pb-4"> */}
          <Stack spacing={3}>
            <Paginations
              count={numberOfPages}
              defaultPage={1}
              variant="outlined"
              color="primary"
              className={"paginationItemStyle"}
              // classes={{ ul: classes.ul }}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                />
              )}
              className={"paginationItemStyle"}
            />
          </Stack>
          {/* </div> */}
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
}

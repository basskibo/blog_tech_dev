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
        <div className=" shadow-lg bg-slate-900 rounded-lg p-8  mb-12 ">
          {/* <div className="border-b border-slate-100 text-white mb-4 pb-4"> */}
          <Stack spacing={3}>
            <Paginations
              count={numberOfPages}
              defaultPage={1}
              variant="outlined"
              color="primary"
              className={"bg-white"} // classes={{ ul: classes.ul }}
              style={{ color: "#ffff" }}
              renderItem={(item) => (
                <PaginationItem
                  className="text-slate-400 bg-slate-900  lg:m-1 sm:m-1 xs:ml-4 xs:mb-6 first:ml-1 "
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                />
              )}
              className={" mr-5"}
              style={{ color: "#ffff" }}
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

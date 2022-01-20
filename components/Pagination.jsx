import React, { useState, useEffect } from "react";
import Paginations from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Pagination({
  numberOfPosts,
  pageNumber,
  numberOfPages,
}) {
  return (
    <div>
      {numberOfPosts > 0 ? (
        <div className="bg-white shadow-lg dark:bg-slate-900 rounded-lg p-8  mb-8 ">
          {/* <div className="border-b border-slate-100 text-white mb-4 pb-4"> */}
          <Stack spacing={3}>
            <Paginations
              count={numberOfPages}
              variant="outlined"
              color="primary"
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

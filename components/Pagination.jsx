import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Example() {
  return (
    <div className="bg-white dark:bg-slate-900  shadow-lg rounded-lg p-8 pb-12 mb-8">
      <div className="border-b border-slate-100 text-white mb-4 pb-4">
        <Stack spacing={3}>
          <Pagination
            count={10}
            color="secondary"
            className={"paginationItemStyle"}
          />
        </Stack>
      </div>
    </div>
    // <div className="bg-white dark:bg-slate-900 shadow-lg rounded-lg p-0 lg:p-8 pb-12 md-8 mb-12 lg:md-14">

    // </div>
  );
}

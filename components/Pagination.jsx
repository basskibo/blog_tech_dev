import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Example() {
  return (
    <div className="bg-white dark:bg-slate-900 shadow-lg rounded-lg p-0 lg:p-8 pb-12 md-8 mb-12 lg:md-14">
      <Stack spacing={2}>
        <Pagination count={10} color="primary" />
      </Stack>
    </div>
  );
}

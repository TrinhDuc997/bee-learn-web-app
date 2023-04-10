import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface IPagination {
  count: number;
  handleChangePage: Function;
  page: number;
}
export default function BasicPagination(props: IPagination) {
  const { count, handleChangePage, page } = props;
  return (
    <Stack spacing={2} alignItems={"center"}>
      <Pagination
        onChange={(event, page) => {
          handleChangePage(page);
        }}
        color="primary"
        count={count}
        page={page}
      />
    </Stack>
  );
}

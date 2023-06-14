import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { PaginationItem } from "@mui/material";

interface IPagination {
  count: number;
  handleChangePage: Function;
  page?: number;
  pages?: number[];
}
export default function BasicPagination(props: IPagination) {
  const { count, handleChangePage, page, pages } = props;
  const paginationRef = React.useRef<HTMLInputElement>(null);
  return (
    <Stack spacing={2} alignItems={"start"}>
      <Pagination
        onChange={(event, page) => {
          handleChangePage(page);
        }}
        ref={paginationRef}
        renderItem={(item) => {
          const checkLearned = !!pages?.find((i) => i === item.page);
          return <PaginationItem {...item} selected={checkLearned} />;
        }}
        color="primary"
        count={count}
        page={page}
        hideNextButton
        hidePrevButton
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}

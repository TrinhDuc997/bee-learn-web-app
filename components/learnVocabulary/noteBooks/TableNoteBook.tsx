import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import ItemNoteBook from "./ItemNoteBook";
import { IExpandWord } from "pages/learning/vocabulary/note-book";

interface propsStickyHeadTable {
  listWords?: IExpandWord[];
}
const TableNoteBook = React.memo(function StickyHeadTable(
  props: propsStickyHeadTable
) {
  const { listWords = [] } = props;
  // const [isCheckedAll, setCheckedAll] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 20;
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        borderRadius: "15px",
        border: "1px solid",
        borderColor: "#ccc",
      }}
    >
      <TableContainer sx={{ height: "calc(100% - 60px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                align={"left"}
                style={{ minWidth: 140 }}
                sx={{
                  fontWeight: "bold",
                }}
              >
                Word
              </TableCell>
              <TableCell
                align={"left"}
                style={{ minWidth: 140 }}
                sx={{
                  fontWeight: "bold",
                }}
              >
                POS
              </TableCell>
              <TableCell
                align={"left"}
                style={{ minWidth: 150 }}
                sx={{
                  fontWeight: "bold",
                }}
              >
                Definition
              </TableCell>
              <TableCell
                style={{ minWidth: 90 }}
                sx={{
                  fontWeight: "bold",
                }}
              >
                Tag
              </TableCell>
              <TableCell
                align={"center"}
                style={{ minWidth: 170 }}
                sx={{
                  fontWeight: "bold",
                }}
              >
                Level
              </TableCell>
              <TableCell
                align={"center"}
                style={{ maxWidth: 60 }}
                sx={{
                  fontWeight: "bold",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listWords
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return <ItemNoteBook key={row.idOfWord} row={row} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20]}
        component="div"
        count={listWords.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        sx={{
          borderTop: "1px solid",
          borderColor: "#ccc",
        }}
      />
    </Box>
  );
});
export default TableNoteBook;

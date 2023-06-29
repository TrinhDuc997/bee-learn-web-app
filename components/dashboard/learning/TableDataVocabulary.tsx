import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Checkbox } from "@mui/material";
import { IExpandWord } from "pages/dashboard/learning/vocabulary";
import ItemVocabulary from "./ItemDataVocabulary";
// import { DashBoardVocabulryContext } from "contexts";

interface propsStickyHeadTable {
  listWords?: IExpandWord[];
  handleClickSelectAll?: Function;
}
const TableDataVocabulary = React.memo(function StickyHeadTable(
  props: propsStickyHeadTable
) {
  const { listWords = [], handleClickSelectAll } = props;
  // const { handleChangeListWords } = React.useContext(DashBoardVocabulryContext);
  const [isCheckedAll, setCheckedAll] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 50;
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
        borderColor: "background.second",
      }}
    >
      <TableContainer sx={{ height: "calc(100% - 60px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                align={"left"}
                style={{ width: 30 }}
                sx={{ backgroundColor: "background.second" }}
              >
                <Checkbox
                  checked={isCheckedAll}
                  onClick={() => {
                    setCheckedAll(!isCheckedAll);
                    if (handleClickSelectAll) {
                      handleClickSelectAll(!isCheckedAll);
                    }
                  }}
                />
              </TableCell>
              <TableCell
                align={"left"}
                style={{ minWidth: 150 }}
                sx={{
                  backgroundColor: "background.second",
                  fontWeight: "bold",
                }}
              >
                Word
              </TableCell>
              <TableCell
                align={"left"}
                style={{ minWidth: 150 }}
                sx={{
                  backgroundColor: "background.second",
                  fontWeight: "bold",
                }}
              >
                POS
              </TableCell>
              <TableCell
                align={"left"}
                style={{ minWidth: 180 }}
                sx={{
                  backgroundColor: "background.second",
                  fontWeight: "bold",
                }}
              >
                Definition
              </TableCell>
              <TableCell
                align={"right"}
                style={{ minWidth: 90 }}
                sx={{
                  backgroundColor: "background.second",
                  fontWeight: "bold",
                }}
              >
                Topics
              </TableCell>
              <TableCell
                align={"right"}
                style={{ minWidth: 90 }}
                sx={{
                  backgroundColor: "background.second",
                  fontWeight: "bold",
                }}
              >
                examples
              </TableCell>
              <TableCell
                align={"right"}
                style={{ minWidth: 90 }}
                sx={{
                  backgroundColor: "background.second",
                  fontWeight: "bold",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listWords
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return <ItemVocabulary key={row._id} row={row} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[50]}
        component="div"
        count={listWords.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        sx={{
          borderTop: "1px solid",
          borderColor: "background.second",
        }}
      />
    </Box>
  );
});
export default TableDataVocabulary;

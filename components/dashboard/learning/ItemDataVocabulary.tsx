import { Box, Checkbox, IconButton, TableCell, TableRow } from "@mui/material";
import { IExpandWord } from "pages/dashboard/learning/vocabulary";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { DashBoardVocabulryContext } from "contexts";

export interface IItemVocabularyProps {
  row: IExpandWord;
}

const ItemVocabulary = React.memo(function ItemVocabulary(
  props: IItemVocabularyProps
) {
  const { row } = props;
  console.log(
    "🚀 ~ file: ItemDataVocabulary.tsx:13 ~ ItemVocabulary ~ row:",
    row
  );

  const { handleChangeListWords, handleOpenModel } = React.useContext(
    DashBoardVocabulryContext
  );
  const { examples, topics, word, pos, definition, checked = false } = row;
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <Checkbox
          checked={checked}
          onClick={() => {
            if (handleChangeListWords)
              handleChangeListWords({ ...row, checked: !checked });
          }}
        />
      </TableCell>
      <TableCell sx={{}}>{word}</TableCell>
      <TableCell sx={{}}>{pos}</TableCell>
      <TableCell sx={{}}>{definition}</TableCell>
      <TableCell sx={{ textAlign: "right" }}>{topics?.length}</TableCell>
      <TableCell sx={{ textAlign: "right" }}>{examples?.length}</TableCell>
      <TableCell sx={{}}>
        <Box>
          <IconButton
            color="primary"
            onClick={() => {
              if (!!handleOpenModel) {
                handleOpenModel(row._id);
              }
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
});
export default ItemVocabulary;

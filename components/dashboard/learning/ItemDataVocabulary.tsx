import { Box, Checkbox, IconButton, TableCell, TableRow } from "@mui/material";
import {
  IDashBoardVocabularyContext,
  IExpandWord,
} from "pages/dashboard/learning/vocabulary";
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
  const { handleChangeListWords, handleOpenModel } = React.useContext(
    DashBoardVocabulryContext
  ) as IDashBoardVocabularyContext;
  const { examples = [], topics, word, checked = false } = row;
  const { translation, type } = examples[0] || {};
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
      <TableCell sx={{}}>{type}</TableCell>
      <TableCell sx={{}}>{translation}</TableCell>
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

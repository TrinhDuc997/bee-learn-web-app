import {
  Autocomplete,
  Chip,
  IconButton,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import {
  IExpandWord,
  INoteBooksContext,
} from "pages/learning/vocabulary/note-book";
import * as React from "react";
import {
  arrayLevelOfWord,
  dataLevelOfWord,
  dataPOSMap,
} from "utils/dataCommon";
import { NoteBookContext } from "contexts";
import LoyaltyRoundedIcon from "@mui/icons-material/LoyaltyRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
export interface IItemVocabularyProps {
  row: IExpandWord;
}

const ItemNoteBook = React.memo(function ItemVocabulary(
  props: IItemVocabularyProps
) {
  const { row } = props;
  const {
    examples = [],
    // description,
    word,
    levelOfWord = 1,
    isChanged = false,
    tags = [],
  } = row;
  const { translation, type = "" } = examples[0] || {};
  const { handleChangeItems, handleOpenEditWord } = React.useContext(
    NoteBookContext
  ) as INoteBooksContext;

  const handleChangeLevel = (params: IExpandWord) => {
    if (handleChangeItems) {
      handleChangeItems(params);
    }
  };
  const pos = dataPOSMap[type];
  // const value = arrayLevelOfWord.find((i) => i.level === levelOfWord);
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell sx={{}}>{word}</TableCell>
      <TableCell sx={{}}>{pos || type}</TableCell>
      <TableCell sx={{}}>{translation}</TableCell>
      {/* <TableCell sx={{ textAlign: "right" }}>{description}</TableCell> */}
      <TableCell sx={{ textAlign: "left" }}>
        {tags.map((item) => {
          return (
            <Chip
              key={item._id}
              sx={{ margin: "3px" }}
              color="primary"
              icon={<LoyaltyRoundedIcon />}
              label={item.title}
              variant="outlined"
            />
          );
        })}
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        <Autocomplete
          disableClearable
          id="combo-box-demo"
          options={arrayLevelOfWord.map((i) => i.level)}
          value={levelOfWord}
          isOptionEqualToValue={(option, value) => option === value}
          onChange={(event, value) => {
            handleChangeLevel({ ...row, levelOfWord: value });
          }}
          size="small"
          sx={{ width: 120, display: "inline-block" }}
          getOptionLabel={(option) => dataLevelOfWord[option] || ""}
          renderInput={(params) => <TextField {...params} label="" />}
        />
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        <IconButton
          color="primary"
          onClick={() => {
            handleOpenEditWord(row);
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});
export default ItemNoteBook;

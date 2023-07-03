import { Autocomplete, TableCell, TableRow, TextField } from "@mui/material";
import { IExpandWord } from "pages/learning/vocabulary/note-book";
import * as React from "react";
import {
  arrayLevelOfWord,
  dataLevelOfWord,
  dataPOSMap,
} from "utils/dataCommon";
import { NoteBookContext } from "contexts";

export interface IItemVocabularyProps {
  row: IExpandWord;
}

const ItemNoteBook = React.memo(function ItemVocabulary(
  props: IItemVocabularyProps
) {
  const { row } = props;
  const {
    examples = [],
    description,
    word,
    levelOfWord = 1,
    isChanged = false,
  } = row;
  const { translation, type = "" } = examples[0] || {};
  const { handleChangeListWords } = React.useContext(NoteBookContext);

  const handleChangeLevel = (params: IExpandWord) => {
    if (handleChangeListWords) {
      handleChangeListWords(params);
    }
  };
  const pos = dataPOSMap[type];
  // const value = arrayLevelOfWord.find((i) => i.level === levelOfWord);
  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      sx={{
        backgroundColor: isChanged ? "warning.light" : "",
        "&.MuiTableRow-hover:hover": {
          backgroundColor: isChanged ? "warning.main" : "",
        },
      }}
    >
      <TableCell sx={{}}>{word}</TableCell>
      <TableCell sx={{}}>{pos || type}</TableCell>
      <TableCell sx={{}}>{translation}</TableCell>
      <TableCell sx={{ textAlign: "right" }}>{description}</TableCell>
      <TableCell sx={{ textAlign: "right" }}>
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
          sx={{ width: 120 }}
          getOptionLabel={(option) => dataLevelOfWord[option] || ""}
          renderInput={(params) => <TextField {...params} label="" />}
        />
      </TableCell>
    </TableRow>
  );
});
export default ItemNoteBook;
